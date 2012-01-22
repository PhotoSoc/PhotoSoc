const less = require("less"),
path = require("path"),
fs = require("fs");

var cache = {};

module.exports = function(buf,file) {
	var that = new process.EventEmitter();
	fs.stat(file,function(e,stat) {
		if(e) throw e;
		if(file in cache && stat.mtime in cache[file]) {
			that.emit("data",cache[file][stat.mtime]);
			return that;
		}
		less.render(buf.toString("UTF8"),{
			paths: [".",path.dirname(file)],
			compress: true
		},function(e,css) {
			if(e) throw e;
			if(!(file in cache)) cache[file] = [];
			cache[file][stat.mtime] = css;
			that.emit("data",css);
		});
	});
	return that;
};

module.exports.type = "text/css";