const less = require("less"),
path = require("path"),
fs = require("fs");

module.exports = {
	".less": {
		type: "text/css",
		init: function(file) {
			var that = this;
			fs.stat(file,function(e,stat) {
				that.buf = new Buffer(stat.size);
			});
			this.off = 0;
		},
		chunk: function(chunk,file) {
			this.off = this.buff.write(chunk,this.off);
		},
		output: function(chunk,file) {
			var that = this;
			less.render(this.buf.toString("UTF8"),{
				paths: [".",path.dirname(file)]
			},function(e,css) {
				if(e) return that.emit("error",e);
				that.emit("done",css);
			});
		}
	}
};