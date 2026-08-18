/*
	Read Only by HTML5 UP
	html5up.net | @ajlkn
	Free for personal and commercial use under the CCA 3.0 license (html5up.net/license)
*/

(function($) {

	var $window = $(window),
		$body = $('body'),
		$header = $('#header'),
		$titleBar = null,
		$nav = $('#nav'),
		$wrapper = $('#wrapper');

	// Breakpoints.
		breakpoints({
			xlarge:   [ '1281px',  '1680px' ],
			large:    [ '1025px',  '1280px' ],
			medium:   [ '737px',   '1024px' ],
			small:    [ '481px',   '736px'  ],
			xsmall:   [ null,      '480px'  ],
		});

	// Play initial animations on page load.
		$window.on('load', function() {
			window.setTimeout(function() {
				$body.removeClass('is-preload');
			}, 100);
		});

	// Tweaks/fixes.

		// Polyfill: Object fit.
			if (!browser.canUse('object-fit')) {

				$('.image[data-position]').each(function() {

					var $this = $(this),
						$img = $this.children('img');

					// Apply img as background.
						$this
							.css('background-image', 'url("' + $img.attr('src') + '")')
							.css('background-position', $this.data('position'))
							.css('background-size', 'cover')
							.css('background-repeat', 'no-repeat');

					// Hide img.
						$img
							.css('opacity', '0');

				});

			}

	// Header Panel.

		// Nav.
			var $nav_a = $nav.find('a'),
				navLockTimeout = null;

			$nav_a
				.on('click', function() {

					var $this = $(this);

					// Not a link to a section on this page? Bail.
						if (!$this.hasClass('scrolly'))
							return;

					// Deactivate all links.
						$nav_a.removeClass('active');

					// Activate link *and* lock it (so the scroll spy doesn't try to activate other links as we're scrolling to this one's section).
						$this
							.addClass('active')
							.addClass('active-locked');

					// Drop the lock once Scrolly's animation is over, in case we never
					// arrive at the section (a link near the end of the page bottoms the
					// window out before its section gets to the top).
						window.clearTimeout(navLockTimeout);

						navLockTimeout = window.setTimeout(function() {

							$nav_a.removeClass('active-locked');
							updateNav();

						}, 1200);

				})
				.each(function() {

					var	$this = $(this),
						href = $this.attr('href'),
						hash = href.indexOf('#') > -1 ? href.substring(href.indexOf('#')) : '',
						$section = hash.length > 1 ? $(hash) : $();

					// No section for this link on this page? Bail (link navigates normally).
						if ($section.length < 1)
							return;

					// Point the link at this page's section so Scrolly can take over,
					// and hang on to the section so the scroll spy below can find it.
						$this
							.attr('href', hash)
							.addClass('scrolly')
							.data('section', $section);

					// Deactivate section.
						$section.addClass('inactive');

				});

		// Nav (scroll spy).
		// Highlights the link whose section the reader is currently on: the last one
		// starting above an imaginary line across the upper third of the viewport,
		// with the final link pinned once we reach the bottom of the page (a short
		// last section may never reach the line at all).
			var $spy_a = $nav_a.filter('.scrolly');

			if ($spy_a.length > 0) {

				var updateNav = function() {

					var scrollTop = $window.scrollTop(),
						viewportHeight = $window.height(),
						line = scrollTop + (viewportHeight * 0.35),
						$active = null,
						$locked;

					$spy_a.each(function() {

						var	$this = $(this),
							top = $this.data('section').offset().top;

						// Activate section once any part of it has been scrolled into view.
							if (scrollTop + viewportHeight > top)
								$this.data('section').removeClass('inactive');

						// Last section above the line wins; the first one covers anything above it.
							if (top <= line || $active === null)
								$active = $this;

					});

					// At the bottom of the page? The last section wins outright.
						if (scrollTop + viewportHeight >= $(document).height() - 2)
							$active = $spy_a.last();

					// A link is locked (we're mid-scroll to it)? Leave it be, and unlock
					// it once we've actually arrived at its section.
						$locked = $nav_a.filter('.active-locked');

						if ($locked.length > 0) {

							if ($locked.is($active))
								$locked.removeClass('active-locked');

							return;

						}

					$nav_a.removeClass('active');
					$active.addClass('active');

				};

				$window.on('scroll load resize', updateNav);
				updateNav();

			}

		// Title Bar.
			$titleBar = $(
				'<div id="titleBar">' +
					'<a href="#header" class="toggle"></a>' +
					'<span class="title">' + $('#logo').html() + '</span>' +
				'</div>'
			)
				.appendTo($body);

		// Panel.
			$header
				.panel({
					delay: 500,
					hideOnClick: true,
					hideOnSwipe: true,
					resetScroll: true,
					resetForms: true,
					side: 'right',
					target: $body,
					visibleClass: 'header-visible'
				});

	// Scrolly.
		$('.scrolly').scrolly({
			speed: 1000,
			offset: function() {

				if (breakpoints.active('<=medium'))
					return $titleBar.height();

				return 0;

			}
		});

})(jQuery);
