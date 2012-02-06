const list = require("gusto").mvc.list,
models = list.models,
controllers = list.controllers;

module.exports = {
	"index": function() {
		this.render();
	}
};