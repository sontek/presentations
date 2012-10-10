(function() {
    // our namespace
    var Reviews = {
        Models: {},
        Views: {},
        Collections: {}
    };

    window.Reviews = Reviews;

    var template = function(name) {
        return Hogan.compile($('#'+name+'-template').html());
    };

    Reviews.Models.Review = Backbone.Model.extend({
    });

    Reviews.Collections.Reviews = Backbone.Collection.extend({
        localStorage: new Store("reviews")
    });

    Reviews.Views.Index = Backbone.View.extend({
        template: template('index'),
        initialize: function() {
            this.reviews = new Reviews.Collections.Reviews();
//            this.reviews.on('all', this.log, this);
            this.reviews.on('reset change destroy', this.render, this);
            this.reviews.fetch();
        },

        log: function() {
            console.log(arguments);
        }
        // not built-in to backbone, just a good convention
        , serialize: function() {
            return {
                count: this.reviews.length,
                reviews: this.reviews.toJSON()
            }
        }

        , render: function() {
            this.$el.html(this.template.render(this.serialize()));

            var form_view = new Reviews.Views.Index.Form({
                collection: this.reviews
            });

            this.reviews.each(function(review) {
                var view = new Reviews.Views.Index.Review({
                    model: review
                });

                var el = view.render().el;
                this.$(".reviews").append(el);

            }, this);

            this.$(".reviews").append(form_view.render().el);

            // chaining
            return this;
        },
    });

    Reviews.Views.Index.Form = Backbone.View.extend({
        template: template("index-form")
        , tagName: "form"
        , className: 'form-horizontal'
        , events: {
            "submit": "submit"
        }
        , submit: function (event) {
            event.preventDefault();

            this.collection.create({
                restaurant: this.$("#restaurant").val()
                , review: this.$("#review").val()
            });
        }
        , render: function() {
            this.$el.html(this.template.render());
            return this;
        },
    });

    Reviews.Views.Index.Review = Backbone.View.extend({
        template: template("index-review")
        , events: {
            'click button': 'delete'
        }
        , delete: function() {
            this.model.destroy();
        }
        , serialize: function() {
            return this.model.toJSON();
        }
        , render: function() {
            this.$el.html(this.template.render(this.serialize()));
            return this;
        },
    });

    /*
     * To do:
     *
     * * Reviews.Views.Index.Form
     *   A view that renders a form which can be submitted
     *   to create a new recipe
     * * Reviews.Views.Index should add a subview for each
     *   review in the database
     * * Reviews.Views.Review
     *   A view that renders an individual review
     *   Also, a delete button to remove it
     */

    Reviews.Router = Backbone.Router.extend({
        initialize: function(options) {
            this.el = options.el
        },

        routes: {
            "": "index"
        },

        index: function() {
            var view = new Reviews.Views.Index();
            this.el.empty();
            this.el.append(view.render().el);
        }
    });

    Reviews.init = function(container) {
        container = $(container);
        var router = new Reviews.Router({el: container})
        Backbone.history.start();
    }
})()
