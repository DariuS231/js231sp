/*
type your custom JavaScript here

*/

var DARIUS231 = DARIUS231 || {};
DARIUS231.CORE = DARIUS231.CORE || {};

DARIUS231.CORE.Utils = (function ($) {
    "use strict";

    var popitup = function (url, height, width) {
        var newwindow = window.open(url, 'name', 'height=' + height + ',width=' + width);
        if (window.focus) { newwindow.focus() }
        return false;
    }

    return {
        Popitup: popitup
    };

})($);

DARIUS231.CORE.MySkills = function ($) {
    "use strict";

    var _path = document.querySelector('.stats-container .stat-path');
    var _dashLength = _path.getTotalLength();

    var setStatPosition = function (selector, offset) {
        $(selector).css({ "stroke-dasharray": _dashLength, "stroke-dashoffset": offset });
    }
    $(".stats-container .skills-tooltip").mouseenter(function () {
        var thisStat = $(this);
        var thisTooltip = thisStat.find(".skills-tooltiptext");
        var statPath = thisStat.find(".stat-path");
        var thisTooltipInner = thisTooltip.find("span");

        var dataPercentage = thisStat.attr("data-stat");
        var dataSoftware = thisStat.attr("data-soft");
        var dataColor = thisStat.attr("data-color");
        var dataPercentage = thisStat.attr("data-stat");

        statPath.css({ "transition": "1.2s cubic-bezier(0.35, 2, 0.35, 0.3)" });

        setStatPosition(statPath, (_dashLength - ((dataPercentage / 100) * _dashLength)))

        // thisTooltipInner.text(dataSoftware + " " + dataPercentage + "%");
        thisTooltipInner.text(dataSoftware);

        thisTooltip.css({ "background": dataColor, "color": dataColor });
    }).mouseleave(function () {
        setStatPosition($(this).find(".stat-path"), _dashLength);
    });

    setStatPosition('.stats-container .stat-path', _dashLength);
};

DARIUS231.CORE.ReadingProgress = (function ($) {
    "use strict";
    var progressBar, max;

    var setProgress = function () {
        var value = $(window).scrollTop();
        var perc = ((value / max) * 100).toFixed(3);

        progressBar.find('.value').attr('style', 'width:' + perc + '%;');
    };

    var init = function (selectors) {
        var winHeight = $(window).height();
        var docHeight = 0;
        for (var i = 0; i < selectors.length; i++) {
            var height = $(selectors[i]).height();
            if (!isNaN(height)) {
                docHeight += height;
            }

        }
        
        progressBar = $('.progress');

        max = docHeight - winHeight;

        $(document).on('scroll', setProgress);
        setProgress();
    }
    return { Init: init };
})($);


DARIUS231.CORE.Init = (function ($) {
    "use strict";
    $('[data-toggle="tooltip"]').tooltip();
})($);