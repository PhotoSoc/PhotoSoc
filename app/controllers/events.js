const list = require("mvc/list.js"),
models = list.models,
controllers = list.controllers;

const https = require("https");

module.exports = {
	"index": function() {
		this.render();
	},
	"list": function() {
		var action = this, start = new Date;
		https.get({
			host: "graph.facebook.com",
			path: "/warwickphotosoc/events\
?access_token=AAACPGOnKZAyMBAGSZCAYQRXXLe7dhxysHEofmZBNqeuNpXcjg5ZCGIpaleB5xBfKWFca7Djj6ZCcK9s3bvmKhabzZBicvatoUZD\
&since=0"
		}, function(res) {
			var buf = new Buffer(parseInt(res.headers["content-length"])),
			off=0;
			res.on("data",function(chunk) {
				chunk.copy(buf,off);
				off += chunk.length;
			}).on("end",function() {
				var events = JSON.parse(buf.toString("UTF-8"));
				action.renderJSON(events.data);
			});
		});
	}
};