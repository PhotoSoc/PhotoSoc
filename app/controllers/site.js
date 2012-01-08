const controller = require("mvc/controller.js").bind(module.id);
models = require("mvc/list.js").models;

module.exports = {
	"index": function() {
		this.render();
	},
	"about": function() {
		var exec = ["Jeff","Matt","Mark"];
		this.render({exec:exec});
	},
	"darkroom": function() {
		this.render();
	},
	"contact": function() {
		this.render();
	}
};