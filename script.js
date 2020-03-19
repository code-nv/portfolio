app = {};
dynamicOffset = 0.05 * window.innerHeight;

app.anchorNav = function(linkClicked) {
	let anchor = $(linkClicked).attr("href");
	console.log(anchor);
	$.smoothScroll({
		beforeScroll: function() {
			app.preScroll(linkClicked);
		},
		afterScroll: function() {
			app.postScroll(linkClicked);
		},
		scrollElement: $("main"),
		scrollTarget: anchor
	});
	return false;
};

app.preScroll = function(linkClicked){
    $("main").css("scroll-snap-type", "none");
    $('a').parent().removeClass('activeNav')
    $(linkClicked).parent().addClass('activeNav');
}

app.postScroll = function(){
    $("main").css("scroll-snap-type", "y mandatory");
    
}

app.init = function() {
	$("a").on("click", function(e) {
		e.preventDefault();
		app.anchorNav(this);
	});
};

$(function() {
	app.init();
});
