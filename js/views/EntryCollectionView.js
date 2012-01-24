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
		// Store them in a Model, sorted.
		App.Models.Labels = labels.sort();
		// Render.
		this.renderLabels(weeks);

		// On initialization, add all entries.
		this.addAllEntries();
	},

	renderTimelineRange: function(from) {
		var date = new Date(from * 1000);
		// Beging with a Monday way back, at 00:00:00.
		date = new Date(date.getFullYear(), date.getMonth(), date.getDate());
		date = new Date(((date.getTime() / 1000) - ((date.getDay() - 1) * (60 * 60 * 24))) * 1000);
		
		// Until today.
		var today = new Date().getTime();
		// Timeline weeks.
		var weeks = [date.getTime()];
		// Months text form
		var months = ['J', 'F', 'M', 'A', 'M', 'J', 'J', 'A', 'S', 'O', 'N', 'D']
		
		var head = ['<th/>'];
		while(true) {
			// <th class="week">1 Jan 2012</th>
			head.push('<th class="week" title="' + date.toString() + '">' + date.getDate() + '<br/>'
				+ months[date.getMonth()] + '</th>');
			// Move by 7 days forward.
			date = new Date(date.getTime() + (7 * 24 * 60 * 60 * 1000));
			var time = date.getTime();
			if (time > today) break;
			weeks.push(time);
		}
		
		$(this.el).append($('<tr id="timeline"/>').append(head.join('')));

		// So we know how many weeks we have rendered.
		return weeks;
	},

	renderLabels: function(weeks) {
		var view = $(this.el);
		
		// Create individual label - rows.
		_.each(App.Models.Labels, function(label) {
			var row = ['<th class="label">' + label + '</th>'];
			var l = weeks.length,
				i = -1;
			while(++i < l) {
				row.push('<td class="' + weeks[i] + ' ' +  (weeks[i] - (60 * 60 * 1000)) + '"></td>')
			}
			view.append($('<tr/>').append(row.join('')));
		});
	},

	// Add a single timeline entry to the table.
	addOneEntry: function(entry) {
		// Create a View for us and make us into a rendered element.
		var view = new App.Views.EntryItemView({model: entry}).render().el;

		if (entry.get("type") == "orange") {
			console.log(new Date(entry.getWeekStamp()).toString());
		}

		// Append to the row - column where we belong.
		$(this.el).find('tr:not(#timeline)')
		.eq(App.Models.Labels.indexOf(entry.get("label")))
		.find('td.' + entry.getWeekStamp())
		.append(view);
	},

	// Add all items in the Entries collection at once.
	addAllEntries: function() {
		App.Models.Entries.each(this.addOneEntry);
	}

});