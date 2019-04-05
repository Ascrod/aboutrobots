/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

const { classes: Cc, interfaces: Ci, manager: Cm, utils: Cu } = Components;
Cm.QueryInterface(Ci.nsIComponentRegistrar);

Cu.import("resource://gre/modules/Services.jsm");
Cu.import("resource://gre/modules/XPCOMUtils.jsm");

var factory;
const ABOUTPAGE_DESCRIPTION = "about:robots";
const ABOUTPAGE_ID = "eac2da38-3e1e-449a-b93c-0d59b0db172b";
const ABOUTPAGE_WORD = "robots";
const ABOUTPAGE_URI = "chrome://aboutrobots/content/aboutRobots.xhtml";

function AboutRobots() { }

AboutRobots.prototype = Object.freeze({
  classDescription: ABOUTPAGE_DESCRIPTION,
  contractID: "@mozilla.org/network/protocol/about;1?what=" + ABOUTPAGE_WORD,
  classID: Components.ID("{" + ABOUTPAGE_ID + "}"),
  QueryInterface: XPCOMUtils.generateQI([Ci.nsIAboutModule]),

  getURIFlags: function(aURI) {
    return Ci.nsIAboutModule.ALLOW_SCRIPT;
  },

  newChannel: function(aURI, aLoadInfo) {
    let uri = Services.io.newURI(ABOUTPAGE_URI, null, null);
    let channel = Services.io.newChannelFromURIWithLoadInfo(uri, aLoadInfo);
    channel.originalURI = aURI;
    return channel;
  }
});

let NSGetFactory = XPCOMUtils.generateNSGetFactory([AboutRobots]);
