const list = require("gusto").mvc.list,
      models = require("gusto").mvc.models;

exports.exec = model.define({
	name: String,
	bio: {type:String},
	caption: {type:String},
	position: {type: String}
});