/* ================================================
----------- Venedor ---------- */
(function ($) {
	"use strict";

	// Check for Mobile device
	var mobileDetected;
	if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
		mobileDetected = true;
	} else {
		mobileDetected = false;
	}

	// Check for placeholder support
	jQuery.support.placeholder = (function(){
	    var i = document.createElement('input');
	    return 'placeholder' in i;
	})();

	// if Placeholder is not supported call plugin
	if (!jQuery.support.placeholder && $.fn.placeholder) {
		$('input, textarea').placeholder();
	}
	

	// function check for window width
	function checkWindowWidth() {
		return $(window).width();
	}
	

/* =========================================
---- Create Responsive Menu
=========================================== */
	var menu = $('.menu').clone(true).removeClass('menu').addClass('responsive-nav'),
		container = $('#responsive-nav');
			
	container.append(menu);
	
	
	
	container.find('li, .col-2, .col-3, .col-4, .col-5').each(function () {

		var $this = $(this);
		
		
		if ($this.hasClass('mega-menu-container')) {
			$this.removeClass('mega-menu-container');
		}

		
		
		$this.has('ul, .megamenu').prepend('<span class="menu-button"></span>');
		
	});
	

	$('span.menu-button').on('click', function () {
		var $this= $(this);
		
		if (! $this.hasClass('active')) {
			$(this)
			.addClass('active')
			.siblings('ul, .mega-menu')
			.slideDown('800');
		}else {
			$(this)
			.removeClass('active')
			.siblings('ul, .mega-menu')
			.slideUp('800');
		}
	});
			

	$('#responsive-nav-button').on('click', function () {
		var $this = $(this);
		
		if( $this.hasClass('active')) {
			$('#responsive-nav').find('.responsive-nav').slideUp(300, function () {
				$this.removeClass('active');
			});
		
		}else {
			$('#responsive-nav').find('.responsive-nav').slideDown(300, function () {
				$this.addClass('active');
			});
		}
	});
	

	// Sub menu show/hide with hoverIntent plugin
	if ($.fn.hoverIntent) {
		$('ul.menu').hoverIntent(function() {
			$(this).children('ul, .mega-menu').fadeIn(100);

		}, function() {
			$(this).children('ul, .mega-menu').fadeOut(50);
		},
		'li');

	} else {

		$('ul.menu').find('li').mouseover(function() {
			$(this).children('ul, .mega-menu').css('display','block');

		}).mouseout(function() {
			$(this).children('ul, .mega-menu').css('display','none');
		});
	}


/* =========================================
---- Search bar input animation for Better Responsive
----- if not empty send form
=========================================== */
	var formInputOpen = true;
	$('#quick-search').on('click', function(e) {
		var $this = $(this),
			parentForm = $this.closest('.quick-search-form'),
			searchInput = parentForm.find('.form-control'),
			searchInputVal = $.trim(searchInput.val());
		
		if (searchInputVal === '') {
			var hiddenGroup = parentForm.find(':hidden.form-group'),
			formGroup = parentForm.find('.form-group ');

			if (formInputOpen) {
				hiddenGroup.animate({width:'show'}, 400, function() {
					formInputOpen = false;
				});
			} else {
				formGroup.animate({width:'hide'}, 400, function() {
					formInputOpen = true;
				});
			}

			e.preventDefault();
		}
		
	});


/* =========================================
---- Item hover animation
=========================================== */

function itemAnimationIn() {
	var $this = $(this),
		itemText = $this.find('.icon-cart-text'),
		itemWidth = $this.width(),
		ratingAmount = $this.find('.ratings-amount'),
		moreActionBtns = $this.find('.item-action-inner');


		if (itemWidth < 220) {
			itemText.animate({width: 'hide'},100, function() {
				$(this).closest('.item-add-btn').addClass('icon-cart');
			});
		}
		ratingAmount.animate({width : 'show'}, 300);
		moreActionBtns.css({'visibility': 'visible', 'overflow': 'hidden'}).animate({width:90}, 300);
}

function itemAnimationOut() {
	var $this = $(this),
		itemText = $this.find('.icon-cart-text'),
		itemWidth = $this.width(),
		ratingAmount = $this.find('.ratings-amount'),
		moreActionBtns = $this.find('.item-action-inner');


		if (itemWidth < 220) {
			// be careful about this duration
			// make sure that it is the same as below's
			itemText.animate({width: 'show'},300).closest('.item-add-btn').removeClass('icon-cart');
		}

		ratingAmount.animate({width : 'hide'}, 300);
		moreActionBtns.animate({width:0}, 300).css({'visibility': 'hidden', 'overflow': 'hidden'});
}
	
	// Don't forget to use hoverIntent plugin for better ainmation!
	if ($.fn.hoverIntent) {
		$('.item').hoverIntent(itemAnimationIn, itemAnimationOut);
	} else {
		$('.item').on('mouseover', itemAnimationIn).on('mouseleave', itemAnimationOut);
	
	}


	
/* =========================================
---- Sticky Menu
=========================================== */
	
	function stickyMenu() {
		var windowTop = $(window).scrollTop(),
        	windowWidth = checkWindowWidth(),
            header = $('#header'),
            navContainer = $('#main-nav-container'),
            navDist = navContainer.offset().top,
            headerHeight = header.height();
           	
        if (windowTop >= navDist && windowTop > headerHeight&& windowWidth > 768) {
            navContainer.addClass('fixed');
        } else {
        	navContainer.removeClass('fixed');
        }
	}

	$(window).on('scroll resize', stickyMenu);


/* =========================================
---- Category-item filter color box background
=========================================== */
	$('.filter-color-box').each(function() {
		var $this = $(this),
			bgColor = $this.data('bgcolor');

			$this.css('background-color', bgColor);
	});



/* =========================================
---- Twitter Feed Plugin 
=========================================== */
    if ($.fn.tweet) {
        $('.twitter_feed').tweet({
            modpath: './js/twitter/',
            avatar_size: '',
			count: 4,
			query: "themeforest", // write feed query here
			loading_text: "searching twitter...",
            join_text: "",
            template: "{join}{text}{time}"
            /* etc... */
        });
        
        $('.twitter_feed.flexslider').flexslider({
			animation: "slide",
			selector: ".tweet_list > li",
			controlNav: false,// false
			prevText: '',
			nextText: '',
			animationLoop: true,
			smoothHeight: true,
			slideshowSpeed: 5000
		});
    }
 

/* =========================================
----  FitVids.js / responsive video
=========================================== */
	/* Check for fitVids plugin */
	if ($.fn.fitVids) {
		$('.video-container').fitVids();
	}


/* =========================================
----  Category Price Slider
=========================================== */
	if ($.fn.noUiSlider) {
		$('#price-range').noUiSlider({
			range: [0, 999],
			start: [0, 999],
			handles: 2,
			connect: true,
			step: 1,
			serialization: {
				to: [ $('#price-range-low'), $('#price-range-high') ],
				resolution: 1
			}
		});
	}


/* =========================================
---- Item/ Product rating
=========================================== */
	$.each($('.ratings-result'), function () {
		var $this = $(this),
			parentWidth = $this.closest('.ratings').width(),
			rating = $(this).data('result'),
			newWidth = (parentWidth / 100) * rating;
			
		$(this).css('width', newWidth);
	});
	
	
	
/* =========================================
---- Floated left-right tabs menu height with Bootstrap tab plugin custom event
=========================================== */
	
	function tabMenuHeight( containerMinHeight ) {
		var container = $('.tab-container'),
			newHeight = container.find('.tab-pane.active').outerHeight(),
			navContainer = container.find('.nav-tabs');
			
			
		if (newHeight > containerMinHeight) {
			navContainer.css('height', newHeight);
			navContainer.find('li:last-child').find('a').css('border-bottom-color', '#dcdcdc');
		} else {
			navContainer.css('height', containerMinHeight);
			navContainer.find('li:last-child').find('a').css('border-bottom-color', 'transparent');
		}
	}	
	
	$(window).on('resize load', function() {
		var winWidth = checkWindowWidth();
		
		if(  winWidth > 767 ) {
		
			var containerMinHeight = $('.tab-container').find('ul.nav-tabs').outerHeight();
			
			tabMenuHeight(containerMinHeight);
			
			$('.tab-container').find('ul.nav-tabs').find('a').on('shown.bs.tab', function (e) {
				tabMenuHeight(containerMinHeight);
			});
			
		}
		
	});


/* =========================================
---- Collapse/Accordion toggle arrows
=========================================== */
	
	// Blog Sidebar Widget Collapse with plugin's custom events
	$('.panel-title').on('click', function () {
		var $this = $(this),
			targetAcc = $this.find('a').attr('href');
		
		$(targetAcc).on('shown.bs.collapse', function() {
			$this.find('.icon-box').html('&plus;');
		}).on('hidden.bs.collapse', function() {
			$this.find('.icon-box').html('&minus;');
		});
	});
	
	
	// Checkout Collapse//Accordion
	$('.accordion-btn').on('click', function() {
		var $this = $(this),
			targetAcc = $this.data('target');
		
		$(targetAcc).on('shown.bs.collapse', function() {
			$this.addClass('opened');
		}).on('hidden.bs.collapse', function() {
			if ($this.hasClass('opened')) {
				$this.removeClass('opened');
			}
			
		});
		
	});
	
/* =========================================
---- Scroll Top Button
=========================================== */
    $(window).on('scroll', function () {
        var windowTop = $(window).scrollTop(),
            scrollTop = $('#scroll-top');

        if (windowTop >= 300) {
            scrollTop.addClass('fixed');
        } else {
            scrollTop.removeClass('fixed');
        }
    });


    $('#scroll-top').on('click', function (e) {
        $('html, body').animate({
            'scrollTop': 0
        }, 1200);
        e.preventDefault();
    });


/* =============================================
----- check for element 
------- existing && plugin
=========================================== */
function checkSupport(elemname, pluginname) {
	return (elemname.length && pluginname) ? true : false;
}

/* =========================================
----  Brand Slider
=========================================== */
		
	var  brandSlider = $('div.brand-slider.owl-carousel');
	if (checkSupport(brandSlider, $.fn.owlCarousel)) {
        brandSlider.owlCarousel({
            items: 6,
            itemsDesktop : [1199,5],
            itemsDesktopSmall: [979,4],
            itemsTablet: [768,2],
            itemsMobile : [479,1],
            slideSpeed: 600,
            autoPlay: 10000,
            stopOnHover: true,
            navigation: false,
            pagination: false,
            responsive: true,
            autoHeight : true
        }).data('navigationBtns', ['#brand-slider-prev', '#brand-slider-next']);
    }
	
/* =========================================
----  Home Page Onsale - hot-items carousel
=========================================== */

	var  hotItems = $('.hot-items-slider.owl-carousel');
	if (checkSupport(hotItems, $.fn.owlCarousel)) {
        hotItems.owlCarousel({
            items: 3,
            itemsDesktop : [1199,3],
            itemsDesktopSmall: [979,2],
            itemsTablet: [768,2],
            itemsMobile : [479,1],
            slideSpeed: 400,
            autoPlay: 8000,
            stopOnHover: true,
            navigation: false,
            pagination: false,
            responsive: true,
            mouseDrag: false,
            autoHeight : true
        }).data('navigationBtns', ['#hot-items-slider-prev', '#hot-items-slider-next']);
    }


/* =========================================
----  Also purchased slider - product.html
=========================================== */

	var  purchasedItems = $('.purchased-items-slider.owl-carousel');
	if (checkSupport(purchasedItems, $.fn.owlCarousel)) {
        purchasedItems.owlCarousel({
            items: 4,
            itemsDesktop : [1199,4],
            itemsDesktopSmall: [979,3],
            itemsTablet: [768,2],
            itemsMobile : [479,1],
            slideSpeed: 400,
            autoPlay: 8000,
            stopOnHover: true,
            navigation: false,
            pagination: false,
            responsive: true,
            mouseDrag: false,
            autoHeight : true
        }).data('navigationBtns', ['#purchased-items-slider-prev', '#purchased-items-slider-next']);
    }


/* =========================================
----  Similiar Items slider - cart.html
=========================================== */

	var  similiarItems = $('.similiar-items-slider.owl-carousel');
	if (checkSupport(similiarItems, $.fn.owlCarousel)) {
        similiarItems.owlCarousel({
            items: 4,
            itemsDesktop : [1199,4],
            itemsDesktopSmall: [979,3],
            itemsTablet: [768,2],
            itemsMobile : [479,1],
            slideSpeed: 400,
            autoPlay: 8000,
            stopOnHover: true,
            navigation: false,
            pagination: false,
            responsive: true,
            mouseDrag: false,
            autoHeight : true
        }).data('navigationBtns', ['#similiar-items-slider-prev', '#similiar-items-slider-next']);
    }


/* =========================================
----  Related portfolio - single-portfolio.html
=========================================== */

	var  relatedPortfolio = $('.related-portfolio.owl-carousel');
	if (checkSupport(relatedPortfolio, $.fn.owlCarousel)) {
        relatedPortfolio.owlCarousel({
            items: 4,
            itemsDesktop : [1199,4],
            itemsDesktopSmall: [979,3],
            itemsTablet: [768,2],
            itemsMobile : [479,1],
            slideSpeed: 400,
            autoPlay: 8000,
            stopOnHover: true,
            navigation: false,
            pagination: false,
            responsive: true,
            mouseDrag: false,
            autoHeight : true
        }).data('navigationBtns', ['#related-slider-prev', '#related-slider-next']);
    }

/* =========================================
----  Register OwlCarousel custom navigation buttons 
=========================================== */
  
    if (checkSupport($('.owl-carousel'), $.fn.owlCarousel)) {
	    $('.owl-carousel').each(function() {
	    	var $this = $(this),
	    		owlCarousel = $this.data('owlCarousel'),
	    		owlBtns = $this.data('navigationBtns'),
	    		prevBtn, nextBtn;

    		if (typeof owlCarousel === 'undefined' || typeof owlBtns === 'undefined') {
    			return;
    		}

    		for(var key in owlBtns) {
    			if (owlBtns[key].indexOf('next') == -1) {
    				prevBtn = $(owlBtns[key]);
    			}else {
    				nextBtn = $(owlBtns[key]);
    			}
    		}

    		prevBtn.on('click touchstart', function(e) {
	            owlCarousel.prev();
	            e.preventDefault();
    		});

    		nextBtn.on('click touchstart', function(e) {
	            owlCarousel.next();
	            e.preventDefault();
    		});
        });
	}



/* =========================================
----  Category Banner Slider
=========================================== */
	$('.category-image-slider.flexslider').flexslider({
		animation: "slide",
		animationLoop: true,
		prevText: '',
		nextText: '',
		controlNav: false,
		smoothHeight: true,
		slideshowSpeed: 6500
	});	

/* =========================================
----  Sidebar Latest Posts Slider
=========================================== */
	$('.latest-posts-slider.flexslider').flexslider({
		animation: "slide",
		selector: ".latest-posts-list > li",
		prevText: '',
		nextText: '',
		controlNav: false, // false
		smoothHeight: true,
		slideshowSpeed: 6000
	});
	
/* =========================================
----  Sidebar Latest Posts Slider
=========================================== */
	$('.recent-posts-slider.flexslider').flexslider({
		animation: "slide",
		selector: ".recent-posts-list > li",
		prevText: '',
		nextText: '',
		controlNav: false,// false
		smoothHeight: true,
		slideshowSpeed: 5500
	});

/* =========================================
----  Sidebar Testimonials Slider
=========================================== */
	$('.testimonials-slider.flexslider').flexslider({
		animation: "fade",
		selector: ".testimonials-list > li",
		prevText: '',
		nextText: '',
		controlNav: false, // false
		slideshowSpeed: 4800
	});


/* =========================================
----  Sidebar Featured Product Slider
=========================================== */
	$('.featured-slider.flexslider').flexslider({
		animation: "slide",
		selector: ".featured-list > li",
		controlNav: false,// false
		prevText: '',
		nextText: '',
		smoothHeight: true,
		slideshowSpeed: 7000
	});
	

/* =========================================
----  Sidebar Related Product Slider
=========================================== */
	$('.related-slider.flexslider').flexslider({
		animation: "slide",
		selector: ".related-list > li",
		controlNav: false,// false
		prevText: '',
		nextText: '',
		smoothHeight: true,
		slideshowSpeed: 7000
	});
		

/* =========================================
----  Sidebar Banner Slider
=========================================== */
	$('.banner-slider.flexslider').flexslider({
		animation: "fade",
		selector: ".banner-slider-list > li",
		directionNav: false, // false next/prev
		controlNav: true,
		prevText: '',
		nextText: '',
		slideshowSpeed: 6500
	});

	
/* =============================================
----- About us section skill bars
=========================================== */
	
	if ($.fn.appear) {

		$('.progress-animate').appear();
		$('.progress-animate').on('appear', function () {
			var $this = $(this),
				progressVal = $(this).data('width'),
				progressText = $this.find('.progress-text');

			$this.css({ 'width' : progressVal + '%'}, 400);
			progressText.fadeIn(500);
		});
		

	} else {

		$('.progress-animate').each(function () {
			var $this = $(this),
				progressVal = $(this).data('width'),
				progressText = $this.find('.progress-text');

			$this.css({ 'width' : progressVal + '%'}, 400);
			progressText.fadeIn(500);
		});
	}


	// Testimonials Slider -  About Us Page
	$('.about-us-testimonials.flexslider').flexslider({
		animation: "slide",
		controlNav: true,// false
		directionNav: false,
		animationLoop: true,
		smoothHeight: true,
		slideshowSpeed: 6000
	});
	
	
/* =========================================
---- Portfolio  Filter / Isotope Plugin
=========================================== */
	
	var $container = $('.portfolio-item-container');
	
	function CalcItemWidth() {
		
		var widthPort = $container.outerWidth(),
			maxCol= parseInt($container.data('max-col')),
			itemCol;
		
		if (widthPort > 1140) {
			itemCol = (maxCol >= 4) ? 4 : maxCol;
		} else if (widthPort > 940) {
			itemCol = (maxCol >= 4) ? 4 : maxCol;
		} else if (widthPort > 750) {
			itemCol = (maxCol >= 3) ? 3 : maxCol;
		} else if (widthPort > 520) {
			itemCol = (maxCol >= 2) ? 2 : maxCol;
		} else {
			itemCol = 1;
		}

		$('.portfolio-item').css('width', Math.floor((widthPort) / itemCol) - 1);

	}
	
	/*fix width */
	CalcItemWidth();

	$(window).on('resize orientationchange', CalcItemWidth);
	
	/* check for isotope - includes imagesloaded plugin */
	if($.fn.isotope) {
		$container.imagesLoaded(function() {
			// initialize isotope
			
			$container.isotope({
				itemSelector : '.portfolio-item',
				layoutMode : 'fitRows',
				animationEngine: 'best-available'
				
			});
		
		
			// filter items when filter link is clicked
			$('#portfolio-filter').find('a').on('click', function(e) {
				var selector = $(this).attr('data-filter');
				$('#portfolio-filter').find('.active').removeClass('active');
				
				$container.isotope({ 
					filter: selector 
				});
				
				$(this).addClass('active');
				e.preventDefault();
			});
			
		});

	}


/* =========================================
---- Portfolio prettPhoto Plugin
=========================================== */
	if ($.fn.prettyPhoto) {

		$("a[data-rel^='prettyPhoto']").prettyPhoto({
			hook: 'data-rel',
            animation_speed: 'fast',
            slideshow: 6000,
            autoplay_slideshow: true,
            show_title: false,
            deeplinking: false,
            social_tools: '',
            overlay_gallery: true,
			theme: 'light_square'
		});
	}

/* =========================================
---- Flickr feed plugin - Sidebar 
=========================================== */
	if ($.fn.jflickrfeed) {
		$('ul.flickr-feed-list').jflickrfeed({
			limit: 6,
			qstrings: {
				id: '52617155@N08'
			},
			itemTemplate: '<li>' + '<a data-rel="prettyPhoto[gallery-flickr]" href="{{image}}" title="{{title}}">' + '<img src="{{image_s}}" alt="{{title}}" />' + '</a>' + '</li>'
		}, function() {
			if ($.fn.prettyPhoto) {
				/* update prettyphoto plugin for feeds */
				$("a[data-rel^='prettyPhoto']").prettyPhoto({
					hook: 'data-rel',
	                animation_speed: 'fast',
	                slideshow: 6000,
	                autoplay_slideshow: true,
	                show_title: false,
	                deeplinking: false,
	                social_tools: '',
	                overlay_gallery: true,
					theme: 'light_square'
				});
			}
		});
		
	}

/*----------------------------------------------------*/
/* Category filter sidebar custom scrollbar with jscrollpane plugin */
/*----------------------------------------------------*/

	var catFilter = $('.category-filter-list.jscrollpane'),
		checkForScrollbar = function(a) {
			var catHeight = a.height();
			if ( catHeight > 300 ) {
				a.css('height', 300);
				a.jScrollPane({
					showArrows: false
				});
			}
		};
	
	// on document ready call plugin if section height > 300	
	$.each(catFilter, function () {
		var $this = $(this);
		checkForScrollbar($this);
		
	});
	
	// Call plugin after collapse activated
	$('#category-filter').find('.collapse').on('shown.bs.collapse', function() {
		var cFilter = $(this).find('.category-filter-list.jscrollpane');
		checkForScrollbar(cFilter);
	});
	
	
	// on window resize fix scroll bar position
	$(window).on('resize', function () {
		$('.category-filter-list.jscrollpane').each(function () {
			var apiJsc = $(this).data('jsp'),
			resTime;
			
			if (!resTime) {
				resTime = setTimeout(function(){
					if (apiJsc) {
						apiJsc.reinitialise();
					}
					resTime = null;
				},50);
			}
		});
	});


/*----------------------------------------------------*/
//* Parallax Background -- About-us page */
/*----------------------------------------------------*/
	if (!mobileDetected && $.fn.parallax) {
		$('#page-header').addClass('parallax').parallax("50%", 0.3);
		$('#testimonials-section').addClass('parallax').parallax("50%", 0.3);
	}


}(jQuery));


