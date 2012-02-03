const list = require("struct").mvc.list,
      models = require("struct").mvc.models;

exports.exec = model.define({
	name: String,
	bio: {type:String},
	caption: {type:String},
	position: {type: String}
});