app = {};

// scroll to appropriate section
app.anchorNav = function (linkClicked) {
	anchor = $(linkClicked).attr("href");
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

// due to styling, scroll parents need to be altered
app.mobileNavActive = function () {
	let scrolled = $(window).scrollTop();
	let windowHeight = 0.75 * window.innerHeight;
	app.checkCurrentMobile(scrolled, windowHeight);
	$(window).on("scroll resize", function () {
		scrolled = $(window).scrollTop();
		app.checkCurrentMobile(scrolled, windowHeight);
	});
};

// determine which nav should display active stylings on desktop
app.navActive = function () {
	if (window.innerWidth <= 1025) {
		app.mobileNavActive();
	} else {
		let scrolled = $("main").scrollTop();
		console.log(scrolled + 'end')
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

app.safariScrollFix = function () {
	window.innerWidth <= 1025 ? (scrollParent = "html") : (scrollParent = "main");
	$("main").scrollTop(0);
	$("li").removeClass("activeNav");
	$(".nav1").addClass("activeNav");
}

// determine which nav should display active stylings on mobile
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

// hamburger menu toggle
app.showMobile = function () {
	$("nav").toggleClass("show");
	app.changeBackground('nav li.activeNav');
};

// dark mode toggle
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

app.init = function () {
	app.safariScrollFix();
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

	$(".resume h3").on("click, focus", function () {
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

app.changeBackground = function (activeLink) {
	// if (window.innerWidth < 620 ){
	// 	const activeColor = $(activeLink).css('background-color');
	// 	$('nav').css('background', activeColor);
	// } else {null}
};


// // emailForm redirectconst $form = $('form');
// const $name = $('#name');
// const $email = $('#email');
// const $message = $('#message')
// const emailApp = {}
// $form.on('submit', (e) => {
//     e.preventDefault();
//     if ($name.val() === '' || $email.val() === '' || $message.val() === '') {
//         swal({
//             icon: 'error',
//             title: 'Sorry!',
//             text: 'Please leave your name, email and message so I can get back to you!'
//         })
//     } else {
//         emailApp.postEmail();
//         emailApp.clearFields();
//         swal({
//             icon: 'success',
//             buttons: false,
//             timer: 1850,
//             text: 'Thank you! I will respond as soon as possible!'
//         })
//     }
// })
// emailApp.clearFields = () => {
//     $name.val('');
//     $email.val('');
//     $message.val('');
// }
// emailApp.postEmail = () => {
//     $.ajax({
//         url: 'https://formspree.io/xjvevydo',
//         method: 'POST',
//         data: {
//             email: $email.val(),
//             name: $name.val(),
//             message: $message.val(),
//         },
//         dataType: 'json'
//     })
// }
// emailApp.init = () => {
//     emailApp.clearFields();
// }
// emailApp.init();