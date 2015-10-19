/**
 * @fileOverview Finesse development tools
 */

var finesse = finesse || {};
finesse.modules = finesse.modules || {};

finesse.modules.DevTools = (function ($) {

    return {

        _containerServices: null,

        _tabBadge: null,

        _init: false,

        init: function() {
            if (!this._containerServices) {
                this._containerServices = finesse.containerservices.ContainerServices.init();
                this._containerServices.addHandler(
                    finesse.containerservices.ContainerServices.Topics.ACTIVE_TAB,
                    this._onTabActive.bind(this)
                );
                this._containerServices.makeActiveTabReq();
            }
        },

        _onTabActive: function() {
            this.onTabActiveCallback();
        },

        onTabActiveCallback: function() {
            if (this._init)
                this.hideTabBadge();
            this._init = true;
        },

        showTabBadge: function(message) {
            if (this._tabBadge) {
                this._tabBadge.html(message);
            }
            else {
                this._tabBadge = $("<span class='badge' style='margin-left: 5px; padding: 1px 10px; padding-top: 3px; background-color: #0FA20F; color: white'>" + message + "</span>");
                finesse.modules.DevTools.getTabLinkElement().append(this._tabBadge)
            }
        },

        hideTabBadge: function() {
            if (this._tabBadge) {
                this._tabBadge.remove();
                this._tabBadge = null;
            }
        },

        getTabElement: function() {
            this.init();
            return $("#tab_" + this._containerServices.getMyTabId(), window.parent.document);
        },

        getTabLinkElement: function() {
            this.init();
            return $("#tablink_" + this._containerServices.getMyTabId(), window.parent.document);
        },

        isTabVisible: function() {
            this.init();
            return this._containerServices.tabVisible();
        },

        getGadgetId: function() {
            this.init();
            return this._containerServices.getMyGadgetId();
        },

        getGadgetFrame: function() {
            this.init();
            return $("#finesse_gadget_" + this._containerServices.getMyGadgetId(), window.parent.document);
        },

        getGadgetTitleElement: function() {
            this.init();
            return $("#finesse_gadget_" + this._containerServices.getMyGadgetId() + "_title", window.parent.document);
        },

        reloadGadget: function () {
            this.init();
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

            return this._containerServices.reloadMyGadgetFromUrl(url);
        },

        addDevToolsToGadget: function() {
            this.init();
            var debugPanel = $("<div style='float:right; margin-left: 40px;'></div>");
            var gadgetId = $("<span style='float:left'>" + "Gadget ID: " + this.getGadgetId() + "</span>");
            var reloadButton = $("<button style='margin-left: 10px; padding: 0px 5px; margin-top: -5px;' class='btn btn-primary btn-xs'>Reload</button>");
            var self = this;
            reloadButton.on("click", function() {
                self.reloadGadget();
            });
            debugPanel.append(gadgetId);
            debugPanel.append(reloadButton);
            this.getGadgetTitleElement().append(debugPanel);
        }

    };
}(jQuery));
