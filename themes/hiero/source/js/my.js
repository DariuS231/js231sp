/*
type your custom JavaScript here

*/

var JS231SP = JS231SP || {};
JS231SP.CORE = JS231SP.CORE || {};

JS231SP.CORE.Utils = (function ($) {
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

JS231SP.CORE.MySkills = function ($) {
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

JS231SP.CORE.ReadingProgress = (function ($) {
    "use strict";
    var winHeight, docHeight, progressBar, max, value;

    var setProgress = function () {
        value = $(window).scrollTop();
        var perc = ((value/max) * 100).toFixed(3);
        
        progressBar.find('.value').attr('style', 'width:' + perc + '%;');
    };

    var init = function () {
        

        winHeight = $(window).height();
        docHeight = $(document).height()
        progressBar = $('.progress')
        /* Set the max scrollable area */
        max = docHeight - winHeight;

        $(document).on('scroll', setProgress);
        setProgress();
    }
    return {
        Init: init
    }
})($);


JS231SP.CORE.Init = (function ($) {
    "use strict";
    $('[data-toggle="tooltip"]').tooltip();
})($);