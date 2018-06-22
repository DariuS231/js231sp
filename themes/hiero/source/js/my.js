/*
type your custom JavaScript here

*/

var JS231SP = JS231SP || {};
JS231SP.CORE = JS231SP.CORE || {};

JS231SP.CORE.Utils = (function ($) {
    "use strict";

	var popitup = function (url, height, width) {
        var newwindow=window.open(url,'name','height=' + height + ',width=' + width);
        if (window.focus) {newwindow.focus()}
        return false;
    }

	return {
		Popitup: popitup
	};

})($);

JS231SP.CORE.Init = (function ($) {
    "use strict";
    $('[data-toggle="tooltip"]').tooltip();
})($);