"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

!function (e) {
  var o = {};function t(r) {
    if (o[r]) return o[r].exports;var n = o[r] = { i: r, l: !1, exports: {} };return e[r].call(n.exports, n, n.exports, t), n.l = !0, n.exports;
  }t.m = e, t.c = o, t.d = function (e, o, r) {
    t.o(e, o) || Object.defineProperty(e, o, { enumerable: !0, get: r });
  }, t.r = function (e) {
    "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e, "__esModule", { value: !0 });
  }, t.t = function (e, o) {
    if (1 & o && (e = t(e)), 8 & o) return e;if (4 & o && "object" == (typeof e === "undefined" ? "undefined" : _typeof(e)) && e && e.__esModule) return e;var r = Object.create(null);if (t.r(r), Object.defineProperty(r, "default", { enumerable: !0, value: e }), 2 & o && "string" != typeof e) for (var n in e) {
      t.d(r, n, function (o) {
        return e[o];
      }.bind(null, n));
    }return r;
  }, t.n = function (e) {
    var o = e && e.__esModule ? function () {
      return e.default;
    } : function () {
      return e;
    };return t.d(o, "a", o), o;
  }, t.o = function (e, o) {
    return Object.prototype.hasOwnProperty.call(e, o);
  }, t.p = "", t(t.s = 0);
}([function (e, o, t) {
  "use strict";
  t.r(o);t(3), t(1), t(2);
}, function (e, o) {
  e.exports = function () {
    function _class(e) {
      _classCallCheck(this, _class);

      this.preloader = void 0, this.blender = void 0, this.ajaxloader = void 0, this.preCacheLoader = void 0, this.pageLeaveLinks = this._retrievePageLinks(e);
    }

    _createClass(_class, [{
      key: "applyLoaderTransition",
      value: function applyLoaderTransition() {
        try {
          this._applyPreLoader(), this._applyPreCashLoader();
        } catch (e) {
          console.warn("LoaderTransition could not be applied.\nFollowing error was thrown inside the class: "), console.error(e);try {
            console.warn("The LoadStyler tries to suppress possible-added hardcoded/static html items now..."), $("#LoadStyler_Preloader").css("display", "none"), $("#LoadStyler_PrecacheLoader").css("display", "none"), console.warn("success!");
          } catch (e) {
            console.warn("Hiding the html hardcoded LoadStyler-Elements failed!");
          }
        }
      }
    }, {
      key: "applyPageTransition",
      value: function applyPageTransition() {
        try {
          this.applyLoaderTransition(), this._applyLoadTransitionBlender();
        } catch (e) {
          console.warn("PageTransition could not be applied.\nFollowing error was thrown inside the class: "), console.error(e);try {
            console.warn("The LoadStyler tries to suppress possible-added hardcoded/static html items now..."), $("#LoadStyler_Blender").css("display", "none"), $("#LoadStyler_Preloader").css("display", "none"), $("#LoadStyler_PrecacheLoader").css("display", "none"), console.warn("success!");
          } catch (e) {
            console.warn("Hiding the html hardcoded LoadStyler-Elements failed!");
          }
        }
      }
    }, {
      key: "styleAjaxLoadsSimple",
      value: function styleAjaxLoadsSimple() {
        var e = this;void 0 === e.preloader && e._selectPreloader(), $(document).ajaxStart(function (o) {
          e.preloader.fadeIn();
        }), $(document).ajaxComplete(function (o, t, r) {
          e.preloader.fadeOut();
        });
      }
    }, {
      key: "styleAjaxLoads",
      value: function styleAjaxLoads(e) {
        console.info("\n\n------ styleAjaxLoads()-----"), console.info("The given parameter is:"), console.info(e);var o = this;try {
          o._selectAjaxLoader(), e.forEach(function (e) {
            return 0 === e.target.length ? console.log("There is no Element in your target selection: " + e.target) : 0 === e.source.length ? console.log("There is no Element in your source selection: " + e.source) : (e.target.css({ position: "relative" }), void e.source.click(function () {
              console.info("\n\nClick event test"), e.target.append(o.ajaxloader), o.ajaxloader.fadeIn();
            }));
          });
        } catch (e) {
          return console.warn("Something went wrong inside styleAjaxLoads. Ajax Style will not be applied. The error is: "), void console.error(e);
        }$(document).ajaxComplete(function () {
          console.debug("LoadStyler: Ajax stop detected..."), o.ajaxloader.fadeOut();
        });
      }
    }, {
      key: "_applyPreLoader",
      value: function _applyPreLoader() {
        var e = this;this._selectPreloader(), $(window).on("load", function () {
          e.preloader.delay(350).fadeOut("slow"), $("body").delay(350).css({ overflow: "visible" });
        });
      }
    }, {
      key: "_applyPreCashLoader",
      value: function _applyPreCashLoader() {
        var e = this;this._selectPrecacheLoader(), this.pageLeaveLinks.click(function () {
          e.preCacheLoader.fadeIn();
        });
      }
    }, {
      key: "_applyLoadTransitionBlender",
      value: function _applyLoadTransitionBlender() {
        var e = this;this._selectBlender(), e.blender.show(), $(window).on("load", function () {
          e.blender.delay(350).fadeOut("slow"), $("body").delay(350).css({ overflow: "visible" });
        }), e.pageLeaveLinks.click(function (o) {
          o.preventDefault();var t = $(this).attr("href");return e.blender.fadeIn(300, function () {
            document.location.href = t;
          }), !1;
        });
      }
    }, {
      key: "_selectPreloader",
      value: function _selectPreloader() {
        var e = this,
          o = $("#LoadStyler_Preloader");if (o.length > 0) return e.preloader = o;{
          var _o = $('<div id="LoadStyler_Preloader"></div>');return $("body").prepend(_o), "auto" === _o.css("z-index") && "fixed" !== _o.css("position") && _o.css({ border: "16px solid #f3f3f3", borderRadius: "50%", borderTop: "16px solid #3498db", width: "120px", height: "120px", "-webkit-animation": "spin 2s linear infinite", animation: "spin 2s linear infinite", position: "fixed", margin: "auto", top: 0, right: 0, bottom: 0, left: 0, zIndex: 101 }), e.preloader = _o;
        }
      }
    }, {
      key: "_selectBlender",
      value: function _selectBlender() {
        var e = this,
          o = $("#LoadStyler_Blender");return o.length > 0 ? e.blender = o : (o = $('<div id="LoadStyler_Blender"></div>'), $("body").prepend(o), "auto" === o.css("z-index") && "fixed" !== o.css("position") && o.css({ position: "fixed", zIndex: 100, width: "100%", height: "100%", backgroundColor: "black", opacity: 1, display: "none" }), e.blender = o);
      }
    }, {
      key: "_selectAjaxLoader",
      value: function _selectAjaxLoader() {
        var e = this,
          o = $("#LoadStyler_AjaxLoader");return o.length > 0 ? e.ajaxloader = o : (o = $('<div id="LoadStyler_AjaxLoader"></div>'), $("body").prepend(o), "auto" === o.css("z-index") && o.css({ border: "8px solid #f3f3f3", borderRadius: "50%", borderTop: "8px solid #3498db", width: "60px", height: "60px", "-webkit-animation": "spin 2s linear infinite", animation: "spin 2s linear infinite", position: "absolute", margin: "auto", top: "45%", left: "45%", zIndex: 101, display: "none" }), e.ajaxloader = o);
      }
    }, {
      key: "_selectPrecacheLoader",
      value: function _selectPrecacheLoader() {
        var e = this,
          o = $("#LoadStyler_PrecacheLoader");return o.length > 0 ? e.preCacheLoader = o : (o = $('<div id="LoadStyler_PrecacheLoader"></div>'), $("body").prepend(o), "auto" === o.css("z-index") && "fixed" !== o.css("position") && o.css({ border: "16px solid #f3f3f3", borderRadius: "50%", borderTop: "16px solid #3498db", width: "120px", height: "120px", "-webkit-animation": "spin 2s linear infinite", animation: "spin 2s linear infinite", position: "fixed", margin: "auto", top: 0, right: 0, bottom: 0, left: 0, zIndex: 101 }), e.preCacheLoader = o);
      }
    }, {
      key: "_retrievePageLinks",
      value: function _retrievePageLinks(e) {
        if (void 0 !== e) return e;try {
          return this._filterPageLeaveLinks();
        } catch (e) {
          return console.warn(e.name + ": There was an error at the custom filtering for pageLeave links, instead returning an empty array --\x3e will cause an error. No pagetransition on leave applied. Consider giving the specific links to the constructor."), [];
        }
      }
    }, {
      key: "_filterPageLeaveLinks",
      value: function _filterPageLeaveLinks() {
        var e = $("a").not($(".dropdown")).not($(".dropdown-toggle")).not(function () {
          return void 0 === $(this).attr("href") || $(this).attr("href").length < 2 || -1 !== $(this).attr("href").indexOf("#");
        });return this.pageLeaveLinks = e;
      }
    }]);

    return _class;
  }();
}, function (e, o) {}, function (e, o) {}]);