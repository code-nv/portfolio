app = {};
// let dynamicOffset = 0.05 * window.innerHeight;

app.anchorNav = function (linkClicked) {
	let anchor = $(linkClicked).attr("href");
	let scrollParent;
	window.innerWidth <= 1025 ? (scrollParent = "html") : (scrollParent = "main");

	$.smoothScroll({
		beforeScroll: function () {
			app.preScroll();
		},
		afterScroll: function () {
			app.postScroll();
		},
		scrollElement: $(scrollParent),
		scrollTarget: anchor,
	});
	return false;
};

app.preScroll = function () {
	$("main").css("scroll-snap-type", "none");
};

app.postScroll = function () {
	$("main").css("scroll-snap-type", "y mandatory");
};

app.mobileNavActive = function () {
	let scrolled = $(window).scrollTop();
	let windowHeight = 0.75 * window.innerHeight;
	app.checkCurrentMobile(scrolled, windowHeight);
	$(window).on("scroll resize", function () {
		scrolled = $(window).scrollTop();
		app.checkCurrentMobile(scrolled, windowHeight);
	});
};

app.checkCurrentMobile = function (scrolled, windowHeight) {
	$("li").removeClass("activeNav");
	let a = $(".aboutMe").offset();
	let b = $(".portfolio").offset();
	let c = $(".skills").offset();
	let d = $(".resume").offset();
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
};

app.showMobile = function () {
	$("nav").toggleClass("show");
	app.changeBackground('nav li.activeNav');
};

app.changeBackground = function (activeLink) {
	// if (window.innerWidth < 620 ){
	// 	const activeColor = $(activeLink).css('background-color');
	// 	$('nav').css('background', activeColor);
	// } else {null}
};

$(`button.toggle`).on("click", function () {
	$(".lightTheme, .darkTheme").toggleClass("darkTheme lightTheme");
	$("nav li").toggleClass("lightThemeAfter darkThemeAfter");
	$(".toggle i").toggleClass("hide show");

	if ($("body").hasClass("darkTheme") === true) {
		$(".firebaseSVG").attr("src", "./assets/firebaseDarkMode.svg");
		$(".responsiveSVG").attr("src", "./assets/responsiveDesignDarkMode.svg");
	} else {
		$(".firebaseSVG").attr("src", "./assets/firebase.svg");
		$(".responsiveSVG").attr("src", "./assets/responsiveDesign.svg");
	}
});

app.navActive = function () {
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

app.init = function () {
	app.navActive();

	$("aside a").on("click", function (e) {
		e.preventDefault();
		app.anchorNav(this);
	});

	$("main").on("scroll", function () {
		setTimeout(() => {
			app.navActive();
		}, 300);
	});

	$(window).on("resize", function () {
		app.anchorNav(".activeNav a");
		app.navActive();
	});

	$("h3").on("click", function () {
		$(".resume h3").removeClass("activeResume");
		$(this).addClass("activeResume");
	});

	$("button.hamburgerMenu").on("click", function () {
		app.showMobile();
	});

	$("nav li").on("click", function () {
		app.changeBackground(this);
	});
};

$(function () {
	app.init();
});
