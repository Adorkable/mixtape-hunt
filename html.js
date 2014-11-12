function html() {
	var jade = require('jade');

	var defaultJadeOptions = {
		fileName: "./log/jade.exceptions.log",
		pretty: true,
		debug: false,
		compileDebug: false
	};

	var index = jade.compileFile("views/index.jade", defaultJadeOptions);

	return {
		googleAnalyticsTID : false,
		setGoogleAnalyticsTID : function(googleAnalyticsTID) {
			if (googleAnalyticsTID != undefined)
			{
				this.googleAnalyticsTID = googleAnalyticsTID;
			} else
			{
				this.googleAnalyticsTID = false;
			}
		},

		pageTitle : false,
		setPageTitle : function(pageTitle) {
			if (pageTitle != undefined)
			{
				this.pageTitle = pageTitle;
			} else
			{
				this.pageTitle = false;
			}
		},

		aboutHTML : false,
		setAboutHTML : function(aboutHTML) {
			if (aboutHTML != undefined)
			{
				this.aboutHTML = aboutHTML;
			} else
			{
				this.aboutHTML = false;
			}
		},

		render: function(tracks, unlockedTrack, focusedTrack, debug) {
			return index({
				pageTitle: this.pageTitle,
				aboutHTML: this.aboutHTML,
				googleAnalyticsTID: this.googleAnalyticsTID,
				tracks: tracks.all,
				unlockedTrack: unlockedTrack,
				focusedTrack: focusedTrack,
				debugHTML: debug
			});
		}
	};
}

module.exports = exports = new html();