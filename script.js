app = {};
// let dynamicOffset = 0.05 * window.innerHeight;

app.anchorNav = function(linkClicked) {
	let anchor = $(linkClicked).attr("href");
	console.log(anchor);
	let scrollParent;
	window.innerWidth <= 1025 ? (scrollParent = "html") : (scrollParent = "main");

	$.smoothScroll({
		beforeScroll: function() {
			app.preScroll();
		},
		afterScroll: function() {
			app.postScroll();
		},
		scrollElement: $(scrollParent),
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

app.mobileNavActive = function() {
	let a = $(".aboutMe").offset();
	let b = $(".portfolio").offset();
	let c = $(".skills").offset();
	let d = $(".resume").offset();
	let windowHeight = 0.75 * (window.innerHeight);
	$(window).on("scroll resize", function() {
		let scrolled = $(window).scrollTop();
		$("li").removeClass("activeNav");
		if (scrolled >= d.top + 0.5 * windowHeight) {
			$(".nav5").addClass("activeNav");
		} else if (scrolled >= c.top + windowHeight) {
			$(".nav4").addClass("activeNav");
		} else if (scrolled >= b.top + windowHeight) {
			$(".nav3").addClass("activeNav");
		} else if (scrolled >= a.top + windowHeight) {
			$(".nav2").addClass("activeNav");
		} else if (scrolled >= 0) {
			$(".nav1").addClass("activeNav");
		}
	});
};

$(`button.toggle`).on("click", function() {
	$(".lightTheme, .darkTheme").toggleClass("darkTheme lightTheme");
	$("body").toggleClass("lightThemeBody darkThemeBody");
	$("nav li").toggleClass("lightThemeAfter darkThemeAfter");
	$(".toggle i").toggleClass("hide show");

	if ($("body").hasClass("darkThemeBody") === true) {
		$(".firebaseSVG").attr("src", "./assets/firebaseDarkMode.svg");
		$(".responsiveSVG").attr("src", "./assets/responsiveDesignDarkMode.svg");
		$("p").css("color", "#AAAAAA");
		$("section li, h4").css("color", "#eee");
		$("h4 + p").removeAttr("style");
	} else {
		$(".firebaseSVG").attr("src", "./assets/firebase.svg");
		$(".responsiveSVG").attr("src", "./assets/responsiveDesign.svg");
		$("p, section li, h4").removeAttr("style");
	}
});

app.navActive = function() {
	if (window.innerWidth <= 1025) {
		app.mobileNavActive();
	} else {
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
	}
};

app.init = function() {
	app.navActive();

	$("aside a").on("click", function(e) {
		e.preventDefault();
		app.anchorNav(this);
	});

	$("main").on("scroll", function() {
		setTimeout(() => {
			app.navActive();
		}, 300);
	});

	$(window).on("resize", function() {
		app.anchorNav(".activeNav a");
		app.navActive();
	});

	$("h3").on("click", function() {
		$(".resume h3").removeClass("activeResume");
		$(this).addClass("activeResume");
	});
};

$(function() {
	app.init();
});
