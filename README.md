mixtape hunt
---
**mixtape hunt** is a Node.js web app for providing a collaborative unlockable scavenger hunt. Users unlock individual pieces of media by browsing to unique URLs and can see what pieces of media have been unlocked by other users.

[![dependancies](https://david-dm.org/Adorkable/mixtape-hunt.svg)](https://david-dm.org/Adorkable/mixtape-hunt)

Originally created as [Press Play NYC](http://www.pressplay.nyc), a mixtape scavenger hunt for Youtube song tracks around Manhattan, **mixtape hunt** has been refactored to suite any purpose and will continue to expand in customization and support.

Installation
===
1. First make sure to have [Node.js](http://nodejs.org/) installed.
2. Next clone the repo.
3. After you've cloned the repo be sure to install the correct modules

``` javascript
	npm install
```

Next onto configuration!

Configuration
===
**mixtape hunt** uses [Node-config](https://github.com/lorenwest/node-config/), visit their site for indepth understanding of config file usage.

At minimum the repo includes an example configuration file in **config/** named **default.template.json**. You can use that as a guideline and make a copy named **default.json** and the app will load it up.

*TODO: explain basic configuration*

Usage
===
To start the app run **node** with **index.js**:

```
node index.js
```

*TODO: explain basic usage*

Credits
===
Created by [Trish Ang](http://feesh.dunked.com/) ([**@feesh**](http://github.com/feesh)) and [Ian Grossberg](http://www.iangrossberg.com) ([**@yoiang**](http://github.com/yoiang)) in collaboration with [Bernice Au](http://berniceau.com.au/).

Built on:

* JQuery
* Bootstrap
* GifLinks
* noodle

Cassette icon designed by [mathies janssen](http://www.thenounproject.com/mathiesjanssen) from the [Noun Project](http://www.thenounproject.com)
