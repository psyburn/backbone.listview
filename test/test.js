(function() {
  'use strict';
  var TestView;

  module("Backbone.View", {

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

  test("Simple render test", function() {
    var view = new TestView();
    view.render();
    equal(view.$('.list').length, 1, "Should have applied template with the class list." );
  });



})();
