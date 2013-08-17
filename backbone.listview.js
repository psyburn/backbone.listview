(function() {
  'use strict';
  var List = Backbone.View.extend({
    className: 'list',

    constructor: function ListView(options) {
      options = options || {};

      this.setupListView(options);
      this.setupListeners();
      //super call - default Backbone magic
      Backbone.View.call(this, options);
    },

    setupListView: function(options) {
      _.defaults(options, {
        //if no itemView is defined - use backbone default 
        itemView: Backbone.View,
        //if no collection is defined - setup a empty one
        collection: new Backbone.Collection()
      });
      this.items = [];
      this.itemView = options.itemView;
      this.collection = options.collection;
    },

    setupListeners: function() {
      this.listenTo(this.collection, 'add', this.addSingleItem, this);
      this.listenTo(this.collection, 'reset', this.addAll, this);
      this.listenTo(this.collection, 'remove', this.removeSingleItem, this);
    },

    render: function() {
      this.addAll();
      return this;
    },

    addAll: function() {
      this.collection.each(function(model) {
        this.addSingleItem(model);
      }, this);
    },

    addSingleItem: function(model) {
      var viewItem = new this.itemView({
        model: model
      });
      this.items.push(viewItem);
      this.addListItemListeners(viewItem);
      viewItem.render();
      this.$el.append(viewItem.el);
      return viewItem;
    },

    removeSingleItem: function(model) {
      var view = this.getViewByModel(model);
      this.removeSingleView(view);
    },

    removeSingleView: function(view) {
      var index;
      //remove listeners
      this.stopListening(view);

      if (view) {
        view.remove();
        index = this.items.indexOf(view);
        //remove view from items
        this.items.splice(index, 1);
      }
    },

    //propagate list item events through parent list view
    addListItemListeners: function(view) {
      this.listenTo(view, 'all', function(eventName) {
        this.trigger('item:' + eventName);
      }, this);
    },

    getViewByModel: function(model) {
      return _.find(this.items, function(item, index) {
        return item.model===model;
      });
    }
  });

  Backbone.ListView = List;

  return List;
})();
