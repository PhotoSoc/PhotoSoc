const less = require("less");

module.exports = {
	".less": {
		type: "text/css",
		content: function(chunk) {
			return less.render(chunk);
		}
	}
};