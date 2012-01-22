// Main App Router
// ----------

App.Routers.Main = Backbone.Router.extend({

    initialize: function(options) {
    	// Initialize with some data.
    	var entries = [
    		{ 'label': 'Gym', 'timestamp': 1322611200, 'text': 'Did cardio', 'type': 'blue', 'size':3 },
            { 'label': 'Gym', 'timestamp': 1322611200, 'text': 'Got a pump', 'type': 'red', 'size':2 },
            { 'label': 'Gym', 'timestamp': 1325289600, 'text': 'Body is sore', 'type': 'blue' },
            { 'label': 'Nutrition', 'timestamp': 1322611200, 'text': 'Read Guide', 'type': 'green', 'size':2 },
            { 'label': 'Nutrition', 'timestamp': 1325289600, 'text': 'Bought Supplements', 'type': 'blue' },
            { 'label': 'Nutrition', 'timestamp': 1325289600, 'text': 'Made me a shake', 'type': 'green' }
    	];
    	App.Models.Entries = new Entries(entries);
        
        // Instantiate the table with entries.
		new App.Views.EntryCollectionView;
    }

});