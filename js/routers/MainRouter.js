// Main App Router
// ----------

App.Routers.Main = Backbone.Router.extend({

    initialize: function(options) {
        // Fetch the data file if it is provided.
        var entries;
        $.ajax({
            "async": false,
            "dataTypeString": "json",
            "url":   "js/data/data.json",
            success: function(data) {
                entries = data;
            },
        });

    	// Dummy entries if data file is not provided.
        if (!entries) {
        	entries = [
        		{ 'label': '#2 Gym', 'timestamp': 1322611799, 'text': 'Did cardio', 'type': 'orange', 'size':3 },
                { 'label': '#2 Gym', 'timestamp': 1322610935, 'text': 'Got a pump', 'type': 'violet', 'size':2 },
                { 'label': '#1 Nutrition', 'timestamp': 1325289600, 'text': 'Made me a shake', 'type': 'orange' },
                { 'label': '#2 Gym', 'timestamp': 1325289600, 'text': 'Body is sore', 'type': 'pink' },
                { 'label': '#1 Nutrition', 'timestamp': 1322611211, 'text': 'Read Guide', 'type': 'green', 'size':2 },
                { 'label': '#1 Nutrition', 'timestamp': 1325289598, 'text': 'Bought Supplements', 'type': 'violet' }
        	];
        }
    	App.Models.Entries = new Entries(entries);
        
        // Instantiate the table with entries.
		new App.Views.EntryCollectionView;
    }

});