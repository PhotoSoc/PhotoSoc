const models = require("mvc/list.js").models;

module.exports = {
	"index": function() {
		this.render();
	},
	"about": function() {
		this.render();
	},
	"darkroom": function() {
		this.render("abc",{});
	},
	"contact": function() {
		var exec = ["Jeff","Matt","Mark"];
		this.render({exec:exec});
	}
};