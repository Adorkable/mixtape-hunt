function track(trackData) {
	var result = {};


	if (trackData != undefined)
	{
		// TODO: copy contents 
		result.name = trackData.name;
		result.type = trackData.type;
		result.src = trackData.src;
		result.title = trackData.title;
		result.hint = trackData.hint;
		if (trackData._unlocked != undefined)
		{
			result._unlocked = trackData._unlocked;
		} else
		{
			result._unlocked = trackData.unlocked;
		}
	}

	var crypto = require('crypto');

	function embedCodeForYouTube(src, width, height) {
		return "<iframe id=\"media\" src=\"http://www.youtube.com/embed/" + src + "\" frameborder=\"0\" allowfullscreen></iframe>";
	}

	function embedCodeForSoundcloud(src, width, height) {
		return "<iframe id=\"media\" scrolling=\"no\" frameborder=\"no\" src=\"https://w.soundcloud.com/player/?url=" +
				src +
				"&amp;color=ff5500&amp;auto_play=false&amp;hide_related=true&amp;show_comments=false&amp;show_user=true&amp;show_reposts=false&amp;visual=true\"></iframe>";
	}

	result.isLocked = function() {
		return !this._unlocked;
	};

	result.isUnlocked = function() {
			return this._unlocked;
	};

	result.setLocked = function(locked) {
		this.setUnlocked(!locked);
	};

	result.setUnlocked = function(unlocked) {
			var changed = false;
			if (this._unlocked != unlocked)
			{
				changed = true;
				this._unlocked = unlocked;

				var eventName;
				if (unlocked === true)
				{
					eventName = "unlock";
				} else
				{
					eventName = "lock";
				}

				analytics.sendEvent("track", eventName, this.name);
			} else
			{
				// TODO: report repeat unlocks/locks to analytics
			}
		};

	result.unlock = function() {
			this.setUnlocked(true);
		};

	result.lock = function() {
			this.setUnlocked(false);
		};

	result.hintHTML = function() {
			var result = "";
			if (this.hint !== undefined && this.hint.length > 0)
			{
				result = "Hint: " + this.hint;
			}
			return result;
		};

	result.embedCode = function() {
			var result = "";

			var width = 560;
			var height = 315;

			var type = "youtube";
			if (this.type != undefined)
			{
				type = this.type;
			}
			if (type === "soundcloud")
			{
				result = embedCodeForSoundcloud(this.src, width, height);
			} else 
			{
				result = embedCodeForYouTube(this.src, width, height);
			}

			return result;
		};

	result.imageNamePrefix = function() {
			return "" + this.name;
		};

	result.imageHashPrefix = function() {
			return "" + this.src;
		};

	result.imagePath = function() {
			return "images/tapes/";
		};

	result.imageNameWide = function() {
			return this.imagePath() + this.imageHashPrefix() + "_wide.jpg";
		};

	result.imageNameUnlocked = function() {
			return this.imagePath() + this.imageHashPrefix() + "_unlocked.jpg";
		};

	result.imageNameLocked = function() {
			return this.imagePath() + this.imageHashPrefix() + "_locked.jpg";
		};

	result.hash = function() {
			var result = "";
			
			var hash = crypto.createHash('md5');
			hash.update(this.src, 'utf8');
			result = hash.digest('hex');

			return result;
		};

	result.unlockURL = function(debug) {
			var result = "";

			result += "/?unlock=" + this.hash();
			if (debug)
			{
				result += "&doughnuts=true";
			}

			return result;
		};

	result.focusURL = function(debug) {
			var result = "";

			result += "/?focus=" + this.hash();
			if (debug)
			{
				result += "&doughnuts=true";
			}

			return result;
		};

	return result;
}

module.exports = exports = track;