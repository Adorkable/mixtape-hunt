function analytics() {
	var debugEnabled = false;

	var googleAnalytics = require('universal-analytics');
	var googleAnalyticsVisitor = undefined;

	return {
		startGoogleAnalytics : function(googleAnalyticsTID) {
			if (googleAnalyticsTID)
			{
				if (debugEnabled === true)
				{
					googleAnalyticsVisitor = googleAnalytics(googleAnalyticsTID).debug();
				} else
				{
					googleAnalyticsVisitor = googleAnalytics(googleAnalyticsTID);
				}
				console.log("Google Analytics initialized");
			} else
			{
				console.log("Google Analytics TID not providing, skipping setup");
			}		
		},

		sendEvent : function(category, event, label) {
			if (googleAnalyticsVisitor != undefined)
			{
				if (debugEnabled === true)
				{
					console.log("Sending event " + category + ":" + event + ":" + label);
				}
				googleAnalyticsVisitor.event(category, event, label).send();
			}
		},

		sendPageView : function(path, hostname, title, params) {
			if (googleAnalyticsVisitor != undefined)
			{
				if (debugEnabled === true)
				{
					console.log("Sending pageview " + pageName + " within " + hostname + " named " + title + " with params " + params);
				}
				googleAnalyticsVisitor.pageView(path, hostname, title, params).send();
			}
		},

		setDebug : function(enabled) {
			// TODO: enable on googleAnalyticsVisitor
			debugEnabled = enabled;
		}
	};
}

module.exports = exports = new analytics();