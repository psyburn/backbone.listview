(function() {
  'use strict';
  var List = Backbone.View.extend({
    className: 'list',

    constructor: function ListView(options) {
      options = options || {};
      //if no collection is defined - setup a empty one

      this.setupListView(options);
      this.setupListeners();
      //super call - default Backbone magic
      Backbone.View.call(this, options);
    },

    setupListView: function(options) {
      _.defaults(options, {
        itemView: Backbone.View,
        collection: new Backbone.Collection()
      });
      this.listItems = [];
      this.itemView = options.itemView;
      this.collection = options.collection;
    },

    setupListeners: function() {
      this.listenTo(this.collection, 'add', this.addSingleItem, this);
      this.listenTo(this.collection, 'reset', this.addAll, this);
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
      this.listItems.push(viewItem);
      this.addListItemListeners(viewItem);
      viewItem.render();
      this.$el.append(viewItem.el);
      return viewItem;
    },

    //propagate list item events through parent list view
    addListItemListeners: function(view) {
      this.listenTo(view, 'all', function(eventName) {
        this.trigger('item:' + eventName);
      }, this);
    }
  });

  Backbone.ListView = List;

  return List;
})();