/*----------------------------------------------------*/
//* Google javascript api v3  -- map */
/*----------------------------------------------------*/
(function () {
    "use strict";

    function initialize() {
        /* change your with your coordinates -17.8307923,31.0448754 */
        var myLatLng = new google.maps.LatLng(-17.8307923, 31.0448754), // Your coordinates
            mappy = {
                center: myLatLng,
                zoom: 15,
                scrollwheel: false,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                styles: [{
                    "elementType": "geometry",
                    "stylers": [{
                        "hue": "#000"
                    }, {
                        "weight": 1
                    }, {
                        "saturation": -200
                    }, {
                        "gamma": 0.70
                    }, {
                        "visibility": "on"
                    }]
                }]
            };
        var map = new google.maps.Map(document.getElementById("map"), mappy),
        	newpin = 'images/pin.png';

        new google.maps.Marker({
            position: myLatLng,
            map: map,
            icon: newpin,
            animation: google.maps.Animation.DROP,
            title: 'Venedor' // Title for marker
        });
    }

    if (document.getElementById("map")) {
        google.maps.event.addDomListener(window, 'load', initialize);
    }

}());



/*!
 * jQuery Cookie Plugin v1.4.0
 * https://github.com/carhartl/jquery-cookie
 *
 * Copyright 2013 Klaus Hartl
 * Released under the MIT license
 */
