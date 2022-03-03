$(function(){

	// ================== Table of Content =====================
	//
	// 		1. Common Javascript
	//			1.1 Loading Effect
	// 			1.2 Move to the Block
	//			1.3 Auto Scroll
	//			1.4 Escape Press
	//			1.5 Menu Open / Close
	//
	// ============================================================

	// =======================================
	//			1. Common Javascript
	// =======================================

		// ================================================================
		//			1.1 Loading Effect
		// ================================================================

		// ================================================================
		//			1.2 Move to the Block
		// ================================================================

			$('a[href^="#"]').on('click',function (e)
			{
				e.preventDefault();
				var target = this.hash;
				var $target = $(target);
				if(target) {
					$('html, body').stop().animate({
						'scrollTop': $target.offset().top - 120
					}, 'slow');
				}
			});

		// ================================================================
		//			1.3 Auto Scroll
		// ================================================================

			if(location.hash)
			{
				// var hash = location.hash;
				// window.scroll(0,0);
				// $("a[href="+hash+"]").click();
			}

		// ================================================================
		//			1.4 Escape Press
		// ================================================================

			$(document).keyup(function(e)
			{
               	if (e.keyCode == 27)
               	{
					closeSuccessPopUp();
					closeSuccessSupportPopUp();
					$('.faqs .results .questions p').removeClass('active');
					$('.faqs .results .answer').remove();
					$('#feedback-bg').fadeOut(200);
               	}
        	});

        // ================================================================
		//			1.5 Menu Open / Close
		// ================================================================

			var menuOpen = false;
			$('img#menuButton').on('click', function()
			{
				if(menuOpen) {
					closeMenu();
				}
				else {
					openMenu();
				}
			});

			const openMenu = () => {
				$('nav').animate(
				{
					"left": 0
				}, 200);
				$('.transparentMenuActive').fadeIn(200);
				menuOpen = true;
			};

			const closeMenu = () => {
				$('nav').animate(
				{
					"left": -220
				}, 200);
				$('.transparentMenuActive').fadeOut(200);
				menuOpen = false;
			};

			$('.transparentMenuActive').on('click', function()
			{
				closeMenu();
			});

		// ================================================================
		//			1.6 Sticky Menu
		// ================================================================

			var stickyNav = function()
			{
			    var scrollTop = $(window).scrollTop();
				if(scrollTop > 0)
				{
					$('header').addClass('fixed');
				} 
				else
				{
					$('header').removeClass('fixed');
				}
			};

			$(window).on("load scroll", function()
			{
				stickyNav();
			});

		// ================================================================
		//			1.7 Home Page
		// ================================================================

			const initializeParallax = (container, wrapper, element, maxLeft, maxTop) => {

				var $elem = $(element);
				var $container = $(container),
				container_w = $container.width(),
				container_h = $container.height();
				var $window = $(window);
				var windowWidth  = $window.width();
				var windowHeight = $window.height();

				if(windowWidth > 980)
				{
					$(wrapper).on('mousemove.parallax', function(event)
					{
						var pos_x = event.pageX,
						pos_y = event.pageY,
						left  = 0,
						top   = 0;
						left = container_w / 2 - pos_x;
						top  = container_h / 2 - pos_y;
						TweenMax.to(
							$elem, 2, 
							{ 
							css: { 
								transform: 'translateX(' + left / maxLeft + 'px) translateY(' + top / maxTop + 'px)' 
							}, 
							ease:Expo.easeOut, 
							overwrite: 'all' 
						});
					});
				}
			}

			if($('#home-landing').length) {
				initializeParallax('#home-landing', '#home-landing', '#home-landing img', 40, 20);
			}

			$(document).ready(function()
			{
				$('#bundles-slider').flexslider(
				{
					animation: "slide",
					controlsContainer: "#bundles-slider",
					animationLoop: false,
					slideshow: false,
					slideshowSpeed: 600,
					animationSpeed: 400,
					pauseOnHover: false,
					pauseOnAction: false,
					touch: true,
					controlNav: false,
					touch: true,
					maxItems: 1,
					minItems: 1,
					move: 1,
					itemMargin: 0,
					directionNav: true,
					useCSS: false,
					keyboard: false,
					multipleKeyboard: false
				});
			});

		// ================================================================
		//			1.11 Pages
		// ================================================================

				var windowWidth  = $(window).width();

			// ================================================================
			//			1.11.1 Home Page
			// ================================================================

				const homePageDefaultAnimation = () => {

					$('#home-landing img').velocity({
						transform: ["translateY(0)", "translateY(80px)"],
						opacity: 1
					}, {
						duration: 400,
						delay: 400
					});			
				};

				var homeMoNiceAnimation = true;

				const homePageAnimationOnScroll = () => {

					$(window).on("load scroll resize", function(){

						const windowHeight = $(window).height();
						const objectScrollTop = $(this).scrollTop();

						if($('.mo-nice').length && homeMoNiceAnimation) {
							const moNiceImg = $('.mo-nice img.man');
							const distance = moNiceImg.offset().top;
							const outer = moNiceImg.outerHeight();

							if (objectScrollTop > (distance + outer - windowHeight - 320)) {

								moNiceImg.velocity({
									transform: ["translateX(0)", "translateX(-80px)"],
									opacity: 1
								}, {
									duration: 400,
									delay: 400
								});
								homeMoNiceAnimation = false;
							};
						}
					});
				}

				if($('#home-landing').length && windowWidth > 980) {
					homePageDefaultAnimation();
					homePageAnimationOnScroll();
				}

			// ================================================================
			//			1.11.2 Bundles Page
			// ================================================================
				
				// ==== Tab Switch ====

				const scrollToBundlesSection = (elem) => {
					const windowWidth  = $(window).width();
					if(windowWidth < 981) {
						$('html, body').stop().animate({
							'scrollTop': elem.offset().top - 120
						}, 'slow');
						console.log('UO')
					}
				};

				$(document).on('click', '.bundle-tabs ul li', function(e){					
					$('.bundle-tabs ul li').removeClass('active');
					$(this).addClass('active');
					$('.bundle-tabs-content').removeClass('bundle-tabs-content-active');
					const datatab = $(this).attr('data-tab');
					$('#' + datatab + '-content').addClass('bundle-tabs-content-active');
					scrollToBundlesSection($('.bundle-tabs-content-active'));
				});

				// ==== Auto Click Tab ====

				if($('#bundlesPage').length) {
					if(location.hash) {
						var hash = location.hash;
						if($('.bundle-tabs ul li[data-tab=' + hash.substring(1) + ']').length) {
							$('.bundle-tabs ul li[data-tab=' + hash.substring(1) + ']').trigger('click');
						}
					}

					// ==== Load Bundles JSON

					var bundlesJson = {};
					let count = $('.bundle-tabs ul li').length;
					$('.bundle-tabs ul li').each(function(){
						let objectKey = $(this).attr('data-key');
						let customPostType = $(this).attr('data-custom-post-type');
						$.get(CustomAjax.ajaxurl,
							{
								'action': 'get_bundles_json',
								'post_type': customPostType
							},
							function(data){
								bundlesJson[objectKey] = JSON.parse(data);
								if (!--count) {
									stopLoadingBundlesPage();
								}
							}
						);
					});

					// ==== Load Bundles JSON
				}

				if($('#bundlesPage').length) {
					initializeParallax('.bundles-landing', '.bundles-landing', '.bundles-landing img', 100, 20);
				}
				
				const stopLoadingBundlesPage = () => {
					$('#loaderMain').fadeOut(200);
				}

				$(document).ready(function() {

					if($('#lte-bundles-slider-holder').length) {
						const minVal = parseInt($('#lte-bundles-slider-holder').attr('data-min-val'));
						const maxVal = parseInt($('#lte-bundles-slider-holder').attr('data-max-val'));
						const defMin = parseInt($('#lte-bundles-slider-holder').attr('data-def-min'));
						const defMax = parseInt($('#lte-bundles-slider-holder').attr('data-def-max'));

						$('#lte-bundles-slider-range').slider({
							range: true,
							min: minVal,
							max: maxVal,
							values: [ defMin, defMax ],
							slide: function( event, ui ) {
								$('#lte-bundles-slide-selected p.min').html('R' + ui.values[0] + '.00');
								$('#lte-bundles-slide-selected p.max').html('R' + ui.values[1] + '.00');
								debounceFunction(filterLTEBundlesData, 400);
							}
						});
						$('#lte-bundles-slide-selected p.min').html('R' + $('#lte-bundles-slider-range').slider("values", 0) + '.00');
						$('#lte-bundles-slide-selected p.max').html('R' + $('#lte-bundles-slider-range').slider("values", 1) + '.00');
					}

					if($('#freeme-bundles-slider-holder').length) {
						const minVal = parseInt($('#freeme-bundles-slider-holder').attr('data-min-val'));
						const maxVal = parseInt($('#freeme-bundles-slider-holder').attr('data-max-val'));
						const defMin = parseInt($('#freeme-bundles-slider-holder').attr('data-def-min'));
						const defMax = parseInt($('#freeme-bundles-slider-holder').attr('data-def-max'));

						$('#freeme-bundles-slider-range').slider({
							range: true,
							min: minVal,
							max: maxVal,
							values: [ defMin, defMax ],
							slide: function( event, ui ) {
								$('#freeme-bundles-slide-selected p.min').html('R' + ui.values[0] + '.00');
								$('#freeme-bundles-slide-selected p.max').html('R' + ui.values[1] + '.00');
								debounceFunction(filterFreemeBundlesData, 400);
							}
						});
						$('#freeme-bundles-slide-selected p.min').html('R' + $('#freeme-bundles-slider-range').slider("values", 0) + '.00');
						$('#freeme-bundles-slide-selected p.max').html('R' + $('#freeme-bundles-slider-range').slider("values", 1) + '.00');
					}

					if($('#data-bundles-slider-holder').length) {
						const minVal = parseInt($('#data-bundles-slider-holder').attr('data-min-val'));
						const maxVal = parseInt($('#data-bundles-slider-holder').attr('data-max-val'));
						const defMin = parseInt($('#data-bundles-slider-holder').attr('data-def-min'));
						const defMax = parseInt($('#data-bundles-slider-holder').attr('data-def-max'));

						$('#data-bundles-slider-range').slider({
							range: true,
							min: minVal,
							max: maxVal,
							values: [ defMin, defMax ],
							slide: function( event, ui ) {
								$('#data-bundles-slide-selected p.min').html('R' + ui.values[0] + '.00');
								$('#data-bundles-slide-selected p.max').html('R' + ui.values[1] + '.00');
								debounceFunction(filterDataBundlesData, 400);
							}
						});
						$('#data-bundles-slide-selected p.min').html('R' + $('#data-bundles-slider-range').slider("values", 0) + '.00');
						$('#data-bundles-slide-selected p.max').html('R' + $('#data-bundles-slider-range').slider("values", 1) + '.00');
					}

					if($('#voice-bundles-slider-holder').length) {
						const minVal = parseInt($('#voice-bundles-slider-holder').attr('data-min-val'));
						const maxVal = parseInt($('#voice-bundles-slider-holder').attr('data-max-val'));
						const defMin = parseInt($('#voice-bundles-slider-holder').attr('data-def-min'));
						const defMax = parseInt($('#voice-bundles-slider-holder').attr('data-def-max'));

						$('#voice-bundles-slider-range').slider({
							range: true,
							min: minVal,
							max: maxVal,
							values: [ defMin, defMax ],
							slide: function( event, ui ) {
								$('#voice-bundles-slide-selected p.min').html('R' + ui.values[0] + '.00');
								$('#voice-bundles-slide-selected p.max').html('R' + ui.values[1] + '.00');
								debounceFunction(filterVoiceBundlesData, 400);
							}
						});
						$('#voice-bundles-slide-selected p.min').html('R' + $('#voice-bundles-slider-range').slider("values", 0) + '.00');
						$('#voice-bundles-slide-selected p.max').html('R' + $('#voice-bundles-slider-range').slider("values", 1) + '.00');
					}

					if($('#social-bundles-slider-holder').length) {
						const minVal = parseInt($('#social-bundles-slider-holder').attr('data-min-val'));
						const maxVal = parseInt($('#social-bundles-slider-holder').attr('data-max-val'));
						const defMin = parseInt($('#social-bundles-slider-holder').attr('data-def-min'));
						const defMax = parseInt($('#social-bundles-slider-holder').attr('data-def-max'));

						$('#social-bundles-slider-range').slider({
							range: true,
							min: minVal,
							max: maxVal,
							values: [ defMin, defMax ],
							slide: function( event, ui ) {
								$('#social-bundles-slide-selected p.min').html('R' + ui.values[0] + '.00');
								$('#social-bundles-slide-selected p.max').html('R' + ui.values[1] + '.00');
								debounceFunction(filterSocialBundlesData, 400);
							}
						});
						$('#social-bundles-slide-selected p.min').html('R' + $('#social-bundles-slider-range').slider("values", 0) + '.00');
						$('#social-bundles-slide-selected p.max').html('R' + $('#social-bundles-slider-range').slider("values", 1) + '.00');
					}

					if($('#streaming-bundles-slider-holder').length) {
						const minVal = parseInt($('#streaming-bundles-slider-holder').attr('data-min-val'));
						const maxVal = parseInt($('#streaming-bundles-slider-holder').attr('data-max-val'));
						const defMin = parseInt($('#streaming-bundles-slider-holder').attr('data-def-min'));
						const defMax = parseInt($('#streaming-bundles-slider-holder').attr('data-def-max'));

						$('#streaming-bundles-slider-range').slider({
							range: true,
							min: minVal,
							max: maxVal,
							values: [ defMin, defMax ],
							slide: function( event, ui ) {
								$('#streaming-bundles-slide-selected p.min').html('R' + ui.values[0] + '.00');
								$('#streaming-bundles-slide-selected p.max').html('R' + ui.values[1] + '.00');
								debounceFunction(filterStreamingBundlesData, 400);
							}
						});
						$('#streaming-bundles-slide-selected p.min').html('R' + $('#streaming-bundles-slider-range').slider("values", 0) + '.00');
						$('#streaming-bundles-slide-selected p.max').html('R' + $('#streaming-bundles-slider-range').slider("values", 1) + '.00');
					}
				});

				// ==== Debounce ==== //

				let timerId;

				const debounceFunction = (func, delay) => {
					clearTimeout(timerId);
					timerId  =  setTimeout(func, delay)
				}

				// ==== Debounce ==== //

				const filterLTEBundlesData = () => {

					const min = $('#lte-bundles-slider-range').slider("values", 0);
					const max = $('#lte-bundles-slider-range').slider("values", 1);

					let result = bundlesJson.lte.filter(obj => obj.price_rand >= min && obj.price_rand < max );

					const validityChecked = [];
					$("input[name='lte-validity[]']:checked").each(function ()
					{
						validityChecked.push($(this).val());
					});

					if(validityChecked.length > 0) {
						result = result.filter(function(obj){
							return validityChecked.indexOf(obj.validity) > -1;
						});
					}

					let res = '';
					if(result.length == 0) {
						res = "<div class='oops'><p>Oops! We can't seem to find any bundles matching your filter settings.</p></div>";
					}
					else {
						$.each(result, (key, value) =>
						{
							res += '<div class="one">';
								res += '<div class="box">';
									res += '<p>SmartBroadband <strong>' + value.smart_broadband + 'GB</strong> Prepaid</p>';
									res += '<h1><span class="gradient-text"><span class="once-off">Once-Off</span>' + value.once_off + 'GB</span></h1>';
									res += '<div class="combo of-hid">';
										res += '<div class="t-a-c">';
											res += '<h4 class="color-blue">' + value.anytime_data + 'GB</h4>';
											res += '<p>Anytime Data</p>';
										res += '</div>';
										res += '<h3 class="gradient-text plus">+</h3>';
										res += '<div class="t-a-c">';
											res += '<h4 class="color-blue">' + value.night_surfer_data + 'GB</h4>';
											res += '<p>Night Surfer Data*</p>';
										res += '</div>';
									res += '</div>';
									res += '<div class="lower">';
										res += '<div class="inner">';
											res += '<p>FOR ONLY</p>';
											res += '<h1 class="color-blue">R' + value.price_rand + '.<span>' + value.price_cent + '</span></h1>';
											res += '<p class="validity">Valid for ' + value.validity + ' Days</p>';
										res += '</div>';
									res += '</div>';
								res += '</div>';
							res += '</div>';
						});
					}
					$('#lte-bundles-results').html(res);
					scrollToBundlesSection($('#lte-bundles-results'));
				}

				const filterFreemeBundlesData = () => {

					const min = $('#freeme-bundles-slider-range').slider("values", 0);
					const max = $('#freeme-bundles-slider-range').slider("values", 1);

					let result = bundlesJson.freeme.filter(obj => obj.price_rand >= min && obj.price_rand <= max );

					const validityChecked = [];
					$("input[name='freeme-validity[]']:checked").each(function ()
					{
						validityChecked.push($(this).val());
					});

					if(validityChecked.length > 0) {
						result = result.filter(function(obj) {
							return validityChecked.indexOf(obj.validity) > -1;
						});
					}

					const dataRangeChecked = [];
					$("input[name='freeme-data-range[]']:checked").each(function ()
					{
						dataRangeChecked.push($(this).val().split('-'));
					});

					if(dataRangeChecked.length > 0) {
						result = result.filter(function(obj) {
							return checkDataRange(dataRangeChecked, obj);
						});
					}

					let res = '';
					if(result.length == 0) {
						res = "<div class='oops'><p>Oops! We can't seem to find any bundles matching your filter settings.</p></div>";
					}
					else {
						$.each(result, (key, value) =>
						{
							res += '<div class="one">';
								res += '<div class="box of-hid">';
									res += '<div class="col-2-5 f-left">';
										res += '<p class="title">FreeMe Bundle</p>';
										res += '<h4 class="gradient-text">' + value.data + '</h4>';
										res += '<div class="lower">';
											res += '<div class="inner">';
												res += '<p>FOR ONLY</p>';
												res += '<h1 class="color-blue">R' + value.price_rand + '.<span>' + value.price_cent + '</span></h1>';
												if(value.validity == '61') {
													res += '<p class="validity-2">Valid for 61 Days (Anytime data)</p>';
													res += '<p class="validity-2">Valid for 31 Days (Added benefits) </p>';
												}
												else {
													res += '<p class="validity-2">Valid for ' + value.validity + ' Days</p>';	
												}
											res += '</div>';
										res += '</div>';
									res += '</div>';
									res += '<div class="col-3-5 f-left">';
										res += '<table>';
											res += '<tr><td><h5>' + value.anytime_data + '</h5><p>Anytime Data</p></td><td><h5>' + value.whatsapp_data + '</h5><p>WhatsApp Data</p></td></tr>';
											res += '<tr><td><h5>' + value.on_net_calls + '</h5><p>On-Net Calls</p></td><td><h5>' + value.any_network_minutes + '</h5><p>Any-Network Minutes</p></td></tr>';
											res += "<tr><td><h5>" + value.sms + "</h5><p>SMS's</p></td><td><h5>" + value.streaming + "</h5><p>Streaming</p></td></tr>";
										res += '</table>';
									res += '</div>';
								res += '</div>';
							res += '</div>';
						});
					}
					$('#freeme-bundles-results').html(res);
					scrollToBundlesSection($('#freeme-bundles-results'));
				}

				const checkDataRange = (rangeArray, obj) => {

					let inc = 0;
					for (let i = 0; i < rangeArray.length; i++) {
						if(parseInt(obj.data_mb) >= parseInt(rangeArray[i][0]) && parseInt(obj.data_mb) <= parseInt(rangeArray[i][1])){
							inc = inc + 1;
						}
					}
					if(inc > 0) {
						return true;
					}
					else {
						return false;
					}
				}

				const filterDataBundlesData = () => {

					const min = $('#data-bundles-slider-range').slider("values", 0);
					const max = $('#data-bundles-slider-range').slider("values", 1);

					let result = bundlesJson.data.filter(obj => obj.price_rand >= min && obj.price_rand <= max );

					const selectedDataBundleType = $("input[name='data-bundle-type']:checked").val();
					if(selectedDataBundleType) {
						result = result.filter(function(obj) {
							return obj.bundle_type == selectedDataBundleType;
						});
					}

					if(selectedDataBundleType !== 'nightSurfer') {
						
						let elementCheckboxes = '';
						if(selectedDataBundleType == 'timeBased') {
							elementCheckboxes = $("input[name='data-timebased-validity[]']:checked");
						}
						else {
							elementCheckboxes = $("input[name='data-onceoff-validity[]']:checked");
						}

						const validityChecked = [];
						elementCheckboxes.each(function ()
						{
							validityChecked.push($(this).val());
						});

						if(validityChecked.length > 0) {
							if(selectedDataBundleType == 'timeBased') {
								result = result.filter(function(obj) {
									return validityChecked.indexOf(obj.time) > -1;
								});
							}
							else {
								result = result.filter(function(obj) {
									return validityChecked.indexOf(obj.validity_month) > -1;
								});
							}
						}
					} else {
						result = result.filter(function(obj) {
							return obj.bundle_type == 'nightSurfer';
						});
					}

					let res = '';
					if(result.length == 0) {
						res = "<div class='oops'><p>Oops! We can't seem to find any bundles matching your filter settings.</p></div>";
					}
					else {
						$.each(result, (key, value) =>
						{
							res += '<div class="one">';
								res += '<div class="box">';
									if(value.bundle_type == 'timeBased'){
										res += '<div class="valid">' + value.time + '</div>';
									} else if(value.bundle_type == 'nightSurfer') {
										res += '<div class="valid">Night Surfer</div>';
									}
									else {
										res += '<p class="title"><strong>Once-Off</strong> Bundle</p>';
									}
									res += '<div class="pad">';
										res += '<div class="flex center-center">';
												res += '<div>';
													res += '<h3 class="gradient-text">' + value.data + '</h3>';
													if(value.split == 'TRUE') {
														res += '<p class="o-o">Once-Off</p>';
													}
													else {
														res += '<p class="o-o">Once-Off Anytime Data</p>';
													}
												res += '</div>';
										res += '</div>';
										if(value.split == 'TRUE') {
											res += '<div class="split">';
												res += '<div>';
													res += '<h4 class="gradient-text">' + value.split_anytime + '</h4>';
													res += '<p>Anytime Data</p>';
												res += '</div>';
												res += '<h5 class="plus gradient-text">+</h5>';
												res += '<div>';
													res += '<h4 class="gradient-text">' + value.split_nightsurfer + '</h4>';
													res += '<p>Night Surfer Data*</p>';
												res += '</div>';
											res += '</div>';
										}
										else {
											res += '<hr>';
										}
										res += '<div class="lower">';
											res += '<div class="inner">';
												res += '<p class="only">FOR ONLY</p>';
												res += '<h1 class="color-blue">R' + value.price_rand + '.<span>' + value.price_cent + '</span></h1>';
												if(value.bundle_type == 'onceOff') {
													res += '<p class="validity">Valid for ' + value.validity + '</p>';
												}
												else {
													if(value.bundle_type == 'nightSurfer') {
														res += '<p class="validity">Valid from ' + value.validity + '</p>';
													}
													else {
														if(value.time == 'Weekend') {
															res += '<p class="validity">Valid from ' + value.validity + '</p>';
														}
														else{
															res += '<p class="validity">Valid for ' + value.validity + '</p>';
														}
													}
												}												
											res += '</div>';
										res += '</div>';
									res += '</div>';
								res += '</div>';
							res += '</div>';
						});
					}
					$('#data-bundles-results').html(res);
					scrollToBundlesSection($('#data-bundles-results'));
				}

				const filterVoiceBundlesData = () => {

					const min = $('#voice-bundles-slider-range').slider("values", 0);
					const max = $('#voice-bundles-slider-range').slider("values", 1);

					let result = bundlesJson.voice.filter(obj => obj.price_rand >= min && obj.price_rand < max );

					let res = '';
					if(result.length == 0) {
						res = "<div class='oops'><p>Oops! We can't seem to find any bundles matching your filter settings.</p></div>";
					}
					else {
						$.each(result, (key, value) =>
						{
							res += '<div class="one">';
								res += '<div class="box">';

									res += '<div class="pad">';
										res += '<div class="flex center-center">';
											res += '<div>';
												res += '<h2 class="gradient-text">' + value.data + '</h2>';
												res += '<p class="o-o">Any Network Minutes</p>';
											res += '</div>';
										res += '</div>';
										res += '<hr>';
										res += '<div class="lower">';
											res += '<div class="inner">';
												res += '<p class="only">FOR ONLY</p>';
												res += '<h1 class="color-blue">R' + value.price_rand + '.<span>' + value.price_cent + '</span></h1>';
												res += '<p class="validity">Valid for 31 Days</p>';					
											res += '</div>';
										res += '</div>';
									res += '</div>';


								res += '</div>';
							res += '</div>';
						});
					}
					$('#voice-bundles-results').html(res);
					scrollToBundlesSection($('#voice-bundles-results'));
				}

				const filterSocialBundlesData = () => {
					
					const min = $('#social-bundles-slider-range').slider("values", 0);
					const max = $('#social-bundles-slider-range').slider("values", 1);

					let result = bundlesJson.social.filter(obj => obj.price_rand >= min && obj.price_rand < max );

					const validityChecked = [];
					$("input[name='social-validity[]']:checked").each(function ()
					{
						validityChecked.push($(this).val());
					});

					if(validityChecked.length > 0) {
						result = result.filter(function(obj){
							return validityChecked.indexOf(obj.total_hours) > -1;
						});
					}

					let res = '';
					if(result.length == 0) {
						res = "<div class='oops'><p>Oops! We can't seem to find any bundles matching your filter settings.</p></div>";
					}
					else {
						$.each(result, (key, value) =>
						{
							res += '<div class="one">';
								res += '<div class="box">';
									res += '<div class="valid">' + value.time + '</div>';
									res += '<div class="pad">';
										res += '<div class="flex center-center">';
											res += '<div>';
												res += '<h2 class="gradient-text">' + value.data + '</h2>';
												res += '<p class="o-o">Once-Off Social Data</p>';
											res += '</div>';
										res += '</div>';
										res += '<hr>';
										res += '<div class="lower">';
											res += '<div class="inner">';
												res += '<p class="only">FOR ONLY</p>';
												res += '<h1 class="color-blue">R' + value.price_rand + '.<span>' + value.price_cent + '</span></h1>';
												res += '<p class="validity">Valid for ' + value.validity + '</p>';					
											res += '</div>';
										res += '</div>';
									res += '</div>';

								res += '</div>';
							res += '</div>';
						});
					}
					$('#social-bundles-results').html(res);
					scrollToBundlesSection($('#social-bundles-results'));
				}

				const filterStreamingBundlesData = () => {
					
					const min = $('#streaming-bundles-slider-range').slider("values", 0);
					const max = $('#streaming-bundles-slider-range').slider("values", 1);

					let result = bundlesJson.social.filter(obj => obj.price_rand >= min && obj.price_rand < max );

					const validityChecked = [];
					$("input[name='streaming-validity[]']:checked").each(function ()
					{
						validityChecked.push($(this).val());
					});

					if(validityChecked.length > 0) {
						result = result.filter(function(obj){
							return validityChecked.indexOf(obj.total_hours) > -1;
						});
					}

					let res = '';
					if(result.length == 0) {
						res = "<div class='oops'><p>Oops! We can't seem to find any bundles matching your filter settings.</p></div>";
					}
					else {
						$.each(result, (key, value) =>
						{
							res += '<div class="one">';
								res += '<div class="box">';
									res += '<p class="title">Stream it <strong>' + value.time + '</strong></p>';
									res += '<div class="pad">';
										res += '<div class="flex center-center">';
											res += '<div>';
												res += '<h2 class="gradient-text">' + value.data + '</h2>';
												res += '<p class="o-o">Once-Off Streaming Data</p>';
											res += '</div>';
										res += '</div>';
										res += '<hr>';
										res += '<div class="lower">';
											res += '<div class="inner">';
												res += '<p class="only">FOR ONLY</p>';
												res += '<h1 class="color-blue">R' + value.price_rand + '.<span>' + value.price_cent + '</span></h1>';
												res += '<p class="validity">Valid for ' + value.time + '</p>';					
											res += '</div>';
										res += '</div>';
									res += '</div>';

								res += '</div>';
							res += '</div>';
						});
					}
					$('#streaming-bundles-results').html(res);
					scrollToBundlesSection($('#streaming-bundles-results'));
				}

				// ==== Trigger Filter

				$(document).on('change', '#lte-bundles-content input[type="checkbox"]', function(e){
					filterLTEBundlesData();
				});

				$(document).on('click', '#lte-bundles-content p.reset-filters', function(e){
					
					if($("#lte-bundles-content input[type='checkbox']:checked").length > 0) {
						$('#lte-bundles-content input[type="checkbox"]').prop('checked', false);
						setTimeout(() => {
							filterLTEBundlesData();
						}, 200)
					}
				});

				$(document).on('change', '#freeme-bundles-content input[type="checkbox"]', function(e){
					filterFreemeBundlesData();
				});

				$(document).on('click', '#freeme-bundles-content p.reset-filters', function(e){
					
					if($("#freeme-bundles-content input[type='checkbox']:checked").length > 0) {
						$('#freeme-bundles-content input[type="checkbox"]').prop('checked', false);
						setTimeout(() => {
							filterFreemeBundlesData();
						}, 200)
					}
				});

				$(document).on('change', 'input[name="data-timebased-validity[]"]', function(e){
					$('input[name="data-onceoff-validity[]"]').prop('checked', false);
					$('input[name="data-bundle-type"]').prop('checked', false);
					$('input#data-bundle-type-timebased').prop('checked', true);
				});

				$(document).on('change', 'input[name="data-onceoff-validity[]"]', function(e){
					$('input[name="data-timebased-validity[]"]').prop('checked', false);
					$('input[name="data-bundle-type"]').prop('checked', false);
					$('input#data-bundle-type-onceoff').prop('checked', true);
				});

				$(document).on('change', 'input[name="data-bundle-type"]', function(e){
					$('input[name="data-onceoff-validity[]"]').prop('checked', false);
					$('input[name="data-timebased-validity[]"]').prop('checked', false);
				});

				$(document).on('change', '#data-bundles-content input[type="checkbox"]', function(e){
					setTimeout(() => {
						filterDataBundlesData();
					}, 400);
				});

				$(document).on('change', '#data-bundles-content input[type="radio"]', function(e){
					setTimeout(() => {
						filterDataBundlesData();
					}, 400);
				});

				$(document).on('click', '#data-bundles-content p.reset-filters', function(e){
					
					if($("#data-bundles-content input[type='radio']:checked").length > 0) {
						$('#data-bundles-content input[type="radio"]').prop('checked', false);
						$('#data-bundles-content input[type="checkbox"]').prop('checked', false);
						setTimeout(() => {
							filterDataBundlesData();
						}, 200)
					}
				});

				$(document).on('change', '#social-bundles-content input[type="checkbox"]', function(e){
					filterSocialBundlesData();
				});

				$(document).on('click', '#social-bundles-content p.reset-filters', function(e){
					
					if($("#social-bundles-content input[type='checkbox']:checked").length > 0) {
						$('#social-bundles-content input[type="checkbox"]').prop('checked', false);
						setTimeout(() => {
							filterSocialBundlesData();
						}, 200)
					}
				});

				$(document).on('change', '#streaming-bundles-content input[type="checkbox"]', function(e){
					filterStreamingBundlesData();
				});

				$(document).on('click', '#streaming-bundles-content p.reset-filters', function(e){
					
					if($("#streaming-bundles-content input[type='checkbox']:checked").length > 0) {
						$('#streaming-bundles-content input[type="checkbox"]').prop('checked', false);
						setTimeout(() => {
							filterStreamingBundlesData();
						}, 200)
					}
				});

			// ================================================================
			//			1.11.3 RICA Page
			// ================================================================

				$(document).on('click', '.rica-questions ul li h5', function(e){
					$(this).parent().find('p').slideToggle(200);
					$(this).toggleClass('minus');
				});

				$(document).on('change', 'input[type="file"]', function(e){
					let initialString = $(this).parents().eq(1).find('p span').attr('data-tab');
					if($(this)[0].files.length) {
						$(this).parents().eq(1).find('p span').html($(this).prop("files").item(0).name)
					}
					else {
						$(this).parents().eq(1).find('p span').html(initialString);
					}					
				});

				const ricaPageDefaultAnimation = () => {
					
					const ricaNeeds = $('.rica-needs .all .one');
					let d = 400;
					ricaNeeds.each(function(){
						let elem = $(this);
						elem.velocity({
							transform: ["scale(1)", "scale(0.8)"],
							opacity: 1
						}, {
							duration: 400,
							delay: d
						});
						d = d + 100;
					});			
				};
	
				if($('.rica-needs').length && windowWidth > 980) {
					ricaPageDefaultAnimation();
				}

			// ================================================================
			//			1.11.4 Request a SIM Form Submit
			// ================================================================

				if($('#request-a-sim-form').length) {

					$('input#firstname').keyup(function() {
						const isValid = validateFirstName($(this).val());
						$('input#firstname')[0].setCustomValidity(isValid ? '' : 'First Name can be between 2 to 30 characters!');
					});
					$('input#surname').keyup(function() {
						const isValid = validateSurname($(this).val());
						$('input#surname')[0].setCustomValidity(isValid ? '' : 'Surname can be between 2 to 30 characters!');
					});
					$('input#contact-number').keyup(function() {
						const isValid = validateContactNumber($(this).val());
						$('input#contact-number')[0].setCustomValidity(isValid ? '' : 'Enter between 8 to 12 digits only!');
					});
				}

				const validateFirstName = (str) => {
					const regex = /^[a-zA-Z ]{2,30}$/;
					if(str) {
						return regex.test(str);
					} else {
						return false;
					}
				}

				const validateSurname = (str) => {
					const regex = /^[a-zA-Z ]{2,30}$/;
					if(str) {
						return regex.test(str);
					} else {
						return false;
					}
				}

				const validateContactNumber = (str) => {
					const regex = /^[0-9]{8,12}$/;
					if(str) {
						return regex.test(str);
					} else {
						return false;
					}
				}

			// ================================================================
			//			1.11.5 Request a SIM Continue
			// ================================================================

				if($('.request-a-sim-continue').length) {
					if($('#posted-data').length) {
						$('.request-a-sim-continue').find('input[name="customer_firstname"]').val($('#posted-data p.firstname').html());
						$('.request-a-sim-continue').find('input[name="customer_surname"]').val($('#posted-data p.surname').html());
						$('.request-a-sim-continue').find('input[name="customer_contactnumber"]').val($('#posted-data p.contact-number').html());
						$('.request-a-sim-continue').find('input[name="email"]').val($('#posted-data p.email').html());
						$('.request-a-sim-continue').find('input[name="delivery_address"]').val($('#posted-data p.delivery-address').html());
					}	
				}

				var sameUnclicked = true;

				$(document).on('click', '#sameAsCustomerDetails input', function(e){
					if(sameUnclicked){
						$('.request-a-sim-continue').find('input[name="recipient_firstname"]').val($('.request-a-sim-continue').find('input[name="customer_firstname"]').val());
						$('.request-a-sim-continue').find('input[name="recipient_surname"]').val($('.request-a-sim-continue').find('input[name="customer_surname"]').val());
						$('.request-a-sim-continue').find('input[name="recipient_contactnumber"]').val($('.request-a-sim-continue').find('input[name="customer_contactnumber"]').val());
						sameUnclicked = false;
					} else {
						$('.request-a-sim-continue').find('input[name="recipient_firstname"]').val('');
						$('.request-a-sim-continue').find('input[name="recipient_surname"]').val('');
						$('.request-a-sim-continue').find('input[name="recipient_contactnumber"]').val('');
						sameUnclicked = true;
					}
				});

				$(document).on('click', '#email-success img.close', function(e){
					closeSuccessPopUp();
				});

				const closeSuccessPopUp = () => {
					$('#email-success').fadeOut(200);
				}

				$(document).on('click', '#email-success .inner', function(e){
					if(e.target == this)
					{
						closeSuccessPopUp();
					}
				});

				// ==== Custom Handler after Request a SIM email is sent ==== //

				if($('.request-a-sim-continue').length) {
					let wpcf7Elm = document.querySelector('.wpcf7');
					wpcf7Elm.addEventListener('wpcf7mailsent', function( event ) 
					{
						$('#email-success').fadeIn(200);
					}, false );
				}

				// ==== Custom Handler after Request a SIM email is sent ==== //

		// ================================================================
		//			1.12 FAQs Page
		// ================================================================
			
			var faqsByCategory = [];

			$(document).on('click', '.faqs .all-categories button', function(e){
				$('.faqs .all-categories button').removeClass('active');
				const slug = $(this).attr('data-url');
				const self = $(this);
				$('#faq-loader').show();
				$('.faqs .results').html('');
				
				$.get(CustomAjax.ajaxurl,
					{
						'action': 'get_faq_by_category',
						'slug': slug
					},
					function(data){
						faqsByCategory = JSON.parse(data);
						let res = '<p><strong>What do you need help with?</strong></p>';
						res += '<hr/>';
						res += '<div class="questions">';
						$.each(JSON.parse(data), (key, value) =>
						{
							res += "<p class='q' data-id='" + value.ID + "'><span class='inner'>" + value.post_title + '</span></p>';
						});
						res += '</div>';
						$('.faqs .results').html(res);
						self.addClass('active');
						$('#faq-loader').hide();
					}
				);
			});

			$(document).on('click', '.faqs .results .questions p.q', function(e){
				$('.faqs .results .questions p').removeClass('active');
				$('.faqs .results .answer').remove();
				const self = $(this);
				const ID = self.attr('data-id');
				const result = faqsByCategory.find((q) => q.ID == ID);
				self.addClass('active');
				self.after("<div class='answer'><div class='close'></div><div class='inner'><h5 class='gradient-text'>Answer:</h5><div class='con'><p>" + result.post_content + "</p></div><br><p class='color-gray'><strong>Was this helpful?</strong></p><div class='feedback flex center-left'><div class='btns flex center-center'><div class='button'><button class='provide-feedback'>Yes</button></div><div class='button'><button class='provide-feedback'>No</button></div></div><div class='right'><p class='small'>Provide us with <span class='gradient-text provide-feedback' style='cursor: pointer;'>feedback</span></p></div></div></div></div>")
			});

			$(document).on('click', '.provide-feedback', function(e){
				$('#feedback-bg').fadeIn(200);
			});

			$(document).on('click', '.faqs .results .questions .answer .close', function(e){
				$('.faqs .results .questions .answer').hide();
				$('.faqs .results .questions p').removeClass('active');
			});

			$(document).on('click', '#feedback-bg img.close', function(e){
				$('#feedback-bg').fadeOut(200);
			});

			$(document).on('click', '#feedback-bg .inner', function(e){
				if(e.target == this)
				{
					$('#feedback-bg').fadeOut(200);
				}
			});
			
		// ================================================================
		//			1.13 LTE - Offering Page
		// ================================================================

			// ==== Tab Switch ====

			$(document).on('click', '.lte-offering-tabs ul li', function(e){					
				$('.lte-offering-tabs ul li').removeClass('active');
				$(this).addClass('active');
				$('.lte-offering-tabs-content').removeClass('lte-offering-tabs-content-active');
				const datatab = $(this).attr('data-tab');
				$('#' + datatab).addClass('lte-offering-tabs-content-active');
			});

			// ==== FAQs ====

			$(document).on('click', '.faq-list .list .one p.question', function(e){
				$(this).parent().find('.answer').slideToggle(200);
				$(this).toggleClass('minus');
			});

			const lteOfferingPageDefaultAnimation = () => {

				$('.lte-offering-landing h1').velocity({
					transform: ["translateX(0)", "translateX(80px)"],
					opacity: 1
				}, {
					duration: 400,
					delay: 400
				});
			};

			var lteOfferingPageAnimation = true;

			const lteOfferingPageAnimationOnScroll = () => {

				$(window).on("load scroll resize", function(){

					const windowHeight = $(window).height();
					const objectScrollTop = $(this).scrollTop();

					if($('.why-use-lte .img img').length && lteOfferingPageAnimation) {
						const moNiceImg = $('.why-use-lte .img img');
						const distance = moNiceImg.offset().top;
						const outer = moNiceImg.outerHeight();

						if (objectScrollTop > (distance + outer - windowHeight - 320)) {

							moNiceImg.velocity({
								transform: ["translateY(0)", "translateY(80px)"],
								opacity: 1
							}, {
								duration: 400,
								delay: 400
							});
							lteOfferingPageAnimation = false;
						};
					}
				});
			}

			if($('.lte-offering-landing').length && windowWidth > 980) {
				lteOfferingPageDefaultAnimation();
				lteOfferingPageAnimationOnScroll();
			}

		// ================================================================
		//			1.14 MoNice Page
		// ================================================================	
		
			const moNicePageDefaultAnimation = () => {

				$('.monice-offering-landing h1').velocity({
					transform: ["translateY(0)", "translateY(80px)"],
					opacity: 1
				}, {
					duration: 400,
					delay: 400
				});			
			};

			var moNicePageAnimation = true;

			const moNicePageAnimationOnScroll = () => {

				$(window).on("load scroll resize", function(){

					const windowHeight = $(window).height();
					const objectScrollTop = $(this).scrollTop();

					if($('.mo-info .left img').length && moNicePageAnimation) {
						const moNiceImg = $('.mo-info .left img');
						const distance = moNiceImg.offset().top;
						const outer = moNiceImg.outerHeight();

						if (objectScrollTop > (distance + outer - windowHeight - 320)) {

							moNiceImg.velocity({
								transform: ["translateX(0)", "translateX(-80px)"],
								opacity: 1
							}, {
								duration: 400,
								delay: 400
							});
							moNicePageAnimation = false;
						};
					}
				});
			}

			if($('.mo-info .left img').length && windowWidth > 980) {
				moNicePageDefaultAnimation();
				moNicePageAnimationOnScroll();
			}

		// ================================================================
		//			1.15 Tariff Plans
		// ================================================================	

			const tariffPlansPageDefaultAnimation = () => {
					
				const ricaNeeds = $('.tariff-plans-features .one');
				let d = 400;
				ricaNeeds.each(function(){
					let elem = $(this);
					elem.velocity({
						transform: ["scale(1)", "scale(0.8)"],
						opacity: 1
					}, {
						duration: 400,
						delay: d
					});
					d = d + 100;
				});			
			};

			if($('.tariff-plans-features').length && windowWidth > 980) {
				tariffPlansPageDefaultAnimation();
			}

		// ================================================================
		//			1.16 Support Page
		// ================================================================	

			let typesOfEnquiryFeedback = {
				"enquiry" : [
					"Product Enquiry",
					"Billing Enquiry",
					"Technical Enquiry",
					"RICA Assistance",
					"SIM Swop",
					"Porting Assistance",
					"Other"
				],
				"feedback" : [
					"Complaint",
					"Compliment"
				]
			}

			$(document).on('change', '#enquiryFeedbackSelect input[type="radio"]', function(e){
				console.log($(this).val());
				if($(this).val() == 'Feedback') {
					let res = '<option>Type of Feedback</option>';
					typesOfEnquiryFeedback.feedback.map((i) => {
						res += '<option value="' + i + '">' + i + '</option>';
					})
					$('select#enquiryFeedbackSelect').html(res);
				}
				else {
					let res = '<option>Type of Enquiry</option>';
					typesOfEnquiryFeedback.enquiry.map((i) => {
						res += '<option value="' + i + '">' + i + '</option>';
					})
					$('select#enquiryFeedbackSelect').html(res);
				}
			});

			if($('#supportPage').length) {
				let wpcf7Elm = document.querySelector('.wpcf7');
				wpcf7Elm.addEventListener('wpcf7mailsent', function( event ) 
				{
					$('#email-success-support').fadeIn(200);
				}, false );
			}

			$(document).on('click', '#email-success-support img.close', function(e){
				closeSuccessSupportPopUp();
			});

			const closeSuccessSupportPopUp = () => {
				$('#email-success-support').fadeOut(200);
			}
			
			$(document).on('click', '#email-success-support .inner', function(e){
				if(e.target == this)
				{
					closeSuccessSupportPopUp();
				}
			});

		// ================================================================
		//			1.17 FreeMe Offering Page
		// ================================================================	

			const freemeOfferingPageDefaultAnimation = () => {

				$('#freeme-offering-landing img').velocity({
					transform: ["translateY(0)", "translateY(80px)"],
					opacity: 1
				}, {
					duration: 400,
					delay: 600
				});		
			};

			if($('#freeme-offering-landing').length && windowWidth > 980) {
				freemeOfferingPageDefaultAnimation();
			}


			
});

