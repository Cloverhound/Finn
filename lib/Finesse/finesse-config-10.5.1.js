/**
 * @fileOverview Config object for gadgets within the Finesse desktop container.
 * The config object will contain items provided by the container page.
 *
 * @name Config
 * @requires gadgets.Prefs
 */

var finesse = finesse || {};
finesse.gadget = finesse.gadget || {};

/** @namespace */
finesse.gadget.Config = (function () {
    var _prefs = new gadgets.Prefs();

    /** @scope finesse.gadget.Config */
    return {
        authorization: _prefs.getString("authorization"),
        country: _prefs.getString("country"),
        language: _prefs.getString("language"),
        locale: _prefs.getString("locale"),
        host: _prefs.getString("host"),
        hostPort: _prefs.getString("hostPort"),
        extension: _prefs.getString("extension"),
        mobileAgentMode: _prefs.getString("mobileAgentMode"),
        mobileAgentDialNumber: _prefs.getString("mobileAgentDialNumber"),
        xmppDomain: _prefs.getString("xmppDomain"),
        pubsubDomain: _prefs.getString("pubsubDomain"),
        restHost: _prefs.getString("restHost"),
        scheme: _prefs.getString("scheme"),
        localhostFQDN: _prefs.getString("localhostFQDN"),
        localhostPort: _prefs.getString("localhostPort"),
        teamId: _prefs.getString("teamId"),
        teamName: _prefs.getString("teamName"),
        clientDriftInMillis: _prefs.getInt("clientDriftInMillis")
    };
}());

/** Assign to container namespace to have config available in both  */
finesse.container = finesse.container || {};
finesse.container.Config = finesse.container.Config || finesse.gadget.Config;