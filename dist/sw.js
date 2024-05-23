if (!self.define) {
    let s, e = {};
    const i = (i, l) => (i = new URL(i + ".js", l).href, e[i] || new Promise((e => {
        if ("document" in self) {
            const s = document.createElement("script");
            s.src = i, s.onload = e, document.head.appendChild(s)
        } else s = i, importScripts(i), e()
    })).then((() => {
        let s = e[i];
        if (!s) throw new Error(`Module ${i} didn’t register its module`);
        return s
    })));
    self.define = (l, n) => {
        const r = s || ("document" in self ? document.currentScript.src : "") || location.href;
        if (e[r]) return;
        let t = {};
        const u = s => i(s, r), o = {module: {uri: r}, exports: t, require: u};
        e[r] = Promise.all(l.map((s => o[s] || u(s)))).then((s => (n(...s), t)))
    }
}
define(["./workbox-3e911b1d"], (function (s) {
    "use strict";
    self.skipWaiting(), s.clientsClaim(), s.precacheAndRoute([{
        url: "assets/focus-visible-legacy-CdO5cX4I.js",
        revision: null
    }, {url: "assets/focus-visible-supuXXMI.js", revision: null}, {
        url: "assets/index-BoFVzllS.js",
        revision: null
    }, {url: "assets/index-DhKpJShq.css", revision: null}, {
        url: "assets/index-legacy-DoRt-uty.js",
        revision: null
    }, {url: "assets/index9-CR8uOyJB.js", revision: null}, {
        url: "assets/index9-legacy-DI9DZqOc.js",
        revision: null
    }, {url: "assets/input-shims-legacy-BJQWl90D.js", revision: null}, {
        url: "assets/input-shims-lOUYFE9Y.js",
        revision: null
    }, {url: "assets/ios.transition-Ccbxzk7S.js", revision: null}, {
        url: "assets/ios.transition-legacy-B4A8P3Lz.js",
        revision: null
    }, {url: "assets/md.transition-Cd3Dw6YY.js", revision: null}, {
        url: "assets/md.transition-legacy-dYguYAJI.js",
        revision: null
    }, {url: "assets/polyfills-legacy-BU0m1bgr.js", revision: null}, {
        url: "assets/status-tap-B7Z_EKTp.js",
        revision: null
    }, {url: "assets/status-tap-legacy-B0KENq02.js", revision: null}, {
        url: "assets/swipe-back-legacy-LIm8Epqw.js",
        revision: null
    }, {url: "assets/swipe-back-uO0hwQC3.js", revision: null}, {
        url: "index.html",
        revision: "6d06295b887d35cccbd3ef4b33751d9b"
    }, {url: "registerSW.js", revision: "1872c500de691dce40960bb85481de07"}, {
        url: "manifest.webmanifest",
        revision: "89bf542c8eb113b928d8a33eba2fa802"
    }], {}), s.cleanupOutdatedCaches(), s.registerRoute(new s.NavigationRoute(s.createHandlerBoundToURL("index.html")))
}));
