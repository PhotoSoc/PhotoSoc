/* Author:
Matt brennan
*/


$(document).ready(function(){
	if(!History.enabled) {
		return false;
	}

	History.Adapter.bind(window,'statechange',function(){ // Note: We are using statechange instead of popstate
		var State = History.getState(); // Note: We are using History.getState() instead of event.state
		var path = State.data.page;
		
		renderer(path,{},false).on("render",function(out,args){
			$('title').html("Warwick PhotoSoc"+("title" in args ? " &bull; "+args.title : ""));
			$('section[role="main"]').html(out);
		}).on("error",function(e){
			console.log(e);
		});
	});
	$('a').click(function(ev){
		ev.preventDefault();
		History.pushState({page:this.href},null,this.href);
	});
});