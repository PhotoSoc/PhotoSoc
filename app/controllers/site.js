const mvc = require("mvc.js").init(module.id),
      models = mvc.models(module.id);

exports.site = mvc.controller({
	"index": function() {
		this.render();
	}
});