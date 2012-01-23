// Entry Model
// ----------

var Entry = Backbone.Model.extend({

	// Attributes of an entry item.
	defaults: function() {
		return {
			'timestamp':  0,
			'label':      null,
			'text':       null,
			'type':       null,
			'size':       1 
		};
	},

	// Get the Monday for the timestamp of this item so we know which week to place this in.
	getWeekStamp: function() {
		// JS Date.
		var date = new Date(this.get("timestamp") * 1000);
		// Create a Date that is 00:00:00.
		var date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		// Shift the Date stamp to Monday and return.
		return ((date.getTime() / 1000) - ((date.getDay() - 1) * (60 * 60 * 24))) * 1000;
	},

	// A nicely formatted time from a timestamp for this item.
	getTime: function() {
		return new Date(this.get("timestamp") * 1000).toString().substr(0, 15);
	}

});

// Entry Items Collection
// ---------------

var Entries = Backbone.Collection.extend({

	// Reference to this collection's model.
	// Override this property to specify the model class that the collection contains.
	"model": Entry,

	comparator: function(entry) {
  		return entry.get("timestamp");
	}

});