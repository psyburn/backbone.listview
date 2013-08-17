ListView
========

Provides a generic list view for Backbone.js applications

## Example

```js
var nameCollection = new Backbone.Collection([
  {name: 'Ash'},
  {name: 'Ketchum'}
]);

//single item for the list
var SingleItemView = Backbone.View.extend({
  className: 'list-item',
  events: {
    'click': 'onItemClick'
  },

  render: function() {
    this.$el.html('name: ' + this.model.get('name'));
  },

  onItemClick: function() {
    //did my stuff..
    //any event trigered is sent to the list
    this.trigger('click');
  }
});

//the list
var ListView = Backbone.ListView.extend({
  el: '#container'
});

//init the list
var list = new ListView({
  collection: nameCollection,
  itemView: SingleItemView,
});

list.render();

//watchout for a clicked item on a list
list.on('item:click', function(itemView) {
  alert(itemView.model.get('name'));
});
```
