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

    view.listItems[0].trigger('click').trigger('click');

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

})();
