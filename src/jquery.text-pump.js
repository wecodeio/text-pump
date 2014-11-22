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

    $(window).on("resize",function(e){
      pumpDo(text);
    });

    pumpDo(text);

    function pumpDo(text) {
      text.css({'font-size': '1px'})
      var container = text.parent();

      var parSize = container.width();
      var curSize = text.width();
      var lastFontSize, newFontSize;
      var innerRatio = 0.5;
      while (1 - (curSize / parSize) > 0.05) {
        lastFontSize = newFontSize;
        var curFontSize = parseFloat(text.css('font-size'), 10);
        newFontSize = curFontSize * parSize/curSize * innerRatio;
        text.css({
          'font-size': newFontSize + 'px',
          'line-height': newFontSize + 'px',
          'overflow': 'visible'
        });
        parSize = container.width();
        curSize = text.width();
        curHeight = text.height();
        innerRatio += 0.01;
        if (settings.maxHeight && curHeight > settings.maxHeight ||
          1 - (curSize/parSize) < 0) {
          break;
        }
      }

      text.css({
        'font-size': lastFontSize * settings.ratio + 'px',
        'line-height': lastFontSize * settings.ratio + 'px',
        'overflow': 'visible'
      });
    }

  };
}(jQuery));
