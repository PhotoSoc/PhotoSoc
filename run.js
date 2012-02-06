const gusto = require("gusto"),
fs = require("fs");

var conf = JSON.parse(
	fs.readFileSync("conf/app.conf")
);

gusto.run(conf);