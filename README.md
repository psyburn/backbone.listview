ListView
========

Provides a generic list view for Backbone.js applications.

# Installation

Add backbone.listview.js script after jQuery, Underscore (or their alternatives) and Backbone.
``` html
<!-- dependencies -->
<script src="lib/jquery.js"></script>
<script src="lib/underscore.js"></script>
<script src="lib/backbone.js"></script>

<!-- listview plugin -->
<script src="backbone.listview.js"></script>
```

# Usage
```js
var ListView = Backbone.ListView.extend({});
var list = new ListView({
  collection: someCollection,
  itemView: SomeView
});
```

The listview is a just an modifeid view that renders a list a collecton based on a single view. Any standard options for a view can be passed to the listview (model, collection, el, id, className, tagName and attributes).

Note that the passed collection will be used for the list view operations.

Another needed options is needed is the itemView.

## itemView 

The itemView is the view definition that will be rendered into the list. The list item is made using the itemView definition and the corresponding model from the collection.

```js
//define the itemView
var MonsterItemView = Backbone.View.extend({
  className: 'list-item',
  render: function() {
    this.$el.html('Name: ' + this.model.get('name'));
  }
});

var monsterCollection = new Backbone.Collection([{name: 'Dracula'}, {name: 'Edward'}]);

var ListView = Backbone.ListView.extend({});
//create a list using the defined item view and collection
var monsterListView = new ListView({
  className: 'monster-list',
  collection: monsterCollection,
  itemView: MonsterItemView
});

monsterListView.render();
```

Resulting HTML Output: 

``` html
<div class="monster-list">
  <div class="list-item">Name: Dracula</div>
  <div class="list-item">Name: Edward</div>
</div>
```


## Item events

Any event triggered on the item will also be triggered on the list - but namespaced with 'item:'.
Following the previous example and slightly changing the item view with a click listener:

```js
var MonsterItemView = Backbone.View.extend({
  className: 'list-item',
  render: function() {
    this.$el.html('Name: ' + this.model.get('name'));
  },
  events: {
    'click': 'onItemClick'
  },
  onItemClick: function() {
    this.trigger('click', 'I have clicked on a monster named:');
  }
});
```

We can listen for that event on the list by attaching an 'item:click' listener. Any arguments 

```js
monsterListView.on('item:click', function(view, argument) {
  alert(argument + view.model.get('name'));
});
```

Clicking on the first item would yield in a alert "I have clicked on a monster named: Dracula"



# Examples

### JSFiddle
[Choose your Pokemon](http://jsfiddle.net/PsyBurn/dkphn/)

[Shopping list](http://jsfiddle.net/PsyBurn/2nsu5/2/)


### Quick example

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