(function (factory) {
        if (typeof define === 'function' && define.amd) {
                // AMD. Register as anonymous module.
                define(['jquery'], factory);
        } else {
                // Browser globals.
                factory(jQuery);
        }
}(function ($) {

        var pluses = /\+/g;

        function encode(s) {
                return config.raw ? s : encodeURIComponent(s);
        }

        function decode(s) {
                return config.raw ? s : decodeURIComponent(s);
        }

        function stringifyCookieValue(value) {
                return encode(config.json ? JSON.stringify(value) : String(value));
        }

        function parseCookieValue(s) {
                if (s.indexOf('"') === 0) {
                        // This is a quoted cookie as according to RFC2068, unescape...
                        s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\');
                }

                try {
                        // Replace server-side written pluses with spaces.
                        // If we can't decode the cookie, ignore it, it's unusable.
                        // If we can't parse the cookie, ignore it, it's unusable.
                        s = decodeURIComponent(s.replace(pluses, ' '));
                        return config.json ? JSON.parse(s) : s;
                } catch(e) {}
        }

        function read(s, converter) {
                var value = config.raw ? s : parseCookieValue(s);
                return $.isFunction(converter) ? converter(value) : value;
        }

        var config = $.cookie = function (key, value, options) {

                // Write

                if (value !== undefined && !$.isFunction(value)) {
                        options = $.extend({}, config.defaults, options);

                        if (typeof options.expires === 'number') {
                                var days = options.expires, t = options.expires = new Date();
                                t.setTime(+t + days * 864e+5);
                        }

                        return (document.cookie = [
                                encode(key), '=', stringifyCookieValue(value),
                                options.expires ? '; expires=' + options.expires.toUTCString() : '', // use expires attribute, max-age is not supported by IE
                                options.path    ? '; path=' + options.path : '',
                                options.domain  ? '; domain=' + options.domain : '',
                                options.secure  ? '; secure' : ''
                        ].join(''));
                }

                // Read

                var result = key ? undefined : {};

                // To prevent the for loop in the first place assign an empty array
                // in case there are no cookies at all. Also prevents odd result when
                // calling $.cookie().
                var cookies = document.cookie ? document.cookie.split('; ') : [];

                for (var i = 0, l = cookies.length; i < l; i++) {
                        var parts = cookies[i].split('=');
                        var name = decode(parts.shift());
                        var cookie = parts.join('=');

                        if (key && key === name) {
                                // If second argument (value) is a function it's a converter...
                                result = read(cookie, value);
                                break;
                        }

                        // Prevent storing a cookie that we couldn't decode.
                        if (!key && (cookie = read(cookie)) !== undefined) {
                                result[name] = cookie;
                        }
                }

                return result;
        };

        config.defaults = {};

        $.removeCookie = function (key, options) {
                if ($.cookie(key) === undefined) {
                        return false;
                }

                // Must not alter options, thus extending a fresh object...
                $.cookie(key, '', $.extend({}, options, { expires: -1 }));
                return !$.cookie(key);
        };

}));

