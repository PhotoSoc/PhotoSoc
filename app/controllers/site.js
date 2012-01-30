const list = require("mvc/list.js"),
models = list.models,
controllers = list.controllers;

module.exports = {
	"index": function() {
		this.render();
	},
	"about": function() {
		this.render();
	},
	"contact": function() {
		var exec = ["Jeff","Matt","Mark"];
		this.render({exec:exec});
	}
};