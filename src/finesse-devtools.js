/**
 * @fileOverview Finesse development tool functions
 */

var finesse = finesse || {};
finesse.modules = finesse.modules || {};

finesse.modules.DevTools = (function ($) {

    var _containerServices = null;

    function _init() {
        if (!_containerServices) {
            _containerServices = finesse.containerservices.ContainerServices.init();
        }
    }

    return {

        getGadgetId: function() {
            _init();
            return _containerServices.getMyGadgetId();
        },

        getGadgetFrame: function() {
            _init();
            return $("#finesse_gadget_" + _containerServices.getMyGadgetId(), window.parent.document);
        },

        getGadgetTitle: function() {
            _init();
            return $("#finesse_gadget_" + _containerServices.getMyGadgetId() + "_title", window.parent.document);
        },

        reloadGadget: function() {
            _init();
            // Find the 'url' parameter within this gadget iframe's query string.
            // That will equal the URL configured for this gadget in the layout.
            parameters = (new RegExp('[?&]'+encodeURIComponent('url')+'=([^&]*)')).exec(location.search);
            url = decodeURIComponent(parameters[1]);

            // Adds a cache buster to force Finesse to reload the gadget from the URL.
            if (url.indexOf("?") > -1)
                url += "&";
            else
                url += "?";
            url += "busta=" + (new Date()).getTime();

            return _containerServices.reloadMyGadgetFromUrl(url);
        }

    };
}(jQuery));
