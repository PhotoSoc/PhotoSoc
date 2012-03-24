const list = require("gusto").mvc.list,
models = list.models,
controllers = list.controllers;

const http = require("http"),
qs = require("querystring");

module.exports = {
	"index": function() {
		this.render();
	},
	"list": function(params) {

		var action = this, start = new Date,
		path = "/services/rest/",
		params = {
			method:"flickr.groups.pools.getPhotos",
			api_key:"2827b151717a238f8d5d097099ba3cc7",
			group_id:"696232@N23",
			format:"json",
			nojsoncallback:1
		};
		var req = http.get({
			host: "api.flickr.com",
			path: path+"?"+qs.stringify(params)
		}, function(res) {
			var buf = "";
			res.setEncoding("UTF8")
			res.on("data",function(chunk) {
				buf += chunk;
			}).on("end",function() {
				var obj = JSON.parse(buf);
				action.renderJSON(obj.photos.photo);
			});
		})
		
	}
};