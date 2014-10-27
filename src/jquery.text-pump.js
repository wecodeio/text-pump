/*
 * text-pump
 * 
 *
 * Copyright (c) 2014 Lucas Videla
 * Licensed under the MIT license.
 */

 (function ($) {

  $.fn.pump = function(options) {
    var settings = $.extend({
      ratio: 1
    }, options );

    var text = $(this);
    text.css({'font-size': '1px'})
    var container = $(this).parent();

    var parSize = container.width();
    var curSize = text.width();
    var lastFontSize, newFontSize;
    var innerRatio = 0.9;
    while (parSize / curSize - 1 > 0.05) {
      lastFontSize = newFontSize;
      var curFontSize = parseFloat(text.css('font-size'), 10);
      var sizeRatio = parSize / curSize;
      newFontSize = curFontSize * sizeRatio * innerRatio;
      text.css({
        'font-size': newFontSize + 'px',
        'line-height': newFontSize + 'px',
        'overflow': 'visible'
      });
      parSize = container.width();
      curSize = text.width();
      innerRatio += 0.01;
    }

    text.css({
      'font-size': lastFontSize * settings.ratio + 'px',
      'line-height': lastFontSize * settings.ratio + 'px',
      'overflow': 'visible'
    });

  };
}(jQuery));
