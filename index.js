var config = require('config');


analytics = require('./analytics');
if (config.has("google_analytics_tid") )
{
	var googleAnalyticsTID = config.get("google_analytics_tid");
	analytics.startGoogleAnalytics(googleAnalyticsTID);
}
//analytics.setDebug(debugEnabled);

var html = require('./html');
html.setGoogleAnalyticsTID(googleAnalyticsTID);
if (config.has('page_title') )
{
	html.setPageTitle(config.get('page_title') );
}
if (config.has('about_html') )
{
	html.setAboutHTML(config.get('about_html') );
}

var tracks = require('./tracks');

var listenPort = undefined;
if (config.has('listen_port') )
{
	listenPort = config.get('listen_port');
} else
{
	listenPort = 3000;
}

var server = require('./server');
server.setHTML(html);
server.setTracks(tracks);
server.start(listenPort);
