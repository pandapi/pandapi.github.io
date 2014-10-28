
/* AUTOFILL SEARCH BOXES */
function autoFill(id, v){
	$(id).css({ color: "#b4b4b4" }).attr({ value: v }).focus(function(){
		if($(this).val()==v){
			$(this).val("").css({ color: "#333" });
		}
	}).blur(function(){
		if($(this).val()==""){
			$(this).css({ color: "#b4b4b4" }).val(v);
		}
	});
}

$('html').addClass('js');

$(document).ready( function(){

	/* UGA Branding Bar */
	$('#uga-quicklinks dl:last').addClass('last');

	$('#quicklinks a').css('display','block');

	$('#quicklinks a').toggle(function() {
		$('#uga-quicklinks').slideDown('slow', function () {
			$('#quicklinks a').css('background-position','84px 4px');
			$('#quicklinks a').attr('title', 'Hide UGA Quicklinks');
		});
	}, function() {
		$('#uga-quicklinks').slideUp('slow', function () {
			$('#quicklinks a').css('background-position','84px -26px');
			$('#quicklinks a').attr('title', 'View UGA Quicklinks');
		});
	});
	
	/* Article slideshow */
	
	$('#publications-slides').before('<div id="slideshow-nav" class="clearfix"><a id="slideshow-prev" title="Previous" href="#"></a> <span id="slideshow-current"></span> <a id="slideshow-next" title="Next" href="#"></a></div>').cycle({ 
		fx: 'scrollHorz', 
		speed: 'fast', 
		timeout: 0,
		next: '#slideshow-next',
		prev: '#slideshow-prev',
		before: slideshowBefore,
		after: slideshowAfter
	});
	
	$('#photo-slideshow ul').cycle({ 
		fx: 'scrollHorz', 
		speed: 'fast', 
		timeout: 0,
		next: '#photo-slideshow .next',
		prev: '#photo-slideshow .prev',
		before: slideshowBefore,
		after: photoSlideshowAfter
	});
	
	function slideshowAfter(curr,next,opts) {
		var slideshowCaption = (opts.currSlide + 1) + ' of ' + opts.slideCount;
		$('#slideshow-current').html(slideshowCaption);
	}
	
	function photoSlideshowAfter(curr,next,opts) {
		var slideshowCaption = (opts.currSlide + 1) + ' of ' + opts.slideCount;
		$('#photo-slideshow .curr').html(slideshowCaption);
	}
	
	function slideshowBefore(curr, next, opts, fwd){
		//get the height of the current slide
		var $ht = $(this).height();
		//set the container's height to that of the current slide
		$(this).parent().css({
			height: $ht
		});
	}

	
	/* mask input fields */
	autoFill($("#search-uga-input"), "Search UGA");
	
	
	/* NAVIGATION */
	$('#navigation li').hover(function() {
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	});
	
	/* Add text-resize controls */
	$('ul#navigation').after(
		'<dl id="text-resize" class="clearfix">'
			+ '<dt>TEXT SIZE:</dt>'
			+ '<dd id="text-small" title="Small Text">A</dd>'
			+ '<dd id="text-reset" title="Normal Text">A</dd>'
			+ '<dd id="text-large" title="Large Text">A</dd>'
		+ '</dl>'
	);

	/* Button hover/active states */
	$('#text-resize dd').hover(function(){
		$(this).addClass('hover');
	}, function() {
		$(this).removeClass('hover');
	}).click(function(){
		$('#text-resize dd').removeClass('active');
		$(this).addClass('active');
	});
	
	/* create cookie for text-resizer */
	var $textResizeCookie = "ugaToday_fontSize";
	
	/* get original font-size before Javascript */
	var originalFontSize = $('.content').css('font-size');
	
	/* if cookie exists, load saved value, otherwise store it */
		if($.cookie($textResizeCookie)) {
			var $getSize = $.cookie($textResizeCookie);
			$(".content").css({fontSize : $getSize + ($getSize.indexOf("px")!=-1 ? "" : "px")}); // IE fix for double "pxpx" error
			if($getSize > originalFontSize) {
				$('#text-resize dd#text-large').addClass('active');
			} else if($getSize < originalFontSize) {
				$('#text-resize dd#text-small').addClass('active');
			} else {
				$('#text-resize dd#text-reset').addClass('active');
			}
		} else {
			$.cookie($textResizeCookie, originalFontSize, { path: '/', expires: 365 });
			$('#text-resize dd#text-reset').addClass('active');
		};
	
	// Reset Font Size button
	$("#text-reset").click(function(){
		$('.content').css('font-size', '');
		$.cookie($textResizeCookie, originalFontSize, { path: '/', expires: 365 });
	});
	// Increase Font Size button
	$("#text-large").click(function(){
		var fontSizeNum = parseFloat(originalFontSize, 10);
		var newFontSize = fontSizeNum*1.2;
		$('.content').css('font-size', newFontSize);
		$.cookie($textResizeCookie, newFontSize, { path: '/', expires: 365 });
		return false;
	});
	// Decrease Font Size button
	$("#text-small").click(function(){
		var fontSizeNum = parseFloat(originalFontSize, 10);
		var newFontSize = fontSizeNum/1.2;
		$('.content').css('font-size', newFontSize);
		$.cookie($textResizeCookie, newFontSize, { path: '/', expires: 365 });
		return false;
	});
	
	/* Sidebar tabs */
	/*$("#audiences").tabs({
		collapsible: true,
		selected: -1
	});*/
	/*
	$("#site-access").tabs({
		collapsible: true,
		selected: 0
	});*/

	/* Sidebar collapsible */
	$('.collapsible .head').click(function() {
		$(this).next().animate({
			height: 'toggle',
			opacity: 'toggle'
		});
		return false;
	}).next()/* .hide() */;

	/* CATEGORY DROPDOWN */
	/* SELECT elements require 'change' not 'click' to work in all browsers */
	$("#sort-by-school-college").change(function() {
		window.location = $(this).val();
	});

	$("#sort-by-date").change(function() {
		window.location = $(this).val();
	});
	
	/* SEARCH DROPDOWN */
	$("#sitesearch .searchFilter").change(function(){
		val = $("#sitesearch .searchFilter").val();
		$(this).find("input[name='weblog']").attr("value",val);
	});
	
	
	/* DATE PICKER */
	var showEventsFromMonth = function(){
		var date = $("#datepicker").datepicker( 'getDate' );
		date = $.datepicker.formatDate('yy/mm/dd', date);
		window.location = '/archive/'+date;
	};
	
	$("#datepicker").datepicker({
		minDate: new Date('January 1, 1990'),
		changeMonth: true,
		changeYear: true,
		showAnim: 'fadeIn',
		dateFormat: 'y/mm/dd',
		maxDate: '+0d',
		navigationAsDateFormat: true
	}).datepicker('setDate', new Date ('October 10 2007'));
	
	/* KEYWORDS AUTOCOMPLETE */
	/*$( "#tags" ).autocomplete({
		source: function( request, response ) {
				$.ajax({
					url: "/index.php/autocomplete",
					dataType: "json",
					data: {term: request.term},
					type:"post",
					success: function( data ) {						
						response( $.map( data, function( item ) {							
							return {
								label: item.label,
								value: item.value
							}
						}));
					}
				});
			},
		minLength: 2,
		dataType: 'json',
		select: function( event, ui ) {
			$( "#term" ).val( ui.item.label );
			window.location.replace("/search/tagsearch/tag/" + ui.item.value);
			return false;
		}
	});*/
		
	/* PROFILE POPUP */
	var hideDelay = 500;
	var currentID;
	var hideTimer = null;
	var ajax = null;

	// hoverIntent mouseOver
	var showFunction = function(){
		if (hideTimer)
			clearTimeout(hideTimer);

		// format of 'rel' tag: pageid,personguid
		var settings = $(this).attr('rel').split(',');
		var entryID = settings[0];
		/* currentID = settings[1]; */

		// If no guid in url rel tag, don't popup blank
		if (currentID == '')
			return;

		var pos = $(this).offset();
		var width = $(this).width();
		var reposition = { left: (pos.left + width) + 'px', top: pos.top - 5 + 'px' };

		// If the same popup is already shown, then don't requery
		if (currentPosition.left == reposition.left && currentPosition.top == reposition.top)
			return;

		container.css({
			left: reposition.left,
			top: reposition.top
		});

		currentPosition = reposition;

		$('#personPopupContent').html('&nbsp;');

		if (ajax){
			ajax.abort();
			ajax = null;
		}

		$.ajax({
			url: '/index.php/directory/vcard/' + entryID,
			success: function(html){
				var text = $(html).find('.personPopupResult').html();
				$('#personPopupContent').html(html);
				container.animate({opacity: 'show'}, 'slow');
			}
		});
	};

	// hoverIntent mouseOut
	var hideFunction = function(){
		if (hideTimer)
			clearTimeout(hideTimer);
		hideTimer = setTimeout(function(){
			currentPosition = { left: '0px', top: '0px' };
			container.animate({opacity:'hide'}, 'slow');
		}, hideDelay);
	};
	
	// hoverIntent configuration
	var hoverIntentConfig = {
		sensitivity: 10, // number = sensitivity threshold (must be 1 or higher)
		interval: 200, // number = milliseconds for onMouseOver polling interval
		over: showFunction, // function = onMouseOver callback (REQUIRED)
		timeout: 500, // number = milliseconds delay before onMouseOut
		out: hideFunction // function = onMouseOut callback (REQUIRED)
	};
	
	var currentPosition = { left: '0px', top: '0px' };

	// One instance that's reused to show info for the current person
	var container = $('<div id="personPopupContainer">'
		+ '	<table width="" border="0" cellspacing="0" cellpadding="0" align="center" class="personPopupPopup">'
		+ '		<tr>'
		+ '			<td class="corner topLeft"></td>'
		+ '			<td class="top"></td>'
		+ '			<td class="corner topRight"></td>'
		+ '		</tr>'
		+ '		<tr>'
		+ '			<td class="left">&nbsp;</td>'
		+ '			<td><div id="personPopupContent" class="clearfix"></div></td>'
		+ '			<td class="right">&nbsp;</td>'
		+ '		</tr>'
		+ '		<tr>'
		+ '			<td class="corner bottomLeft">&nbsp;</td>'
		+ '			<td class="bottom">&nbsp;</td>'
		+ '			<td class="corner bottomRight"></td>'
		+ '		</tr>'
		+ '	</table>'
		+ '</div>');

	$('body').append(container);

	$('.personPopupTrigger').live('mouseover', function(){
		if (!$(this).data('hoverIntentAttached')){
			$(this).data('hoverIntentAttached', true);

			
			$(this).hoverIntent(hoverIntentConfig);

			// Fire mouseover so hoverIntent can start doing its magic
			$(this).trigger('mouseover');
		}
	});

	// Allow mouse over of details without hiding details
	$('#personPopupContainer').mouseover(function()
	{
		if (hideTimer)
			clearTimeout(hideTimer);
	});

	// Hide after mouseout
	$('#personPopupContainer').mouseout(function()
	{
		if (hideTimer)
			clearTimeout(hideTimer);
	});

	// Hide after mouseout
	$('#personPopupContainer').mouseout(hideFunction);
	/* END PROFILE POPUP */
	
	/* Remove '.fouc' from hidden items */
	$('.fouc').removeClass('fouc');
	
});
