Really stupid module hotloading for node. Use like:

```javascript
const hot = require("hot.js");
var one = new hot.load("./one.js");
console.log(one.module);
one.on("reload",function(module) {
	console.log(module);
});
```