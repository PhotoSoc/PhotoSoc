const model = require("mvc/model.js"),
      models = require("mvc/list.js").models;

exports.exec = model.define({
	name: String,
	bio: {type:String},
	caption: {type:String},
	position: {type: String}
});