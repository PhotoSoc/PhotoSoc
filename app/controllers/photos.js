const list = require("gusto").mvc.list,
models = list.models,
controllers = list.controllers;

const http = require("http"),
qs = require("querystring");

module.exports = {
	"index": function(params) {

		var action = this, start = new Date,
		path = "services/rest/",
		params = {
			method:"flickr.groups.pools.getPhotos",
			api_key:"2827b151717a238f8d5d097099ba3cc7",
			group_id:"696232%40N23",
			format:"json",
			nojsoncallback:1
		};
		http.get({
			host: "api.flickr.com",
			path: path+"?"+qs.stringify(params)
		}, function(res) {
			var buf = new Buffer(parseInt(res.headers["content-length"])),
			off=0;
			res.on("data",function(chunk) {
				chunk.copy(buf,off);
				off += chunk.length;
			}).on("end",function() {
				console.log(buf.toString())
				var event = JSON.parse(buf.toString("UTF-8"));
				action.renderJSON(event);
			});
		});
	}
};