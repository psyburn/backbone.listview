(function() {
  'use strict';
  var TestView;

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
    var testCollection = new Backbone.Collection([{id: 1, name: 'duck'}, {id: 2, name: 'dog'}]);
    var ListView = Backbone.ListView.extend({
      el: '#container',
      className: 'list',
      collection: testCollection
    });
    var view = new ListView();
    testCollection.trigger('reset');
    debugger
    equal(view.$('div').length, 2, 'Should be 2 list items.');
  });

})();
