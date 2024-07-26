if (!self.define) {
    let s, e = {};
    const i = (i, n) => (i = new URL(i + ".js", n).href, e[i] || new Promise((e => {
        if ("document" in self) {
            const s = document.createElement("script");
            s.src = i, s.onload = e, document.head.appendChild(s)
        } else s = i, importScripts(i), e()
    })).then((() => {
        let s = e[i];
        if (!s) throw new Error(`Module ${i} didn’t register its module`);
        return s
    })));
    self.define = (n, l) => {
        const t = s || ("document" in self ? document.currentScript.src : "") || location.href;
        if (e[t]) return;
        let r = {};
        const u = s => i(s, t), a = {module: {uri: t}, exports: r, require: u};
        e[t] = Promise.all(n.map((s => a[s] || u(s)))).then((s => (l(...s), r)))
    }
}
define(["./workbox-aff5ef07"], (function (s) {
    "use strict";
    self.skipWaiting(), s.clientsClaim(), s.precacheAndRoute([{
        url: "assets/focus-visible-legacy-CdO5cX4I.js",
        revision: null
    }, {url: "assets/focus-visible-supuXXMI.js", revision: null}, {
        url: "assets/index-C0Y0EGyw.css",
        revision: null
    }, {url: "assets/index-DV5i74t8.js", revision: null}, {
        url: "assets/index-legacy-DZc4cbVA.js",
        revision: null
    }, {url: "assets/index9-C0EEhLpt.js", revision: null}, {
        url: "assets/index9-legacy-mcnziIXZ.js",
        revision: null
    }, {url: "assets/input-shims-BidG2ygy.js", revision: null}, {
        url: "assets/input-shims-legacy-CTC-LMB1.js",
        revision: null
    }, {url: "assets/ios.transition-Db5umY8m.js", revision: null}, {
        url: "assets/ios.transition-legacy-BDtze_3D.js",
        revision: null
    }, {url: "assets/md.transition-BfkXhTwU.js", revision: null}, {
        url: "assets/md.transition-legacy-C0n0f_KZ.js",
        revision: null
    }, {url: "assets/polyfills-legacy-BSUNZDwH.js", revision: null}, {
        url: "assets/status-tap-DFkPzWOt.js",
        revision: null
    }, {url: "assets/status-tap-legacy-DgW68Yxq.js", revision: null}, {
        url: "assets/swipe-back-legacy-DW7uPCLO.js",
        revision: null
    }, {url: "assets/swipe-back-NrDKocnd.js", revision: null}, {
        url: "assets/web-CrZMveBk.js",
        revision: null
    }, {url: "assets/web-legacy-D_zZr26d.js", revision: null}, {
        url: "index.html",
        revision: "1eb4a24e1ad082f2c4314eb8c4323adf"
    }, {url: "registerSW.js", revision: "1872c500de691dce40960bb85481de07"}, {
        url: "manifest.webmanifest",
        revision: "89bf542c8eb113b928d8a33eba2fa802"
    }], {}), s.cleanupOutdatedCaches(), s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html"))), s.registerRoute(/^https:\/\/firestore\.googleapis\.com\/*/, new s.NetworkFirst({
        cacheName: "firebase-cache",
        plugins: [new s.ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 2592e3
        }), new s.CacheableResponsePlugin({statuses: [0, 200]})]
    }), "GET"), s.registerRoute((({request: s}) => "document" === s.destination || "script" === s.destination || "style" === s.destination), new s.NetworkFirst({
        cacheName: "assets-cache",
        plugins: [new s.ExpirationPlugin({
            maxEntries: 50,
            maxAgeSeconds: 2592e3
        }), new s.CacheableResponsePlugin({statuses: [0, 200]})]
    }), "GET")
}));
