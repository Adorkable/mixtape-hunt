function tracks() {
	var TrackPrototype = require('./track');

	var config = require('config');
	var storage = require('node-persist');
	storage.initSync();

	var tracksData = storage.getItem('tracks');
	if (tracksData === undefined)
	{
		console.log("Pulling default tracks from config");
		if (config.has('tracks') )
		{
			tracksData = config.get('tracks');

			analytics.sendEvent("app", "load_defaults");
		} else
		{
			console.log("Defaults not found, no tracks");
			tracksData = [];

			analytics.sendEvent("app", "load_empty");
		}
	}

	var allTracks = [];
	var tracksByHash = {};
	var tracksByName = {};

	for (var index = 0; index < tracksData.length; index++) {
		var trackData = tracksData[index];
		var track = new TrackPrototype(trackData);

		allTracks.push(track);
		tracksByHash[track.hash()] = track;
		tracksByName[track.name] = track;
	}

	return {
		all : allTracks,

		numberOfTracks: function() {
			return this.all.length;
		},

		trackAtIndex: function(index) {
			var result = undefined;

			if (index < this.numberOfTracks() )
			{
				result = this.all[index];
				result.index = index;
			} else
			{
				console.log("Maximum index for tracks is " + this.numberOfTracks() + ", attempt to access track at index " + index);
			}

			return result;
		},

		trackWithHash: function(hash) {
			return tracksByHash[hash];
		},

		trackWithName: function(name) {
			return tracksByName[name];
		},

		performOnEachTrack: function(action) {
			//if (action typeof function)
			{
				for (var index = 0; index < this.numberOfTracks(); index ++) {
					var track = this.trackAtIndex(index);
					if (track != undefined)
					{
						action(track);
					}
				}
			
			}
		},

		save: function() {
			console.log("Saving to storage");
			storage.setItem('tracks', allTracks);
			analytics.sendEvent("app", "save");
		}
	};
}

module.exports = exports = new tracks();