/* =========================================
---- Template Options Panel 
=========================================== */
(function ($){

	var panelContainer = $('div#option-panel'),
		panelContainerWidth = panelContainer.outerWidth(),
		positionLeft = panelContainer.offset().left,
		panelOpen = positionLeft < 0 ? false : true;


	$('#option-panel-btn').on('click', function() {
		if (! panelOpen) {

			panelContainer.animate({ left : 0 }, 400, function() {
				panelOpen = true;
			});
			$(this).removeClass('closed').addClass('opened');
		}

	});

	$('#option-close').on('click', function (e) {
		if (panelOpen) {

			panelContainer.animate({ left : -panelContainerWidth  }, 400, function() {
				panelOpen = false;
			});
			
			$('#option-panel-btn').removeClass('opened').addClass('closed');
		}
		e.preventDefault();
	});
	

	
	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		var panelTitle = $(e.target).data('panel-title'); 
		$('#option-panel-title').find('span').text(panelTitle);
	});
	

	var customStylesheet = $('#custom-style');

	$('#option-panel-reset').on('click', function (e) {
		if (typeof $.cookie('layoutMode') !== 'undefined') $.removeCookie('layoutMode');
		if (typeof $.cookie('bgPattern') !== 'undefined') $.removeCookie('bgPattern');
		if (typeof $.cookie('bgColor') !== 'undefined') $.removeCookie('bgColor');
		if (typeof $.cookie('firstColor') !== 'undefined') $.removeCookie('firstColor');
		if (typeof $.cookie('firstColor2') !== 'undefined') $.removeCookie('firstColor2');
		if (typeof $.cookie('secondColor') !== 'undefined') $.removeCookie('secondColor');
		if (typeof $.cookie('thirdColor') !== 'undefined') $.removeCookie('thirdColor');
		if (typeof $.cookie('fourthColor') !== 'undefined') $.removeCookie('fourthColor');
		if (typeof $.cookie('bgColor') !== 'undefined') $.removeCookie('bgColor');
		if (typeof $.cookie('first-font') !== 'undefined') $.removeCookie('first-font');
		if (typeof $.cookie('second-font') !== 'undefined') $.removeCookie('second-font');
		if (typeof $.cookie('third-font') !== 'undefined') $.removeCookie('third-font');
		if (typeof $.cookie('fourth-font') !== 'undefined') $.removeCookie('fourth-font');
		location.reload();
		e.preventDefault();
		
	});


	// Check for status
	if (typeof $.cookie('layoutMode') !== 'undefined' && !$('#wrapper').hasClass('boxed')) {
		$('#wrapper').addClass('boxed');
	}
	
	if (typeof $.cookie('bgPattern') !== 'undefined') {
		$('body').css('background',  'url('+$.cookie('bgPattern')+') repeat');
	}
	
	if (typeof $.cookie('bgColor') !== 'undefined') {
		$('body').css('background', $.cookie('bgColor') );
	}
	
	if (typeof $.cookie('firstColor') !== 'undefined' || typeof $.cookie('firstColor2') !== 'undefined' || typeof $.cookie('secondColor') !== 'undefined' || typeof $.cookie('thirdColor') !== 'undefined' || typeof $.cookie('fourthColor') !== 'undefined') {
		var style;
		if (typeof $.cookie('firstColor') !== 'undefined') {
			style += $.cookie('firstColor');
		}

		if (typeof $.cookie('firstColor2') !== 'undefined') {
			style += $.cookie('firstColor2');
		}

		if (typeof $.cookie('secondColor') !== 'undefined') {
			style += $.cookie('secondColor');
		}

		if (typeof $.cookie('thirdColor') !== 'undefined') {
			style += $.cookie('thirdColor');
		}

		if (typeof $.cookie('fourthColor') !== 'undefined') {
			style += $.cookie('fourthColor');
		}

		customStylesheet.text(style)
	}


	if ($.fn.colpick) {
		
		$('#panel-color-picker').colpick({
			flat: true,
			layout: 'hex',
			submit: 0,
			onChange: function(hsb,hex,rgb,fromSetColor) {
				
					$('body').css('background', '#'+hex);

			}
		}).mouseup(function() {
			if($.cookie('bgPattern')) $.removeCookie('bgPattern');
			
			if ($('#wrapper').hasClass('boxed') && $.cookie('layoutMode', 'boxed')) {
				var bgColor = $('body').css('background-color');
				$.cookie('bgColor', bgColor);
			} else {
				alert('Please change layout mode to the boxed.');
			}
		});



		$('.color-box.first-color').colpick({
			colorScheme:'dark',
			layout:'rgbhex',
			color: '7bae23',
			onSubmit:function(hsb,hex,rgb,el) {
			
var style = 'a, #header-top #top-links li > a:hover, #header-top .header-link a, #inner-header .header-box a:hover,#inner-header .header-box i,#main-nav-container #main-nav .menu li:hover > a, #main-nav-container #main-nav .menu li > ul li > ul li:hover > a,#main-nav-container #main-nav .menu li .mega-menu .mega-menu-list li,#main-nav-container #main-nav .menu li .mega-menu .mega-menu-title:hover,#main-nav-container #main-nav .menu li .mega-menu .mega-menu-list li:hover > a,#main-nav-container #main-nav #responsive-nav ul li a:hover, #main-nav-container #main-nav #responsive-nav ul li .mega-menu .mega-menu-list li,#main-nav-container #main-nav #responsive-nav ul li .mega-menu .mega-menu-title:hover,#main-nav-container #main-nav #responsive-nav ul li .mega-menu .mega-menu-list li:hover > a,.menu-button:hover, .dropdown-cart .dropdown-cart-product-list .edit-item:hover,.dropdown-cart .dropdown-cart-product-list .delete-item:hover, .dropdown-cart-total li,.dropdown-cart-total li  .sub-price, .item-name a:hover, #category-breadcrumb .breadcrumb a:hover,.input-group-addon, .portfolio-item > figure > figcaption > .like-button:hover,.portfolio-item h2 a:hover, .portfolio-item p a:hover, .portfolio-meta-list li a:hover,.featured-slider .featured-product h5 a:hover,.related-slider .related-product h5 a:hover,.category-filter-list li a:hover, .article h2 a:hover,.article .article-content-container a:hover,.sidebar .widget .panel a:hover, .sidebar .widget .tags-list li a:hover,.rate-this:hover, .no-content-comment h2, .services-box h3 a:hover { color: #'+hex+';}';
var style2 = '#responsive-nav-button:hover #responsive-nav-button-icon,#responsive-nav-button.active  #responsive-nav-button-icon, .tab-style-1 li a:hover,.tab-style-1 li.active a, .new-rect, .item-add-btn:hover, .item-add-btn:focus, .item-add-btn:active, .item-add-btn.active,.banner-slider .flex-control-paging li a.flex-active, #breadcrumb-container, .input-desc-box .icon-box,.portfolio-item > figure > figcaption > .zoom-button, .portfolio-item > figure > figcaption > .link-button,.category-image-slider-container .new-rect, .select-dropdown:hover .dropdown-toggle, .select-dropdown .dropdown-menu > li > a:hover, .noUi-connect, .noUi-handle, .pagination > li > a:hover,.pagination > li > span:hover, .pagination > li > a:focus,.pagination > li > span:focus,.icon-button, .custom-quantity-input .quantity-btn:hover, .close-button:hover, #scroll-top,.btn-custom,.btn-custom-2:hover,.btn-custom-2:focus,.btn-custom-2:active,.btn-custom-2.active,.open .dropdown-toggle.btn-custom-2,.btn-custom-3:hover, .btn-custom-3:focus, .btn-custom-3:active,.btn-custom-3.active,.open .dropdown-toggle.btn-custom-3,#option-panel .colorbox-list li .first-color span, .progress-bar-custom, .small-bottom-border,.sequence-pagination li.current { background-color : #'+hex+';}';

style2 += '.tab-style-1 li a:hover, .tab-style-1 li.active a, #main-nav-container #main-nav ul li .mega-menu,.portfolio-item > figure > figcaption > .zoom-button, .portfolio-item > figure > figcaption > .link-button, .select-dropdown:hover .dropdown-toggle, .pagination > li > a:hover,.pagination > li > span:hover, .pagination > li > a:focus, .pagination > li > span:focus,.sidebar .widget .panel a:hover .icon-box, .icon-button, .custom-quantity-input .quantity-btn:hover,.close-button:hover, #scroll-top, .item-add-btn:hover, .item-add-btn:focus, .btn-custom-2:hover,.btn-custom-2:focus, .btn-custom-3:hover,.btn-custom-3:focus { border-color : #'+hex+';}';
style += '#header-top, #main-nav-container #main-nav .menu li ul, #main-nav-container #main-nav .menu li ul li ul,#main-nav-container #main-nav .menu li .mega-menu { border-top-color : #'+hex+';}';
style2 += '.title { border-left-color : #'+hex+';}';
						
	var customText = customStylesheet.text();	
	customStylesheet.text(customText+' '+style + ' '+ style2);
	$.cookie('firstColor', style);
	$.cookie('firstColor2', style2);
	$(el).find('span').css('background-color', '#'+hex);
	$(el).colpickHide();
			}
		});

		
		$('.color-box.second-color').colpick({
			colorScheme:'dark',
			layout:'rgbhex',
			color: '84bb26',
			onSubmit:function(hsb,hex,rgb,el) {
			
var style = 'a:hover,#footer a:hover,#footer .links li    { color: #'+hex+';}';
style += '.carousel-btn:hover, #option-panel .colorbox-list li .second-color span,.flexnavdefault .flex-direction-nav a:hover,.flexslider:hover .flex-next:hover,.flexslider:hover .flex-prev:hover,.btn-custom:hover,.btn-custom:focus,.btn-custom:active,.btn-custom.active,.open .dropdown-toggle.btn-custom,#scroll-top:hover,#footer #twitterfeed-container, .accordion-btn:hover,.accordion-btn.active,.icon-button:hover,.icon-button:focus,.icon-button:active,.icon-button.active,.product-extra .icon-button:hover, .elastislide-wrapper nav span:hover, .sidebarslider .flex-direction-nav a:hover, #header .dropdown-menu > li > a:hover, #header .dropdown-menu > li > a:focus, .custom-checkbox  input[type="checkbox"]:checked + .checbox-container,#portfolio-filter li a:hover,#portfolio-filter li a.active,.category-toolbar .icon-button:hover,.category-toolbar .icon-button:focus,.category-toolbar .icon-button:active,.category-toolbar .icon-button.active, .portfolio-btn:hover, .sequence-next:hover, .sequence-prev:hover  { background-color : #'+hex+';}';
style += '.carousel-btn:hover, .flexnavdefault .flex-direction-nav a:hover,.flexslider:hover .flex-next:hover,.flexslider:hover .flex-prev:hover,#scroll-top:hover,.accordion-btn:hover,.accordion-btn.active,.icon-button:hover,.icon-button:focus,.icon-button:active,.icon-button.active,.elastislide-wrapper nav span:hover, .sidebarslider .flex-direction-nav a:hover,.custom-checkbox  input[type="checkbox"]:checked + .checbox-container,.category-toolbar .icon-button:hover,.category-toolbar .icon-button:focus,.category-toolbar .icon-button:active,.category-toolbar .icon-button.active, .portfolio-btn:hover,.sequence-next:hover, .sequence-prev:hover { border-color : #'+hex+';}';
style += '#main-nav-container #main-nav #responsive-nav ul, #quick-access .dropdown-cart .dropdown-cart-menu { border-top-color : #'+hex+';}';

				var customText = customStylesheet.text();	
				customStylesheet.text(customText+' '+style);
				$.cookie('secondColor', style);
				$(el).find('span').css('background-color', '#'+hex);
				$(el).colpickHide();
			}
		});


		$('.color-box.third-color').colpick({
			colorScheme:'dark',
			layout:'rgbhex',
			color: 'c72929',
			onSubmit:function(hsb,hex,rgb,el) {
var style = '.discount-rect, .category-image-slider-container .discount-rect,#option-panel .colorbox-list li .third-color span { background-color : #'+hex+';}';
				
				var customText = customStylesheet.text();	
				customStylesheet.text(customText+' '+style);
				$.cookie('thirdColor', style);
				$(el).find('span').css('background-color', '#'+hex);
				$(el).colpickHide();
			}
		});

		$('.color-box.fourth-color').colpick({
			colorScheme:'dark',
			layout:'rgbhex',
			color: 'a8bf00',
			onSubmit:function(hsb,hex,rgb,el) {
var style = '.dropdown-cart  .dropdown-cart-product-list  .dropdown-cart-details .item-price  { color: #'+hex+';}';
style += '#option-panel .colorbox-list li .fourth-color span, #option-panel-title, .contact-details-list .contact-details-icon, .item-price-container, .contact-details-list .contact-details-icon { background-color : #'+hex+';}';
style += '#option-panel-tabs-container li.active a:after { border-top-color : #'+hex+';}';
				
				var customText = customStylesheet.text();	
				customStylesheet.text(customText+' '+style);
				$.cookie('fourthColor', style);
				$(el).find('span').css('background-color', '#'+hex);
				$(el).colpickHide();
			}
		});
		
	}
	
	$('.layout-style-list').find('li').on('click', function() {
		var $this= $(this),
			layoutMode = $this.data('layout');
			
			if (layoutMode === 'boxed') {
				$('#wrapper').addClass('boxed');
				$.cookie('layoutMode', 'boxed');
				console.log($.cookie('layoutMode'));
			} else {
				$.removeCookie('layoutMode');
				if ($('#wrapper').hasClass('boxed')) {
					$('#wrapper').removeClass('boxed');
				}
				console.log($.cookie('layoutMode'));
			}
	});
	
	$('#body-background-pattern').find('img').on('click', function() {
		var $this = $(this);
		if ($('#wrapper').hasClass('boxed') && $.cookie('layoutMode', 'boxed')) {
			var bgPattern = $this.attr('src');
					
			$('body').css('background', 'url('+bgPattern+') repeat');
			$.cookie('bgColor', bgPattern);
			$.cookie('bgPattern', bgPattern);
			
		}else {
			alert('Please change layout mode to the boxed.');
		}
	});


	var	googleFontLink = $('#googlefont');

	function fontCheck(font) {
		var googleFont = '|'+font.replace(' ', '+')+':400,700,400italic';
		var oldhref = googleFontLink.attr('href'),
			newhref;

		if (oldhref.indexOf(font) == -1) {
			newhref = oldhref+''+googleFont;
			googleFontLink.attr('href', newhref);
		}
	}

	if (typeof $.cookie('first-font') !== 'undefined') {
		fontCheck($.cookie('first-font'));
		$('body, #footer-bottom ,#option-panel-reset').css('font-family', $.cookie('first-font'));
	}

	if (typeof $.cookie('second-font') !== 'undefined') {
		fontCheck($.cookie('second-font'));
		$('h1,h2,h3,h4,h5,h6, #category-breadcrumb, #breadcrumb-container, #category-header.category-banner .category-title  h1, #category-header.category-banner .category-title  h2, .sidebar h3, .checkout-title, #footer h3').css('font-family', $.cookie('second-font'));
	}

	if (typeof $.cookie('third-font') !== 'undefined') {
		fontCheck($.cookie('third-font'));
		$('#main-nav-container #main-nav .menu li a, #main-nav-container #main-nav #responsive-nav ul li, .menu-button, #responsive-nav-button, .dropdown-cart-total li, .title-desc, .tab-style-1 li a, .new-rect, .discount-rect, .item-name, #portfolio-filter li a, .portfolio-item h2, #category-header.category-header-slider .category-title h1, #category-header.category-header-slider .category-title h2, .category-image-slider-container .new-rect, .category-image-slider-container .discount-rect, .featured-slider .featured-product h5, .related-slider .related-product h5, .article .article-meta-date, .article h2, .sidebar .widget .panel-title, .sidebar .widget .latest-posts-list h4, .sidebar .widget .testimonials-list li .testimonial-details header, .sidebar .widget .testimonials-list li  figure > figcaption, .comments h3, .product .product-name, .table .table-title, .total-table, .checkout-table .checkout-table-title, .checkout-table .checkout-table-price, .checkout-table .checkout-total-title, .checkout-table .checkout-total-price ').css('font-family', $.cookie('third-font'));
	}

	if (typeof $.cookie('fourth-font') !== 'undefined') {
		fontCheck($.cookie('fourth-font'));
		$('#main-nav-container #main-nav .menu li .mega-menu .mega-menu-title, #main-nav-container #main-nav #responsive-nav ul li ul li, #main-nav-container #main-nav #responsive-nav ul li .mega-menu .mega-menu-title, .item-price-container, .item-price-special, #category-header .category-title-price, .featured-slider .featured-product .featured-price,.related-slider .related-product .related-price, .category-filter-list li a, .comments .comments-list li .comment .comment-details .comment-title, .tab-container.left .nav-tabs > li, .tab-container.right .nav-tabs > li, .accordion-title, #footer, #option-panel-title, #option-panel .accordion-title, #option-panel .colorbox-list li > p, #option-panel  .layout-style-list li p').css('font-family', $.cookie('fourth-font'));
	}

	$('#first-font').on('change', function() {
		var font = $(this).val();

		if(typeof font !== 'undefined') {
			if (font !== 'Arial') {
				fontCheck(font);
			}

			$('body, #footer-bottom ,#option-panel-reset').css('font-family', font);
			$.cookie('first-font', font);
		}
		
	});

	$('#second-font').on('change', function() {
		var font = $(this).val();

		if(typeof font !== 'undefined') {
			fontCheck(font);
				
			$('h1,h2,h3,h4,h5,h6, #category-breadcrumb, #breadcrumb-container, #category-header.category-banner .category-title  h1, #category-header.category-banner .category-title  h2, .sidebar h3, .checkout-title, #footer h3').css('font-family', font);
			$.cookie('second-font', font);
		}
	});

	$('#third-font').on('change', function() {
		var font = $(this).val(),
			googleFont;

		if(typeof font !== 'undefined') {
			fontCheck(font);

			$('#main-nav-container #main-nav .menu li a, #main-nav-container #main-nav #responsive-nav ul li, .menu-button, #responsive-nav-button, .dropdown-cart-total li, .title-desc, .tab-style-1 li a, .new-rect, .discount-rect, .item-name, #portfolio-filter li a, .portfolio-item h2, #category-header.category-header-slider .category-title h1, #category-header.category-header-slider .category-title h2, .category-image-slider-container .new-rect, .category-image-slider-container .discount-rect, .featured-slider .featured-product h5, .related-slider .related-product h5, .article .article-meta-date, .article h2, .sidebar .widget .panel-title, .sidebar .widget .latest-posts-list h4, .sidebar .widget .testimonials-list li .testimonial-details header, .sidebar .widget .testimonials-list li  figure > figcaption, .comments h3, .product .product-name, .table .table-title, .total-table, .checkout-table .checkout-table-title, .checkout-table .checkout-table-price, .checkout-table .checkout-total-title, .checkout-table .checkout-total-price ').css('font-family', font);
			$.cookie('third-font', font);
		}
	});

	$('#fourth-font').on('change', function() {
		var font = $(this).val(),
			googleFont;

		if(typeof font !== 'undefined') {
			fontCheck(font);

			$('#main-nav-container #main-nav .menu li .mega-menu .mega-menu-title, #main-nav-container #main-nav #responsive-nav ul li ul li, #main-nav-container #main-nav #responsive-nav ul li .mega-menu .mega-menu-title, .item-price-container, .item-price-special, #category-header .category-title-price, .featured-slider .featured-product .featured-price,.related-slider .related-product .related-price, .category-filter-list li a, .comments .comments-list li .comment .comment-details .comment-title, .tab-container.left .nav-tabs > li, .tab-container.right .nav-tabs > li, .accordion-title, #footer, #option-panel-title, #option-panel .accordion-title, #option-panel .colorbox-list li > p, #option-panel  .layout-style-list li p').css('font-family', font);
			$.cookie('fourth-font', font);
		}
	});

	
	
}(jQuery));