const list = require("struct").mvc.list,
models = list.models,
controllers = list.controllers;

module.exports = {
	"index": function() {
		this.render();
	}
};