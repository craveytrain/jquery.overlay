/*
 * @description	This plugin overlays the specified string of text over the form element
 * @return {jQuery Object}
 * @param {Object} options
 * @type {jQuery Plugin Method}
 * @author Mike Cravey
 * @version 0.1	
 * (c)Copyright 2009, 2010 Mike Cravey
 * Licensed under the terms of the MIT license.
 */

;(function($) {
$.fn.overlay = function(options) {
  var opts = $.extend(true, {}, $.fn.overlay.defaults, options);

  return this.each(function() {
    var $this = $(this);

    // Support for the Metadata Plugin.
    var o = $.meta ? $.extend(true, {}, opts, $this.data()) : opts;

	o.placeholderSupport = $.fn.overlay.support();

	if(!o.placeholderSupport) {
		var $overlay;
		if (o.overlay.txt) {
			if ($(o.overlay.txt).length) {
				$overlay = o.overlay.txt;
			} else {
				$overlay = $('<div />').text(o.overlay.txt).appendTo($this.parent());
			}
		} else {
			$overlay = $('label[for=' + $this.attr('id') + ']');
		}
		$overlay.attr(o.overlay.attrs).data('input', $this);
		if (!$this.val() == '') {
			$overlay.hide();
		}
		$this
			.data('overlay', $overlay)
			.focus(function(e){
				var $this = $(e.target), $overlay = $this.data('overlay');
				$overlay.hide();
			})
			.blur(function(e){
				var $this = $(e.target), $overlay = $this.data('overlay');
				if ($this.val() == '') {
					$overlay.show();						
				}
			})
		;
		$overlay.click(function(e) {
			var $this = $(e.target), $input = $this.data('input');
			$input.focus();
		});
	}
  });

  // private function for debugging
  function debug($obj) {
    if (window.console && window.console.log) {
      window.console.log($obj);
    }
  }
};

$.fn.overlay.support = function() {
	if (window.Modernizr) {
		return Modernizr.input.placeholder;
	} else {
	  var i = document.createElement('input');
	  return 'placeholder' in i;	
	}
};

// default options
$.fn.overlay.defaults = {
	placeholderSupport: false,
	overlay: {
		txt: null,
		attrs: {
			class: 'overlayed'
		}
	}
};

})(jQuery);
