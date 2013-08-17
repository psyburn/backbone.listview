(function() {
  'use strict';
  var TestView;
  var testCollection = new Backbone.Collection([{id: 1, name: 'duck'}, {id: 2, name: 'dog'}]);

  module('Backbone.View', {

    setup: function() {
      TestView = Backbone.View.extend({
        el: '<div></div>',
        template: '<div class="list"><div>',
        render: function() {
          this.$el.html(this.template);
          return this;
        }
      });
    }
  });

  test('Simple render test', function() {
    var view = new TestView();
    view.render();
    equal(view.$('.list').length, 1, 'Should have applied template with the class list.' );
  });

  test('Render collection', function() {
    var ListView = Backbone.ListView.extend({
      el: '<div></div>',
      className: 'list'
    });
    var view = new ListView({
      collection: testCollection
    });
    view.render();
    equal(view.$('div').length, 2, 'Should be 2 list items.');
  });


  test('Test event clicks on items', function() {
    var clickCount = 0;
    var SingleView = Backbone.View.extend({
      className: 'list-item',
      events: {
        'click': 'clickMe'
      },

      clickMe: function() {
        this.trigger('click');
      }
    });

    var ListView = Backbone.ListView.extend({
      el: '<div></div>',
      className: 'list',
    });

    var view = new ListView({
      collection: testCollection,
      itemView: SingleView
    });

    view.render();
    view.on('item:click', function() {
      clickCount++;
    });

    view.items[0].trigger('click').trigger('click');

    equal(clickCount, 2, 'Should be 2 clicks.');
  });

  test('Add list item', function() {
    var SingleView = Backbone.View.extend({
      className: 'list-item',
      events: {
        'click': 'clickMe'
      },

      clickMe: function() {
        this.trigger('click');
      }
    });

    var ListView = Backbone.ListView.extend({
      el: '<div></div>',
      className: 'list',
    });

    var view = new ListView({
      collection: testCollection,
      itemView: SingleView
    });

    view.render();

    testCollection.add({id: 5, name: 'cat'});

    equal(view.$('div').length, 3, 'Should be 3 list items.');
  });


  test('Remove item from collection', function() {
    var clickCount = 0;
    var testCollection = new Backbone.Collection([{id: 1, name: 'duck'}, {id: 2, name: 'dog'}]);
    var SingleView = Backbone.View.extend({
      className: 'list-item',
      events: {
        'click': 'clickMe'
      },

      clickMe: function() {
        this.trigger('click');
      }
    });

    var ListView = Backbone.ListView.extend({
      el: '<div></div>',
      className: 'list',
    });

    var view = new ListView({
      collection: testCollection,
      itemView: SingleView
    });

    view.render();
    var model = testCollection.at(0);
    var selectedView = view.getViewByModel(model);
    view.on('item:click', function() {
      clickCount++;
    });
    selectedView.trigger('click');
    equal(clickCount, 1, 'Should be 1 click');
    testCollection.remove(model);
    equal(view.$('div').length, 1, 'Should be 1 list items.');
    equal(view.items.length, 1, 'There should be 1 item in view items.');

    clickCount = 0;
    selectedView.trigger('click');
    equal(clickCount, 0, 'Should be 0 click events after removal.');
  });

})();
