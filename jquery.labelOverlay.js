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
$.fn.labelOverlay = function(options) {
  var opts = $.extend({}, $.fn.labelOverlay.defaults, options);

  return this.each(function() {
    var $this = $(this);

    // Support for the Metadata Plugin.
    var o = $.meta ? $.extend({}, opts, $this.data()) : opts;

	o.placeholderSupport = $.fn.labelOverlay.support();

	if(!o.placeholderSupport) {
		$this.data('id', $this.attr('id'));
		var $label = $('label[for=' + $this.data('id') + ']');
		$label.addClass(o.overlayedClass);
		if (!$this.val() === '') {
			label.hide();
		}
		$this
			.focus(function(e){
				var $this = $(e.target), $label = $('label[for=' + $this.data('id') + ']');
				$label.hide();
			})
			.blur(function(e){
				var $this = $(e.target), $label = $('label[for=' + $this.data('id') + ']');
				if ($this.val() == '') {
					$label.show();						
				}
			})
		;
	}
  });

  // private function for debugging
  function debug($obj) {
    if (window.console && window.console.log) {
      window.console.log($obj);
    }
  }
};

$.fn.labelOverlay.support = function() {
	if (window.Modernizr) {
		return Modernizr.input.placeholder;
	} else {
	  var i = document.createElement('input');
	  return 'placeholder' in i;	
	}
}

// default options
$.fn.labelOverlay.defaults = {
	placeholderSupport: false,
	overlayedClass: 'overlayed'
};

})(jQuery);
