var R2Reader = function (t) {
  var e = {};

  function i(n) {
    if (e[n]) return e[n].exports;
    var s = e[n] = {i: n, l: !1, exports: {}};
    return t[n].call(s.exports, s, s.exports, i), s.l = !0, s.exports
  }

  return i.m = t, i.c = e, i.d = function (t, e, n) {
    i.o(t, e) || Object.defineProperty(t, e, {enumerable: !0, get: n})
  }, i.r = function (t) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {value: "Module"}), Object.defineProperty(t, "__esModule", {value: !0})
  }, i.t = function (t, e) {
    if (1 & e && (t = i(t)), 8 & e) return t;
    if (4 & e && "object" == typeof t && t && t.__esModule) return t;
    var n = Object.create(null);
    if (i.r(n), Object.defineProperty(n, "default", {
      enumerable: !0,
      value: t
    }), 2 & e && "string" != typeof t) for (var s in t) i.d(n, s, function (e) {
      return t[e]
    }.bind(null, s));
    return n
  }, i.n = function (t) {
    var e = t && t.__esModule ? function () {
      return t.default
    } : function () {
      return t
    };
    return i.d(e, "a", e), e
  }, i.o = function (t, e) {
    return Object.prototype.hasOwnProperty.call(t, e)
  }, i.p = "", i(i.s = 0)
}([function (t, e, i) {
  "use strict";
  i.r(e);

  class n {
    constructor() {
      this.store = {}
    }

    get(t) {
      const e = this.store[t] || null;
      return new Promise(t => t(e))
    }

    set(t, e) {
      return this.store[t] = e, new Promise(t => t())
    }
  }

  var s, o = function (t, e, i, n) {
    return new (i || (i = Promise))(function (s, o) {
      function a(t) {
        try {
          r(n.next(t))
        } catch (t) {
          o(t)
        }
      }

      function l(t) {
        try {
          r(n.throw(t))
        } catch (t) {
          o(t)
        }
      }

      function r(t) {
        t.done ? s(t.value) : new i(function (e) {
          e(t.value)
        }).then(a, l)
      }

      r((n = n.apply(t, e || [])).next())
    })
  };

  class a {
    constructor(t) {
      this.prefix = t.prefix;
      try {
        const e = t.prefix + "-" + String(Math.random());
        window.localStorage.setItem(e, "test"), window.localStorage.removeItem(e), this.fallbackStore = null
      } catch (t) {
        this.fallbackStore = new n
      }
    }

    getLocalStorageKey(t) {
      return this.prefix + "-" + t
    }

    get(t) {
      return o(this, void 0, void 0, function* () {
        let e = null;
        return e = this.fallbackStore ? yield this.fallbackStore.get(t) : window.localStorage.getItem(this.getLocalStorageKey(t)), new Promise(t => t(e))
      })
    }

    set(t, e) {
      return o(this, void 0, void 0, function* () {
        return this.fallbackStore ? yield this.fallbackStore.set(t, e) : window.localStorage.setItem(this.getLocalStorageKey(t), e), new Promise(t => t())
      })
    }
  }

  !function (t) {
    t[t.Uncached = 0] = "Uncached", t[t.UpdateAvailable = 1] = "UpdateAvailable", t[t.CheckingForUpdate = 2] = "CheckingForUpdate", t[t.Downloading = 3] = "Downloading", t[t.Downloaded = 4] = "Downloaded", t[t.Error = 5] = "Error"
  }(s || (s = {}));
  var l = function (t, e, i, n) {
    return new (i || (i = Promise))(function (s, o) {
      function a(t) {
        try {
          r(n.next(t))
        } catch (t) {
          o(t)
        }
      }

      function l(t) {
        try {
          r(n.throw(t))
        } catch (t) {
          o(t)
        }
      }

      function r(t) {
        t.done ? s(t.value) : new i(function (e) {
          e(t.value)
        }).then(a, l)
      }

      r((n = n.apply(t, e || [])).next())
    })
  };

  class r {
    static getManifest(t, e) {
      return l(this, void 0, void 0, function* () {
        const i = () => l(this, void 0, void 0, function* () {
          const i = yield window.fetch(t.href), n = yield i.json();
          return e && (yield e.set("manifest", JSON.stringify(n))), new r(n, t)
        }), n = () => l(this, void 0, void 0, function* () {
          try {
            yield i()
          } catch (t) {
          }
          return new Promise(t => t())
        });
        if (e) {
          const i = yield e.get("manifest");
          if (i) {
            n();
            const e = JSON.parse(i);
            return new r(e, t)
          }
        }
        return i()
      })
    }

    constructor(t, e) {
      this.metadata = t.metadata || {}, this.links = t.links || [], this.readingOrder = t.spine || t.readingOrder || [], this.resources = t.resources || [], this.tableOfContents = t.toc || [], this.landmarks = t.landmarks || [], this.pageList = t["page-list"] || [], this.manifestUrl = e
    }

    getStartLink() {
      return this.readingOrder.length > 0 ? this.readingOrder[0] : null
    }

    getPreviousSpineItem(t) {
      const e = this.getSpineIndex(t);
      return null !== e && e > 0 ? this.readingOrder[e - 1] : null
    }

    getNextSpineItem(t) {
      const e = this.getSpineIndex(t);
      return null !== e && e < this.readingOrder.length - 1 ? this.readingOrder[e + 1] : null
    }

    getSpineItem(t) {
      const e = this.getSpineIndex(t);
      return null !== e ? this.readingOrder[e] : null
    }

    getSpineIndex(t) {
      for (let e = 0; e < this.readingOrder.length; e++) {
        const i = this.readingOrder[e];
        if (i.href) {
          if (new URL(i.href, this.manifestUrl.href).href === t) return e
        }
      }
      return null
    }

    getTOCItem(t) {
      const e = (t, i) => {
        for (let n = 0; n < i.length; n++) {
          const s = i[n];
          if (s.href) {
            if (new URL(s.href, this.manifestUrl.href).href === t) return s
          }
          if (s.children) {
            const i = e(t, s.children);
            if (null !== i) return i
          }
        }
        return null
      };
      return e(t, this.tableOfContents)
    }
  }

  var h = function (t, e, i, n) {
    return new (i || (i = Promise))(function (s, o) {
      function a(t) {
        try {
          r(n.next(t))
        } catch (t) {
          o(t)
        }
      }

      function l(t) {
        try {
          r(n.throw(t))
        } catch (t) {
          o(t)
        }
      }

      function r(t) {
        t.done ? s(t.value) : new i(function (e) {
          e(t.value)
        }).then(a, l)
      }

      r((n = n.apply(t, e || [])).next())
    })
  };

  class d {
    constructor(t) {
      this.cacheStatus = s.Uncached, this.statusUpdateCallback = (() => {
      }), this.serviceWorkerUrl = t.serviceWorkerUrl || new URL("sw.js", t.manifestUrl.href), this.staticFileUrls = t.staticFileUrls || [], this.store = t.store, this.manifestUrl = t.manifestUrl;
      const e = window.location.protocol;
      this.areServiceWorkersSupported = !(!navigator.serviceWorker || !window.caches || "https:" !== e && "localhost" !== window.location.hostname)
    }

    enable() {
      return h(this, void 0, void 0, function* () {
        if (this.areServiceWorkersSupported && this.cacheStatus !== s.Downloaded) {
          this.cacheStatus = s.Downloading, this.updateStatus(), navigator.serviceWorker.register(this.serviceWorkerUrl.href);
          try {
            yield this.verifyAndCacheManifest(this.manifestUrl), this.cacheStatus = s.Downloaded, this.updateStatus()
          } catch (t) {
            this.cacheStatus = s.Error, this.updateStatus()
          }
        }
        return new Promise(t => t())
      })
    }

    verifyAndCacheManifest(t) {
      return h(this, void 0, void 0, function* () {
        yield navigator.serviceWorker.ready;
        try {
          const e = [t.href];
          for (const t of this.staticFileUrls) e.push(t.href);
          const i = [this.cacheManifest(t), this.cacheUrls(e, t)];
          for (const t of i) yield t;
          return new Promise(t => t())
        } catch (t) {
          return new Promise((e, i) => i(t))
        }
      })
    }

    cacheUrls(t, e) {
      return h(this, void 0, void 0, function* () {
        return (yield window.caches.open(e.href)).addAll(t.map(t => new URL(t, e.href).href))
      })
    }

    cacheManifest(t) {
      return h(this, void 0, void 0, function* () {
        const e = yield r.getManifest(t, this.store), i = [this.cacheSpine(e, t), this.cacheResources(e, t)];
        for (const t of i) yield t;
        return new Promise(t => t())
      })
    }

    cacheSpine(t, e) {
      return h(this, void 0, void 0, function* () {
        const i = [];
        for (const e of t.readingOrder) e.href && i.push(e.href);
        return yield this.cacheUrls(i, e)
      })
    }

    cacheResources(t, e) {
      return h(this, void 0, void 0, function* () {
        const i = [];
        for (const e of t.resources) e.href && i.push(e.href);
        return yield this.cacheUrls(i, e)
      })
    }

    onStatusUpdate(t) {
      this.statusUpdateCallback = t, this.updateStatus()
    }

    getStatus() {
      return this.cacheStatus
    }

    updateStatus() {
      this.statusUpdateCallback(this.cacheStatus)
    }
  }

  function c() {
    return document.documentElement.clientWidth
  }

  function u() {
    return document.documentElement.clientHeight
  }

  function p() {
    return c() !== window.innerWidth
  }

  class m {
    constructor() {
      this.pendingMouseEventStart = null, this.pendingMouseEventEnd = null, this.pendingTouchEventStart = null, this.pendingTouchEventEnd = null, this.onLeftTap = (() => {
      }), this.onMiddleTap = (() => {
      }), this.onRightTap = (() => {
      }), this.onBackwardSwipe = (() => {
      }), this.onForwardSwipe = (() => {
      }), this.onLeftArrow = (() => {
      }), this.onRightArrow = (() => {
      }), this.onLeftHover = (() => {
      }), this.onRightHover = (() => {
      }), this.onRemoveHover = (() => {
      }), this.onInternalLink = (() => {
      }), this.handleMouseEventStart = (t => {
        this.pendingMouseEventStart = t
      }), this.handleTouchEventStart = (t => {
        p() || 1 === t.changedTouches.length && (this.pendingTouchEventStart = t)
      }), this.handleMouseEventEnd = (t => {
        if (!this.pendingMouseEventStart) return;
        const e = window.devicePixelRatio, i = (this.pendingMouseEventStart.clientX - t.clientX) / e,
          n = (this.pendingMouseEventStart.clientY - t.clientY) / e;
        if (Math.abs(i) < m.CLICK_PIXEL_TOLERANCE && Math.abs(n) < m.CLICK_PIXEL_TOLERANCE) return this.pendingMouseEventEnd ? (this.pendingMouseEventStart = null, void(this.pendingMouseEventEnd = null)) : (this.pendingMouseEventStart = null, this.pendingMouseEventEnd = t, void setTimeout(this.handleClick, m.DOUBLE_CLICK_MS));
        this.pendingMouseEventEnd = null, this.pendingMouseEventStart = null
      }), this.handleTouchEventEnd = (t => {
        if (t.preventDefault(), p()) return;
        if (1 !== t.changedTouches.length) return;
        if (!this.pendingTouchEventStart) return;
        const e = this.pendingTouchEventStart.changedTouches[0], i = t.changedTouches[0];
        if (!e) return;
        const n = window.devicePixelRatio, s = (e.clientX - i.clientX) / n, o = (e.clientY - i.clientY) / n;
        if (Math.abs(s) < m.TAP_PIXEL_TOLERANCE && Math.abs(o) < m.TAP_PIXEL_TOLERANCE) return this.pendingTouchEventEnd ? (this.pendingTouchEventStart = null, void(this.pendingTouchEventEnd = null)) : t.timeStamp - this.pendingTouchEventStart.timeStamp > m.LONG_PRESS_MS ? (this.pendingTouchEventStart = null, void(this.pendingTouchEventEnd = null)) : (this.pendingTouchEventStart = null, this.pendingTouchEventEnd = t, void setTimeout(this.handleTap, m.DOUBLE_TAP_MS));
        if (this.pendingTouchEventEnd = null, t.timeStamp - this.pendingTouchEventStart.timeStamp > m.SLOW_SWIPE_MS) return void(this.pendingTouchEventStart = null);
        const a = (e.clientY - i.clientY) / (e.clientX - i.clientX);
        Math.abs(a) > .5 ? this.pendingTouchEventStart = null : (s < 0 ? this.onBackwardSwipe(t) : this.onForwardSwipe(t), this.pendingTouchEventStart = null)
      }), this.handleClick = (() => {
        if (!this.pendingMouseEventEnd) return;
        if (this.checkForLink(this.pendingMouseEventEnd)) return void(this.pendingMouseEventEnd = null);
        const t = this.pendingMouseEventEnd.clientX, e = window.innerWidth;
        t / e < .05 ? this.onLeftTap(this.pendingMouseEventEnd) : t / e > .95 ? this.onRightTap(this.pendingMouseEventEnd) : this.onMiddleTap(this.pendingMouseEventEnd), this.pendingMouseEventEnd = null
      }), this.handleTap = (() => {
        if (!this.pendingTouchEventEnd) return;
        if (this.checkForLink(this.pendingTouchEventEnd)) return this.handleLinks(this.pendingTouchEventEnd), void(this.pendingTouchEventEnd = null);
        const t = this.pendingTouchEventEnd.changedTouches[0];
        if (!t) return;
        const e = t.clientX, i = window.innerWidth;
        e / i < .05 ? this.onLeftTap(this.pendingTouchEventEnd) : e / i > .95 ? this.onRightTap(this.pendingTouchEventEnd) : this.onMiddleTap(this.pendingTouchEventEnd), this.pendingTouchEventEnd = null
      }), this.checkForLink = (t => {
        let e = t.target;
        for (; e && "body" !== e.tagName.toLowerCase();) {
          if ("a" === e.tagName.toLowerCase() && e.href) return e;
          e = e.parentElement
        }
        return null
      }), this.handleMouseMove = (t => {
        const e = t.clientX, i = window.innerWidth;
        e / i < .05 ? this.onLeftHover() : e / i > .95 ? this.onRightHover() : this.onRemoveHover()
      }), this.handleMouseLeave = (() => {
        this.onRemoveHover()
      }), this.handleLinks = (t => {
        const e = this.checkForLink(t);
        if (e) {
          const i = window.location.protocol === e.protocol && window.location.port === e.port && window.location.hostname === e.hostname,
            n = e.href.indexOf("#");
          i ? i && -1 !== n ? this.onInternalLink(t) : i && -1 === n && e.click() : (window.open(e.href, "_blank"), t.preventDefault(), t.stopPropagation())
        }
      }), this.handleKeyboard = (t => {
        37 === t.keyCode ? this.onLeftArrow(t) : 39 === t.keyCode ? this.onRightArrow(t) : 9 === t.keyCode && t.preventDefault()
      })
    }

    setupEvents(t) {
      if (null === t) throw"cannot setup events for null";
      t.addEventListener("touchstart", this.handleTouchEventStart.bind(this)), t.addEventListener("touchend", this.handleTouchEventEnd.bind(this)), t.addEventListener("mousedown", this.handleMouseEventStart.bind(this)), t.addEventListener("mouseup", this.handleMouseEventEnd.bind(this)), t.addEventListener("mouseenter", this.handleMouseMove.bind(this)), t.addEventListener("mousemove", this.handleMouseMove.bind(this)), t.addEventListener("mouseleave", this.handleMouseLeave.bind(this)), t.addEventListener("click", this.handleLinks.bind(this)), t.addEventListener("keydown", this.handleKeyboard.bind(this))
    }
  }

  function g(t, e) {
    return t.querySelector(e)
  }

  function f(t, e) {
    const i = g(t, e);
    if (i) return i;
    throw"required element " + e + " not found"
  }

  function v(t, e) {
    const i = function (t, e) {
      if (null === t) throw"parent element is null";
      return t.querySelector(e)
    }(t, e);
    if (i) return i;
    throw"required element " + e + " not found in iframe"
  }

  function w(t, e, i) {
    t.setAttribute(e, i)
  }

  function k(t, e) {
    t.removeAttribute(e)
  }

  m.CLICK_PIXEL_TOLERANCE = 10, m.TAP_PIXEL_TOLERANCE = 10, m.DOUBLE_CLICK_MS = 200, m.LONG_PRESS_MS = 500, m.DOUBLE_TAP_MS = 200, m.SLOW_SWIPE_MS = 500;
  const b = (t, e, i, n = "icon") => `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" role="img" class="${n}" aria-labelledBy="${t}">\n  <title id="${t}">${e}</title>\n  ${i}\n</svg>`,
    E = (t, e, i, n = "svgIcon use") => `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" class="${n}">\n  <defs>\n    <symbol id="${t}" viewBox="0 0 24 24">\n      <title>${e}</title>\n      ${i}\n    </symbol>\n  </defs>\n</svg>`,
    y = (t, e) => `<svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="${e}" role="img" aria-labelledby="${t}">\n  <use xlink:href="#${t}"></use>\n</svg>`,
    C = {
      checkOriginal: E("check-icon", "Checked", '<path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"/>'),
      checkDupe: y("check-icon", "checkedIcon"),
      closeOriginal: E("close-icon", "Close", '<path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"/>'),
      closeDupe: y("close-icon", "icon close inactive-icon"),
      error: b("error-icon", "Warning", '<path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>'),
      home: '<path d="M12 5.69l5 4.5V18h-2v-6H9v6H7v-7.81l5-4.5M12 3L2 12h3v8h6v-6h2v6h6v-8h3L12 3z"/>',
      expand: b("expand-icon", "Enter fullscreen", '<path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z"/>', "icon active-icon"),
      loading: b("loading-icon", "Loading", '<path d="M12 6v3l4-4-4-4v3c-4.42 0-8 3.58-8 8 0 1.57.46 3.03 1.24 4.26L6.7 14.8c-.45-.83-.7-1.79-.7-2.8 0-3.31 2.69-6 6-6zm6.76 1.74L17.3 9.2c.44.84.7 1.79.7 2.8 0 3.31-2.69 6-6 6v-3l-4 4 4 4v-3c4.42 0 8-3.58 8-8 0-1.57-.46-3.03-1.24-4.26z"/>'),
      menu: b("menu-icon", "Show and hide navigation bar", '<path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"/>', "icon menu open inactive-icon"),
      minimize: b("minimize-icon", "Exit fullscreen", '<path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z"/>', "icon inactive-icon"),
      next: b("next-icon", "Next Chapter", '<path d="M6.49 20.13l1.77 1.77 9.9-9.9-9.9-9.9-1.77 1.77L14.62 12l-8.13 8.13z"/>'),
      previous: b("previous-icon", "Previous Chapter", '<path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"/>'),
      settings: b("settings-icon", "Settings", '<path d="M19.43 12.98c.04-.32.07-.64.07-.98 0-.34-.03-.66-.07-.98l2.11-1.65c.19-.15.24-.42.12-.64l-2-3.46c-.09-.16-.26-.25-.44-.25-.06 0-.12.01-.17.03l-2.49 1c-.52-.4-1.08-.73-1.69-.98l-.38-2.65C14.46 2.18 14.25 2 14 2h-4c-.25 0-.46.18-.49.42l-.38 2.65c-.61.25-1.17.59-1.69.98l-2.49-1c-.06-.02-.12-.03-.18-.03-.17 0-.34.09-.43.25l-2 3.46c-.13.22-.07.49.12.64l2.11 1.65c-.04.32-.07.65-.07.98 0 .33.03.66.07.98l-2.11 1.65c-.19.15-.24.42-.12.64l2 3.46c.09.16.26.25.44.25.06 0 .12-.01.17-.03l2.49-1c.52.4 1.08.73 1.69.98l.38 2.65c.03.24.24.42.49.42h4c.25 0 .46-.18.49-.42l.38-2.65c.61-.25 1.17-.59 1.69-.98l2.49 1c.06.02.12.03.18.03.17 0 .34-.09.43-.25l2-3.46c.12-.22.07-.49-.12-.64l-2.11-1.65zm-1.98-1.71c.04.31.05.52.05.73 0 .21-.02.43-.05.73l-.14 1.13.89.7 1.08.84-.7 1.21-1.27-.51-1.04-.42-.9.68c-.43.32-.84.56-1.25.73l-1.06.43-.16 1.13-.2 1.35h-1.4l-.19-1.35-.16-1.13-1.06-.43c-.43-.18-.83-.41-1.23-.71l-.91-.7-1.06.43-1.27.51-.7-1.21 1.08-.84.89-.7-.14-1.13c-.03-.31-.05-.54-.05-.74s.02-.43.05-.73l.14-1.13-.89-.7-1.08-.84.7-1.21 1.27.51 1.04.42.9-.68c.43-.32.84-.56 1.25-.73l1.06-.43.16-1.13.2-1.35h1.39l.19 1.35.16 1.13 1.06.43c.43.18.83.41 1.23.71l.91.7 1.06-.43 1.27-.51.7 1.21-1.07.85-.89.7.14 1.13zM12 8c-2.21 0-4 1.79-4 4s1.79 4 4 4 4-1.79 4-4-1.79-4-4-4zm0 6c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2z"/>', "icon open"),
      toc: b("toc-icon", "Table of Contents", '<path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"/>', "icon open"),
      bookmarks: b("toc-icon", "Bookmarks", '<path d="M4,6H2v16h16v-2H4V6z"/><path d="M22,2H6v16h16V2z M20,12l-2.5-1.5L15,12V4h5V12z"/>', "icon open"),
      bookmark: b("toc-icon", "Bookmark", '<path d="M19,3H5v18l7-3l7,3V3z"/>', "icon open")
    };
  var S = function (t, e, i, n) {
    return new (i || (i = Promise))(function (s, o) {
      function a(t) {
        try {
          r(n.next(t))
        } catch (t) {
          o(t)
        }
      }

      function l(t) {
        try {
          r(n.throw(t))
        } catch (t) {
          o(t)
        }
      }

      function r(t) {
        t.done ? s(t.value) : new i(function (e) {
          e(t.value)
        }).then(a, l)
      }

      r((n = n.apply(t, e || [])).next())
    })
  };
  const L = (t, e, i) => `\n<a rel="up" href='${t}' aria-label="${i}" style="padding: 0px"><i class="material-icons white-text show-on-large">arrow_back_ios</i></a>\n`,
    M = (t, e, i) => `\n<a rel="up" href='${t}' aria-label="${i}">\n<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" aria-labelledby="up-label" preserveAspectRatio="xMidYMid meet" role="img" class="icon">\n    <title id="up-label">${e}</title>\n    ${C.home}\n</svg>\n<span class="setting-text up">${e}</span>\n</a>\n`,
    T = `\n  <main style="overflow: hidden" tabindex=-1 id="iframe-wrapper">\n    <div class="loading" style="display:none;">\n      ${C.loading}\n    </div>\n    <div class="error" style="display:none;">\n      <span>\n        ${C.error}\n      </span>\n      <span>There was an error loading this page.</span>\n      <button class="go-back">Go back</button>\n      <button class="try-again">Try again</button>\n    </div>\n    <div class="info top">\n      <span class="book-title"></span>\n    </div>\n    <iframe allowtransparency="true" title="ePub Reader" SCROLLING="no"></iframe>\n    <div class="info bottom">\n      <span class="chapter-position"></span>\n      <span class="chapter-title"></span>\n    </div>\n  </main>\n`,
    x = '\n<div class="controls-trigger">\n    <button class="trigger" aria-haspopup="true" aria-expanded="true">\n    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"\n        role="img" class="icon menu open inactive-icon" aria-labelledby="menu-icon">\n        <title id="menu-icon">Show and hide navigation bar</title>\n        <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6-1.41-1.41z"></path>\n    </svg>\n    </button>\n</div>\n<div class="controls">\n    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" class="svgIcon use">\n    <defs>\n        <symbol id="close-icon" viewBox="0 0 24 24">\n        <title>Close</title>\n        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z"></path>\n        </symbol>\n    </defs>\n    </svg>\n    <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" role="img" class="svgIcon use">\n    <defs>\n        <symbol id="check-icon" viewBox="0 0 24 24">\n        <title>Checked</title>\n        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm4.59-12.42L10 14.17l-2.59-2.58L6 13l4 4 8-8z"></path>\n        </symbol>\n    </defs>\n    </svg>\n    <ul class="links top active">\n    <li>\n        <button class="contents" aria-labelledby="contents-label" aria-haspopup="true" aria-expanded="false">\n        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"\n            role="img" class="icon open" aria-labelledby="toc-icon">\n            <title id="toc-icon">Table of Contents</title>\n            <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path>\n        </svg>\n        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"\n            role="img" aria-labelledby="close-icon">\n            <use xlink:href="#close-icon"></use>\n        </svg>\n        <span class="setting-text contents" id="contents-label">Contents</span>\n        </button>\n        <div class="contents-view controls-view inactive" aria-hidden="true"></div>\n    </li>\n    <li>\n        <button class="landmarks" aria-labelledby="landmarks-label" aria-haspopup="true" aria-expanded="false">\n        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"\n            role="img" class="icon open" aria-labelledby="toc-icon">\n            <title id="toc-icon">Landmarks</title>\n            <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path>\n        </svg>\n        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"\n            role="img" aria-labelledby="close-icon">\n            <use xlink:href="#close-icon"></use>\n        </svg>\n        <span class="setting-text landmarks" id="landmarks-label">Landmarks</span>\n        </button>\n        <div class="landmarks-view controls-view inactive" aria-hidden="true"></div>\n    </li>\n    <li>\n        <button class="pageList" aria-labelledby="pageList-label" aria-haspopup="true" aria-expanded="false">\n        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"\n            role="img" class="icon open" aria-labelledby="toc-icon">\n            <title id="toc-icon">Page List</title>\n            <path d="M3 9h14V7H3v2zm0 4h14v-2H3v2zm0 4h14v-2H3v2zm16 0h2v-2h-2v2zm0-10v2h2V7h-2zm0 6h2v-2h-2v2z"></path>\n        </svg>\n        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"\n            role="img" aria-labelledby="close-icon">\n            <use xlink:href="#close-icon"></use>\n        </svg>\n        <span class="setting-text pageList" id="landmarks-label">Page List</span>\n        </button>\n        <div class="pageList-view controls-view inactive" aria-hidden="true"></div>\n    </li>\n    <li>\n        <button class="notes" aria-labelledby="notes-label" aria-haspopup="true" aria-expanded="false">\n        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet"\n            role="img" class="icon open" aria-labelledby="toc-icon">\n            <title id="toc-icon">Notes</title>\n            <path d="M4,6H2v16h16v-2H4V6z"></path>\n            <path d="M22,2H6v16h16V2z M20,12l-2.5-1.5L15,12V4h5V12z"></path>\n        </svg>\n        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"\n            role="img" aria-labelledby="close-icon">\n            <use xlink:href="#close-icon"></use>\n        </svg>\n        <span class="setting-text notes" id="notes-label">Notes</span>\n        </button>\n        <div class="notes-view controls-view inactive" aria-hidden="true"></div>\n    </li>\n    <li>\n        <button class="bookmarks" aria-labelledby="bookmarks-label" aria-haspopup="true" aria-expanded="false">\n        <i class="material-icons icon open">collections_bookmark</i>\n        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"\n            role="img" aria-labelledby="close-icon">\n            <use xlink:href="#close-icon"></use>\n        </svg>\n        <span class="setting-text bookmarks" id="bookmarks-label">Bookmarks</span>\n        </button>\n        <div class="bookmarks-view controls-view inactive" aria-hidden="true"></div>\n    </li>\n    <li>\n        <button class="note" aria-labelledby="note-label" aria-haspopup="true" aria-expanded="false">\n        <i class="material-icons icon open">speaker_notes</i>\n        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"\n            role="img" aria-labelledby="close-icon">\n            <use xlink:href="#close-icon"></use>\n        </svg>\n        <span class="setting-text note" id="note-label">Add Note</span>\n        </button>\n        <div class="noteInputView controls-view inactive" aria-hidden="true">\n        <ul class="note-menu" role="menu">\n            <li>\n            <textarea name="text" wrap="soft" class="note-input" name="note-input" placeholder="type your note here"></textarea><br>\n            <button id="saveNote" class="saveNote">\n                <span>save note</span>\n            </button>\n            </li>\n        </ul>\n        </div>\n    </li>\n    <li>\n        <button id="saveBookmark" class="saveBookmark" aria-labelledby="bookmark-label" aria-haspopup="true" aria-expanded="false">\n        <i class="material-icons">bookmark</i>\n        <span class="setting-text bookmark" id="bookmark-label">Add Bookmark</span>\n        </button>\n    </li>\n    <li>\n        <button id="settings-control" class="settings" aria-labelledby="settings-label" aria-expanded="false"\n        aria-haspopup="true">\n        <i class="material-icons icon open">settings</i>\n        <svg xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="xMidYMid meet" class="icon close inactive-icon"\n            role="img" aria-labelledby="close-icon">\n            <use xlink:href="#close-icon"></use>\n        </svg>\n        <span class="setting-text settings" id="settings-label">Settings</span>\n        </button>\n        <div class="settings-view controls-view inactive" aria-hidden="true"></div>\n    </li>\n    </ul>\n</div>\n',
    P = '\n<div class="controls">\n  <ul class="links bottom active">\n    <li>\n        <a rel="prev" class="disabled" role="button" aria-labelledby="previous-label">\n            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" role="img" class="icon" aria-labelledby="previous-icon">\n            <title id="previous-icon">Previous Chapter</title>\n            <path d="M17.51 3.87L15.73 2.1 5.84 12l9.9 9.9 1.77-1.77L9.38 12l8.13-8.13z"></path>\n            </svg>\n        <span class="chapter-control" id="previous-label">Previous Chapter</span>\n        </a>\n    </li>\n    <li aria-label="chapters">Chapters</li>\n    <li>\n        <a rel="next" class="disabled" role="button" aria-labelledby="next-label">\n        <span class="chapter-control" id="next-label">Next Chapter</span>\n        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" role="img" class="icon" aria-labelledby="next-icon">\n            <title id="next-icon">Next Chapter</title>\n            <path d="M6.49 20.13l1.77 1.77 9.9-9.9-9.9-9.9-1.77 1.77L14.62 12l-8.13 8.13z"></path>\n        </svg>\n        </a>\n    </li>\n  </ul>\n</div>\n';

  class D {
    constructor(t, e = null, i, n = null, s = null, o = null, a = null, l = null, r = null, h = null, d = null, c = null, u = null, p = null, g = null, f = null, v = null, w = null, k = null, b = null) {
      this.upLink = null, this.fullscreen = null, this.canFullscreen = document.fullscreenEnabled || document.webkitFullscreenEnabled || document.mozFullScreenEnabled || document.msFullscreenEnabled, this.store = t, this.cacher = e, this.settings = i, this.annotator = n, this.publisher = s, this.serif = o, this.sans = a, this.day = l, this.sepia = r, this.night = h, this.paginator = d, this.scroller = c, this.eventHandler = u || new m, this.upLinkConfig = p, this.allowFullscreen = g, this.useDefaultHeader = f, this.useDefaultFooter = v, this.eventTarget = w, this.initialLastReadingPosition = k, this.initialAnnotations = b
    }

    static create(t) {
      return S(this, void 0, void 0, function* () {
        const e = new this(t.store, t.cacher || null, t.settings, t.annotator || null, t.publisher || null, t.serif || null, t.sans || null, t.day || null, t.sepia || null, t.night || null, t.paginator || null, t.scroller || null, t.eventHandler || null, t.upLink || null, t.allowFullscreen || null, t.useDefaultHeader || null, t.useDefaultFooter || null, t.eventTarget || null, t.initialLastReadingPosition || null, t.initialAnnotations || null);
        return yield e.start(t.mainElement, t.headerMenu, t.footerMenu, t.manifestUrl), e
      })
    }

    start(t, e, i, n) {
      return S(this, void 0, void 0, function* () {
        t.innerHTML = T, this.useDefaultHeader && (e.innerHTML = x), this.useDefaultFooter && (i.innerHTML = P), this.manifestUrl = n;
        try {
          if (this.iframe = f(t, "main#iframe-wrapper iframe"), this.loadingMessage = f(t, "div[class=loading]"), this.errorMessage = f(t, "div[class=error]"), this.tryAgainButton = f(t, "button[class=try-again]"), this.goBackButton = f(t, "button[class=go-back]"), this.infoTop = f(t, "div[class='info top']"), this.infoBottom = f(t, "div[class='info bottom']"), this.useDefaultHeader ? this.bookTitle = f(this.infoTop, "span[class=book-title]") : this.bookTitle = g(e, ".brand-logo"), this.chapterTitle = f(this.infoBottom, "span[class=chapter-title]"), this.chapterPosition = f(this.infoBottom, "span[class=chapter-position]"), this.contentsControl = g(e, "button.contents"), this.settingsControl = g(e, "button.settings"), this.landmarksControl = g(e, "button.landmarks"), this.pageListControl = g(e, "button.pageList"), this.saveNoteButton = g(e, "#saveNote"), this.addNoteControl = g(e, "button.note"), this.noteInputView = g(e, ".noteInputView"), this.saveBookmarkButton = g(e, "#saveBookmark"), this.bookmarksControl = g(e, "button.bookmarks"), this.bookmarksView = g(e, ".bookmarks-view"), this.notesControl = g(e, "button.notes"), this.notesView = g(e, ".notes-view"), this.links = g(e, "ul.links.top"), this.linksTopLeft = g(e, "#nav-mobile-left"), this.tocView = g(e, ".contents-view"), this.landmarksView = g(e, ".landmarks-view"), this.pageListView = g(e, ".pageList-view"), this.settingsView = g(e, ".settings-view"), this.menuControl = g(e, "button.trigger"), this.fullscreen = g(e, "#fullscreen-control"), this.linksBottom = g(i, "ul.links.bottom"), this.linksMiddle = g(i, "ul.links.middle"), this.nextChapterLink = g(i, "a[rel=next]"), this.previousChapterLink = g(i, "a[rel=prev]"), this.newPosition = null, this.newElementId = null, this.isBeingStyled = !0, this.isLoading = !0, this.setupEvents(), this.publisher && (this.publisher.bookElement = this.iframe), this.serif && (this.serif.bookElement = this.iframe), this.sans && (this.sans.bookElement = this.iframe), this.day && (this.day.bookElement = this.iframe), this.sepia && (this.sepia.bookElement = this.iframe), this.night && (this.night.bookElement = this.iframe), this.paginator && (this.paginator.bookElement = this.iframe), this.scroller && (this.scroller.bookElement = this.iframe), this.settingsView) {
            if (this.settings.renderControls(this.settingsView), this.settingsControl) {
              const t = this.settingsView.querySelectorAll("button");
              if (t && t.length > 0) {
                const e = t[t.length - 1];
                this.setupModalFocusTrap(this.settingsView, this.settingsControl, e)
              }
            }
            this.cacher && (this.cacher.onStatusUpdate(this.updateOfflineCacheStatus.bind(this)), this.enableOffline())
          }
          if (this.settings.onFontChange(this.updateFont.bind(this)), this.settings.onFontSizeChange(this.updateFontSize.bind(this)), this.settings.onViewChange(this.updateBookView.bind(this)), this.initialAnnotations) {
            var s = this.initialAnnotations.bookmarks || null, o = this.initialAnnotations.notes || null;
            s && this.annotator.initBookmarks(s), o && this.annotator.initNotes(o)
          }
          return this.initialLastReadingPosition && this.annotator.initLastReadingPosition(this.initialLastReadingPosition), yield this.loadManifest()
        } catch (t) {
          return console.log(t), new Promise((e, i) => i(t)).catch(() => {
          })
        }
      })
    }

    addEventListenerOptional(t, e, i) {
      t && t.addEventListener(e, i)
    }

    setupEvents() {
      this.iframe.addEventListener("load", this.handleIFrameLoad.bind(this));
      let t;
      window.addEventListener("resize", () => {
        clearTimeout(t), t = setTimeout(this.handleResize.bind(this), 200)
      }), this.addEventListenerOptional(this.previousChapterLink, "click", this.handlePreviousChapterClick.bind(this)), this.addEventListenerOptional(this.nextChapterLink, "click", this.handleNextChapterClick.bind(this)), this.addEventListenerOptional(this.contentsControl, "click", this.handleControlClick.bind(this, this.tocView, this.contentsControl)), this.addEventListenerOptional(this.landmarksControl, "click", this.handleControlClick.bind(this, this.landmarksView, this.landmarksControl)), this.addEventListenerOptional(this.pageListControl, "click", this.handleControlClick.bind(this, this.pageListView, this.pageListControl)), this.addEventListenerOptional(this.settingsControl, "click", this.handleSettingsClick.bind(this)), this.addEventListenerOptional(this.settingsView, "click", this.handleToggleLinksClick.bind(this)), this.addEventListenerOptional(this.addNoteControl, "click", this.handleBookmarkClick.bind(this)), this.addEventListenerOptional(this.saveBookmarkButton, "click", this.saveBookmark.bind(this)), this.addEventListenerOptional(this.saveNoteButton, "click", this.saveNote.bind(this)), this.addEventListenerOptional(this.bookmarksControl, "click", this.handleBookmarksClick.bind(this)), this.addEventListenerOptional(this.notesControl, "click", this.handleNotesClick.bind(this)), this.addEventListenerOptional(this.fullscreen, "click", this.toggleFullscreen.bind(this)), this.tryAgainButton.addEventListener("click", this.tryAgain.bind(this)), this.goBackButton.addEventListener("click", this.goBack.bind(this)), this.addEventListenerOptional(this.menuControl, "click", this.handleToggleLinksClick.bind(this)), this.addEventListenerOptional(this.contentsControl, "keydown", this.hideTOCOnEscape.bind(this)), this.addEventListenerOptional(this.tocView, "keydown", this.hideTOCOnEscape.bind(this)), this.addEventListenerOptional(this.settingsControl, "keydown", this.hideSettingsOnEscape.bind(this)), this.addEventListenerOptional(this.settingsView, "keydown", this.hideSettingsOnEscape.bind(this)), window.addEventListener("keydown", this.handleKeyboardNavigation.bind(this)), this.allowFullscreen && this.canFullscreen && (document.addEventListener("fullscreenchange", this.toggleFullscreenIcon.bind(this)), document.addEventListener("webkitfullscreenchange", this.toggleFullscreenIcon.bind(this)), document.addEventListener("mozfullscreenchange", this.toggleFullscreenIcon.bind(this)), document.addEventListener("MSFullscreenChange", this.toggleFullscreenIcon.bind(this))), this.addEventListenerOptional(this.addNoteControl, "keydown", this.hideBookmarkOnEscape.bind(this)), this.addEventListenerOptional(this.bookmarksControl, "keydown", this.hideBookmarksOnEscape.bind(this))
    }

    setupModalFocusTrap(t, e, i) {
      e.addEventListener("keydown", e => {
        if (this.isDisplayed(t)) {
          const t = 9 === e.keyCode, n = !!e.shiftKey;
          t && n && (i.focus(), e.preventDefault(), e.stopPropagation())
        }
      }), i.addEventListener("keydown", i => {
        if (this.isDisplayed(t)) {
          const t = 9 === i.keyCode, n = !!i.shiftKey;
          t && !n && (e.focus(), i.preventDefault(), i.stopPropagation())
        }
      })
    }

    handleKeyboardNavigation(t) {
      this.settings.getSelectedView() === this.paginator && (37 === t.keyCode ? this.handlePreviousPageClick(t) : 39 === t.keyCode && this.handleNextPageClick(t))
    }

    updateFont() {
      this.handleResize()
    }

    updateFontSize() {
      this.handleResize()
    }

    updateBookView() {
      const t = () => {
      };
      this.settings.getSelectedView() === this.paginator ? (document.body.onscroll = (() => {
      }), this.chapterTitle.style.display = "inline", this.chapterPosition.style.display = "inline", this.eventHandler && (this.eventHandler.onBackwardSwipe = this.handlePreviousPageClick.bind(this), this.eventHandler.onForwardSwipe = this.handleNextPageClick.bind(this), this.eventHandler.onLeftTap = this.handlePreviousPageClick.bind(this), this.eventHandler.onMiddleTap = this.handleToggleLinksClick.bind(this), this.eventHandler.onRightTap = this.handleNextPageClick.bind(this), this.eventHandler.onRemoveHover = this.handleRemoveHover.bind(this), this.eventHandler.onInternalLink = this.handleInternalLink.bind(this), this.eventHandler.onLeftArrow = this.handleKeyboardNavigation.bind(this), this.eventHandler.onRightArrow = this.handleKeyboardNavigation.bind(this)), this.useDefaultFooter ? this.isDisplayed(this.linksBottom) && this.toggleDisplay(this.linksBottom) : this.isDisplayed(this.linksBottom) || this.toggleDisplay(this.linksBottom), this.isDisplayed(this.linksMiddle) || this.toggleDisplay(this.linksMiddle)) : this.settings.getSelectedView() === this.scroller && (document.body.onscroll = (() => {
        this.saveCurrentReadingPosition(), this.scroller && this.scroller.atBottom() ? (this.isDisplayed(this.linksBottom) || this.toggleDisplay(this.linksBottom), this.isDisplayed(this.linksMiddle) || this.toggleDisplay(this.linksMiddle)) : this.isDisplayed(this.linksBottom) && !this.isDisplayed(this.links) && this.toggleDisplay(this.linksBottom)
      }), this.chapterTitle.style.display = "none", this.chapterPosition.style.display = "none", this.eventHandler && (this.eventHandler.onBackwardSwipe = t, this.eventHandler.onForwardSwipe = t, this.eventHandler.onLeftTap = this.handleToggleLinksClick.bind(this), this.eventHandler.onMiddleTap = this.handleToggleLinksClick.bind(this), this.eventHandler.onRightTap = this.handleToggleLinksClick.bind(this), this.eventHandler.onLeftHover = t, this.eventHandler.onRightHover = t, this.eventHandler.onRemoveHover = t, this.eventHandler.onInternalLink = t, this.eventHandler.onLeftArrow = t, this.eventHandler.onRightArrow = t, this.handleRemoveHover()), this.useDefaultFooter ? this.isDisplayed(this.links) && !this.isDisplayed(this.linksBottom) && this.toggleDisplay(this.linksBottom) : this.isDisplayed(this.linksBottom) || this.toggleDisplay(this.linksBottom), this.isDisplayed(this.linksMiddle) || this.toggleDisplay(this.linksMiddle)), setTimeout(() => {
        this.updatePositionInfo()
      }, 100)
    }

    enableOffline() {
      this.cacher && this.cacher.getStatus() !== s.Downloaded && this.cacher.enable()
    }

    updateOfflineCacheStatus(t) {
      const e = this.settings.getOfflineStatusElement();
      let i = "";
      t === s.Uncached ? i = "" : t === s.UpdateAvailable ? i = "A new version is available. Refresh to update." : t === s.CheckingForUpdate ? i = "Checking for update." : t === s.Downloading ? i = "Downloading..." : t === s.Downloaded ? i = "Downloaded for : use" : t === s.Error && (i = "Error downloading for offline use"), e && (e.innerHTML = i)
    }

    loadManifest() {
      return S(this, void 0, void 0, function* () {
        try {
          const e = (t, i, n, s = !1) => {
              var o, a;
              n && (o = n, t instanceof HTMLDivElement && (a = t));
              var l = document.createElement("ul");
              s && (l = document.createElement("ol"));
              let r = null;
              for (const t of i) {
                const i = document.createElement("li"), n = document.createElement("a"),
                  s = document.createElement("span");
                n.style.display = "block", n.style.whiteSpace = "nowrap", n.style.overflow = "hidden", n.style.textOverflow = "ellipsis", n.tabIndex = -1;
                let o = "";
                t.href ? (o = new URL(t.href, this.manifestUrl.href).href, n.href = o, n.innerHTML = t.title || "", i.appendChild(n)) : (s.innerHTML = t.title || "", i.appendChild(s)), t.children && t.children.length > 0 && e(i, t.children, null, !0), l.appendChild(i), r = n
              }
              r && o && this.setupModalFocusTrap(a, o, r), l.addEventListener("click", t => {
                if (t.preventDefault(), t.stopPropagation(), t.target && "a" === t.target.tagName.toLowerCase()) {
                  let e = t.target;
                  if (-1 !== e.className.indexOf("active")) this.hideView(a, o); else {
                    o && o.focus();
                    const t = {href: e.href, locations: {progression: 0}, created: new Date, title: e.title};
                    this.hideView(a, o), this.navigate(t)
                  }
                }
              }), t.appendChild(l)
            }, i = yield r.getManifest(this.manifestUrl, this.store), n = i.tableOfContents, s = i.landmarks,
            o = i.pageList;
          if (this.tocView && (n.length ? (this.contentsControl && (this.contentsControl.className = "contents"), e(this.tocView, n, this.contentsControl)) : this.tocView.parentElement.parentElement.removeChild(this.tocView.parentElement)), this.pageListView && (o.length ? (this.pageListControl && (this.pageListControl.className = "pageList"), e(this.pageListView, o, this.pageListControl)) : this.pageListView.parentElement.parentElement.removeChild(this.pageListView.parentElement)), this.landmarksView && (s.length ? (this.landmarksControl && (this.landmarksControl.className = "landmarks"), e(this.landmarksView, s, this.landmarksControl)) : this.landmarksView.parentElement.parentElement.removeChild(this.landmarksView.parentElement)), this.useDefaultHeader || (this.showBookmarks(), this.showNotes()), (this.links || this.linksTopLeft) && this.upLinkConfig && this.upLinkConfig.url) {
            const e = this.upLinkConfig.url, i = this.upLinkConfig.label || "", n = this.upLinkConfig.ariaLabel || i;
            var t = M(e.href, i, n);
            this.useDefaultHeader || (t = L(e.href, i, n));
            const s = document.createElement("li");
            s.classList.add("uplink-wrapper"), s.innerHTML = t, this.links ? (this.links.insertBefore(s, this.links.firstChild), this.upLink = f(this.links, "a[rel=up]")) : (this.linksTopLeft.insertBefore(s, this.linksTopLeft.firstChild), this.upLink = f(this.linksTopLeft, "a[rel=up]"))
          }
          if (this.links && this.allowFullscreen && this.canFullscreen) {
            const t = `<button id="fullscreen-control" class="fullscreen" aria-hidden="false">${C.expand} ${C.minimize}</button>`,
              e = document.createElement("li");
            e.innerHTML = t, this.links.appendChild(e), this.fullscreen = f(this.links, "#fullscreen-control"), this.fullscreen.addEventListener("click", this.toggleFullscreen.bind(this))
          }
          let a = null;
          this.annotator && (a = yield this.annotator.getLastReadingPosition());
          const l = i.getStartLink();
          let h = null;
          if (l && l.href && (h = new URL(l.href, this.manifestUrl.href).href), a) this.navigate(a); else if (h) {
            const t = {href: h, locations: {progression: 0}, created: new Date, title: l.title};
            this.navigate(t)
          }
          return new Promise(t => t())
        } catch (t) {
          return this.abortOnError(), new Promise((e, i) => i(t)).catch(() => {
          })
        }
      })
    }

    handleIFrameLoad() {
      return S(this, void 0, void 0, function* () {
        this.errorMessage.style.display = "none", this.showLoadingMessageAfterDelay();
        try {
          this.useDefaultHeader && this.hideView(this.tocView, this.contentsControl);
          let t = 0;
          this.newPosition && (t = this.newPosition.locations.progression, this.newPosition = null), this.updateFont(), this.updateFontSize(), this.updateBookView(), this.settings.getSelectedFont().start(), this.settings.getSelectedTheme().start(), this.settings.getSelectedView().start(t), setTimeout(() => {
            this.settings.getSelectedView().goToPosition(t), this.updatePositionInfo()
          }, 100), this.newElementId && (this.settings.getSelectedView().goToElement(this.newElementId), this.newElementId = null);
          let e = this.iframe.src;
          if (this.iframe.contentDocument && this.iframe.contentDocument.location && this.iframe.contentDocument.location.href && (e = this.iframe.contentDocument.location.href), -1 !== e.indexOf("#")) {
            const t = e.slice(e.indexOf("#") + 1);
            return this.newElementId = t, this.iframe.src = e.slice(0, e.indexOf("#")), new Promise(t => t())
          }
          this.updatePositionInfo();
          const i = yield r.getManifest(this.manifestUrl, this.store), n = i.getPreviousSpineItem(e);
          n && n.href && (this.previousChapterUrl = new URL(n.href, this.manifestUrl.href).href), this.previousChapterLink && (this.previousChapterUrl ? (this.previousChapterLink.href = this.previousChapterUrl, this.previousChapterLink.className = "") : (this.previousChapterLink.removeAttribute("href"), this.previousChapterLink.className = "disabled", this.handleRemoveHover()));
          const s = i.getNextSpineItem(e);
          let o;
          s && s.href && (this.nextChapterUrl = new URL(s.href, this.manifestUrl.href).href), this.nextChapterLink && (this.nextChapterUrl ? (this.nextChapterLink.href = this.nextChapterUrl, this.nextChapterLink.className = "") : (this.nextChapterLink.removeAttribute("href"), this.nextChapterLink.className = "disabled", this.handleRemoveHover())), this.setActiveTOCItem(e), i.metadata.title && (this.bookTitle.innerHTML = i.metadata.title);
          const a = i.getSpineItem(e);
          if (null !== a && (o = a.title), !o) {
            const t = i.getTOCItem(e);
            null !== t && t.title && (o = t.title)
          }
          this.chapterTitle.innerHTML = o ? "(" + o + ")" : "(Current Chapter)", this.eventHandler && this.eventHandler.setupEvents(this.iframe.contentDocument), this.annotator && (yield this.saveCurrentReadingPosition()), this.hideLoadingMessage(), this.showIframeContents();
          const l = v(this.iframe.contentDocument, "head");
          if (l) {
            const t = g(l, 'link[rel=stylesheet][href~="/viewer/readium-css/ReadiumCSS-before.css"]'),
              e = g(l, 'link[rel=stylesheet][href~="/viewer/readium-css/ReadiumCSS-default.css"]'),
              i = g(l, 'link[rel=stylesheet][href~="/viewer/readium-css/ReadiumCSS-after.css"]');
            t || l.appendChild(this.creatCssLink("/viewer/readium-css/ReadiumCSS-before.css")), e || l.appendChild(this.creatCssLink("/viewer/readium-css/ReadiumCSS-default.css")), i || l.appendChild(this.creatCssLink("/viewer/readium-css/ReadiumCSS-after.css"))
          }
          return new Promise(t => t())
        } catch (t) {
          return this.abortOnError(), new Promise((e, i) => i(t)).catch(() => {
          })
        }
      })
    }

    abortOnError() {
      this.errorMessage.style.display = "block", this.isLoading && this.hideLoadingMessage()
    }

    tryAgain() {
      this.iframe.src = this.iframe.src, this.enableOffline()
    }

    goBack() {
      window.history.back()
    }

    isDisplayed(t) {
      return !!t && -1 !== t.className.indexOf(" active")
    }

    showElement(t, e) {
      if (t) {
        if (t.className = t.className.replace(" inactive", ""), -1 === t.className.indexOf(" active") && (t.className += " active"), t.setAttribute("aria-hidden", "false"), e) {
          e.setAttribute("aria-expanded", "true");
          const t = e.querySelector(".icon.open");
          if (t && -1 === (t.getAttribute("class") || "").indexOf(" inactive-icon")) {
            const e = (t.getAttribute("class") || "") + " inactive-icon";
            t.setAttribute("class", e)
          }
          const i = e.querySelector(".icon.close");
          if (i) {
            const t = (i.getAttribute("class") || "").replace(" inactive-icon", "");
            i.setAttribute("class", t)
          }
        }
        const i = Array.prototype.slice.call(t.querySelectorAll("button")),
          n = Array.prototype.slice.call(t.querySelectorAll("a"));
        for (const t of i) t.tabIndex = 0;
        for (const t of n) t.tabIndex = 0
      }
    }

    hideElement(t, e) {
      if (t) {
        if (t.className = t.className.replace(" active", ""), -1 === t.className.indexOf(" inactive") && (t.className += " inactive"), t.setAttribute("aria-hidden", "true"), e) {
          e.setAttribute("aria-expanded", "false");
          const t = e.querySelector(".icon.open");
          if (t) {
            const e = (t.getAttribute("class") || "").replace(" inactive-icon", "");
            t.setAttribute("class", e)
          }
          const i = e.querySelector(".icon.close");
          if (i && -1 === (i.getAttribute("class") || "").indexOf(" inactive-icon")) {
            const t = (i.getAttribute("class") || "") + " inactive-icon";
            i.setAttribute("class", t)
          }
        }
        const i = Array.prototype.slice.call(t.querySelectorAll("button")),
          n = Array.prototype.slice.call(t.querySelectorAll("a"));
        for (const t of i) t.tabIndex = -1;
        for (const t of n) t.tabIndex = -1
      }
    }

    showModal(t, e) {
      this.iframe.setAttribute("aria-hidden", "true"), this.upLink && this.upLink.setAttribute("aria-hidden", "true"), this.fullscreen && this.fullscreen.setAttribute("aria-hidden", "true"), this.contentsControl && this.contentsControl.setAttribute("aria-hidden", "true"), this.settingsControl && this.settingsControl.setAttribute("aria-hidden", "true"), this.linksBottom && this.linksBottom.setAttribute("aria-hidden", "true"), this.linksMiddle && this.linksMiddle.setAttribute("aria-hidden", "true"), this.loadingMessage.setAttribute("aria-hidden", "true"), this.errorMessage.setAttribute("aria-hidden", "true"), this.infoTop.setAttribute("aria-hidden", "true"), this.infoBottom.setAttribute("aria-hidden", "true"), e && e.setAttribute("aria-hidden", "false"), this.showElement(t, e)
    }

    hideModal(t, e) {
      this.iframe.setAttribute("aria-hidden", "false"), this.upLink && this.upLink.setAttribute("aria-hidden", "false"), this.fullscreen && this.fullscreen.setAttribute("aria-hidden", "false"), this.contentsControl && this.contentsControl.setAttribute("aria-hidden", "false"), this.settingsControl && this.settingsControl.setAttribute("aria-hidden", "false"), this.linksBottom && this.linksBottom.setAttribute("aria-hidden", "false"), this.linksMiddle && this.linksMiddle.setAttribute("aria-hidden", "false"), this.loadingMessage.setAttribute("aria-hidden", "false"), this.errorMessage.setAttribute("aria-hidden", "false"), this.infoTop.setAttribute("aria-hidden", "false"), this.infoBottom.setAttribute("aria-hidden", "false"), this.hideElement(t, e)
    }

    toggleFullscreenIcon() {
      if (this.fullscreen) {
        const t = this.fullscreen.querySelector(".icon.active-icon"),
          e = this.fullscreen.querySelector(".icon.inactive-icon");
        if (t && -1 === (t.getAttribute("class") || "").indexOf(" inactive-icon")) {
          const e = "icon inactive-icon";
          t.setAttribute("class", e)
        }
        if (e) {
          const t = "icon active-icon";
          e.setAttribute("class", t)
        }
      }
    }

    toggleFullscreen() {
      if (this.fullscreen) {
        const t = document, e = document.documentElement,
          i = e.requestFullscreen || e.mozRequestFullScreen || e.webkitRequestFullScreen || e.msRequestFullscreen,
          n = t.exitFullscreen || t.mozCancelFullScreen || t.webkitExitFullscreen || t.msExitFullscreen;
        t.fullscreenElement || t.mozFullScreenElement || t.webkitFullscreenElement || t.msFullscreenElement ? n.call(t) : i.call(e)
      }
    }

    toggleDisplay(t, e) {
      this.isDisplayed(t) ? this.hideElement(t, e) : this.showElement(t, e), t === this.linksMiddle && (this.settings.getSelectedView() === this.scroller ? this.showElement(t, e) : this.hideElement(t, e))
    }

    toggleModal(t, e) {
      this.isDisplayed(t) ? this.hideModal(t, e) : this.showModal(t, e)
    }

    handleToggleLinksClick(t) {
      this.useDefaultHeader && (this.hideView(this.tocView, this.contentsControl), this.hideSettings(), this.hideBookmarks(), this.hideNotes()), this.toggleDisplay(this.links, this.menuControl), this.settings.getSelectedView() === this.scroller && (this.scroller.atBottom() || this.toggleDisplay(this.linksBottom)), t.preventDefault(), t.stopPropagation()
    }

    handlePreviousPageClick(t) {
      if (this.paginator) {
        if (this.paginator.onFirstPage()) {
          if (this.previousChapterUrl) {
            const t = {
              href: this.previousChapterUrl,
              locations: {progression: 1},
              created: new Date,
              title: "previousChapterUrl.title"
            };
            this.navigate(t);
            var e = this.paginator;
            setTimeout(() => {
              e.goToPosition(1), this.updatePositionInfo(), this.saveCurrentReadingPosition()
            }, 1)
          }
        } else this.paginator.goToPreviousPage(), this.updatePositionInfo(), this.saveCurrentReadingPosition();
        t.preventDefault(), t.stopPropagation()
      }
    }

    handleNextPageClick(t) {
      if (this.paginator) {
        if (this.paginator.onLastPage()) {
          if (this.nextChapterUrl) {
            const t = {
              href: this.nextChapterUrl,
              locations: {progression: 0},
              created: new Date,
              title: "nextChapterUrl.title"
            };
            this.navigate(t);
            var e = this.paginator;
            setTimeout(() => {
              e.goToPosition(0), this.updatePositionInfo(), this.saveCurrentReadingPosition()
            }, 1)
          }
        } else this.paginator.goToNextPage(), this.updatePositionInfo(), this.saveCurrentReadingPosition();
        t.preventDefault(), t.stopPropagation()
      }
    }

    handleRemoveHover() {
      this.iframe.className = ""
    }

    handleInternalLink(t) {
      const e = t.target;
      let i = this.iframe.src.split("#")[0];
      if (this.iframe.contentDocument && this.iframe.contentDocument.location && this.iframe.contentDocument.location.href && (i = this.iframe.contentDocument.location.href.split("#")[0]), e && "a" === e.tagName.toLowerCase() && e.href.split("#")[0] === i) {
        const i = e.href.split("#")[1];
        this.settings.getSelectedView().goToElement(i, !0), this.updatePositionInfo(), this.saveCurrentReadingPosition(), t.preventDefault(), t.stopPropagation()
      }
    }

    handleResize() {
      const t = this.settings.getSelectedView(), e = t.getCurrentPosition(), i = this.settings.getSelectedFontSize();
      v(this.iframe.contentDocument, "html").style.setProperty("--USER__fontSize", i);
      let n = 2 * parseInt(i.slice(0, -2));
      this.paginator && (this.paginator.sideMargin = n), this.scroller && (this.scroller.sideMargin = n);
      const s = !this.isDisplayed(this.links);
      s && this.toggleDisplay(this.links);
      var o = this.links ? this.links.clientHeight : 40;
      this.useDefaultHeader ? this.infoTop.style.height = o + "px" : (o = this.links ? this.links.clientHeight : 70, this.infoTop.style.height = "10px", this.infoTop.style.minHeight = "10px"), s && this.toggleDisplay(this.links);
      const a = !this.isDisplayed(this.linksBottom);
      a && this.toggleDisplay(this.linksBottom);
      const l = this.linksBottom ? this.linksBottom.clientHeight : 40;
      this.useDefaultFooter ? this.infoBottom.style.height = l + "px" : this.infoBottom.style.height = "30px", a && this.toggleDisplay(this.linksBottom), this.paginator && (this.useDefaultHeader && this.useDefaultFooter ? this.paginator.height = u() - o - l - 10 : this.useDefaultHeader ? this.paginator.height = u() - o - 10 - 40 - 10 : this.useDefaultFooter ? this.paginator.height = u() - 70 - l - 10 : this.paginator.height = u() - 70 - 10 - 40 - 10), this.scroller && (this.scroller.height = u() - o - l - 10), setTimeout(() => {
        t.goToPosition(e), this.updatePositionInfo()
      }, 100)
    }

    updatePositionInfo() {
      if (this.settings.getSelectedView() === this.paginator) {
        const t = Math.round(this.paginator.getCurrentPage()), e = Math.round(this.paginator.getPageCount());
        this.chapterPosition.innerHTML = "Page " + t + " of " + e
      } else this.chapterPosition.innerHTML = ""
    }

    handlePreviousChapterClick(t) {
      if (this.settings.getSelectedView() === this.paginator) this.handlePreviousPageClick(t); else {
        if (this.previousChapterUrl) {
          const t = {
            href: this.previousChapterUrl,
            locations: {progression: 1},
            created: new Date,
            title: "previousChapterUrl.title"
          };
          this.navigate(t)
        }
        t.preventDefault(), t.stopPropagation()
      }
    }

    handleNextChapterClick(t) {
      if (this.settings.getSelectedView() === this.paginator) this.handleNextPageClick(t); else {
        if (this.nextChapterUrl) {
          const t = {
            href: this.nextChapterUrl,
            locations: {progression: 0},
            created: new Date,
            title: "nextChapterUrl.title"
          };
          this.navigate(t)
        }
        t.preventDefault(), t.stopPropagation()
      }
    }

    handleControlClick(t, e, i) {
      this.useDefaultHeader && (this.hideSettings(), this.hideBookmarks(), this.hideNotes(), this.hideNoteInputView()), t != this.tocView && this.isDisplayed(this.tocView) && this.hideModal(this.tocView, this.contentsControl), t != this.landmarksView && this.isDisplayed(this.landmarksView) && this.hideModal(this.landmarksView, this.landmarksControl), t != this.pageListView && this.isDisplayed(this.pageListView) && this.hideModal(this.pageListView, this.pageListControl), this.toggleModal(t, e), this.settings.getSelectedView() === this.scroller && (this.isDisplayed(t) ? document.body.style.overflow = "hidden" : document.body.style.overflow = "auto"), i.preventDefault(), i.stopPropagation()
    }

    hideNotes() {
      this.hideModal(this.notesView, this.notesControl)
    }

    hideBookmarks() {
      this.hideModal(this.bookmarksView, this.bookmarksControl)
    }

    hideNoteInputView() {
      this.hideModal(this.noteInputView, this.addNoteControl)
    }

    hideBookmarksOnEscape(t) {
      this.isDisplayed(this.bookmarksView) && 27 === t.keyCode && this.hideModal(this.bookmarksView, this.bookmarksControl)
    }

    hideBookmarkOnEscape(t) {
      this.isDisplayed(this.noteInputView) && 27 === t.keyCode && this.hideModal(this.noteInputView, this.addNoteControl)
    }

    hideView(t, e) {
      this.useDefaultHeader && this.hideModal(t, e), this.settings.getSelectedView() === this.scroller && (document.body.style.overflow = "auto")
    }

    hideTOCOnEscape(t) {
      this.isDisplayed(this.tocView) && 27 === t.keyCode && this.hideView(this.tocView, this.contentsControl)
    }

    setActiveTOCItem(t) {
      if (this.tocView) {
        const e = Array.prototype.slice.call(this.tocView.querySelectorAll("li > a"));
        for (const t of e) t.className = "";
        const i = this.tocView.querySelector('li > a[href^="' + t + '"]');
        i && (i.className = "active")
      }
    }

    saveBookmark() {
      return S(this, void 0, void 0, function* () {
        if (this.useDefaultHeader && (this.hideView(this.tocView, this.contentsControl), this.hideView(this.landmarksView, this.landmarksControl), this.hideView(this.pageListView, this.pageListControl), this.hideBookmarks(), this.hideNotes(), this.hideSettings(), this.hideNoteInputView()), this.annotator) {
          const e = this.iframe.src, i = this.settings.getSelectedView().getCurrentPosition();
          let n = "Bookmark";
          if (this.noteInputView) {
            let t = this.noteInputView.querySelector("textarea");
            t && t.value && (n = t.value, t.value = "")
          }
          const s = {href: e, locations: {progression: i}, created: new Date, title: n};
          var t = yield this.annotator.saveBookmark(s);
          return this.eventTarget && this.eventTarget.dispatchEvent(new CustomEvent("r2.bookmark.added", {detail: t})), this.useDefaultHeader || (yield this.showBookmarks()), t
        }
        return new Promise(t => t())
      })
    }

    saveNote() {
      return S(this, void 0, void 0, function* () {
        if (this.annotator) {
          const e = this.iframe.src, i = this.settings.getSelectedView().getCurrentPosition();
          let n = "Note";
          if (this.noteInputView) {
            let t = this.noteInputView.querySelector("textarea");
            t && t.value && (n = t.value, t.value = "")
          }
          if ("Note" === n) return new Promise(t => t());
          {
            this.useDefaultHeader && this.hideNoteInputView();
            const s = {href: e, locations: {progression: i}, created: new Date, title: n, note: n};
            var t = yield this.annotator.saveNote(s);
            return this.eventTarget && this.eventTarget.dispatchEvent(new CustomEvent("r2.note.added", {detail: t})), this.useDefaultHeader || (yield this.showNotes()), t
          }
        }
        return new Promise(t => t())
      })
    }

    handleBookmarkClick(t) {
      this.useDefaultHeader && (this.hideSettings(), this.hideView(this.tocView, this.contentsControl), this.hideView(this.landmarksView, this.landmarksControl), this.hideView(this.pageListView, this.pageListControl), this.hideBookmarks(), this.hideNotes()), this.toggleModal(this.noteInputView, this.addNoteControl), t.preventDefault(), t.stopPropagation()
    }

    handleBookmarksClick(t) {
      this.showBookmarks(), this.useDefaultHeader && (this.hideNoteInputView(), this.hideSettings(), this.hideView(this.tocView, this.contentsControl), this.hideView(this.landmarksView, this.landmarksControl), this.hideView(this.pageListView, this.pageListControl), this.hideNotes()), this.toggleModal(this.bookmarksView, this.bookmarksControl), t.preventDefault(), t.stopPropagation()
    }

    handleNotesClick(t) {
      this.showNotes(), this.useDefaultHeader && (this.hideNoteInputView(), this.hideSettings(), this.hideView(this.tocView, this.contentsControl), this.hideView(this.landmarksView, this.landmarksControl), this.hideView(this.pageListView, this.pageListControl), this.hideBookmarks()), this.toggleModal(this.notesView, this.notesControl), t.preventDefault(), t.stopPropagation()
    }

    showBookmarks() {
      return S(this, void 0, void 0, function* () {
        let t = [];
        this.annotator && (t = yield this.annotator.getBookmarks());
        const e = yield r.getManifest(this.manifestUrl, this.store);
        this.createTree(t, e, this.bookmarksView, this.bookmarksControl)
      })
    }

    showNotes() {
      return S(this, void 0, void 0, function* () {
        let t = [];
        this.annotator && (t = yield this.annotator.getNotes());
        const e = yield r.getManifest(this.manifestUrl, this.store);
        this.createTree(t, e, this.notesView, this.notesControl)
      })
    }

    createTree(t, e, i, n) {
      if (t) {
        const s = this, o = e.tableOfContents;
        if (o.length && this.tocView) {
          const e = (o, a) => {
            let l = document.createElement("ul");
            l.className = "chapter-list";
            for (const r of a) {
              let a = document.createElement("li");
              a.className = "chapter-header";
              const h = document.createElement("a"), d = document.createElement("span");
              h.tabIndex = -1, h.style.display = "block", h.style.whiteSpace = "nowrap", h.style.overflow = "hidden", h.style.textOverflow = "ellipsis";
              let c = "";
              r.href ? (c = new URL(r.href, this.manifestUrl.href).href, h.href = c, h.innerHTML = r.title || "", a.appendChild(h)) : (d.innerHTML = r.title || "", a.appendChild(d)), h.addEventListener("click", t => {
                t.preventDefault(), t.stopPropagation(), this.useDefaultHeader && this.hideModal(i, n);
                const e = {href: h.href, locations: {progression: 0}, created: new Date, title: h.title};
                this.navigate(e)
              });
              const u = document.createElement("ol");
              u.className = "bookmarks-list", t.forEach(function (t) {
                if (r.href && t.href.endsWith(r.href)) {
                  let e = document.createElement("li"), o = document.createElement("a");
                  o.setAttribute("href", t.href), o.innerHTML = t.title, o.addEventListener("click", e => {
                    e.preventDefault(), e.stopPropagation(), s.handleAnnotationLinkClick(e, t, i, n)
                  }), e.appendChild(o), u.appendChild(e)
                }
              }), u.children.length > 0 && (l.appendChild(a), l.appendChild(u)), l.children.length > 0 && o.appendChild(l), r.children && r.children.length > 0 && e(o, r.children)
            }
          };
          i.innerHTML = "", e(i, o)
        }
      }
    }

    handleAnnotationLinkClick(t, e, i, n) {
      this.useDefaultHeader && this.hideModal(i, n), e ? this.navigate(e) : console.log("bookmark data missing: ", t)
    }

    handleSettingsClick(t) {
      this.useDefaultHeader && (this.hideView(this.tocView, this.contentsControl), this.hideView(this.landmarksView, this.landmarksControl), this.hideView(this.pageListView, this.pageListControl), this.hideBookmarks(), this.hideNotes(), this.hideNoteInputView()), this.toggleModal(this.settingsView, this.settingsControl), t.preventDefault(), t.stopPropagation()
    }

    hideSettings() {
      this.hideModal(this.settingsView, this.settingsControl)
    }

    hideSettingsOnEscape(t) {
      this.isDisplayed(this.settingsView) && 27 === t.keyCode && this.hideSettings()
    }

    navigate(t) {
      if (this.hideIframeContents(), this.showLoadingMessageAfterDelay(), this.newPosition = t, -1 === t.href.indexOf("#")) this.iframe.src = t.href; else {
        this.newElementId = t.href.slice(t.href.indexOf("#") + 1);
        const e = t.href.slice(0, t.href.indexOf("#"));
        e === this.iframe.src ? this.handleIFrameLoad() : this.iframe.src = e
      }
      this.paginator && this.paginator.goToPosition(t.locations.progression)
    }

    showIframeContents() {
      this.isBeingStyled = !1, setTimeout(() => {
        this.isBeingStyled || (this.iframe.style.opacity = "1")
      }, 150)
    }

    showLoadingMessageAfterDelay() {
      this.isLoading = !0, setTimeout(() => {
        this.isLoading && (this.loadingMessage.style.display = "block", this.loadingMessage.classList.add("is-loading"))
      }, 200)
    }

    hideIframeContents() {
      this.isBeingStyled = !0, this.iframe.style.opacity = "0"
    }

    hideLoadingMessage() {
      this.isLoading = !1, this.loadingMessage.style.display = "none", this.loadingMessage.classList.remove("is-loading")
    }

    saveCurrentReadingPosition() {
      return S(this, void 0, void 0, function* () {
        if (this.annotator) {
          const t = {
            href: this.iframe.src,
            locations: {progression: this.settings.getSelectedView().getCurrentPosition()},
            created: new Date,
            title: "Last Reading Position"
          };
          return this.eventTarget && this.eventTarget.dispatchEvent(new CustomEvent("r2.lastreadposition.changed", {detail: t})), this.annotator.saveLastReadingPosition(t)
        }
        return new Promise(t => t())
      })
    }

    creatCssLink(t) {
      const e = document.createElement("link");
      return e.rel = "stylesheet", e.type = "text/css", e.href = t, e
    }
  }

  class V {
    constructor() {
      this.name = "publisher-font", this.label = "Publisher"
    }

    start() {
      const t = v(this.bookElement.contentDocument, "html");
      t.style.setProperty("--USER__fontFamily", "Original"), t.style.setProperty("--USER__fontOverride", "readium-font-off"), w(t, "data-viewer-font", "publisher")
    }

    stop() {
      const t = v(this.bookElement.contentDocument, "html");
      t.style.removeProperty("--USER__fontFamily"), t.style.removeProperty("--USER__fontOverride"), k(t, "data-viewer-font")
    }
  }

  class B {
    constructor() {
      this.name = "serif-font", this.label = "Serif"
    }

    start() {
      const t = v(this.bookElement.contentDocument, "html");
      t.style.setProperty("--USER__fontFamily", "serif"), t.style.setProperty("--USER__fontOverride", "readium-font-on"), w(t, "data-viewer-font", "serif")
    }

    stop() {
      const t = v(this.bookElement.contentDocument, "html");
      t.style.removeProperty("--USER__fontFamily"), t.style.removeProperty("--USER__fontOverride"), k(t, "data-viewer-font")
    }
  }

  class O {
    constructor() {
      this.name = "sans-font", this.label = "Sans-serif"
    }

    start() {
      const t = v(this.bookElement.contentDocument, "html");
      t.style.setProperty("--USER__fontFamily", "sans-serif"), t.style.setProperty("--USER__fontOverride", "readium-font-on"), w(t, "data-viewer-font", "sans")
    }

    stop() {
      const t = v(this.bookElement.contentDocument, "html");
      t.style.removeProperty("--USER__fontFamily"), t.style.removeProperty("--USER__fontOverride"), k(t, "data-viewer-font")
    }
  }

  class R {
    constructor() {
      this.name = "day-theme", this.label = "Day"
    }

    start() {
      const t = document.documentElement;
      w(t, "data-viewer-theme", "day"), w(f(t, "body"), "data-viewer-theme", "day"), v(this.bookElement.contentDocument, "html").style.setProperty("--USER__appearance", "readium-default-on")
    }

    stop() {
      const t = document.documentElement;
      k(t, "data-viewer-theme"), k(f(t, "body"), "data-viewer-theme"), v(this.bookElement.contentDocument, "html").style.removeProperty("--USER__appearance")
    }
  }

  class A {
    constructor() {
      this.name = "sepia-theme", this.label = "Sepia"
    }

    start() {
      const t = document.documentElement;
      w(t, "data-viewer-theme", "sepia"), w(f(t, "body"), "data-viewer-theme", "sepia"), v(this.bookElement.contentDocument, "html").style.setProperty("--USER__appearance", "readium-sepia-on")
    }

    stop() {
      const t = document.documentElement;
      k(t, "data-viewer-theme"), k(f(t, "body"), "data-viewer-theme"), v(this.bookElement.contentDocument, "html").style.removeProperty("--USER__appearance")
    }
  }

  class N {
    constructor() {
      this.name = "night-theme", this.label = "Night"
    }

    start() {
      const t = document.documentElement;
      w(t, "data-viewer-theme", "night"), w(f(t, "body"), "data-viewer-theme", "night"), v(this.bookElement.contentDocument, "html").style.setProperty("--USER__appearance", "readium-night-on")
    }

    stop() {
      const t = document.documentElement;
      k(t, "data-viewer-theme"), k(f(t, "body"), "data-viewer-theme"), v(this.bookElement.contentDocument, "html").style.removeProperty("--USER__appearance")
    }
  }

  class z {
    constructor() {
      this.name = "columns-paginated-view", this.label = "Paginated", this.sideMargin = 0, this.height = 0, this.hasFixedScrollWidth = !1
    }

    start(t) {
      this.setSize();
      const e = document.createElement("meta");
      e.name = "viewport", e.content = "width=device-width, initial-scale=1, maximum-scale=1", this.checkForFixedScrollWidth(), this.goToPosition(t), v(this.bookElement.contentDocument, "html").style.setProperty("--USER__scroll", "readium-scroll-off")
    }

    checkForFixedScrollWidth() {
      const t = v(this.bookElement.contentDocument, "body"), e = t.scrollWidth;
      this.hasFixedScrollWidth = t.scrollWidth === e
    }

    setSize() {
      const t = v(this.bookElement.contentDocument, "body");
      this.bookElement.contentDocument.documentElement.style.height = this.height + "px", this.bookElement.style.height = this.height + "px", this.bookElement.style.width = c() + "px";
      const e = t.querySelectorAll("img");
      for (const t of e) t.style.width = t.width + "px"
    }

    stop() {
    }

    getLeftColumnsWidth() {
      return v(this.bookElement.contentDocument, "html").scrollLeft
    }

    getRightColumnsWidth() {
      let t = v(this.bookElement.contentDocument, "html").scrollWidth - this.getColumnWidth();
      if (this.hasFixedScrollWidth) {
        const e = this.getLeftColumnsWidth();
        t = Math.max(0, t - e)
      }
      return t
    }

    getColumnWidth() {
      return v(this.bookElement.contentDocument, "html").offsetWidth
    }

    setLeftColumnsWidth(t) {
      v(this.bookElement.contentDocument, "html").scrollLeft = t
    }

    getCurrentPosition() {
      const t = this.getColumnWidth(), e = this.getLeftColumnsWidth();
      return e / (e + t + this.getRightColumnsWidth())
    }

    getCurrentPage() {
      return this.getCurrentPosition() * this.getPageCount() + 1
    }

    getPageCount() {
      const t = this.getColumnWidth();
      return v(this.bookElement.contentDocument, "html").scrollWidth / t
    }

    onFirstPage() {
      return this.getLeftColumnsWidth() <= 0
    }

    onLastPage() {
      return this.getRightColumnsWidth() <= 0
    }

    goToPreviousPage() {
      var t = this.getLeftColumnsWidth() - this.getColumnWidth();
      t >= 0 ? this.setLeftColumnsWidth(t) : this.setLeftColumnsWidth(0)
    }

    goToNextPage() {
      const t = this.getLeftColumnsWidth(), e = this.getColumnWidth(),
        i = v(this.bookElement.contentDocument, "html").scrollWidth;
      var n = t + e;
      n < i ? this.setLeftColumnsWidth(n) : this.setLeftColumnsWidth(i)
    }

    goToPosition(t) {
      this.setSize();
      const e = this.getColumnWidth(), i = e + this.getRightColumnsWidth(), n = t * i;
      let s = Math.round(n / e) * e;
      s >= i && (s -= e), this.setLeftColumnsWidth(s)
    }

    goToElement(t, e) {
      const i = this.bookElement.contentDocument.getElementById(t);
      if (i) {
        const t = i.style.height;
        i.style.height = "0";
        const n = i.getBoundingClientRect().left, s = this.getColumnWidth();
        let o = Math.floor(n / s) * s;
        if (e) {
          const t = this.getLeftColumnsWidth();
          o = Math.floor(n / s) * s + t
        }
        i.style.height = t, this.setLeftColumnsWidth(o)
      }
    }
  }

  class F {
    constructor() {
      this.name = "scrolling-book-view", this.label = "Scrolling", this.sideMargin = 20, this.height = 0
    }

    setIFrameSize() {
      this.bookElement.style.height = "", this.bookElement.style.width = c() + "px";
      const t = v(this.bookElement.contentDocument, "body"), e = c() - 2 * this.sideMargin + "px", i = this.height,
        n = t.scrollHeight + 60;
      this.bookElement.style.height = Math.max(i, n) + "px";
      const s = Array.prototype.slice.call(t.querySelectorAll("img"));
      for (const t of s) t.style.maxWidth = e
    }

    start(t) {
      const e = v(this.bookElement.contentDocument, "head");
      if (e) {
        const t = g(e, "meta[name=viewport]");
        t && t.remove()
      }
      v(this.bookElement.contentDocument, "html").style.setProperty("--USER__scroll", "readium-scroll-on"), this.goToPosition(t)
    }

    stop() {
      this.bookElement.style.height = "", this.bookElement.style.width = "";
      const t = v(this.bookElement.contentDocument, "body"), e = Array.prototype.slice.call(t.querySelectorAll("img"));
      for (const t of e) t.style.maxWidth = ""
    }

    getCurrentPosition() {
      return (document.documentElement || document.body.parentNode || document.body).scrollTop / document.body.scrollHeight
    }

    atBottom() {
      var t = (document.documentElement || document.body.parentNode || document.body).scrollTop;
      return document.body.scrollHeight - t === u()
    }

    goToPosition(t) {
      this.setIFrameSize(), (document.documentElement || document.body.parentNode || document.body).scrollTop = document.body.scrollHeight * t
    }

    goToElement(t) {
      const e = this.bookElement.contentDocument.getElementById(t);
      if (e) {
        e.scrollIntoView();
        var i = document.documentElement || document.body.parentNode || document.body, n = i.scrollTop;
        document.body.scrollHeight - e.offsetTop >= this.height && (i.scrollTop = Math.max(0, n - this.height / 3))
      }
    }
  }

  var I = function (t, e, i, n) {
    return new (i || (i = Promise))(function (s, o) {
      function a(t) {
        try {
          r(n.next(t))
        } catch (t) {
          o(t)
        }
      }

      function l(t) {
        try {
          r(n.throw(t))
        } catch (t) {
          o(t)
        }
      }

      function r(t) {
        t.done ? s(t.value) : new i(function (e) {
          e(t.value)
        }).then(a, l)
      }

      r((n = n.apply(t, e || [])).next())
    })
  };
  const H = t => `\n    <ul class="settings-menu" role="menu">\n        ${t}\n    </ul>\n`,
    U = t => `\n    <li><ul class="settings-options">\n        ${t}\n    </ul></li>\n`,
    _ = (t, e, i, n, s, o) => `\n    <li class='${t}'><button id='${o}' class='${e}' role='${n}' tabindex=-1>${i}${s}</button></li>\n`;

  class W {
    constructor(t, e, i, n, s) {
      this.fontChangeCallback = (() => {
      }), this.fontSizeChangeCallback = (() => {
      }), this.themeChangeCallback = (() => {
      }), this.viewChangeCallback = (() => {
      }), this.store = t, this.bookFonts = e, this.fontSizes = i, this.bookThemes = n, this.bookViews = s
    }

    static create(t) {
      return I(this, void 0, void 0, function* () {
        const e = t.fontSizesInPixels.map(t => t + "px"),
          i = new this(t.store, t.bookFonts, e, t.bookThemes, t.bookViews);
        return yield i.initializeSelections(t.defaultFontSizeInPixels ? t.defaultFontSizeInPixels + "px" : void 0), i
      })
    }

    initializeSelections(t) {
      return I(this, void 0, void 0, function* () {
        if (this.bookFonts.length >= 1) {
          let t = this.bookFonts[0];
          const e = yield this.store.get(W.SELECTED_FONT_KEY);
          if (e) for (const i of this.bookFonts) if (i.name === e) {
            t = i;
            break
          }
          this.selectedFont = t
        }
        if (this.fontSizes.length >= 1) {
          let e = yield this.store.get(W.SELECTED_FONT_SIZE_KEY), i = e && -1 !== this.fontSizes.indexOf(e);
          if (e && i || !t || (i = (e = t) && -1 !== this.fontSizes.indexOf(e)), !e || !i) {
            const t = Math.floor(this.fontSizes.length / 2);
            e = this.fontSizes[t]
          }
          this.selectedFontSize = e
        }
        if (this.bookThemes.length >= 1) {
          let t = this.bookThemes[0];
          const e = yield this.store.get(W.SELECTED_THEME_KEY);
          if (e) for (const i of this.bookThemes) if (i.name === e) {
            t = i;
            break
          }
          this.selectedTheme = t
        }
        if (this.bookViews.length >= 1) {
          let t = this.bookViews[0];
          const e = yield this.store.get(W.SELECTED_VIEW_KEY);
          if (e) for (const i of this.bookViews) if (i.name === e) {
            t = i;
            break
          }
          this.selectedView = t
        }
      })
    }

    renderControls(t) {
      const e = [];
      if (this.bookFonts.length > 1) {
        const t = this.bookFonts.map(t => _("reading-style", t.name, t.label, "menuitem", C.checkDupe, t.label));
        e.push(U(t.join("")))
      }
      if (this.fontSizes.length > 1) {
        const t = _("font-setting", "decrease", "A-", "menuitem", "", "decrease-font") + _("font-setting", "increase", "A+", "menuitem", "", "increase-font");
        e.push(U(t))
      }
      if (this.bookThemes.length > 1) {
        const t = this.bookThemes.map(t => _("reading-theme", t.name, t.label, "menuitem", C.checkDupe, t.label));
        e.push(U(t.join("")))
      }
      if (this.bookViews.length > 1) {
        const t = this.bookViews.map(t => _("reading-style", t.name, t.label, "menuitem", C.checkDupe, t.label));
        e.push(U(t.join("")))
      }
      if (t.innerHTML = H(e.join("")), this.fontButtons = {}, this.bookFonts.length > 1) {
        for (const e of this.bookFonts) this.fontButtons[e.name] = f(t, "button[class=" + e.name + "]");
        this.updateFontButtons()
      }
      if (this.fontSizeButtons = {}, this.fontSizes.length > 1) {
        for (const e of["decrease", "increase"]) this.fontSizeButtons[e] = f(t, "button[class=" + e + "]");
        this.updateFontSizeButtons()
      }
      if (this.themeButtons = {}, this.bookThemes.length > 1) {
        for (const e of this.bookThemes) this.themeButtons[e.name] = f(t, "button[class=" + e.name + "]");
        this.updateThemeButtons()
      }
      if (this.viewButtons = {}, this.bookViews.length > 1) {
        for (const e of this.bookViews) this.viewButtons[e.name] = f(t, "button[class=" + e.name + "]");
        this.updateViewButtons()
      }
      this.offlineStatusElement = g(t, 'div[class="offline-status"]'), this.setupEvents(), f(t, "ul").addEventListener("click", t => {
        t.stopPropagation()
      })
    }

    onFontChange(t) {
      this.fontChangeCallback = t
    }

    onFontSizeChange(t) {
      this.fontSizeChangeCallback = t
    }

    onThemeChange(t) {
      this.themeChangeCallback = t
    }

    onViewChange(t) {
      this.viewChangeCallback = t
    }

    setupEvents() {
      for (const t of this.bookFonts) {
        const e = this.fontButtons[t.name];
        e && e.addEventListener("click", e => {
          this.selectedFont.stop(), t.start(), this.selectedFont = t, this.updateFontButtons(), this.storeSelectedFont(t), this.fontChangeCallback(), e.preventDefault()
        })
      }
      this.fontSizes.length > 1 && (this.fontSizeButtons.decrease.addEventListener("click", t => {
        const e = this.fontSizes.indexOf(this.selectedFontSize);
        if (e > 0) {
          const t = this.fontSizes[e - 1];
          this.selectedFontSize = t, this.fontSizeChangeCallback(), this.updateFontSizeButtons(), this.storeSelectedFontSize(t)
        }
        t.preventDefault()
      }), this.fontSizeButtons.increase.addEventListener("click", t => {
        const e = this.fontSizes.indexOf(this.selectedFontSize);
        if (e < this.fontSizes.length - 1) {
          const t = this.fontSizes[e + 1];
          this.selectedFontSize = t, this.fontSizeChangeCallback(), this.updateFontSizeButtons(), this.storeSelectedFontSize(t)
        }
        t.preventDefault()
      }));
      for (const t of this.bookThemes) {
        const e = this.themeButtons[t.name];
        e && e.addEventListener("click", e => {
          this.selectedTheme.stop(), t.start(), this.selectedTheme = t, this.updateThemeButtons(), this.storeSelectedTheme(t), this.themeChangeCallback(), e.preventDefault()
        })
      }
      for (const t of this.bookViews) {
        const e = this.viewButtons[t.name];
        e && e.addEventListener("click", e => {
          const i = this.selectedView.getCurrentPosition();
          this.selectedView.stop(), t.start(i), this.selectedView = t, this.updateViewButtons(), this.storeSelectedView(t), this.viewChangeCallback(), e.preventDefault()
        })
      }
    }

    updateFontButtons() {
      for (const t of this.bookFonts) t === this.selectedFont ? (this.fontButtons[t.name].className = t.name + " active", this.fontButtons[t.name].setAttribute("aria-label", t.label + " font enabled")) : (this.fontButtons[t.name].className = t.name, this.fontButtons[t.name].setAttribute("aria-label", t.label + " font disabled"))
    }

    updateFontSizeButtons() {
      const t = this.fontSizes.indexOf(this.selectedFontSize);
      this.fontSizeButtons.decrease.className = 0 === t ? "decrease disabled" : "decrease", t === this.fontSizes.length - 1 ? this.fontSizeButtons.increase.className = "increase disabled" : this.fontSizeButtons.increase.className = "increase"
    }

    updateThemeButtons() {
      for (const t of this.bookThemes) t === this.selectedTheme ? (this.themeButtons[t.name].className = t.name + " active", this.themeButtons[t.name].setAttribute("aria-label", t.label + " mode enabled")) : (this.themeButtons[t.name].className = t.name, this.themeButtons[t.name].setAttribute("aria-label", t.label + " mode disabled"))
    }

    updateViewButtons() {
      for (const t of this.bookViews) t === this.selectedView ? (this.viewButtons[t.name].className = t.name + " active", this.viewButtons[t.name].setAttribute("aria-label", t.label + " mode enabled")) : (this.viewButtons[t.name].className = t.name, this.viewButtons[t.name].setAttribute("aria-label", t.label + " mode disabled"))
    }

    getSelectedFont() {
      return this.selectedFont
    }

    getSelectedFontSize() {
      return this.selectedFontSize
    }

    getSelectedTheme() {
      return this.selectedTheme
    }

    getSelectedView() {
      return this.selectedView
    }

    getOfflineStatusElement() {
      return this.offlineStatusElement
    }

    storeSelectedFont(t) {
      return I(this, void 0, void 0, function* () {
        return this.store.set(W.SELECTED_FONT_KEY, t.name)
      })
    }

    storeSelectedFontSize(t) {
      return I(this, void 0, void 0, function* () {
        return this.store.set(W.SELECTED_FONT_SIZE_KEY, t)
      })
    }

    storeSelectedTheme(t) {
      return I(this, void 0, void 0, function* () {
        return this.store.set(W.SELECTED_THEME_KEY, t.name)
      })
    }

    storeSelectedView(t) {
      return I(this, void 0, void 0, function* () {
        return this.store.set(W.SELECTED_VIEW_KEY, t.name)
      })
    }
  }

  W.SELECTED_FONT_KEY = "settings-selected-font", W.SELECTED_FONT_SIZE_KEY = "settings-selected-font-size", W.SELECTED_THEME_KEY = "settings-selected-theme", W.SELECTED_VIEW_KEY = "settings-selected-view";
  var K = function (t, e, i, n) {
    return new (i || (i = Promise))(function (s, o) {
      function a(t) {
        try {
          r(n.next(t))
        } catch (t) {
          o(t)
        }
      }

      function l(t) {
        try {
          r(n.throw(t))
        } catch (t) {
          o(t)
        }
      }

      function r(t) {
        t.done ? s(t.value) : new i(function (e) {
          e(t.value)
        }).then(a, l)
      }

      r((n = n.apply(t, e || [])).next())
    })
  };

  class Y {
    constructor(t) {
      this.store = t.store
    }

    getLastReadingPosition() {
      return K(this, void 0, void 0, function* () {
        const t = yield this.store.get(Y.LAST_READING_POSITION);
        if (t) {
          const e = JSON.parse(t);
          return new Promise(t => t(e))
        }
        return new Promise(t => t())
      })
    }

    initLastReadingPosition(t) {
      return K(this, void 0, void 0, function* () {
        return yield this.store.set(Y.LAST_READING_POSITION, t), new Promise(t => t())
      })
    }

    saveLastReadingPosition(t) {
      return K(this, void 0, void 0, function* () {
        if ("string" == typeof t) yield this.store.set(Y.LAST_READING_POSITION, t); else {
          const e = JSON.stringify(t);
          yield this.store.set(Y.LAST_READING_POSITION, e)
        }
        return new Promise(t => t())
      })
    }

    initBookmarks(t) {
      return K(this, void 0, void 0, function* () {
        let e = JSON.parse(t);
        return yield this.store.set(Y.BOOKMARKS, JSON.stringify(e)), new Promise(e => e(t))
      })
    }

    saveBookmark(t) {
      return K(this, void 0, void 0, function* () {
        let e = yield this.store.get(Y.BOOKMARKS);
        if (e) {
          let i = JSON.parse(e);
          i.push(t), yield this.store.set(Y.BOOKMARKS, JSON.stringify(i))
        } else {
          let e = new Array;
          e.push(t), yield this.store.set(Y.BOOKMARKS, JSON.stringify(e))
        }
        return new Promise(e => e(t))
      })
    }

    initNotes(t) {
      return K(this, void 0, void 0, function* () {
        let e = JSON.parse(t);
        return yield this.store.set(Y.NOTES, JSON.stringify(e)), new Promise(e => e(t))
      })
    }

    saveNote(t) {
      return K(this, void 0, void 0, function* () {
        let e = yield this.store.get(Y.NOTES);
        if (e) {
          let i = JSON.parse(e);
          i.push(t), yield this.store.set(Y.NOTES, JSON.stringify(i))
        } else {
          let e = new Array;
          e.push(t), yield this.store.set(Y.NOTES, JSON.stringify(e))
        }
        return new Promise(e => e(t))
      })
    }

    getBookmarks() {
      return K(this, void 0, void 0, function* () {
        const t = yield this.store.get(Y.BOOKMARKS);
        if (t) {
          const e = JSON.parse(t);
          return new Promise(t => t(e))
        }
        return new Promise(t => t())
      })
    }

    getNotes() {
      return K(this, void 0, void 0, function* () {
        const t = yield this.store.get(Y.NOTES);
        if (t) {
          const e = JSON.parse(t);
          return new Promise(t => t(e))
        }
        return new Promise(t => t())
      })
    }
  }

  function $(t) {
    var e = document.getElementById("R2Reader-Container"), i = document.getElementById("headerMenu"),
      n = document.getElementById("footerMenu"), s = t.url, o = new a({prefix: s.href}),
      l = [new URL(window.location.href), new URL("index.html", window.location.href), new URL("fetch.js", window.location.href), new URL("r2-reader.css", window.location.href), new URL("r2-reader.js", window.location.href)];
    t.customHeader && (l = [new URL(window.location.href), new URL("index.html", window.location.href), new URL("fetch.js", window.location.href), new URL("r2-reader.css", window.location.href), new URL("r2-reader.js", window.location.href), new URL("material.css", window.location.href), new URL("material.js", window.location.href)]);
    var r = new URL("/viewer/sw.js", window.location.href);
    t.serviceWorkerUrl && (r = t.serviceWorkerUrl);
    var h = new d({
        store: o,
        manifestUrl: s,
        serviceWorkerUrl: r,
        staticFileUrls: l,
        fallbackBookCacheUrl: t.bookCacheUrl
      }), c = new V, u = new B, p = new O, m = new R, g = new A, f = new N, v = new z, w = new F, k = new Y({store: o}),
      b = new a({prefix: "r2-reader"}),
      E = {url: new URL(window.location.origin), label: "Catalog", ariaLabel: "Go back to the Catalog"};
    t.upLinkUrl && (E = t.upLinkUrl), W.create({
      store: b,
      bookFonts: [c, u, p],
      fontSizesInPixels: [12, 14, 16, 18, 20, 22, 24, 26, 28, 30, 32],
      defaultFontSizeInPixels: 20,
      bookThemes: [m, g, f],
      bookViews: [v, w]
    }).then(function (a) {
      D.create({
        eventTarget: t.eventTarget,
        mainElement: e,
        headerMenu: i,
        footerMenu: n,
        manifestUrl: s,
        store: o,
        cacher: h,
        settings: a,
        annotator: k,
        publisher: c,
        serif: u,
        sans: p,
        day: m,
        sepia: g,
        night: f,
        paginator: v,
        scroller: w,
        upLink: E,
        allowFullscreen: !1,
        useDefaultHeader: !t.customHeader,
        useDefaultFooter: !t.customFooter,
        initialAnnotations: t.annotations,
        initialLastReadingPosition: t.lastReadingPosition
      })
    })
  }

  Y.LAST_READING_POSITION = "last-reading-position", Y.BOOKMARKS = "bookmarks", Y.NOTES = "notes", i.d(e, "load", function () {
    return $
  }), exports.load = function (t) {
    $(t)
  }
}]);
//# sourceMappingURL=r2-reader.js.map