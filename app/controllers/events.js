const list = require("mvc/list.js"),
models = list.models,
controllers = list.controllers;

const https = require("https");

module.exports = {
	"index": function(params) {
		if("id" in params) {
			this.render("view",{id:params.id});
		} else {
			this.render(params);
		}
	},
	"list": function(params) {
		var action = this, start = new Date, path,
		token = "?access_token=AAACPGOnKZAyMBAGSZCAYQRXXLe7dhxysHEofmZBNqeuNpXcjg5ZCGIpaleB5xBfKWFca7Djj6ZCcK9s3bvmKhabzZBicvatoUZD";
		if("id" in params) {
			path = "/"+params.id;
		} else {
			path = "/warwickphotosoc/events";
		}
		https.get({
			host: "graph.facebook.com",
			path: path+token
		}, function(res) {
			var buf = new Buffer(parseInt(res.headers["content-length"])),
			off=0;
			res.on("data",function(chunk) {
				chunk.copy(buf,off);
				off += chunk.length;
			}).on("end",function() {
				var event = JSON.parse(buf.toString("UTF-8"));
				action.renderJSON(event);
			});
		});
	}
};