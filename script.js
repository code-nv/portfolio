app = {};
// let dynamicOffset = 0.05 * window.innerHeight;

app.anchorNav = function(linkClicked) {
	let anchor = $(linkClicked).attr("href");
	console.log(anchor);
	$.smoothScroll({
		beforeScroll: function() {
			app.preScroll();
		},
		afterScroll: function() {
			app.postScroll();
		},
		scrollElement: $("main"),
		scrollTarget: anchor
	});
	return false;
};

app.preScroll = function() {
	$("main").css("scroll-snap-type", "none");
};

app.postScroll = function() {
	$("main").css("scroll-snap-type", "y mandatory");
};

app.navActive = function() {
	let scrolled = $("main").scrollTop();
	$("li").removeClass("activeNav");
	if (scrolled > 3.5 * window.innerHeight) {
		$(".nav5").addClass("activeNav");
	} else if (scrolled > 2.5 * window.innerHeight) {
		$(".nav4").addClass("activeNav");
	} else if (scrolled > 1.5 * window.innerHeight) {
		$(".nav3").addClass("activeNav");
	} else if (scrolled > 0.5 * window.innerHeight) {
		$(".nav2").addClass("activeNav");
	} else if (scrolled >= 0) {
		$(".nav1").addClass("activeNav");
	}
};

app.init = function() {
	app.navActive();

	$("a").on("click", function(e) {
		e.preventDefault();
		app.anchorNav(this);
	});

	$("main").on("scroll", function() {
		setTimeout(() => {
			app.navActive();
		}, 300);
	});

	$('h3').on('click',function(){
		$('.resume h3').removeClass('activeResume');
		$(this).addClass('activeResume');
	})
};

$(function() {
	app.init();
});
