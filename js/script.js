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
			$('body > header')
			.css("background-image","url(/img/top.jpg) !important")
			.css("background-position-y","center !important");
			$('title').html("Warwick PhotoSoc"+("title" in args ? " &bull; "+args.title : ""));
			$('section[role="main"]').html(out);
		}).on("error",function(e,xhr){
			renderer("/"+xhr.status,xhr,"")
			.on("render",function(out,args){
				if("banner" in args) {
					$('body > header')
					.css("background-image","url("+args.banner+") !important")
					.css("background-position-y","25% !important");
				}
				$('title').html("Warwick PhotoSoc"+("title" in args ? " &bull; "+args.title : ""));
				$('section[role="main"]').html(out);

			}).on("error",function(e,xhr) {
				throw new Error("WE'RE DOOMED!");
			});
		});
	});
	$('a[rel="internal"]').each(function(idx,el){
		$('<img src="/img/load.gif" class="load">').hide().appendTo(el);
	}).click(function(ev){
		ev.preventDefault();
		History.pushState({page:this.href},null,this.href);
		$(this).children(".load").fadeIn(200).delay(300).fadeOut(200);
	});
});