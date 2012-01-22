// Entry Item View
// ----------

App.Views.EntryItemView = Backbone.View.extend({
	
	// Cache the template function for a single item.
	"template": _.template(function() {
		var result;
		$.ajax({
			"async": false,
		    "url":   "js/templates/_entry.html",
		  	success: function(data) {
		    	result = data;
		  	},
		});
		return result;
	}()),

	// The DOM events specific to an item.
	"events": {
		"mouseover span": "toggleText",
		"mouseout span":  "toggleText"
	},

	// We listen to changes to our Model representation, re-rendering.
	// If the view defines an initialize function, it will be called when the view is first created.
	initialize: function() {
		this.model.bind("change", this.render, this);
		this.model.bind("destroy", this.remove, this);
	},

	// Re-render the contents of the list item.
	// Override this function with your code that renders the view template from model data, and updates this.el with the new HTML.
	render: function() {
		$(this.el).html(this.template(this.model.toJSON())); // serialize to JSON, fill tml, set as innerHTML
        // Set the type of the item.
        $(this.el).addClass("entry " + this.model.get("type"));
		return this;
	},

	// Remove this view from the DOM.
	remove: function() {
		$(this.el).remove();
	},

	// Remove the item, destroy the model.
	clear: function() {
		this.model.destroy();
	},

	// Show/hide text of an item.
	toggleText: function() {
		var p = $(this.el).find('p');
		if (!p.is(':visible')) {
			p.slideDown('fast');
		} else {
			p.slideUp('slow');
		}
	}

});