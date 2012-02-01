
// usage: log('inside coolFunc', this, arguments);
// paulirish.com/2009/log-a-lightweight-wrapper-for-consolelog/
window.log = function(){
	log.history = log.history || [];   // store logs to an array for reference
	log.history.push(arguments);
	if(this.console) {
		arguments.callee = arguments.callee.caller;
		var newarr = [].slice.call(arguments);
		(typeof console.log === 'object' ? log.apply.call(console.log, console, newarr) : console.log.apply(console, newarr));
	}
};

// make it safe to use console.log always
(function(b){function c(){}for(var d="assert,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,timeStamp,profile,profileEnd,time,timeEnd,trace,warn".split(","),a;a=d.pop();){b[a]=b[a]||c}})((function(){try
{console.log();return window.console;}catch(err){return window.console={};}})());


// place any jQuery/helper plugins in here, instead of separate, slower script files.

function emitter(spec) {
	var events = {}, queue = {};
	return Object.create({
		on: function(ev,cb) {
			if(ev in events) {
				events.push(cb);
			} else {
				events[ev] = [cb];
			}
			if(ev in queue && queue[ev].length)
				cb.apply(this,queue[ev].shift());
			return this;
		},
		emit: function() {
			var args = Array.create(arguments),
			ev = args.shift();

			if(ev in queue) {
				queue[ev].push(args);
			} else {
				queue[ev] = [args];
			}

			if(ev in events) events[ev].each(function(cb,i) {
				cb.apply(this,queue[ev].shift());
			});
			return this;
		}
	},spec);
}
function renderer(path,args,layout) {
	var that = emitter(),
	opts = path + "?ajax",
	old = path;

	args = args || {};

	if(path === "base") return that.emit("render",layout,args);
	if(layout !== false) opts = {url:path,type:"options"};
	$.ajax(opts).done(function(data,status,xhr) {
		var comp, output = "";
		Object.merge(args,JSON.parse(xhr.getResponseHeader(
			"X-Template-Params"
		)));

		try {
			comp = Tmpl.compile(data);
		} catch(e) {
			that.emit("error",e,{
				path:path,
				status:501,
				statusText:"compilation error"
			});
			return;
		}
		try{
			output = comp.runInNewContext(
				Object.merge(Object.clone(args,true),{
					$: {
						layout: layout,
						extend: function(daddy) {
							path = daddy;
						},
						set: function(k,v){
							args[k]=v;
						},
						get: function(k,f) {
							return k in args ? args[k] : f || "";
						},
						exists: function(k) {
							return k in args;
						}
					},
				})
			);
		} catch(e) {
			that.emit("error",e,{
				path:path,
				status:501,
				statusText:"runtime error"
			});
			return;
		}
		if(old != path) {
			renderer(path,args,output).on("render",function(output) {
				that.emit("render",output,args);
			}).on("error",function(e){
				that.emit("error",e);
			});
		} else {
			that.emit("render",output);
		}
	}).fail(function(xhr,status,e){
		xhr.path = "/"+path.split("/").slice(3).join("/");
		that.emit("error",e,xhr);
	});
	
	return that;
}