(function() {
  'use strict';
  var delegateEventSplitter = /^(\S+)\s*(.*)$/;

  var List = Backbone.View.extend({
    constructor: function ListView(options) {
      options = options || {};
      this.setupListView(options);
      this.setupListeners();
      this.createItemWrapper();
      this.setupListItemListeners();
      //super call - default Backbone magic
      Backbone.View.call(this, options);
    },

    setupListView: function(options) {
      _.defaults(options, {
        itemEl: 'div',
        itemClassName: 'list-item',
        itemTemplate: _.template(''),
        //if no collection is defined - setup a empty one
        collection: new Backbone.Collection()
      });
      this.items = {};
      this.itemTemplate = this.itemTemplate || options.itemTemplate;
      this.collection = this.collection || options.collection;
      this.itemEl = this.itemEl || options.itemEl;
      this.itemClassName = this.itemClassName || options.itemClassName;
    },

    setupListeners: function() {
      this.listenTo(this.collection, 'add', this.addSingleItem, this);
      this.listenTo(this.collection, 'reset', this.addAllItems, this);
      this.listenTo(this.collection, 'remove', this.removeSingleItem, this);
    },

    setupListItemListeners: function() {
      var newItemEvents = {};
      for (var key in this.itemEvents) {
        var method = this.itemEvents[key];
        if (!_.isFunction(method)) {
          method = this[this.itemEvents[key]];
        }
        if (!method) {
          continue;
        }

        var match = key.match(delegateEventSplitter);
        var eventName = match[1], selector = match[2];
        var newMethod = method;
        var me = this;
        method = function() {
          var args = _.toArray(arguments);
          if (args.length && args[0].target) {
            args.unshift($(args[0].target).data('model'));
          }
          newMethod.apply(me, args);
        }

        newItemEvents[eventName + ' .' + this.itemClassName +' '+ selector] = method;
      }

      this.events = this.events || {};
      _.extend(this.events, newItemEvents);
    },

    render: function() {
      this.addAllItems();
      return this;
    },

    addAllItems: function() {
      this.removeAllItems();
      //add new items
      this.collection.each(function(model) {
        this.addSingleItem(model);
      }, this);
    },

    createItemWrapper: function() {
      var itemWrapper = document.createElement(this.itemEl);
      itemWrapper.className = this.itemClassName;
      this.itemWrapper = itemWrapper;
    },

    renderSingleItem: function(model) {
      return this.itemTemplate(model.toJSON());
    },

    addSingleItem: function(model) {
      var outputHTML = this.itemWrapper.cloneNode();
      outputHTML.innerHTML = this.renderSingleItem(model);
      $(outputHTML).data('model', model);
      this.$el.append(outputHTML);
      this.items[model.cid] = $(outputHTML);
    },

    getViewByModel: function(model) {
      return this.items[model.cid];
    },

    removeSingleItem: function(model) {
      if (this.items && this.items[model.cid]) {
        this.items[model.cid].remove();
        delete this.items[model.cid];
      }
    },

    removeAllItems: function() {
      this.$el.empty();
      this.items = {};
    },

    remove: function() {
      //do the default Backbone remove logic 
      Backbone.View.prototype.remove.call(this, arguments);
      //extra remove our items - one by one
      this.removeAllItems();
    }
  });

  Backbone.ListView = List;

  return List;
})();
