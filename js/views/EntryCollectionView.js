// Entry Collection Table View
// ----------

App.Views.EntryCollectionView = Backbone.View.extend({

	"el": "table#timeline",

	initialize: function(options) {
		_.bindAll(this, "addOneEntry");
		_.bindAll(this, "renderTimelineRange");
		_.bindAll(this, "renderLabels");

		// Determine the timeline range.
		var min = App.Models.Entries.min(function(entry) { return entry.get("timestamp"); }).get("timestamp");
		var weeks = this.renderTimelineRange(min);

		// Get all the possible labels.
		var labels = _.uniq(App.Models.Entries.map(function(entry) { return entry.get("label"); }));
		this.renderLabels(labels, weeks);

		// On initialization, add all entries.
		this.addAllEntries();
	},

	renderTimelineRange: function(from) {
		// Beging with a Monday way back.
		var monday = new Date((from - ((new Date(from * 1000).getDay() - 1) * (60 * 60 * 24))) * 1000); // getDay() starts with Sun.
		// Until today.
		var today = new Date().getTime();
		// Timeline weeks.
		var weeks = [monday.getTime()];
		
		var head = ['<th/>'];
		while(true) {
			// <th class="week">1 Jan 2012</th>
			head.push('<th class="week" week="">' + monday.toString().substring(3, 15) + '</th>');
			// Move by 7 days forward.
			monday = new Date(monday.getTime() + (7 * 24 * 60 * 60 * 1000));
			var time = monday.getTime();
			if (time > today) break;
			weeks.push(time);
		}
		
		$(this.el).append($('<tr id="timeline"/>').append(head.join('')));

		// So we know how many weeks we have rendered.
		return weeks;
	},

	renderLabels: function(labels, weeks) {
		var view = $(this.el);
		// Create individual label - rows.
		_.each(labels, function(label) {
			var row = ['<th class="label">' + label + '</th>'];
			var l = weeks.length,
				i = -1;
			while(++i < l) {
				row.push('<td class="' + weeks[i] + '"></td>')
			}
			view.append($('<tr/>').append(row.join('')));
		});
	},

	// Add a single timeline entry to the table.
	addOneEntry: function(entry) {
		// Create a View for us and make us into a rendered element.
		var view = new App.Views.EntryItemView({model: entry}).render().el;

		// Find where we belong.
		var table = $(this.el);
		table.find('tr:not(#timeline)').each(function() {
			if ($(this).find('th').text() == entry.get("label")) {
				var td = $(this).find('td.' + entry.getWeek());
				if (td.length > 0) {
					td.append(view);
				}
				return;
			}
		});
	},

	// Add all items in the Entries collection at once.
	addAllEntries: function() {
		App.Models.Entries.each(this.addOneEntry);
	},

});