/**
 * Created by Liang Xu on 2017/2/9.
 */
define("arale/switchable/1.0.2/carousel", ["./switchable", "$", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "./plugins/effects", "arale/easing/1.0.0/easing", "./plugins/autoplay", "./plugins/circular"], function (t, e, i) {
    var s = t("./switchable"), n = t("$");
    i.exports = s.extend({
        attrs: {
            circular: !0, prevBtn: {
                getter: function (t) {
                    return n(t).eq(0)
                }
            }, nextBtn: {
                getter: function (t) {
                    return n(t).eq(0)
                }
            }, disabledBtnClass: {
                getter: function (t) {
                    return t ? t : this.get("classPrefix") + "-disabled-btn"
                }
            }
        }, _initTriggers: function (t) {
            s.prototype._initTriggers.call(this, t);
            var e = this.get("prevBtn"), i = this.get("nextBtn");
            !e[0] && t.prev && (e = t.prev, this.set("prevBtn", e)), !i[0] && t.next && (i = t.next, this.set("nextBtn", i)), e.addClass(this.CONST.PREV_BTN_CLASS), i.addClass(this.CONST.NEXT_BTN_CLASS)
        }, _getDatasetRole: function () {
            var t = s.prototype._getDatasetRole.call(this), e = this, i = ["next", "prev"];
            return n.each(i, function (i, s) {
                var n = e.$("[data-switchable-role=" + s + "]");
                n.length && (t[s] = n)
            }), t
        }, _bindTriggers: function () {
            s.prototype._bindTriggers.call(this);
            var t = this, e = this.get("circular");
            this.get("prevBtn").click(function (i) {
                i.preventDefault(), (e || t.get("activeIndex") > 0) && t.prev()
            }), this.get("nextBtn").click(function (i) {
                i.preventDefault();
                var s = t.get("length") - 1;
                (e || t.get("activeIndex") < s) && t.next()
            }), e || this.on("switch", function (e) {
                t._updateButtonStatus(e)
            })
        }, _updateButtonStatus: function (t) {
            var e = this.get("prevBtn"), i = this.get("nextBtn"), s = this.get("disabledBtnClass");
            e.removeClass(s), i.removeClass(s), 0 === t ? e.addClass(s) : t === this.get("length") - 1 && i.addClass(s)
        }
    })
}), define("arale/switchable/1.0.2/switchable", ["$", "arale/widget/1.1.1/widget", "arale/base/1.1.1/base", "arale/class/1.1.0/class", "arale/events/1.1.0/events", "arale/switchable/1.0.2/plugins/effects", "arale/easing/1.0.0/easing", "arale/switchable/1.0.2/plugins/autoplay", "arale/switchable/1.0.2/plugins/circular"], function (t, e, i) {
    function s(t, e, i, s) {
        for (var n = a("<ul>"), r = 0; t > r; r++) {
            var l = r === e ? i : "";
            a("<li>", {"class": l, html: r + 1}).appendTo(n)
        }
        return s ? n.children() : n
    }

    function n(t) {
        return {
            UI_SWITCHABLE: t || "",
            NAV_CLASS: t ? t + "-nav" : "",
            CONTENT_CLASS: t ? t + "-content" : "",
            TRIGGER_CLASS: t ? t + "-trigger" : "",
            PANEL_CLASS: t ? t + "-panel" : "",
            PREV_BTN_CLASS: t ? t + "-prev-btn" : "",
            NEXT_BTN_CLASS: t ? t + "-next-btn" : ""
        }
    }

    var a = t("$"), r = t("arale/widget/1.1.1/widget"), l = t("arale/switchable/1.0.2/plugins/effects"), c = t("arale/switchable/1.0.2/plugins/autoplay"), h = t("arale/switchable/1.0.2/plugins/circular"), o = r.extend({
        attrs: {
            triggers: {
                value: [],
                getter: function (t) {
                    return a(t)
                }
            },
            panels: {
                value: [], getter: function (t) {
                    return a(t)
                }
            },
            classPrefix: "ui-switchable",
            hasTriggers: !0,
            triggerType: "hover",
            delay: 100,
            activeIndex: {
                value: 0, setter: function (t) {
                    return parseInt(t) || 0
                }
            },
            step: 1,
            length: {
                readOnly: !0, getter: function () {
                    return Math.ceil(this.get("panels").length / this.get("step"))
                }
            },
            viewSize: [],
            activeTriggerClass: {
                getter: function (t) {
                    return t ? t : this.get("classPrefix") + "-active"
                }
            }
        }, setup: function () {
            this._initConstClass(), this._initElement();
            var t = this._getDatasetRole();
            this._initPanels(t), this._initTriggers(t), this._bindTriggers(), this._initPlugins(), this.render()
        }, _initConstClass: function () {
            this.CONST = n(this.get("classPrefix"))
        }, _initElement: function () {
            this.element.addClass(this.CONST.UI_SWITCHABLE)
        }, _getDatasetRole: function () {
            var t = this, e = {}, i = ["trigger", "panel", "nav", "content"];
            return a.each(i, function (i, s) {
                var n = t.$("[data-switchable-role=" + s + "]");
                n.length && (e[s] = n)
            }), e
        }, _initPanels: function (t) {
            var e = this.get("panels");
            if (e.length > 0 || (t.panel ? this.set("panels", e = t.panel) : t.content && (this.set("panels", e = t.content.find("> *")), this.content = t.content)), 0 === e.length)throw new Error("panels.length is ZERO");
            this.content || (this.content = e.parent()), this.content.addClass(this.CONST.CONTENT_CLASS), this.get("panels").addClass(this.CONST.PANEL_CLASS)
        }, _initTriggers: function (t) {
            var e = this.get("triggers");
            e.length > 0 || (t.trigger ? this.set("triggers", e = t.trigger) : t.nav ? (e = t.nav.find("> *"), 0 === e.length && (e = s(this.get("length"), this.get("activeIndex"), this.get("activeTriggerClass"), !0).appendTo(t.nav)), this.set("triggers", e), this.nav = t.nav) : this.get("hasTriggers") && (this.nav = s(this.get("length"), this.get("activeIndex"), this.get("activeTriggerClass")).appendTo(this.element), this.set("triggers", e = this.nav.children()))), !this.nav && e.length && (this.nav = e.parent()), this.nav && this.nav.addClass(this.CONST.NAV_CLASS), e.addClass(this.CONST.TRIGGER_CLASS).each(function (t, e) {
                a(e).data("value", t)
            })
        }, _bindTriggers: function () {
            function t(t) {
                i._onFocusTrigger(t.type, a(this).data("value"))
            }

            function e() {
                clearTimeout(i._switchTimer)
            }

            var i = this, s = this.get("triggers");
            "click" === this.get("triggerType") ? s.click(t) : s.hover(t, e)
        }, _onFocusTrigger: function (t, e) {
            var i = this;
            "click" === t ? this.switchTo(e) : this._switchTimer = setTimeout(function () {
                i.switchTo(e)
            }, this.get("delay"))
        }, _initPlugins: function () {
            this._plugins = [], this._plug(l), this._plug(c), this._plug(h)
        }, switchTo: function (t) {
            this.set("activeIndex", t)
        }, _onRenderActiveIndex: function (t, e) {
            this._switchTo(t, e)
        }, _switchTo: function (t, e) {
            this.trigger("switch", t, e), this._switchTrigger(t, e), this._switchPanel(this._getPanelInfo(t, e)), this.trigger("switched", t, e), this._isBackward = void 0
        }, _switchTrigger: function (t, e) {
            var i = this.get("triggers");
            i.length < 1 || (i.eq(e).removeClass(this.get("activeTriggerClass")), i.eq(t).addClass(this.get("activeTriggerClass")))
        }, _switchPanel: function (t) {
            t.fromPanels.hide(), t.toPanels.show()
        }, _getPanelInfo: function (t, e) {
            var i, s, n = this.get("panels").get(), r = this.get("step");
            return e > -1 && (i = n.slice(e * r, (e + 1) * r)), s = n.slice(t * r, (t + 1) * r), {
                toIndex: t,
                fromIndex: e,
                toPanels: a(s),
                fromPanels: a(i)
            }
        }, prev: function () {
            this._isBackward = !0;
            var t = this.get("activeIndex"), e = (t - 1 + this.get("length")) % this.get("length");
            this.switchTo(e)
        }, next: function () {
            this._isBackward = !1;
            var t = this.get("activeIndex"), e = (t + 1) % this.get("length");
            this.switchTo(e)
        }, _plug: function (t) {
            var e = t.attrs;
            if (e)for (var i in e)!e.hasOwnProperty(i) || i in this.attrs || this.set(i, e[i]);
            t.isNeeded.call(this) && (t.install && t.install.call(this), this._plugins.push(t))
        }, destroy: function () {
            var t = this;
            a.each(this._plugins, function (e, i) {
                i.destroy && i.destroy.call(t)
            }), o.superclass.destroy.call(this)
        }
    });
    i.exports = o
}), define("arale/switchable/1.0.2/plugins/effects", ["$", "arale/easing/1.0.0/easing"], function (t, e, i) {
    var s = t("$");
    t("arale/easing/1.0.0/easing");
    var n = "scrollx", a = "scrolly", r = "fade";
    i.exports = {
        attrs: {effect: "none", easing: "linear", duration: 500}, isNeeded: function () {
            return "none" !== this.get("effect")
        }, install: function () {
            var t = this.get("panels");
            t.show();
            var e = this.get("effect"), i = this.get("step"), a = s.isFunction(e);
            if (a || 0 !== e.indexOf("scroll")) {
                if (!a && e === r) {
                    var c = this.get("activeIndex"), h = c * i, o = h + i - 1;
                    t.each(function (t, e) {
                        var i = t >= h && o >= t;
                        s(e).css({opacity: i ? 1 : 0, position: "absolute", zIndex: i ? 9 : 1})
                    })
                }
            } else {
                var g = this.content, u = t.eq(0);
                g.css("position", "relative"), "static" === g.parent().css("position") && g.parent().css("position", "relative"), e === n && (t.css("float", "left"), g.width("35791197px"));
                var f = this.get("viewSize");
                if (f[0] || (f[0] = u.outerWidth() * i, f[1] = u.outerHeight() * i, this.set("viewSize", f)), !f[0])throw new Error("Please specify viewSize manually")
            }
            this._switchPanel = function (t) {
                var e = this.get("effect"), i = s.isFunction(e) ? e : l[e];
                i.call(this, t)
            }
        }
    };
    var l = {
        fade: function (t) {
            if (this.get("step") > 1)throw new Error('Effect "fade" only supports step === 1');
            var e = t.fromPanels.eq(0), i = t.toPanels.eq(0);
            if (this.anim && this.anim.stop(!1, !0), i.css("opacity", 1), i.show(), t.fromIndex > -1) {
                var s = this, n = this.get("duration"), a = this.get("easing");
                this.anim = e.animate({opacity: 0}, n, a, function () {
                    s.anim = null, i.css("zIndex", 9), e.css("zIndex", 1), e.css("display", "none")
                })
            } else i.css("zIndex", 9)
        }, scroll: function (t) {
            var e = this.get("effect") === n, i = this.get("viewSize")[e ? 0 : 1] * t.toIndex, s = {};
            if (s[e ? "left" : "top"] = -i + "px", this.anim && this.anim.stop(), t.fromIndex > -1) {
                var a = this, r = this.get("duration"), l = this.get("easing");
                this.anim = this.content.animate(s, r, l, function () {
                    a.anim = null
                })
            } else this.content.css(s)
        }
    };
    l[a] = l.scroll, l[n] = l.scroll, i.exports.Effects = l
}), define("arale/switchable/1.0.2/plugins/autoplay", ["$"], function (t, e, i) {
    function s(t, e) {
        function i() {
            i.stop(), s = setTimeout(t, e)
        }

        e = e || 200;
        var s;
        return i.stop = function () {
            s && (clearTimeout(s), s = 0)
        }, i
    }

    function n(t) {
        var e = r.scrollTop(), i = e + r.height(), s = t.offset().top, n = s + t.height();
        return i > s && n > e
    }

    var a = t("$"), r = a(window);
    i.exports = {
        attrs: {autoplay: !1, interval: 5e3}, isNeeded: function () {
            return this.get("autoplay")
        }, install: function () {
            function t() {
                e(), h.paused = !1, i = setInterval(function () {
                    h.paused || h.next()
                }, c)
            }

            function e() {
                i && (clearInterval(i), i = null), h.paused = !0
            }

            var i, a = this.element, l = "." + this.cid, c = this.get("interval"), h = this;
            t(), this.stop = e, this.start = t, this._scrollDetect = s(function () {
                h[n(a) ? "start" : "stop"]()
            }), r.on("scroll" + l, this._scrollDetect), this.element.hover(e, t)
        }, destroy: function () {
            var t = "." + this.cid;
            this.stop && this.stop(), this._scrollDetect && (this._scrollDetect.stop(), r.off("scroll" + t))
        }
    }
}), define("arale/switchable/1.0.2/plugins/circular", ["$", "arale/switchable/1.0.2/plugins/effects", "arale/easing/1.0.0/easing"], function (t, e, i) {
    function s(t, e, i) {
        var s = this.get("step"), n = this.get("length"), r = t ? n - 1 : 0, l = r * s, c = (r + 1) * s, h = t ? i : -i * n, o = t ? -i * n : i * n, g = a(this.get("panels").get().slice(l, c));
        return g.css("position", "relative"), g.css(e, o + "px"), h
    }

    function n(t, e, i) {
        var s = this.get("step"), n = this.get("length"), r = t ? n - 1 : 0, l = r * s, c = (r + 1) * s, h = a(this.get("panels").get().slice(l, c));
        h.css("position", ""), h.css(e, ""), this.content.css(e, t ? -i * (n - 1) : "")
    }

    var a = t("$"), r = "scrollx", l = "scrolly", c = t("arale/switchable/1.0.2/plugins/effects").Effects;
    i.exports = {
        isNeeded: function () {
            var t = this.get("effect"), e = this.get("circular");
            return e && (t === r || t === l)
        }, install: function () {
            this._scrollType = this.get("effect"), this.set("effect", "scrollCircular")
        }
    }, c.scrollCircular = function (t) {
        var e = t.toIndex, i = t.fromIndex, a = this._scrollType === r, l = a ? "left" : "top", c = this.get("viewSize")[a ? 0 : 1], h = -c * e, o = {};
        if (o[l] = h + "px", i > -1) {
            this.anim && this.anim.stop(!1, !0);
            var g = this.get("length"), u = 0 === i && e === g - 1, f = i === g - 1 && 0 === e, p = void 0 === this._isBackward ? i > e : this._isBackward, v = p && u || !p && f;
            v && (h = s.call(this, p, l, c), o[l] = h + "px");
            var d = this.get("duration"), _ = this.get("easing"), w = this;
            this.anim = this.content.animate(o, d, _, function () {
                w.anim = null, v && n.call(w, p, l, c)
            })
        } else this.content.css(o)
    }
});