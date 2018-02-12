
$(function() {

    var $window = $(window);
    var scrollTime = 1.2;
    var scrollDistance = 150;

    $window.on("mousewheel DOMMouseScroll", function(event){
        event.preventDefault(); 
        var delta = event.originalEvent.wheelDelta/120 || -event.originalEvent.detail/3;
        var scrollTop = $window.scrollTop();
        var finalScroll = scrollTop - parseInt(delta*scrollDistance);
        TweenMax.to($window, scrollTime, {
            scrollTo : { y: finalScroll, autoKill:true },
                ease: Power1.easeOut,
                overwrite: 5                          
            });
    });

	$('.fancybox').fancybox();

	$('.scrollTo').click(function(event) {
		event.preventDefault();
		var target = $(this).attr('href');
		var top = $(target).offset().top;
		$('html, body').animate({scrollTop : top+'px'}, 1000);
	});

	var lastId,
	topMenu = $("ul.menu"),
	// All list items
	menuItems = topMenu.find("a:not(.network)"),
	// Anchors corresponding to menu items
	scrollItems = menuItems.map(function() {
		var item = $($(this).attr("href"));
		if (item.length) {
		  return item;
		}
	});

	// Bind click handler to menu items
	// so we can get a fancy scroll animation
	menuItems.click(function(e) {
	  var href = $(this).attr("href"),
	    offsetTop = href === "#" ? 0 : $(href).offset().top + 1;
	    var pad = 0;
	  if ($(document).width() > 767) {
		  if (href == '#more' && $(href).hasClass('scroll-pos-before'))
		  	pad = 300;
		  else if (href == '#more' && $(href).hasClass('scroll-pos-after'))
		  	pad = -90;
		  else if (href == '#tokens' && $(href).hasClass('scroll-pos-before'))
		  	pad = 300;
		  else if (href == '#tokens' && $(href).hasClass('scroll-pos-after'))
		  	pad = 0;
		} else {
			pad = -50;
		}
		  history.pushState(null, 'AB-CHAIN', '/'+href);
	  $('html, body').stop().animate({
	    scrollTop: offsetTop + pad
	  }, 1000);
	  e.preventDefault();
	});

	// Bind to scroll
	$(window).scroll(function() {
	  // Get container scroll position
	  var fromTop = $(this).scrollTop();

	  var pad = 0;
	  if ($(document).width() < 767) {
			pad = -60;
		}

	  // Get id of current scroll item
	  var cur = scrollItems.map(function() {
	    if ($(this).offset().top + pad < fromTop)
	      return this;
	  });
	  // Get the id of the current element
	  cur = cur[cur.length - 1];
	  var id = cur && cur.length ? cur[0].id : "";

	  if (lastId !== id) {
	    lastId = id;
	    // Set/remove active class
	    menuItems
	      .parent().removeClass("active")
	      .end().filter("[href='#" + id + "']").parent().addClass("active");
	  }
	});

	var team = $('.team .wrap-slider ul');

	team.owlCarousel({
		items : 5,
		slideBy: 5,
		pagination: false,
		autoplay: false,
		mouseDrag: false,
		touchDrag: true,
		loop: true,
		smartSpeed: 500,
		responsive: {
		  0: {
	        items: 2,
	      },
	      991: {
	        items: 5,
	      },
	  }
	});
	team.find('li').show();
	team.parent().find(".arrow.right").click(function(event){
		event.preventDefault();
		team.trigger("next.owl.carousel");
	});
	team.parent().find(".arrow.left").click(function(event){
		event.preventDefault();
		team.trigger("prev.owl.carousel");
	});

	$('.team .wrap-slider ul.wrp-team').hide();

	$('.team .nav a').click(function(event) {
		event.preventDefault();
		if ($(this).hasClass('active')) return;
		$(this).parent().find('.active').removeClass('active');
		$(this).addClass('active');
		var target = $(this).data('target');
		$('.team .wrap-slider ul').hide();
		$('.team .wrap-slider ul.wrp-'+target).fadeIn('fast');
	});

	$('.roadmap .map a').click(function(event) {
		event.preventDefault();
		if ($(document).width() > 767) {
			if ($(this).hasClass('active')) return;
			$(this).parent().find('.active').removeClass('active').find('img').removeClass('.vis');
			$(this).addClass('active').find('img').addClass('vis').css('opacity', 1);
			var header = $(this).data('header');
			var text = $(this).data('text');
			$('.roadmap .content h2').text(header);
			$('.roadmap .content p').text(text);
			$('#roadmap a.active .vis').scroolly([
			    {
			        from: 'con-center + 30vp = bottom',
					to: 'con-center + 34vp = bottom',
					cssFrom: {
						opacity: 0,
			        },
			        cssTo:{
			        	opacity: 1,
			        }
			    },
			    {
			        from: 'con-center + 34vp = bottom',
			        css:{
			        	opacity: 1,
			        }
			    },
			], $('#roadmap'));
		}
	});

	$('.main .language').click(function(event) {
		$(this).toggleClass('active');
	});

	$('.banner .close').click(function(event) {
		event.preventDefault();
		$(this).parent().fadeOut('fast');
	});

	changeColorMenu($('#tokens'), '#fff, #fff', '#CC41BB, #833076');
	changeColorMenu($('#key'), '#CC41BB, #833076', '#00D1F5, #0D508E');
	changeColorMenu($('#genius'), '#00D1F5, #0D508E', '#f9fade, #ffd072');
	changeColorMenu($('#video'), '#f9fade, #ffd072', '#ffc2e6, #b73475');
	changeColorMenu($('#team'), '#ffc2e6, #b73475', '#00d1f5, #0d508e');
	changeColorMenu($('#roadmap'), '#00d1f5, #0d508e', '#cc41bb, #833076');
	changeColorMenu($('#tokensale'), '#cc41bb, #833076', '#f9fade, #ffd072');

	$('.main .burger').click(function(event) {
		event.preventDefault();
		var menu = $('.main .wrap-menu');
		if (menu.hasClass('collapsed'))
			menu.toggleClass('opened');
	});

	$('.main .menu li a').click(function(event) {
		event.preventDefault();
		var menu = $('.main .wrap-menu');
		if (menu.hasClass('collapsed') && !$(this).hasClass('active'))
			menu.removeClass('opened');
	});

	if ($(document).width() > 767) {
		setTimeout(function(){
			$('.banner').fadeIn('fast');
		}, 2000);

		$('.main .wrap-menu').scroolly([
			{
	            alias: 'before',
	            from: '',
	            to: 'con-top + 6vp = top',
	            css: {
	                opacity: 1,
		            left: 0
	            },
	        },
		    {
		        from: 'con-top + 6vp = top',
				to: 'con-top + 9vp = top',
				cssFrom: {
		            opacity: 1,
		            left: 0
		        },
		        cssTo:{
		            opacity: 0,
		            left: 50
		        },
		    },
		    {
				from: 'con-top + 9vp = top',
		        addClass: 'collapsed',
		    },
		    {
				to: 'con-top + 9vp = top',
		        removeClass: 'collapsed',
		    },
		    {
	            alias: 'after',
	            from: 'con-top + 9vp = top',
	            to: 'doc-bottom - 50vp  = bottom',
	            css: {
	                opacity: 0,
		            left: 50
	            },
	        },
	        {
				from: 'doc-bottom - 50vp  = bottom',
		        removeClass: 'collapsed'
		    },
		    {
		    	from: 'con-top + 9vp = top',
				to: 'doc-bottom - 50vp  = bottom',
		        addClass: 'collapsed'
		    },
	        {
	            alias: 'after2',
	            from: 'doc-bottom - 50vp = bottom',
	            to: 'doc-bottom',
		        cssFrom: {
		            opacity: 0,
		            left: 50
		        },
		        cssTo: {
		            opacity: 1,
		            left: 0
		        },
	        },
		], $('#main'));

		$('.main .burger').scroolly([
			{
	            alias: 'before',
	            from: '',
	            to: 'con-top + 6vp = top',
	            css: {
	                opacity: 0
	            }
	        },
		    {
		        from: 'con-top + 6vp = top',
				to: 'con-top + 14vp = top',
				cssFrom: {
		            opacity: 0
		        },
		        cssTo:{
		            opacity: 1
		        }
		    },
		    {
	            alias: 'before',
	            from: 'con-top + 14vp = top',
	            to: 'doc-bottom - 50vp = bottom',
	            css: {
	                opacity: 1
	            }
	        },
	        {
	            alias: 'after',
	            from: 'doc-bottom - 50vp = bottom',
	            to: 'doc-bottom',
		        cssFrom: {
		            opacity: 1
		        },
		        cssTo:{
		            opacity: 0
		        }
	        },
		], $('#main'));

		$('.main .logo').scroolly([
			{
	            alias: 'before',
	            to: 'con-top + 6vp = top',
	            css: {
	                opacity: 1,
		            'margin-left': '-0.0px'
	            },
	        },
		    {
		        from: 'con-top + 6vp = top',
				to: 'con-top + 9vp = top',
				cssFrom: {
		            opacity: 1,
		            'margin-left': '-0.0px'
		        },
		        cssTo:{
		            opacity: 0,
		            'margin-left': '-50.0px'
		        },
		    },
		    {
	            alias: 'after',
	            from: 'con-top + 9vp = top',
	            to: 'doc-bottom - 50vp  = bottom',
	            css: {
	                opacity: 0,
		            'margin-left': '-50.0px'
	            },
	        },
	        {
	            alias: 'after2',
	            from: 'doc-bottom - 50vp = bottom',
	            to: 'doc-bottom',
		        cssFrom: {
		            opacity: 0,
		            'margin-left': '-50.0px'
		        },
		        cssTo: {
		            opacity: 1,
		            'margin-left': '-0.0px'
		        },
	        },
		], $('#main'));

		$('#main .cont').scroolly([
			{
		        to: 'el-top + 12vp = top',
				css: {
		            opacity: 1
		        },
		    },
		    {
		        from: 'el-top + 12vp = top',
				to: 'el-center = top',
				cssFrom: {
		            opacity: 1
		        },
		        cssTo:{
		            opacity: 0
		        }
		    },
		    {
				from: 'el-center = top',
		        css:{
		            opacity: 0
		        }
		    }
		]);

		$('#more').scroolly([
			{
		        to: 'con-top + 12vp = top',
		        alias: 'before',
				css: {
		            opacity: 0,
		            transform: 'translate3d(0,-55.00vh,0)'
		        },
		    },
		    {
		        from: 'con-top + 12vp = top',
				to: 'el-bottom + 25vp = bottom',
				cssFrom: {
		            opacity: 0,
		            transform: 'translate3d(0,-55.00vh,0)'
		        },
		        cssTo:{
		            opacity: 1,
		            transform: 'translate3d(0,0.00vh,0)'
		        }
		    },
		    {
		    	alias: 'after',
				from: 'el-bottom + 25vp = bottom',
		        css:{
		            transform: 'translate3d(0,-0.00vh,0)'
		        }
		    }
		], $('#main'));

		$('#more p').scroolly([
		    {
		        to: 'con-top + 12vp = top',
				css: {
					opacity: 0,
		            transform: 'translate3d(0,5.0vh,0)'
		        },
		    },
		    {
		        from: 'con-top + 12vp = top',
				to: 'el-bottom = center + 10vp',
				cssFrom: {
					opacity: 0,
		            transform: 'translate3d(0,5.0vh,0)'
		        },
		        cssTo:{
		        	opacity: 1,
		            transform: 'translate3d(0,0.0vh,0)'
		        }
		    },
		    {
				from: 'el-bottom = center + 10vp',
		        css:{
		        	opacity: 1,
		            transform: 'translate3d(0,0.0vh,0)'
		        }
		    }
		], $('#main'));

		$('#key').scroolly([
		    {
		        to: 'el-top - 5vp = center',
				css: {
		            opacity: 0,
		            transform: 'translate3d(0,-20.0vh,0)'
		        },
		    },
		    {
		        from: 'el-top - 5vp = center',
				to: 'el-center = center',
				cssFrom: {
		            opacity: 0,
		            transform: 'translate3d(0,-20.0vh,0)'
		        },
		        cssTo:{
		            opacity: 1,
		            transform: 'translate3d(0,0,0)'
		        }
		    },
		    {
				from: 'el-center = center',
		        css:{
		            opacity: 1,
		            transform: 'translate3d(0,0,0)'
		        }
		    }
		]);

		$('#key .el-2').scroolly([
		    {
		        from: 'con-top - 5vp = center',
				to: 'con-center = center',
				cssFrom: {
		            top: '-10.0vh'
		        },
		        cssTo:{
		            top: '0'
		        }
		    }
		], $('#key'));

		$('#key .el-3').scroolly([
		    {
		        from: 'con-top - 5vp = center',
				to: 'con-center = center',
				cssFrom: {
		            top: '-16.0vh'
		        },
		        cssTo:{
		            top: '0'
		        }
		    }
		], $('#key'));

		$('#genius .brain').scroolly([
		    {
		        to: 'con-top + 10vp = bottom',
				css: {
		            opacity: 0,
		            transform: 'translate3d(0,-60.0vh,0)',
		        },
		    },
		    {
		        from: 'con-top + 10vp = bottom',
				to: 'con-bottom - 10vp = bottom',
				cssFrom: {
		            opacity: 0,
		            transform: 'translate3d(0,-60.0vh,0)',
		        },
		        cssTo:{
		            opacity: 1,
		            transform: 'translate3d(0,-0vh,0)',
		        }
		    },
		    {
				from: 'con-bottom - 10vp = bottom',
		        css:{
		            opacity: 1,
		            transform: 'translate3d(0,-0vh,0)',
		        }
		    }
		], $('#genius'));

		$('#genius h2').scroolly([
			{
				to: 'con-bottom - 15vp = bottom',
				css: {
		            opacity: 0,
		        },
		    },
		    {
		        from: 'con-bottom - 15vp = bottom',
				to: 'con-bottom - 13vp = bottom',
				cssFrom: {
		            opacity: 0,
		        },
		        cssTo:{
		            opacity: 1,
		        }
		    },
		    {
		        from: 'con-bottom - 13vp = bottom',
		        css:{
		            opacity: 1,
		        }
		    }
		], $('#genius'));

		$('#genius .sign').scroolly([
			{
				to: 'con-bottom - 13vp = bottom',
				css: {
		            opacity: 0,
		        }
		    },
		    {
		        from: 'con-bottom - 13vp = bottom',
				to: 'con-bottom - 12vp = bottom',
				cssFrom: {
		            opacity: 0,
		        },
		        cssTo:{
		            opacity: 1,
		        }
		    },
		    {
		        from: 'con-bottom - 12vp = bottom',
		        css:{
		            opacity: 1,
		        }
		    }
		], $('#genius'));

		$('#genius .text-1, #genius .text-4').scroolly([
		    {
				to: 'con-bottom - 15vp = bottom',
				css: {
					top: '12.00vh',
		            opacity: 0,
		        }
		    },
		    {
		        from: 'con-bottom - 15vp = bottom',
				to: 'con-bottom - 12vp = bottom',
				cssFrom: {
					top: '12.00vh',
		            opacity: 0,
		        },
		        cssTo:{
		        	top: '13.00vh',
		            opacity: 1,
		        }
		    },
		    {
		        from: 'con-bottom - 12vp = bottom',
		        css:{
		        	top: '13.00vh',
		            opacity: 1,
		        }
		    }
		], $('#genius'));

		$('#genius .text-2').scroolly([
			{
				to: 'con-bottom - 15vp = bottom',
				css: {
					left: '0.00vw',
		            opacity: 0,
		        },
		    },
		    {
		        from: 'con-bottom - 15vp = bottom',
				to: 'con-bottom - 12vp = bottom',
				cssFrom: {
					left: '0.00vw',
		            opacity: 0,
		        },
		        cssTo:{
		        	left: '5.00vw',
		            opacity: 1,
		        }
		    },
		    {
		        from: 'con-bottom - 12vp = bottom',
		        css:{
		        	left: '5.00vw',
		            opacity: 1,
		        }
		    }
		], $('#genius'));

		$('#genius .text-5').scroolly([
		    {
				to: 'con-bottom - 15vp = bottom',
				css: {
					right: '0.00vw',
		            opacity: 0,
		        },
		    },
		    {
		        from: 'con-bottom - 15vp = bottom',
				to: 'con-bottom - 12vp = bottom',
				cssFrom: {
					right: '0.00vw',
		            opacity: 0,
		        },
		        cssTo:{
		        	right: '5.00vw',
		            opacity: 1,
		        }
		    },
		    {
		        from: 'con-bottom - 12vp = bottom',
		        css:{
		        	right: '5.00vw',
		            opacity: 1,
		        }
		    }
		], $('#genius'));

		$('#genius .text-3').scroolly([
		    {
		        to: 'con-bottom - 15vp = bottom',
				css: {
					left: '5.00vw',
		            opacity: 0,
		        },
		    },
		    {
		        from: 'con-bottom - 15vp = bottom',
				to: 'con-bottom - 10vp = bottom',
				cssFrom: {
					left: '5.00vw',
		            opacity: 0,
		        },
		        cssTo:{
		        	left: '15.00vw',
		            opacity: 1,
		        }
		    },
		    {
				from: 'con-bottom - 10vp = bottom',
		        css:{
		        	left: '15.00vw',
		            opacity: 1,
		        }
		    }
		], $('#genius'));

		$('#genius .text-6').scroolly([
		    {
		        to: 'con-bottom - 15vp = bottom',
				css: {
					right: '5.00vw',
		            opacity: 0,
		        }
		    },
		    {
		        from: 'con-bottom - 15vp = bottom',
				to: 'con-bottom - 10vp = bottom',
				cssFrom: {
					right: '5.00vw',
		            opacity: 0,
		        },
		        cssTo:{
		        	right: '10.00vw',
		            opacity: 1,
		        }
		    },
		    {
				from: 'con-bottom - 10vp = bottom',
		        css:{
		        	right: '10.00vw',
		            opacity: 1,
		        }
		    }
		], $('#genius'));

		$('#video .line').scroolly([
		    {
		        to: 'con-top = bottom',
				css: {
					top: '60.0%'
		        },
		    },
		    {
		        from: 'con-top = bottom',
				to: 'con-bottom = top',
				cssFrom: {
					top: '60.0%'
		        },
		        cssTo:{
		        	top: '35.0%'
		        }
		    },
		    {
				from: 'con-bottom = top',
		        css:{
		        	top: '35.0%'
		        }
		    }
		], $('#video'));

		$('#team .nav a').scroolly([
		    {
		        to: 'con-top = bottom',
				cssFrom: {
					margin: '0 15.0vw',
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-top = bottom',
				to: 'con-center - 10vp = center',
				cssFrom: {
					margin: '0 15.0vw',
					opacity: 0,
		        },
		        cssTo:{
		        	margin: '0 4.0vw',
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center - 10vp = center',
		        css:{
		        	margin: '0 4.0vw',
		        	opacity: 1,
		        }
		    }
		], $('#team'));

		$('#team .wrap-slider').scroolly([
			{
		        tp: 'con-top = center',
				css: {
					transform: 'translate3d(0,15.00vh,0)',
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-top = center',
				to: 'con-center - 10vp = center',
				cssFrom: {
					transform: 'translate3d(0,15.00vh,0)',
					opacity: 0,
		        },
		        cssTo:{
		        	transform: 'translate3d(0,0.0vh,0)',
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center - 10vp = center',
		        css:{
		        	transform: 'translate3d(0,0.0vh,0)',
		        	opacity: 1,
		        }
		    },
		    {
		        from: 'con-center - 10vp = center',
				to: 'con-bottom = center',
				cssFrom: {
					transform: 'translate3d(0,-0vh,0)',
		        },
		        cssTo:{
		        	transform: 'translate3d(0,-20.0vh,0)',
		        }
		    }
		], $('#team'));

		$('#roadmap .el-1').scroolly([
			{
		        to: 'con-top - 12vp = center',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-top - 12vp = center',
				to: 'con-center - 2vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center - 2vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#roadmap'));

		$('#roadmap .el-2').scroolly([
		    {
		        to: 'con-center - 2vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center - 2vp = bottom',
				to: 'con-center + 5vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center + 5vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#roadmap'));

		$('#roadmap .el-3').scroolly([
		    {
		        to: 'con-center + 5vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center + 5vp = bottom',
				to: 'con-center + 12vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center + 12vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#roadmap'));

		$('#roadmap .el-4').scroolly([
		    {
		        to: 'con-center + 12vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center + 12vp = bottom',
				to: 'con-center + 19vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center + 19vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#roadmap'));

		$('#roadmap .el-5').scroolly([
		    {
		        to: 'con-center + 19vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center + 19vp = bottom',
				to: 'con-center + 26vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center + 26vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#roadmap'));

		$('#roadmap .el-6').scroolly([
		    {
				from: 'con-center + 34vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center + 26vp = bottom',
				to: 'con-center + 34vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center + 34vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#roadmap'));

		$('#roadmap a.active .vis').scroolly([
		    {
		        to: 'con-center + 30vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center + 30vp = bottom',
				to: 'con-center + 34vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
		        from: 'con-center + 34vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#roadmap'));

		$('#roadmap .content').scroolly([
		    {
		        to: 'con-center + 26vp = bottom',
				css: {
					opacity: 0,
					transform: 'translate3d(0,-5.0vh,0)',
		        },
		    },
		    {
		        from: 'con-center + 26vp = bottom',
				to: 'con-center + 34vp = bottom',
				cssFrom: {
					opacity: 0,
					transform: 'translate3d(0,-5.0vh,0)',
		        },
		        cssTo:{
		        	opacity: 1,
		        	transform: 'translate3d(0,0.0vh,0)',
		        }
		    },
		    {
				from: 'con-center + 34vp = bottom',
		        css:{
		        	opacity: 1,
		        	transform: 'translate3d(0,0.0vh,0)',
		        }
		    },
		], $('#roadmap'));

		$('#tokensale .token').scroolly([
		    {
		        to: 'con-top = bottom',
				css: {
					opacity: 0,
					transform: 'translateX(-25.0vw)',
		        },
		    },
		    {
		        from: 'con-top = bottom',
				to: 'con-center - 5vp = center',
				cssFrom: {
					opacity: 0,
					transform: 'translateX(-25.0vw)',
		        },
		        cssTo:{
		        	opacity: 1,
		        	transform: 'translateX(0.0vw)',
		        }
		    },
		    {
				from: 'con-center - 5vp = center',
		        css:{
		        	opacity: 1,
		        	transform: 'translateX(0.0vw)',
		        }
		    },
		], $('#tokensale'));

		$('#tokensale .fiat').scroolly([
		    {
		        to: 'con-top = bottom',
				css: {
					opacity: 0,
					transform: 'translateX(25.0vw)',
		        },
		    },
		    {
		        from: 'con-top = bottom',
				to: 'con-center - 5vp = center',
				cssFrom: {
					opacity: 0,
					transform: 'translateX(25.0vw)',
		        },
		        cssTo:{
		        	opacity: 1,
		        	transform: 'translateX(0.0vw)',
		        }
		    },
		    {
				from: 'con-center - 5vp = center',
		        css:{
		        	opacity: 1,
		        	transform: 'translateX(0.0vw)',
		        }
		    },
		], $('#tokensale'));

		$('#tokensale .line').scroolly([
		    {
		        to: 'con-center - 20vp = center',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center - 20vp = center',
				to: 'con-center - 5vp = center',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 0.8,
		        }
		    },
		    {
				from: 'con-center - 5vp = center',
		        css:{
		        	opacity: 0.8,
		        }
		    },
		], $('#tokensale'));

		$('#contacts .big-header').scroolly([
		    {
				to: 'el-top = center',
				css: {
					transform: 'translate3d(0,-25.0vh,0)',
		        },
		    },
		    {
		        from: 'el-top = bottom',
				to: 'el-top = center',
				cssFrom: {
					transform: 'translate3d(0,-25.0vh,0)',
		        },
		        cssTo:{
		        	transform: 'translate3d(0,-0.0vh,0)',
		        }
		    },
		    {
				from: 'el-top = center',
		        css:{
		        	transform: 'translate3d(0,-0.0vh,0)',
		        }
		    },
		]);

		$('#contacts .row.frst').scroolly([
		    {
		        to: 'con-top = center',
				css: {
					transform: 'translate3d(0,-20.0vh,0)',
					opacity: 0
		        },
		    },
		    {
		        from: 'con-top = center',
				to: 'doc-bottom - 15vp = bottom',
				cssFrom: {
					transform: 'translate3d(0,-20.0vh,0)',
					opacity: 0
		        },
		        cssTo:{
		        	transform: 'translate3d(0,-0.0vh,0)',
		        	opacity: 1
		        }
		    },
		    {
				from: 'doc-bottom - 15vp = bottom',
		        css:{
		        	transform: 'translate3d(0,-0.0vh,0)',
		        	opacity: 1
		        }
		    },
		], $('#contacts'));

		$('#contacts .row.scnd').scroolly([
		    {
		        to: 'con-top + 25vp = center',
				css: {
					transform: 'translate3d(0,-20.0vh,0)',
					opacity: 0
		        },
		    },
		    {
		        from: 'con-top + 25vp = center',
				to: 'doc-bottom = bottom',
				cssFrom: {
					transform: 'translate3d(0,-20.0vh,0)',
					opacity: 0
		        },
		        cssTo:{
		        	transform: 'translate3d(0,-0.0vh,0)',
		        	opacity: 1
		        }
		    },
		    {
				from: 'doc-bottom = bottom',
		        css:{
		        	transform: 'translate3d(0,-0.0vh,0)',
		        	opacity: 1
		        }
		    },
		], $('#contacts'));

		$('#tokens .el-1').scroolly([
		    {
		        to: 'con-center - 2vp = bottom',
				css: {
					opacity: 0
		        },
		    },
		    {
		        from: 'con-center - 2vp = bottom',
				to: 'con-center + 8vp = bottom',
				cssFrom: {
					opacity: 0
		        },
		        cssTo:{
		        	opacity: 1
		        }
		    },
		    {
				from: 'con-center + 8vp = bottom',
		        css:{
		        	opacity: 1
		        }
		    },
		], $('#tokens'));

		$('#tokens').scroolly([
			{
		        to: 'el-top + 10vp = bottom',
				css: {
					transform: 'translate3d(0,-50.0vh,0)',
		        },
		    },
		    {
		        from: 'el-top + 10vp = bottom',
				to: 'el-bottom - 20vp = bottom',
				cssFrom: {
					transform: 'translate3d(0,-50.0vh,0)',
		        },
		        cssTo:{
		        	transform: 'translate3d(0,0.0vh,0)',
		        }
		    },
		    {
		    	alias: 'after',
				from: 'el-bottom = bottom',
		        css:{
		        	transform: 'translate3d(0,0.0vh,0)',
		        }
		    },
		]);

		$('#tokens').scroolly([
			{
				alias: 'before',
		        to: 'el-top + 50vp = bottom',
		    },
		]);

		$('#tokens .line1').scroolly([
			{
		        to: 'con-center + 4vp = bottom',
				css: {
					opacity: 0,
					left: '11.0vw'
		        },
		    },
		    {
		        from: 'con-center + 4vp = bottom',
				to: 'con-center + 8vp = bottom',
				cssFrom: {
					opacity: 0,
					left: '11.0vw'
		        },
		        cssTo:{
		        	opacity: 1,
		        	left: '12.0vw'
		        }
		    },
		    {
				from: 'con-center + 8vp = bottom',
		        css:{
		        	opacity: 1,
		        	left: '12.0vw'
		        }
		    },
		], $('#tokens'));

		$('#tokens .num1, #tokens h2').scroolly([
			{
		        to: 'con-center + 8vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center + 8vp = bottom',
				to: 'con-center + 14vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center + 14vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#tokens'));

		$('#tokens .num2').scroolly([
			{
		        to: 'con-center + 8vp = bottom',
				css: {
					opacity: 0,
					left: '42.0vw'
		        },
		    },
		    {
		        from: 'con-center + 8vp = bottom',
				to: 'con-center + 14vp = bottom',
				cssFrom: {
					opacity: 0,
					left: '42.0vw'
		        },
		        cssTo:{
		        	opacity: 1,
		        	left: '43.0vw'
		        }
		    },
		    {
				from: 'con-center + 14vp = bottom',
		        css:{
		        	opacity: 1,
		        	left: '43.0vw'
		        }
		    },
		], $('#tokens'));

		$('#tokens .el-2').scroolly([
			{
		        to: 'con-center + 8vp = bottom',
				css: {
					opacity: 0,
					left: '33.0vw'
		        },
		    },
		    {
		        from: 'con-center + 8vp = bottom',
				to: 'con-center + 14vp = bottom',
				cssFrom: {
					opacity: 0,
					left: '33.0vw'
		        },
		        cssTo:{
		        	opacity: 1,
		        	left: '34.0vw'
		        }
		    },
		    {
				from: 'con-center + 14vp = bottom',
		        css:{
		        	opacity: 1,
		        	left: '34.0vw'
		        }
		    },
		], $('#tokens'));

		$('#tokens .line2').scroolly([
			{
		        to: 'con-center + 13vp = bottom',
				css: {
					opacity: 0,
					left: '46.0vw'
		        },
		    },
		    {
		        from: 'con-center + 13vp = bottom',
				to: 'con-center + 18vp = bottom',
				cssFrom: {
					opacity: 0,
					left: '46.0vw'
		        },
		        cssTo:{
		        	opacity: 1,
		        	left: '47.0vw'
		        }
		    },
		    {
				from: 'con-center + 18vp = bottom',
		        css:{
		        	opacity: 1,
		        	left: '47.0vw'
		        }
		    },
		], $('#tokens'));

		$('#tokens .el-3 img').scroolly([
			{
		        to: 'con-center + 18vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center + 18vp = bottom',
				to: 'con-center + 22vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center + 22vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#tokens'));

		$('#tokens .el-3 .name').scroolly([
		    {
		        to: 'con-center + 20vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center + 20vp = bottom',
				to: 'con-center + 24vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center + 24vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#tokens'));

		$('#tokens .num4').scroolly([
		    {
		        to: 'con-center + 22vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center + 22vp = bottom',
				to: 'con-center + 26vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center + 26vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#tokens'));

		$('#tokens .line3').scroolly([
		    {
		        to: 'con-center + 26vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center + 26vp = bottom',
				to: 'con-center + 30vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center + 30vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#tokens'));

		$('#tokens .num3, #tokens .line4').scroolly([
		    {
		        to: 'con-center + 30vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center + 30vp = bottom',
				to: 'con-center + 34vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center + 34vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#tokens'));

		$('#tokens .num5, #tokens .el-4').scroolly([
		    {
		        to: 'con-center + 36vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center + 36vp = bottom',
				to: 'con-center + 40vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center + 40vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#tokens'));

		$('#tokens .num6, #tokens .el-5').scroolly([
		    {
		        to: 'con-center + 36vp = bottom',
				css: {
					opacity: 0,
					'margin-left': '1.0vw'
		        },
		    },
		    {
		        from: 'con-center + 36vp = bottom',
				to: 'con-center + 40vp = bottom',
				cssFrom: {
					opacity: 0,
					'margin-left': '1.0vw'
		        },
		        cssTo:{
		        	opacity: 1,
		        	'margin-left': '0vw'
		        }
		    },
		    {
				from: 'con-center + 40vp = bottom',
		        css:{
		        	opacity: 1,
		        	'margin-left': '0vw'
		        }
		    },
		], $('#tokens'));

		$('#tokens .circle').scroolly([
			{
		        to: 'con-center + 26vp = bottom',
				css: {
					opacity: 0,
		        },
		    },
		    {
		        from: 'con-center + 26vp = bottom',
				to: 'con-center + 40vp = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		    {
				from: 'con-center + 40vp = bottom',
		        css:{
		        	opacity: 1,
		        }
		    },
		], $('#tokens'));

		$('.vp').scroolly([
		    {
		        from: 'doc-top = top',
				to: 'doc-top + 100vp = top',
				cssFrom: {
					transform: 'translate3d(0,-0.0vh,0)'
		        },
		        cssTo:{
		        	transform: 'translate3d(0,-10.0vh,0)'
		        }
		    },
		  //   {
				// from: 'doc-top + 100vp = top',
		  //       css:{
		  //       	transform: 'translate3d(0,-10.0vh,0)'
		  //       }
		  //   },
		]);

		$('.vp .first-bg').scroolly([
			// {
		 //        to: 'doc-top + 50vp = top',
			// 	css: {
			// 		opacity: 1,
		 //        },
		 //    },
		    {
		        from: 'doc-top + 50vp = top',
				to: 'doc-top + 100vp = top',
				cssFrom: {
					opacity: 1,
		        },
		        cssTo:{
		        	opacity: 0,
		        }
		    },
		  //   {
				// from: 'doc-top + 100vp = top',
		  //       css:{
		  //       	opacity: 0,
		  //       }
		  //   },
		]);

		$('.vp .second-bg').scroolly([
		    {
		        from: 'doc-top = top',
				to: 'doc-top + 50vp = top',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 1,
		        }
		    },
		  //   {
				// from: 'doc-top + 50vp = top',
		  //       css:{
		  //       	opacity: 1,
		  //       }
		  //   },
		    {
		        from: 'doc-top + 100vp = top',
				to: 'doc-top + 140vp = top',
				cssFrom: {
					opacity: 1
		        },
		        cssTo:{
		        	opacity: 0
		        }
		    },
		  //   {
				// from: 'doc-top + 140vp = top',
		  //       css:{
		  //       	opacity: 0
		  //       }
		  //   },
		]);

		// $('.vp .third-bg').scroolly([
		//     {
		//         from: 'doc-top + 110vp = top',
		// 		to: 'doc-top + 160vp = top',
		// 		cssFrom: {
		// 			opacity: 0,
		//         },
		//         cssTo:{
		//         	opacity: 1,
		//         }
		//     },
		//   //   {
		//   //       from: 'doc-top + 160vp = top',
		// 		// css: {
		// 		// 	opacity: 1,
		//   //       },
		//   //   },
		//     {
		//         from: 'doc-top + 110vp = top',
		// 		to: 'doc-top + 210vp = top',
		// 		cssFrom: {
		// 			'background-position': 'center 20.00vh'
		//         },
		//         cssTo:{
		//         	'background-position': 'center 0.00vh'
		//         }
		//     },
		//     {
		//         from: 'doc-top + 210vp = top',
		// 		to: 'doc-top + 700vp = top',
		// 		cssFrom: {
		// 			'background-position': 'center -0.00vh'
		//         },
		//         cssTo:{
		//         	'background-position': 'center -120.00vh'
		//         }
		//     },
		//     {
		//         from: 'doc-top + 520vp = top',
		// 		to: 'doc-top + 700vp = top',
		// 		cssFrom: {
		// 			opacity: 1,
		//         },
		//         cssTo:{
		//         	opacity: 0,
		//         }
		//     },
		//   //   {
		// 		// from: 'doc-top + 700vp = top',
		//   //       css:{
		//   //       	opacity: 0,
		//   //       }
		//   //   },
		// ]);

		$('.vp .dark-bottom').scroolly([
		  //   {
		  //       from: 'doc-top + 700vp = top',
		  //       to: 'doc-top + 780vp = top',
				// css: {
				// 	opacity: 0,
		  //       },
		  //   },
		    {
		        from: 'doc-bottom - 150vp = bottom',
				to: 'doc-bottom = bottom',
				cssFrom: {
					opacity: 0,
		        },
		        cssTo:{
		        	opacity: 0.4,
		        }
		    },
		]);

		// $('.vp .parallax-stars-1').scroolly([
		//     {
		//         from: 'doc-top + 80vp = top',
		// 		to: 'doc-top + 160vp = top',
		// 		cssFrom: {
		// 			opacity: 0,
		//         },
		//         cssTo:{
		//         	opacity: 0.8,
		//         }
		//     },
		//     {
		//         from: 'doc-top + 120vp = top',
		// 		to: 'doc-top + 500vp = top',
		// 		cssFrom: {
		// 			'background-position': 'center -0.00vh'
		//         },
		//         cssTo:{
		//         	'background-position': 'center -340.00vh'
		//         }
		//     },
		//     {
		//         from: 'doc-top + 160vp = top',
		// 		to: 'doc-top + 700vp = top',
		// 		cssFrom: {
		// 			opacity: 0.5,
		//         },
		//         cssTo:{
		//         	opacity: 0.8,
		//         }
		//     },
		//     {
		//         from: 'doc-top + 450vp = top',
		// 		to: 'doc-top + 500vp = top',
		// 		cssFrom: {
		// 			opacity: 0.8,
		//         },
		//         cssTo:{
		//         	opacity: 0,
		//         }
		//     },
		//     {
		// 		from: 'doc-top + 800vp = top',
		//         css:{
		//         	opacity: 0,
		//         }
		//     },
		// ]);

		// $('.vp .parallax-stars-2').scroolly([
		//     {
		//         to: 'doc-top + 80vp = top',
		// 		css: {
		// 			opacity: 0,
		//         },
		//     },
		//     {
		//         from: 'doc-top + 80vp = top',
		// 		to: 'doc-top + 160vp = top',
		// 		cssFrom: {
		// 			opacity: 0,
		//         },
		//         cssTo:{
		//         	opacity: 0.5,
		//         }
		//     },
		//     {
		//         from: 'doc-top + 120vp = top',
		// 		to: 'doc-top + 800vp = top',
		// 		cssFrom: {
		// 			'background-position': 'center -0.00vh'
		//         },
		//         cssTo:{
		//         	'background-position': 'center -250.00vh'
		//         }
		//     },
		//     {
		//         from: 'doc-top + 160vp = top',
		// 		to: 'doc-top + 700vp = top',
		// 		cssFrom: {
		// 			opacity: 0.5,
		//         },
		//         cssTo:{
		//         	opacity: 0.8,
		//         }
		//     },
		//     {
		//         from: 'doc-top + 700vp = top',
		// 		to: 'doc-top + 800vp = top',
		// 		cssFrom: {
		// 			opacity: 0.8,
		//         },
		//         cssTo:{
		//         	opacity: 0,
		//         }
		//     },
		//     {
		// 		from: 'doc-top + 800vp = top',
		//         css:{
		//         	opacity: 0,
		//         }
		//     },
		// ]);
	} else {
		$('.main .wrap-menu').addClass('collapsed');
		$('body').scroolly([
		    {
		        from: 'doc-top = top',
				to: 'doc-bottom = bottom',
				cssFrom: {
		            'background-position': 'center 0.0%'
		        },
		        cssTo:{
		            'background-position': 'center 100.0%'
		        }
		    },
		]);
	}

	//Аякс отправка форм
	//Документация: http://api.jquery.com/jquery.ajax/
	$("form").submit(function() {
		event.preventDefault();
		var form = $(this);
		thanks(form);
		// $.ajax({
		// 	type: "POST",
		// 	url: "/",
		// 	data: form.serialize()
		// }).done(function() {
		// 	form.find('input:not([type="hidden"])').val('');
		// });
	});

	var $preloader = $('#p_prldr');
	setTimeout(function(){
		$preloader.find('.s1,.s2,.s3').hide();
		$preloader.find('.contpre svg').fadeOut();
		$preloader.delay(200).fadeOut('slow');
	}, 300);

});

(function() {
    var lastTime = 0;
    var vendors = ['ms', 'moz', 'webkit', 'o'];
    for(var x = 0; x < vendors.length && !window.requestAnimationFrame; ++x) {
        window.requestAnimationFrame = window[vendors[x]+'RequestAnimationFrame'];
        window.cancelAnimationFrame = window[vendors[x]+'CancelAnimationFrame'] 
                                   || window[vendors[x]+'CancelRequestAnimationFrame'];
    }
 
    if (!window.requestAnimationFrame)
        window.requestAnimationFrame = function(callback, element) {
            var currTime = new Date().getTime();
            var timeToCall = Math.max(0, 16 - (currTime - lastTime));
            var id = window.setTimeout(function() { callback(currTime + timeToCall); }, 
              timeToCall);
            lastTime = currTime + timeToCall;
            return id;
        };
 
    if (!window.cancelAnimationFrame)
        window.cancelAnimationFrame = function(id) {
            clearTimeout(id);
        };
}());

function thanks(form) {
	form.find('.cont').hide();
	form.find('.thanks').fadeIn('fast');
}

function changeColorMenu(ancor, from, to) {
	$('.main .burger span').scroolly([
	    {
	        from: 'con-top - 22vp = top',
			to: 'con-top - 10vp = top',
			cssFrom: {
	            'background-image': 'linear-gradient(to left, '+ from +')'
	        },
	        cssTo:{
	            'background-image': 'linear-gradient(to left, '+ to +')'
	        }
	    }
	], ancor);
}







function castParallax() {

	var opThresh = 350;
	var opFactor = 750;

	window.addEventListener("scroll", function(event){

		var top = this.pageYOffset;

		var layers = document.getElementsByClassName("parallax");
		var layer, speed, yPos;
		for (var i = 0; i < layers.length; i++) {
			layer = layers[i];
			speed = layer.getAttribute('data-speed');
			var yPos = -(top * speed / 100);
			layer.setAttribute('style', 'transform: translate3d(0px, ' + yPos + 'px, 0px)');

		}
	});


}


function castSmoothScroll() {
	$.srSmoothscroll({
		step: 80,
		speed: 300,
		ease: 'linear'
	});
}



function startSite() {

	var platform = navigator.platform.toLowerCase();
	var userAgent = navigator.userAgent.toLowerCase();

	
	if (platform.indexOf('win32') != -1 || platform.indexOf('linux') != -1)
	{
		castParallax();					
		if ($.browser.webkit)
		{
			castSmoothScroll();
		}
	}
	
	else
	{
		castParallax();
	}

}

document.body.onload = startSite();

