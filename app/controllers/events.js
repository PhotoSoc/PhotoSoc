const list = require("mvc/list.js"),
models = list.models,
controllers = list.controllers;

module.exports = {
	"index": function() {
		this.render();
	}
};