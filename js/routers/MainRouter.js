// Main App Router
// ----------

App.Routers.Main = Backbone.Router.extend({

    initialize: function(options) {
    	// Initialize with some data.
    	var entries = [
    		{ 'label': 'Gym', 'timestamp': 1322611200, 'text': 'Did cardio', 'type': 'orange', 'size':3 },
            { 'label': 'Gym', 'timestamp': 1322611935, 'text': 'Got a pump', 'type': 'violet', 'size':2 },
            { 'label': 'Gym', 'timestamp': 1325289600, 'text': 'Body is sore', 'type': 'pink' },
            { 'label': 'Nutrition', 'timestamp': 1322611211, 'text': 'Read Guide', 'type': 'green', 'size':2 },
            { 'label': 'Nutrition', 'timestamp': 1325289600, 'text': 'Bought Supplements', 'type': 'violet' },
            { 'label': 'Nutrition', 'timestamp': 1325289600, 'text': 'Made me a shake', 'type': 'orange' }
    	];
    	App.Models.Entries = new Entries(entries);
        
        // Instantiate the table with entries.
		new App.Views.EntryCollectionView;
    }

});