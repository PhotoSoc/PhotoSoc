if(typeof process !== 'undefined') {
	var vm = require("vm");
} else {
	var vm = {
		createScript: function(str) {
			var out = new Function("",str+"return out;");
			out.runInNewContext = function(env) {
				var keys = Object.keys(env),
				vals = Object.values(env);

				var str = "return ("+this.toString()+"());";
				return (new Function(keys.join(","),str)).apply(null,vals);
			};
			return out;
		}
	};
}

var Tmpl = (function() {
function encode(str) {
	return str.toString()
	.replace(/&(?!\w+;)/g, '&#38;')
	.split('<').join('&#60;').split('>').join('&#62;')
	.split('"').join('&#34;').split("'").join('&#39;');
}

var jqotecache = {};

	var qreg = /^[^<]*(<[\w\W]+>)[^>]*$/;

	return {
		UNDEF_ERROR:'UndefinedTemplateError',
		COMP_ERROR:'TemplateCompilationError',
		EXEC_ERROR:'TemplateExecutionError',
		compile: function(tmpl,file) {
	var cache, str = '', arr = [];

	if (cache = jqotecache[tmpl]) return cache;

	arr = tmpl.replace(/\s*<!\[CDATA\[\s*|\s*\]\]>\s*|[\r\t]/g, '')
	.split('{{').join('}}\x1b')
	.split('}}');

	for(var m=0,l=arr.length; m < l; ++m) {
		var chunk = arr[m];
		if(chunk.charAt(0) === '\x1b') {
			if(chunk.charAt(1) === '=') {
				str += ';out+=(' +chunk.substr(2) + ');';
			} else if(chunk.charAt(1) === '!') {
				str += ';out+=encode((' + chunk.substr(2) + '));';
			} else {
				str += ';' + chunk.substr(1);
			}
		} else {
			str += "out+='" + chunk.replace(/\n/g,"\\n\\\n").replace(/(\\([^n\n])|["'])/g, '\\$1$2') + "'";
		}
	}
	str = ('var out="";'+str+';out;')
			.split("out+='';").join('')
			.split("out+='\\n\\\n").join("out+='")
				.split('var out="";out+=').join('var out=');
				
						
			
	var fn;
	try {
		fn = vm.createScript(str,file);
	} catch(e) {
		e.template = str;
		throw e;
	}
	return jqotecache[tmpl] = fn;
		}
};
}());

if(typeof module !== 'undefined')
	module.exports = Tmpl;