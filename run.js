const struct = require("struct"),
fs = require("fs");

var conf = JSON.parse(
	fs.readFileSync("conf/app.conf")
);

struct.run(conf);