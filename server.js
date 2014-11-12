function server() {
	var express = require('express');
	var app = express();

	var tracks = undefined;

	var html = undefined;

	function render(debug, unlockedTrack, focusedTrack) {
		return html.render(tracks, unlockedTrack, focusedTrack, debug);
	}

	function setRealHTML(setHtml) {
		html = setHtml;
	}

	function setRealTracks(setTracks) {
		tracks = setTracks;
	}

	app.get('/', function(request, response) {
		var query = request.query;

		var debugHTML = false;
		var focusTrack = undefined;
		var unlockTrack = undefined;

		if (query.doughnuts !== undefined)
		{
			debugHTML = query.doughnuts;
		}

		if (query.focus !== undefined)
		{
			var focusHash = query.focus;
			var track = tracks.trackWithHash(focusHash);
			if (track.isUnlocked() === true)
			{
				focusTrack = track;
			}
		}

		if (query.unlock !== undefined)
		{
			var unlockName = query.unlock;
			unlockTrack = tracks.trackWithName(unlockName);
			if (unlockTrack === undefined)
			{
				// ok, maybe it's a hash
				var unlockHash = query.unlock;
				unlockTrack = tracks.trackWithHash(unlockHash);
			}
		}

		mainPath(debugHTML, unlockTrack, focusTrack, response);
	} );
	/*
	//////
	app.get('/eat_doughnuts', function(request, response) {
		tracks.setAllLocked(true);

		response.send( render(true) );
	} );

	app.get('/bake_doughnuts', function(request, response) {
		tracks.setAllLocked(false);

		response.send( render(true) );
	} );
	*/
	app.use(express.static(__dirname + '/public') );

	app.get('/*', function(request, response) {

		if (request.params[0] !== undefined)
		{
			var param = request.params[0];

			var testFor = "images/tapes/";
			if (param.substring(0, testFor.length) === testFor)
			{
				// since /public didn't catch this request then the file doesn't exist, let's pass the default!
				serveDefaultTapeImage(param, response);
			} else
			{
				var trackName = request.params[0];
				var unlockTrack = tracks.trackWithName(trackName);
				if (unlockTrack == undefined)
				{
					console.log("Unlock path called for params " + JSON.stringify(request.params) );
				}
				mainPath(false, unlockTrack, undefined, response);
			}	
		}
	} );

	function serveDefaultTapeImage(requestPath, response) {
		var options = {
			root: __dirname + '/public/',
			dotfiles: 'deny',
			headers: {
			    'x-timestamp': Date.now(),
			    'x-sent': true
			}
		};
		var testFor = "_unlocked.jpg";
		if (requestPath.substring(requestPath.length - testFor.length, requestPath.length) === testFor)
		{
			response.sendFile("images/tapes/default_unlocked.jpg", options);
		} else
		{
			response.sendFile("images/tapes/default_locked.jpg", options);
		}
	}

	function mainPath(debugHTML, unlockTrack, focusTrack, response) {
		if (unlockTrack != undefined)
		{
			console.log("Serving unlock: " + unlockTrack.name);

			if (unlockTrack.isLocked() )
			{
				console.log("\tUnlocking " + unlockTrack.name);

				unlockTrack.setUnlocked(true);
				tracks.save();
			} else
			{
				console.log("\tAlready Unlocked " + unlockTrack.name);
			}

			if (focusTrack === undefined)
			{
				focusTrack = unlockTrack;
			}
		}

		if (focusTrack !== undefined)
		{
			analytics.sendEvent("track", "focus", focusTrack.name);
		}

		response.send( render(debugHTML, unlockTrack, focusTrack) );
	}

	app.use(function(request, response, next)
	{
		response.send( render(false) ); 
	});

	app.use(function(error, request, response, next) {
	  console.error(error.stack);
	  response.send( render(false) );
	} );

	return {
		setHTML : function(html) {
			setRealHTML(html);
		},
		
		setTracks : function(tracks) {
			setRealTracks(tracks);
		},

		start : function(listenPort) {
			if (listenPort === undefined)
			{
				listenPort = 3000;
			}
			var server = app.listen(listenPort, function() {
				console.log('Listening on port %d', server.address().port);

				analytics.sendEvent("app", "start");
			});
		}

	};
}

module.exports = exports = new server();