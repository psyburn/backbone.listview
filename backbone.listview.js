(function() {
  'use strict';
  var List = Backbone.View.extend({
    className: 'list',

    constructor: function ListView(options) {
      options = options || {};
      //if no collection is defined - setup a empty one
      this.setupListView(options);

      //super call - default Backbone magic
      Backbone.View.call(this, options);
    },

    setupListView: function(options) {
      _.defaults(options, {
        itemView: Backbone.View
      });
      this.itemView = options.itemView;
      this.collection = this.collection || new Backbone.Collection();
      this.collection.on('reset', this.addAll, this);
    },

    addAll: function() {
      var fragment = document.createDocumentFragment();
      this.collection.each(function(item, index, collection) {
        fragment.appendChild(new this.itemView({
          model: item
        }).render().el);
      }, this);
      this.$el.html(fragment);
    },


  });

  Backbone.ListView = List;

  return List;
})();
