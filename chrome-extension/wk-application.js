!function (e, t) {
    "object" == typeof module && "object" == typeof module.exports ? module.exports = e.document ? t(e, !0) : function (e) {
        if (!e.document)
            throw new Error("jQuery requires a window with a document");
        return t(e)
    }
        : t(e)
}("undefined" != typeof window ? window : this, (function (e, t) {
    function n(e) {
        var t = !!e && "length" in e && e.length
            , n = pe.type(e);
        return "function" !== n && !pe.isWindow(e) && ("array" === n || 0 === t || "number" == typeof t && t > 0 && t - 1 in e)
    }
    function r(e, t, n) {
        if (pe.isFunction(t))
            return pe.grep(e, (function (e, r) {
                return !!t.call(e, r, e) !== n
            }
            ));
        if (t.nodeType)
            return pe.grep(e, (function (e) {
                return e === t !== n
            }
            ));
        if ("string" == typeof t) {
            if (Se.test(t))
                return pe.filter(t, e, n);
            t = pe.filter(t, e)
        }
        return pe.grep(e, (function (e) {
            return pe.inArray(e, t) > -1 !== n
        }
        ))
    }
    function i(e, t) {
        do {
            e = e[t]
        } while (e && 1 !== e.nodeType);
        return e
    }
    function o(e) {
        var t = {};
        return pe.each(e.match(De) || [], (function (e, n) {
            t[n] = !0
        }
        )),
            t
    }
    function a() {
        re.addEventListener ? (re.removeEventListener("DOMContentLoaded", s),
            e.removeEventListener("load", s)) : (re.detachEvent("onreadystatechange", s),
                e.detachEvent("onload", s))
    }
    function s() {
        (re.addEventListener || "load" === e.event.type || "complete" === re.readyState) && (a(),
            pe.ready())
    }
    function l(e, t, n) {
        if (void 0 === n && 1 === e.nodeType) {
            var r = "data-" + t.replace(He, "-$1").toLowerCase();
            if ("string" == typeof (n = e.getAttribute(r))) {
                try {
                    n = "true" === n || "false" !== n && ("null" === n ? null : +n + "" === n ? +n : Me.test(n) ? pe.parseJSON(n) : n)
                } catch (e) { }
                pe.data(e, t, n)
            } else
                n = void 0
        }
        return n
    }
    function u(e) {
        var t;
        for (t in e)
            if (("data" !== t || !pe.isEmptyObject(e[t])) && "toJSON" !== t)
                return !1;
        return !0
    }
    function c(e, t, n, r) {
        if (Ae(e)) {
            var i, o, a = pe.expando, s = e.nodeType, l = s ? pe.cache : e, u = s ? e[a] : e[a] && a;
            if (u && l[u] && (r || l[u].data) || void 0 !== n || "string" != typeof t)
                return u || (u = s ? e[a] = ne.pop() || pe.guid++ : a),
                    l[u] || (l[u] = s ? {} : {
                        toJSON: pe.noop
                    }),
                    "object" != typeof t && "function" != typeof t || (r ? l[u] = pe.extend(l[u], t) : l[u].data = pe.extend(l[u].data, t)),
                    o = l[u],
                    r || (o.data || (o.data = {}),
                        o = o.data),
                    void 0 !== n && (o[pe.camelCase(t)] = n),
                    "string" == typeof t ? null == (i = o[t]) && (i = o[pe.camelCase(t)]) : i = o,
                    i
        }
    }
    function f(e, t, n) {
        if (Ae(e)) {
            var r, i, o = e.nodeType, a = o ? pe.cache : e, s = o ? e[pe.expando] : pe.expando;
            if (a[s]) {
                if (t && (r = n ? a[s] : a[s].data)) {
                    i = (t = pe.isArray(t) ? t.concat(pe.map(t, pe.camelCase)) : t in r || (t = pe.camelCase(t)) in r ? [t] : t.split(" ")).length;
                    for (; i--;)
                        delete r[t[i]];
                    if (n ? !u(r) : !pe.isEmptyObject(r))
                        return
                }
                (n || (delete a[s].data,
                    u(a[s]))) && (o ? pe.cleanData([e], !0) : fe.deleteExpando || a != a.window ? delete a[s] : a[s] = void 0)
            }
        }
    }
    function d(e, t, n, r) {
        var i, o = 1, a = 20, s = r ? function () {
            return r.cur()
        }
            : function () {
                return pe.css(e, t, "")
            }
            , l = s(), u = n && n[3] || (pe.cssNumber[t] ? "" : "px"), c = (pe.cssNumber[t] || "px" !== u && +l) && Re.exec(pe.css(e, t));
        if (c && c[3] !== u) {
            u = u || c[3],
                n = n || [],
                c = +l || 1;
            do {
                c /= o = o || ".5",
                    pe.style(e, t, c + u)
            } while (o !== (o = s() / l) && 1 !== o && --a)
        }
        return n && (c = +c || +l || 0,
            i = n[1] ? c + (n[1] + 1) * n[2] : +n[2],
            r && (r.unit = u,
                r.start = c,
                r.end = i)),
            i
    }
    function p(e) {
        var t = Je.split("|")
            , n = e.createDocumentFragment();
        if (n.createElement)
            for (; t.length;)
                n.createElement(t.pop());
        return n
    }
    function h(e, t) {
        var n, r, i = 0, o = void 0 !== e.getElementsByTagName ? e.getElementsByTagName(t || "*") : void 0 !== e.querySelectorAll ? e.querySelectorAll(t || "*") : void 0;
        if (!o)
            for (o = [],
                n = e.childNodes || e; null != (r = n[i]); i++)
                !t || pe.nodeName(r, t) ? o.push(r) : pe.merge(o, h(r, t));
        return void 0 === t || t && pe.nodeName(e, t) ? pe.merge([e], o) : o
    }
    function g(e, t) {
        for (var n, r = 0; null != (n = e[r]); r++)
            pe._data(n, "globalEval", !t || pe._data(t[r], "globalEval"))
    }
    function m(e) {
        ze.test(e.type) && (e.defaultChecked = e.checked)
    }
    function v(e, t, n, r, i) {
        for (var o, a, s, l, u, c, f, d = e.length, v = p(t), y = [], b = 0; b < d; b++)
            if ((a = e[b]) || 0 === a)
                if ("object" === pe.type(a))
                    pe.merge(y, a.nodeType ? [a] : a);
                else if (Qe.test(a)) {
                    for (l = l || v.appendChild(t.createElement("div")),
                        u = ($e.exec(a) || ["", ""])[1].toLowerCase(),
                        f = Ye[u] || Ye._default,
                        l.innerHTML = f[1] + pe.htmlPrefilter(a) + f[2],
                        o = f[0]; o--;)
                        l = l.lastChild;
                    if (!fe.leadingWhitespace && Ue.test(a) && y.push(t.createTextNode(Ue.exec(a)[0])),
                        !fe.tbody)
                        for (o = (a = "table" !== u || Ve.test(a) ? "<table>" !== f[1] || Ve.test(a) ? 0 : l : l.firstChild) && a.childNodes.length; o--;)
                            pe.nodeName(c = a.childNodes[o], "tbody") && !c.childNodes.length && a.removeChild(c);
                    for (pe.merge(y, l.childNodes),
                        l.textContent = ""; l.firstChild;)
                        l.removeChild(l.firstChild);
                    l = v.lastChild
                } else
                    y.push(t.createTextNode(a));
        for (l && v.removeChild(l),
            fe.appendChecked || pe.grep(h(y, "input"), m),
            b = 0; a = y[b++];)
            if (r && pe.inArray(a, r) > -1)
                i && i.push(a);
            else if (s = pe.contains(a.ownerDocument, a),
                l = h(v.appendChild(a), "script"),
                s && g(l),
                n)
                for (o = 0; a = l[o++];)
                    Xe.test(a.type || "") && n.push(a);
        return l = null,
            v
    }
    function y() {
        return !0
    }
    function b() {
        return !1
    }
    function x() {
        try {
            return re.activeElement
        } catch (e) { }
    }
    function w(e, t, n, r, i, o) {
        var a, s;
        if ("object" == typeof t) {
            for (s in "string" != typeof n && (r = r || n,
                n = void 0),
                t)
                w(e, s, n, r, t[s], o);
            return e
        }
        if (null == r && null == i ? (i = n,
            r = n = void 0) : null == i && ("string" == typeof n ? (i = r,
                r = void 0) : (i = r,
                    r = n,
                    n = void 0)),
            !1 === i)
            i = b;
        else if (!i)
            return e;
        return 1 === o && (a = i,
            i = function (e) {
                return pe().off(e),
                    a.apply(this, arguments)
            }
            ,
            i.guid = a.guid || (a.guid = pe.guid++)),
            e.each((function () {
                pe.event.add(this, t, i, r, n)
            }
            ))
    }
    function T(e, t) {
        return pe.nodeName(e, "table") && pe.nodeName(11 !== t.nodeType ? t : t.firstChild, "tr") ? e.getElementsByTagName("tbody")[0] || e.appendChild(e.ownerDocument.createElement("tbody")) : e
    }
    function S(e) {
        return e.type = (null !== pe.find.attr(e, "type")) + "/" + e.type,
            e
    }
    function C(e) {
        var t = st.exec(e.type);
        return t ? e.type = t[1] : e.removeAttribute("type"),
            e
    }
    function j(e, t) {
        if (1 === t.nodeType && pe.hasData(e)) {
            var n, r, i, o = pe._data(e), a = pe._data(t, o), s = o.events;
            if (s)
                for (n in delete a.handle,
                    a.events = {},
                    s)
                    for (r = 0,
                        i = s[n].length; r < i; r++)
                        pe.event.add(t, n, s[n][r]);
            a.data && (a.data = pe.extend({}, a.data))
        }
    }
    function E(e, t) {
        var n, r, i;
        if (1 === t.nodeType) {
            if (n = t.nodeName.toLowerCase(),
                !fe.noCloneEvent && t[pe.expando]) {
                for (r in (i = pe._data(t)).events)
                    pe.removeEvent(t, r, i.handle);
                t.removeAttribute(pe.expando)
            }
            "script" === n && t.text !== e.text ? (S(t).text = e.text,
                C(t)) : "object" === n ? (t.parentNode && (t.outerHTML = e.outerHTML),
                    fe.html5Clone && e.innerHTML && !pe.trim(t.innerHTML) && (t.innerHTML = e.innerHTML)) : "input" === n && ze.test(e.type) ? (t.defaultChecked = t.checked = e.checked,
                        t.value !== e.value && (t.value = e.value)) : "option" === n ? t.defaultSelected = t.selected = e.defaultSelected : "input" !== n && "textarea" !== n || (t.defaultValue = e.defaultValue)
        }
    }
    function k(e, t, n, r) {
        t = oe.apply([], t);
        var i, o, a, s, l, u, c = 0, f = e.length, d = f - 1, p = t[0], g = pe.isFunction(p);
        if (g || f > 1 && "string" == typeof p && !fe.checkClone && at.test(p))
            return e.each((function (i) {
                var o = e.eq(i);
                g && (t[0] = p.call(this, i, o.html())),
                    k(o, t, n, r)
            }
            ));
        if (f && (i = (u = v(t, e[0].ownerDocument, !1, e, r)).firstChild,
            1 === u.childNodes.length && (u = i),
            i || r)) {
            for (a = (s = pe.map(h(u, "script"), S)).length; c < f; c++)
                o = u,
                    c !== d && (o = pe.clone(o, !0, !0),
                        a && pe.merge(s, h(o, "script"))),
                    n.call(e[c], o, c);
            if (a)
                for (l = s[s.length - 1].ownerDocument,
                    pe.map(s, C),
                    c = 0; c < a; c++)
                    o = s[c],
                        Xe.test(o.type || "") && !pe._data(o, "globalEval") && pe.contains(l, o) && (o.src ? pe._evalUrl && pe._evalUrl(o.src) : pe.globalEval((o.text || o.textContent || o.innerHTML || "").replace(lt, "")));
            u = i = null
        }
        return e
    }
    function _(e, t, n) {
        for (var r, i = t ? pe.filter(t, e) : e, o = 0; null != (r = i[o]); o++)
            n || 1 !== r.nodeType || pe.cleanData(h(r)),
                r.parentNode && (n && pe.contains(r.ownerDocument, r) && g(h(r, "script")),
                    r.parentNode.removeChild(r));
        return e
    }
    function N(e, t) {
        var n = pe(t.createElement(e)).appendTo(t.body)
            , r = pe.css(n[0], "display");
        return n.detach(),
            r
    }
    function D(e) {
        var t = re
            , n = ft[e];
        return n || ("none" !== (n = N(e, t)) && n || ((t = ((ct = (ct || pe("<iframe frameborder='0' width='0' height='0'/>")).appendTo(t.documentElement))[0].contentWindow || ct[0].contentDocument).document).write(),
            t.close(),
            n = N(e, t),
            ct.detach()),
            ft[e] = n),
            n
    }
    function L(e, t) {
        return {
            get: function () {
                if (!e())
                    return (this.get = t).apply(this, arguments);
                delete this.get
            }
        }
    }
    function A(e) {
        if (e in Et)
            return e;
        for (var t = e.charAt(0).toUpperCase() + e.slice(1), n = jt.length; n--;)
            if ((e = jt[n] + t) in Et)
                return e
    }
    function M(e, t) {
        for (var n, r, i, o = [], a = 0, s = e.length; a < s; a++)
            (r = e[a]).style && (o[a] = pe._data(r, "olddisplay"),
                n = r.style.display,
                t ? (o[a] || "none" !== n || (r.style.display = ""),
                    "" === r.style.display && We(r) && (o[a] = pe._data(r, "olddisplay", D(r.nodeName)))) : (i = We(r),
                        (n && "none" !== n || !i) && pe._data(r, "olddisplay", i ? n : pe.css(r, "display"))));
        for (a = 0; a < s; a++)
            (r = e[a]).style && (t && "none" !== r.style.display && "" !== r.style.display || (r.style.display = t ? o[a] || "" : "none"));
        return e
    }
    function H(e, t, n) {
        var r = Tt.exec(t);
        return r ? Math.max(0, r[1] - (n || 0)) + (r[2] || "px") : t
    }
    function q(e, t, n, r, i) {
        for (var o = n === (r ? "border" : "content") ? 4 : "width" === t ? 1 : 0, a = 0; o < 4; o += 2)
            "margin" === n && (a += pe.css(e, n + Ie[o], !0, i)),
                r ? ("content" === n && (a -= pe.css(e, "padding" + Ie[o], !0, i)),
                    "margin" !== n && (a -= pe.css(e, "border" + Ie[o] + "Width", !0, i))) : (a += pe.css(e, "padding" + Ie[o], !0, i),
                        "padding" !== n && (a += pe.css(e, "border" + Ie[o] + "Width", !0, i)));
        return a
    }
    function O(e, t, n) {
        var r = !0
            , i = "width" === t ? e.offsetWidth : e.offsetHeight
            , o = mt(e)
            , a = fe.boxSizing && "border-box" === pe.css(e, "boxSizing", !1, o);
        if (i <= 0 || null == i) {
            if (((i = vt(e, t, o)) < 0 || null == i) && (i = e.style[t]),
                pt.test(i))
                return i;
            r = a && (fe.boxSizingReliable() || i === e.style[t]),
                i = parseFloat(i) || 0
        }
        return i + q(e, t, n || (a ? "border" : "content"), r, o) + "px"
    }
    function P(e, t, n, r, i) {
        return new P.prototype.init(e, t, n, r, i)
    }
    function F() {
        return e.setTimeout((function () {
            kt = void 0
        }
        )),
            kt = pe.now()
    }
    function R(e, t) {
        var n, r = {
            height: e
        }, i = 0;
        for (t = t ? 1 : 0; i < 4; i += 2 - t)
            r["margin" + (n = Ie[i])] = r["padding" + n] = e;
        return t && (r.opacity = r.width = e),
            r
    }
    function I(e, t, n) {
        for (var r, i = (z.tweeners[t] || []).concat(z.tweeners["*"]), o = 0, a = i.length; o < a; o++)
            if (r = i[o].call(n, t, e))
                return r
    }
    function W(e, t, n) {
        var r, i, o, a, s, l, u, c = this, f = {}, d = e.style, p = e.nodeType && We(e), h = pe._data(e, "fxshow");
        for (r in n.queue || (null == (s = pe._queueHooks(e, "fx")).unqueued && (s.unqueued = 0,
            l = s.empty.fire,
            s.empty.fire = function () {
                s.unqueued || l()
            }
        ),
            s.unqueued++,
            c.always((function () {
                c.always((function () {
                    s.unqueued--,
                        pe.queue(e, "fx").length || s.empty.fire()
                }
                ))
            }
            ))),
            1 === e.nodeType && ("height" in t || "width" in t) && (n.overflow = [d.overflow, d.overflowX, d.overflowY],
                "inline" === ("none" === (u = pe.css(e, "display")) ? pe._data(e, "olddisplay") || D(e.nodeName) : u) && "none" === pe.css(e, "float") && (fe.inlineBlockNeedsLayout && "inline" !== D(e.nodeName) ? d.zoom = 1 : d.display = "inline-block")),
            n.overflow && (d.overflow = "hidden",
                fe.shrinkWrapBlocks() || c.always((function () {
                    d.overflow = n.overflow[0],
                        d.overflowX = n.overflow[1],
                        d.overflowY = n.overflow[2]
                }
                ))),
            t)
            if (i = t[r],
                Nt.exec(i)) {
                if (delete t[r],
                    o = o || "toggle" === i,
                    i === (p ? "hide" : "show")) {
                    if ("show" !== i || !h || void 0 === h[r])
                        continue;
                    p = !0
                }
                f[r] = h && h[r] || pe.style(e, r)
            } else
                u = void 0;
        if (pe.isEmptyObject(f))
            "inline" === ("none" === u ? D(e.nodeName) : u) && (d.display = u);
        else
            for (r in h ? "hidden" in h && (p = h.hidden) : h = pe._data(e, "fxshow", {}),
                o && (h.hidden = !p),
                p ? pe(e).show() : c.done((function () {
                    pe(e).hide()
                }
                )),
                c.done((function () {
                    var t;
                    for (t in pe._removeData(e, "fxshow"),
                        f)
                        pe.style(e, t, f[t])
                }
                )),
                f)
                a = I(p ? h[r] : 0, r, c),
                    r in h || (h[r] = a.start,
                        p && (a.end = a.start,
                            a.start = "width" === r || "height" === r ? 1 : 0))
    }
    function B(e, t) {
        var n, r, i, o, a;
        for (n in e)
            if (i = t[r = pe.camelCase(n)],
                o = e[n],
                pe.isArray(o) && (i = o[1],
                    o = e[n] = o[0]),
                n !== r && (e[r] = o,
                    delete e[n]),
                (a = pe.cssHooks[r]) && "expand" in a)
                for (n in o = a.expand(o),
                    delete e[r],
                    o)
                    n in e || (e[n] = o[n],
                        t[n] = i);
            else
                t[r] = i
    }
    function z(e, t, n) {
        var r, i, o = 0, a = z.prefilters.length, s = pe.Deferred().always((function () {
            delete l.elem
        }
        )), l = function () {
            if (i)
                return !1;
            for (var t = kt || F(), n = Math.max(0, u.startTime + u.duration - t), r = 1 - (n / u.duration || 0), o = 0, a = u.tweens.length; o < a; o++)
                u.tweens[o].run(r);
            return s.notifyWith(e, [u, r, n]),
                r < 1 && a ? n : (s.resolveWith(e, [u]),
                    !1)
        }, u = s.promise({
            elem: e,
            props: pe.extend({}, t),
            opts: pe.extend(!0, {
                specialEasing: {},
                easing: pe.easing._default
            }, n),
            originalProperties: t,
            originalOptions: n,
            startTime: kt || F(),
            duration: n.duration,
            tweens: [],
            createTween: function (t, n) {
                var r = pe.Tween(e, u.opts, t, n, u.opts.specialEasing[t] || u.opts.easing);
                return u.tweens.push(r),
                    r
            },
            stop: function (t) {
                var n = 0
                    , r = t ? u.tweens.length : 0;
                if (i)
                    return this;
                for (i = !0; n < r; n++)
                    u.tweens[n].run(1);
                return t ? (s.notifyWith(e, [u, 1, 0]),
                    s.resolveWith(e, [u, t])) : s.rejectWith(e, [u, t]),
                    this
            }
        }), c = u.props;
        for (B(c, u.opts.specialEasing); o < a; o++)
            if (r = z.prefilters[o].call(u, e, c, u.opts))
                return pe.isFunction(r.stop) && (pe._queueHooks(u.elem, u.opts.queue).stop = pe.proxy(r.stop, r)),
                    r;
        return pe.map(c, I, u),
            pe.isFunction(u.opts.start) && u.opts.start.call(e, u),
            pe.fx.timer(pe.extend(l, {
                elem: e,
                anim: u,
                queue: u.opts.queue
            })),
            u.progress(u.opts.progress).done(u.opts.done, u.opts.complete).fail(u.opts.fail).always(u.opts.always)
    }
    function $(e) {
        return pe.attr(e, "class") || ""
    }
    function X(e) {
        return function (t, n) {
            "string" != typeof t && (n = t,
                t = "*");
            var r, i = 0, o = t.toLowerCase().match(De) || [];
            if (pe.isFunction(n))
                for (; r = o[i++];)
                    "+" === r.charAt(0) ? (r = r.slice(1) || "*",
                        (e[r] = e[r] || []).unshift(n)) : (e[r] = e[r] || []).push(n)
        }
    }
    function U(e, t, n, r) {
        function i(s) {
            var l;
            return o[s] = !0,
                pe.each(e[s] || [], (function (e, s) {
                    var u = s(t, n, r);
                    return "string" != typeof u || a || o[u] ? a ? !(l = u) : void 0 : (t.dataTypes.unshift(u),
                        i(u),
                        !1)
                }
                )),
                l
        }
        var o = {}
            , a = e === en;
        return i(t.dataTypes[0]) || !o["*"] && i("*")
    }
    function J(e, t) {
        var n, r, i = pe.ajaxSettings.flatOptions || {};
        for (r in t)
            void 0 !== t[r] && ((i[r] ? e : n || (n = {}))[r] = t[r]);
        return n && pe.extend(!0, e, n),
            e
    }
    function Y(e, t, n) {
        for (var r, i, o, a, s = e.contents, l = e.dataTypes; "*" === l[0];)
            l.shift(),
                void 0 === i && (i = e.mimeType || t.getResponseHeader("Content-Type"));
        if (i)
            for (a in s)
                if (s[a] && s[a].test(i)) {
                    l.unshift(a);
                    break
                }
        if (l[0] in n)
            o = l[0];
        else {
            for (a in n) {
                if (!l[0] || e.converters[a + " " + l[0]]) {
                    o = a;
                    break
                }
                r || (r = a)
            }
            o = o || r
        }
        if (o)
            return o !== l[0] && l.unshift(o),
                n[o]
    }
    function Q(e, t, n, r) {
        var i, o, a, s, l, u = {}, c = e.dataTypes.slice();
        if (c[1])
            for (a in e.converters)
                u[a.toLowerCase()] = e.converters[a];
        for (o = c.shift(); o;)
            if (e.responseFields[o] && (n[e.responseFields[o]] = t),
                !l && r && e.dataFilter && (t = e.dataFilter(t, e.dataType)),
                l = o,
                o = c.shift())
                if ("*" === o)
                    o = l;
                else if ("*" !== l && l !== o) {
                    if (!(a = u[l + " " + o] || u["* " + o]))
                        for (i in u)
                            if ((s = i.split(" "))[1] === o && (a = u[l + " " + s[0]] || u["* " + s[0]])) {
                                !0 === a ? a = u[i] : !0 !== u[i] && (o = s[0],
                                    c.unshift(s[1]));
                                break
                            }
                    if (!0 !== a)
                        if (a && e.throws)
                            t = a(t);
                        else
                            try {
                                t = a(t)
                            } catch (e) {
                                return {
                                    state: "parsererror",
                                    error: a ? e : "No conversion from " + l + " to " + o
                                }
                            }
                }
        return {
            state: "success",
            data: t
        }
    }
    function V(e) {
        return e.style && e.style.display || pe.css(e, "display")
    }
    function K(e) {
        if (!pe.contains(e.ownerDocument || re, e))
            return !0;
        for (; e && 1 === e.nodeType;) {
            if ("none" === V(e) || "hidden" === e.type)
                return !0;
            e = e.parentNode
        }
        return !1
    }
    function G(e, t, n, r) {
        var i;
        if (pe.isArray(t))
            pe.each(t, (function (t, i) {
                n || an.test(e) ? r(e, i) : G(e + "[" + ("object" == typeof i && null != i ? t : "") + "]", i, n, r)
            }
            ));
        else if (n || "object" !== pe.type(t))
            r(e, t);
        else
            for (i in t)
                G(e + "[" + i + "]", t[i], n, r)
    }
    function Z() {
        try {
            return new e.XMLHttpRequest
        } catch (e) { }
    }
    function ee() {
        try {
            return new e.ActiveXObject("Microsoft.XMLHTTP")
        } catch (e) { }
    }
    function te(e) {
        return pe.isWindow(e) ? e : 9 === e.nodeType && (e.defaultView || e.parentWindow)
    }
    var ne = []
        , re = e.document
        , ie = ne.slice
        , oe = ne.concat
        , ae = ne.push
        , se = ne.indexOf
        , le = {}
        , ue = le.toString
        , ce = le.hasOwnProperty
        , fe = {}
        , de = "1.12.4"
        , pe = function (e, t) {
            return new pe.fn.init(e, t)
        }
        , he = /^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g
        , ge = /^-ms-/
        , me = /-([\da-z])/gi
        , ve = function (e, t) {
            return t.toUpperCase()
        };
    pe.fn = pe.prototype = {
        jquery: de,
        constructor: pe,
        selector: "",
        length: 0,
        toArray: function () {
            return ie.call(this)
        },
        get: function (e) {
            return null != e ? e < 0 ? this[e + this.length] : this[e] : ie.call(this)
        },
        pushStack: function (e) {
            var t = pe.merge(this.constructor(), e);
            return t.prevObject = this,
                t.context = this.context,
                t
        },
        each: function (e) {
            return pe.each(this, e)
        },
        map: function (e) {
            return this.pushStack(pe.map(this, (function (t, n) {
                return e.call(t, n, t)
            }
            )))
        },
        slice: function () {
            return this.pushStack(ie.apply(this, arguments))
        },
        first: function () {
            return this.eq(0)
        },
        last: function () {
            return this.eq(-1)
        },
        eq: function (e) {
            var t = this.length
                , n = +e + (e < 0 ? t : 0);
            return this.pushStack(n >= 0 && n < t ? [this[n]] : [])
        },
        end: function () {
            return this.prevObject || this.constructor()
        },
        push: ae,
        sort: ne.sort,
        splice: ne.splice
    },
        pe.extend = pe.fn.extend = function () {
            var e, t, n, r, i, o, a = arguments[0] || {}, s = 1, l = arguments.length, u = !1;
            for ("boolean" == typeof a && (u = a,
                a = arguments[s] || {},
                s++),
                "object" == typeof a || pe.isFunction(a) || (a = {}),
                s === l && (a = this,
                    s--); s < l; s++)
                if (null != (i = arguments[s]))
                    for (r in i)
                        e = a[r],
                            a !== (n = i[r]) && (u && n && (pe.isPlainObject(n) || (t = pe.isArray(n))) ? (t ? (t = !1,
                                o = e && pe.isArray(e) ? e : []) : o = e && pe.isPlainObject(e) ? e : {},
                                a[r] = pe.extend(u, o, n)) : void 0 !== n && (a[r] = n));
            return a
        }
        ,
        pe.extend({
            expando: "jQuery" + (de + Math.random()).replace(/\D/g, ""),
            isReady: !0,
            error: function (e) {
                throw new Error(e)
            },
            noop: function () { },
            isFunction: function (e) {
                return "function" === pe.type(e)
            },
            isArray: Array.isArray || function (e) {
                return "array" === pe.type(e)
            }
            ,
            isWindow: function (e) {
                return null != e && e == e.window
            },
            isNumeric: function (e) {
                var t = e && e.toString();
                return !pe.isArray(e) && t - parseFloat(t) + 1 >= 0
            },
            isEmptyObject: function (e) {
                var t;
                for (t in e)
                    return !1;
                return !0
            },
            isPlainObject: function (e) {
                var t;
                if (!e || "object" !== pe.type(e) || e.nodeType || pe.isWindow(e))
                    return !1;
                try {
                    if (e.constructor && !ce.call(e, "constructor") && !ce.call(e.constructor.prototype, "isPrototypeOf"))
                        return !1
                } catch (e) {
                    return !1
                }
                if (!fe.ownFirst)
                    for (t in e)
                        return ce.call(e, t);
                for (t in e)
                    ;
                return void 0 === t || ce.call(e, t)
            },
            type: function (e) {
                return null == e ? e + "" : "object" == typeof e || "function" == typeof e ? le[ue.call(e)] || "object" : typeof e
            },
            globalEval: function (t) {
                t && pe.trim(t) && (e.execScript || function (t) {
                    e.eval.call(e, t)
                }
                )(t)
            },
            camelCase: function (e) {
                return e.replace(ge, "ms-").replace(me, ve)
            },
            nodeName: function (e, t) {
                return e.nodeName && e.nodeName.toLowerCase() === t.toLowerCase()
            },
            each: function (e, t) {
                var r, i = 0;
                if (n(e))
                    for (r = e.length; i < r && !1 !== t.call(e[i], i, e[i]); i++)
                        ;
                else
                    for (i in e)
                        if (!1 === t.call(e[i], i, e[i]))
                            break;
                return e
            },
            trim: function (e) {
                return null == e ? "" : (e + "").replace(he, "")
            },
            makeArray: function (e, t) {
                var r = t || [];
                return null != e && (n(Object(e)) ? pe.merge(r, "string" == typeof e ? [e] : e) : ae.call(r, e)),
                    r
            },
            inArray: function (e, t, n) {
                var r;
                if (t) {
                    if (se)
                        return se.call(t, e, n);
                    for (r = t.length,
                        n = n ? n < 0 ? Math.max(0, r + n) : n : 0; n < r; n++)
                        if (n in t && t[n] === e)
                            return n
                }
                return -1
            },
            merge: function (e, t) {
                for (var n = +t.length, r = 0, i = e.length; r < n;)
                    e[i++] = t[r++];
                if (n != n)
                    for (; void 0 !== t[r];)
                        e[i++] = t[r++];
                return e.length = i,
                    e
            },
            grep: function (e, t, n) {
                for (var r = [], i = 0, o = e.length, a = !n; i < o; i++)
                    !t(e[i], i) !== a && r.push(e[i]);
                return r
            },
            map: function (e, t, r) {
                var i, o, a = 0, s = [];
                if (n(e))
                    for (i = e.length; a < i; a++)
                        null != (o = t(e[a], a, r)) && s.push(o);
                else
                    for (a in e)
                        null != (o = t(e[a], a, r)) && s.push(o);
                return oe.apply([], s)
            },
            guid: 1,
            proxy: function (e, t) {
                var n, r, i;
                if ("string" == typeof t && (i = e[t],
                    t = e,
                    e = i),
                    pe.isFunction(e))
                    return n = ie.call(arguments, 2),
                        r = function () {
                            return e.apply(t || this, n.concat(ie.call(arguments)))
                        }
                        ,
                        r.guid = e.guid = e.guid || pe.guid++,
                        r
            },
            now: function () {
                return +new Date
            },
            support: fe
        }),
        "function" == typeof Symbol && (pe.fn[Symbol.iterator] = ne[Symbol.iterator]),
        pe.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "), (function (e, t) {
            le["[object " + t + "]"] = t.toLowerCase()
        }
        ));
    var ye = function (e) {
        function t(e, t, n, r) {
            var i, o, a, s, l, u, f, p, h = t && t.ownerDocument, g = t ? t.nodeType : 9;
            if (n = n || [],
                "string" != typeof e || !e || 1 !== g && 9 !== g && 11 !== g)
                return n;
            if (!r && ((t ? t.ownerDocument || t : I) !== A && L(t),
                t = t || A,
                H)) {
                if (11 !== g && (u = ve.exec(e)))
                    if (i = u[1]) {
                        if (9 === g) {
                            if (!(a = t.getElementById(i)))
                                return n;
                            if (a.id === i)
                                return n.push(a),
                                    n
                        } else if (h && (a = h.getElementById(i)) && F(t, a) && a.id === i)
                            return n.push(a),
                                n
                    } else {
                        if (u[2])
                            return G.apply(n, t.getElementsByTagName(e)),
                                n;
                        if ((i = u[3]) && w.getElementsByClassName && t.getElementsByClassName)
                            return G.apply(n, t.getElementsByClassName(i)),
                                n
                    }
                if (w.qsa && !X[e + " "] && (!q || !q.test(e))) {
                    if (1 !== g)
                        h = t,
                            p = e;
                    else if ("object" !== t.nodeName.toLowerCase()) {
                        for ((s = t.getAttribute("id")) ? s = s.replace(be, "\\$&") : t.setAttribute("id", s = R),
                            o = (f = j(e)).length,
                            l = de.test(s) ? "#" + s : "[id='" + s + "']"; o--;)
                            f[o] = l + " " + d(f[o]);
                        p = f.join(","),
                            h = ye.test(e) && c(t.parentNode) || t
                    }
                    if (p)
                        try {
                            return G.apply(n, h.querySelectorAll(p)),
                                n
                        } catch (e) { } finally {
                            s === R && t.removeAttribute("id")
                        }
                }
            }
            return k(e.replace(se, "$1"), t, n, r)
        }
        function n() {
            function e(n, r) {
                return t.push(n + " ") > T.cacheLength && delete e[t.shift()],
                    e[n + " "] = r
            }
            var t = [];
            return e
        }
        function r(e) {
            return e[R] = !0,
                e
        }
        function i(e) {
            var t = A.createElement("div");
            try {
                return !!e(t)
            } catch (e) {
                return !1
            } finally {
                t.parentNode && t.parentNode.removeChild(t),
                    t = null
            }
        }
        function o(e, t) {
            for (var n = e.split("|"), r = n.length; r--;)
                T.attrHandle[n[r]] = t
        }
        function a(e, t) {
            var n = t && e
                , r = n && 1 === e.nodeType && 1 === t.nodeType && (~t.sourceIndex || J) - (~e.sourceIndex || J);
            if (r)
                return r;
            if (n)
                for (; n = n.nextSibling;)
                    if (n === t)
                        return -1;
            return e ? 1 : -1
        }
        function s(e) {
            return function (t) {
                return "input" === t.nodeName.toLowerCase() && t.type === e
            }
        }
        function l(e) {
            return function (t) {
                var n = t.nodeName.toLowerCase();
                return ("input" === n || "button" === n) && t.type === e
            }
        }
        function u(e) {
            return r((function (t) {
                return t = +t,
                    r((function (n, r) {
                        for (var i, o = e([], n.length, t), a = o.length; a--;)
                            n[i = o[a]] && (n[i] = !(r[i] = n[i]))
                    }
                    ))
            }
            ))
        }
        function c(e) {
            return e && void 0 !== e.getElementsByTagName && e
        }
        function f() { }
        function d(e) {
            for (var t = 0, n = e.length, r = ""; t < n; t++)
                r += e[t].value;
            return r
        }
        function p(e, t, n) {
            var r = t.dir
                , i = n && "parentNode" === r
                , o = B++;
            return t.first ? function (t, n, o) {
                for (; t = t[r];)
                    if (1 === t.nodeType || i)
                        return e(t, n, o)
            }
                : function (t, n, a) {
                    var s, l, u, c = [W, o];
                    if (a) {
                        for (; t = t[r];)
                            if ((1 === t.nodeType || i) && e(t, n, a))
                                return !0
                    } else
                        for (; t = t[r];)
                            if (1 === t.nodeType || i) {
                                if ((s = (l = (u = t[R] || (t[R] = {}))[t.uniqueID] || (u[t.uniqueID] = {}))[r]) && s[0] === W && s[1] === o)
                                    return c[2] = s[2];
                                if (l[r] = c,
                                    c[2] = e(t, n, a))
                                    return !0
                            }
                }
        }
        function h(e) {
            return e.length > 1 ? function (t, n, r) {
                for (var i = e.length; i--;)
                    if (!e[i](t, n, r))
                        return !1;
                return !0
            }
                : e[0]
        }
        function g(e, n, r) {
            for (var i = 0, o = n.length; i < o; i++)
                t(e, n[i], r);
            return r
        }
        function m(e, t, n, r, i) {
            for (var o, a = [], s = 0, l = e.length, u = null != t; s < l; s++)
                (o = e[s]) && (n && !n(o, r, i) || (a.push(o),
                    u && t.push(s)));
            return a
        }
        function v(e, t, n, i, o, a) {
            return i && !i[R] && (i = v(i)),
                o && !o[R] && (o = v(o, a)),
                r((function (r, a, s, l) {
                    var u, c, f, d = [], p = [], h = a.length, v = r || g(t || "*", s.nodeType ? [s] : s, []), y = !e || !r && t ? v : m(v, d, e, s, l), b = n ? o || (r ? e : h || i) ? [] : a : y;
                    if (n && n(y, b, s, l),
                        i)
                        for (u = m(b, p),
                            i(u, [], s, l),
                            c = u.length; c--;)
                            (f = u[c]) && (b[p[c]] = !(y[p[c]] = f));
                    if (r) {
                        if (o || e) {
                            if (o) {
                                for (u = [],
                                    c = b.length; c--;)
                                    (f = b[c]) && u.push(y[c] = f);
                                o(null, b = [], u, l)
                            }
                            for (c = b.length; c--;)
                                (f = b[c]) && (u = o ? ee(r, f) : d[c]) > -1 && (r[u] = !(a[u] = f))
                        }
                    } else
                        b = m(b === a ? b.splice(h, b.length) : b),
                            o ? o(null, a, b, l) : G.apply(a, b)
                }
                ))
        }
        function y(e) {
            for (var t, n, r, i = e.length, o = T.relative[e[0].type], a = o || T.relative[" "], s = o ? 1 : 0, l = p((function (e) {
                return e === t
            }
            ), a, !0), u = p((function (e) {
                return ee(t, e) > -1
            }
            ), a, !0), c = [function (e, n, r) {
                var i = !o && (r || n !== _) || ((t = n).nodeType ? l(e, n, r) : u(e, n, r));
                return t = null,
                    i
            }
            ]; s < i; s++)
                if (n = T.relative[e[s].type])
                    c = [p(h(c), n)];
                else {
                    if ((n = T.filter[e[s].type].apply(null, e[s].matches))[R]) {
                        for (r = ++s; r < i && !T.relative[e[r].type]; r++)
                            ;
                        return v(s > 1 && h(c), s > 1 && d(e.slice(0, s - 1).concat({
                            value: " " === e[s - 2].type ? "*" : ""
                        })).replace(se, "$1"), n, s < r && y(e.slice(s, r)), r < i && y(e = e.slice(r)), r < i && d(e))
                    }
                    c.push(n)
                }
            return h(c)
        }
        function b(e, n) {
            var i = n.length > 0
                , o = e.length > 0
                , a = function (r, a, s, l, u) {
                    var c, f, d, p = 0, h = "0", g = r && [], v = [], y = _, b = r || o && T.find.TAG("*", u), x = W += null == y ? 1 : Math.random() || .1, w = b.length;
                    for (u && (_ = a === A || a || u); h !== w && null != (c = b[h]); h++) {
                        if (o && c) {
                            for (f = 0,
                                a || c.ownerDocument === A || (L(c),
                                    s = !H); d = e[f++];)
                                if (d(c, a || A, s)) {
                                    l.push(c);
                                    break
                                }
                            u && (W = x)
                        }
                        i && ((c = !d && c) && p--,
                            r && g.push(c))
                    }
                    if (p += h,
                        i && h !== p) {
                        for (f = 0; d = n[f++];)
                            d(g, v, a, s);
                        if (r) {
                            if (p > 0)
                                for (; h--;)
                                    g[h] || v[h] || (v[h] = V.call(l));
                            v = m(v)
                        }
                        G.apply(l, v),
                            u && !r && v.length > 0 && p + n.length > 1 && t.uniqueSort(l)
                    }
                    return u && (W = x,
                        _ = y),
                        g
                };
            return i ? r(a) : a
        }
        var x, w, T, S, C, j, E, k, _, N, D, L, A, M, H, q, O, P, F, R = "sizzle" + 1 * new Date, I = e.document, W = 0, B = 0, z = n(), $ = n(), X = n(), U = function (e, t) {
            return e === t && (D = !0),
                0
        }, J = 1 << 31, Y = {}.hasOwnProperty, Q = [], V = Q.pop, K = Q.push, G = Q.push, Z = Q.slice, ee = function (e, t) {
            for (var n = 0, r = e.length; n < r; n++)
                if (e[n] === t)
                    return n;
            return -1
        }, te = "checked|selected|async|autofocus|autoplay|controls|defer|disabled|hidden|ismap|loop|multiple|open|readonly|required|scoped", ne = "[\\x20\\t\\r\\n\\f]", re = "(?:\\\\.|[\\w-]|[^\\x00-\\xa0])+", ie = "\\[" + ne + "*(" + re + ")(?:" + ne + "*([*^$|!~]?=)" + ne + "*(?:'((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\"|(" + re + "))|)" + ne + "*\\]", oe = ":(" + re + ")(?:\\((('((?:\\\\.|[^\\\\'])*)'|\"((?:\\\\.|[^\\\\\"])*)\")|((?:\\\\.|[^\\\\()[\\]]|" + ie + ")*)|.*)\\)|)", ae = new RegExp(ne + "+", "g"), se = new RegExp("^" + ne + "+|((?:^|[^\\\\])(?:\\\\.)*)" + ne + "+$", "g"), le = new RegExp("^" + ne + "*," + ne + "*"), ue = new RegExp("^" + ne + "*([>+~]|" + ne + ")" + ne + "*"), ce = new RegExp("=" + ne + "*([^\\]'\"]*?)" + ne + "*\\]", "g"), fe = new RegExp(oe), de = new RegExp("^" + re + "$"), pe = {
            ID: new RegExp("^#(" + re + ")"),
            CLASS: new RegExp("^\\.(" + re + ")"),
            TAG: new RegExp("^(" + re + "|[*])"),
            ATTR: new RegExp("^" + ie),
            PSEUDO: new RegExp("^" + oe),
            CHILD: new RegExp("^:(only|first|last|nth|nth-last)-(child|of-type)(?:\\(" + ne + "*(even|odd|(([+-]|)(\\d*)n|)" + ne + "*(?:([+-]|)" + ne + "*(\\d+)|))" + ne + "*\\)|)", "i"),
            bool: new RegExp("^(?:" + te + ")$", "i"),
            needsContext: new RegExp("^" + ne + "*[>+~]|:(even|odd|eq|gt|lt|nth|first|last)(?:\\(" + ne + "*((?:-\\d)?\\d*)" + ne + "*\\)|)(?=[^-]|$)", "i")
        }, he = /^(?:input|select|textarea|button)$/i, ge = /^h\d$/i, me = /^[^{]+\{\s*\[native \w/, ve = /^(?:#([\w-]+)|(\w+)|\.([\w-]+))$/, ye = /[+~]/, be = /'|\\/g, xe = new RegExp("\\\\([\\da-f]{1,6}" + ne + "?|(" + ne + ")|.)", "ig"), we = function (e, t, n) {
            var r = "0x" + t - 65536;
            return r != r || n ? t : r < 0 ? String.fromCharCode(r + 65536) : String.fromCharCode(r >> 10 | 55296, 1023 & r | 56320)
        }, Te = function () {
            L()
        };
        try {
            G.apply(Q = Z.call(I.childNodes), I.childNodes),
                Q[I.childNodes.length].nodeType
        } catch (e) {
            G = {
                apply: Q.length ? function (e, t) {
                    K.apply(e, Z.call(t))
                }
                    : function (e, t) {
                        for (var n = e.length, r = 0; e[n++] = t[r++];)
                            ;
                        e.length = n - 1
                    }
            }
        }
        for (x in w = t.support = {},
            C = t.isXML = function (e) {
                var t = e && (e.ownerDocument || e).documentElement;
                return !!t && "HTML" !== t.nodeName
            }
            ,
            L = t.setDocument = function (e) {
                var t, n, r = e ? e.ownerDocument || e : I;
                return r !== A && 9 === r.nodeType && r.documentElement ? (M = (A = r).documentElement,
                    H = !C(A),
                    (n = A.defaultView) && n.top !== n && (n.addEventListener ? n.addEventListener("unload", Te, !1) : n.attachEvent && n.attachEvent("onunload", Te)),
                    w.attributes = i((function (e) {
                        return e.className = "i",
                            !e.getAttribute("className")
                    }
                    )),
                    w.getElementsByTagName = i((function (e) {
                        return e.appendChild(A.createComment("")),
                            !e.getElementsByTagName("*").length
                    }
                    )),
                    w.getElementsByClassName = me.test(A.getElementsByClassName),
                    w.getById = i((function (e) {
                        return M.appendChild(e).id = R,
                            !A.getElementsByName || !A.getElementsByName(R).length
                    }
                    )),
                    w.getById ? (T.find.ID = function (e, t) {
                        if (void 0 !== t.getElementById && H) {
                            var n = t.getElementById(e);
                            return n ? [n] : []
                        }
                    }
                        ,
                        T.filter.ID = function (e) {
                            var t = e.replace(xe, we);
                            return function (e) {
                                return e.getAttribute("id") === t
                            }
                        }
                    ) : (delete T.find.ID,
                        T.filter.ID = function (e) {
                            var t = e.replace(xe, we);
                            return function (e) {
                                var n = void 0 !== e.getAttributeNode && e.getAttributeNode("id");
                                return n && n.value === t
                            }
                        }
                    ),
                    T.find.TAG = w.getElementsByTagName ? function (e, t) {
                        return void 0 !== t.getElementsByTagName ? t.getElementsByTagName(e) : w.qsa ? t.querySelectorAll(e) : void 0
                    }
                        : function (e, t) {
                            var n, r = [], i = 0, o = t.getElementsByTagName(e);
                            if ("*" === e) {
                                for (; n = o[i++];)
                                    1 === n.nodeType && r.push(n);
                                return r
                            }
                            return o
                        }
                    ,
                    T.find.CLASS = w.getElementsByClassName && function (e, t) {
                        if (void 0 !== t.getElementsByClassName && H)
                            return t.getElementsByClassName(e)
                    }
                    ,
                    O = [],
                    q = [],
                    (w.qsa = me.test(A.querySelectorAll)) && (i((function (e) {
                        M.appendChild(e).innerHTML = "<a id='" + R + "'></a><select id='" + R + "-\r\\' msallowcapture=''><option selected=''></option></select>",
                            e.querySelectorAll("[msallowcapture^='']").length && q.push("[*^$]=" + ne + "*(?:''|\"\")"),
                            e.querySelectorAll("[selected]").length || q.push("\\[" + ne + "*(?:value|" + te + ")"),
                            e.querySelectorAll("[id~=" + R + "-]").length || q.push("~="),
                            e.querySelectorAll(":checked").length || q.push(":checked"),
                            e.querySelectorAll("a#" + R + "+*").length || q.push(".#.+[+~]")
                    }
                    )),
                        i((function (e) {
                            var t = A.createElement("input");
                            t.setAttribute("type", "hidden"),
                                e.appendChild(t).setAttribute("name", "D"),
                                e.querySelectorAll("[name=d]").length && q.push("name" + ne + "*[*^$|!~]?="),
                                e.querySelectorAll(":enabled").length || q.push(":enabled", ":disabled"),
                                e.querySelectorAll("*,:x"),
                                q.push(",.*:")
                        }
                        ))),
                    (w.matchesSelector = me.test(P = M.matches || M.webkitMatchesSelector || M.mozMatchesSelector || M.oMatchesSelector || M.msMatchesSelector)) && i((function (e) {
                        w.disconnectedMatch = P.call(e, "div"),
                            P.call(e, "[s!='']:x"),
                            O.push("!=", oe)
                    }
                    )),
                    q = q.length && new RegExp(q.join("|")),
                    O = O.length && new RegExp(O.join("|")),
                    t = me.test(M.compareDocumentPosition),
                    F = t || me.test(M.contains) ? function (e, t) {
                        var n = 9 === e.nodeType ? e.documentElement : e
                            , r = t && t.parentNode;
                        return e === r || !(!r || 1 !== r.nodeType || !(n.contains ? n.contains(r) : e.compareDocumentPosition && 16 & e.compareDocumentPosition(r)))
                    }
                        : function (e, t) {
                            if (t)
                                for (; t = t.parentNode;)
                                    if (t === e)
                                        return !0;
                            return !1
                        }
                    ,
                    U = t ? function (e, t) {
                        if (e === t)
                            return D = !0,
                                0;
                        var n = !e.compareDocumentPosition - !t.compareDocumentPosition;
                        return n || (1 & (n = (e.ownerDocument || e) === (t.ownerDocument || t) ? e.compareDocumentPosition(t) : 1) || !w.sortDetached && t.compareDocumentPosition(e) === n ? e === A || e.ownerDocument === I && F(I, e) ? -1 : t === A || t.ownerDocument === I && F(I, t) ? 1 : N ? ee(N, e) - ee(N, t) : 0 : 4 & n ? -1 : 1)
                    }
                        : function (e, t) {
                            if (e === t)
                                return D = !0,
                                    0;
                            var n, r = 0, i = e.parentNode, o = t.parentNode, s = [e], l = [t];
                            if (!i || !o)
                                return e === A ? -1 : t === A ? 1 : i ? -1 : o ? 1 : N ? ee(N, e) - ee(N, t) : 0;
                            if (i === o)
                                return a(e, t);
                            for (n = e; n = n.parentNode;)
                                s.unshift(n);
                            for (n = t; n = n.parentNode;)
                                l.unshift(n);
                            for (; s[r] === l[r];)
                                r++;
                            return r ? a(s[r], l[r]) : s[r] === I ? -1 : l[r] === I ? 1 : 0
                        }
                    ,
                    A) : A
            }
            ,
            t.matches = function (e, n) {
                return t(e, null, null, n)
            }
            ,
            t.matchesSelector = function (e, n) {
                if ((e.ownerDocument || e) !== A && L(e),
                    n = n.replace(ce, "='$1']"),
                    w.matchesSelector && H && !X[n + " "] && (!O || !O.test(n)) && (!q || !q.test(n)))
                    try {
                        var r = P.call(e, n);
                        if (r || w.disconnectedMatch || e.document && 11 !== e.document.nodeType)
                            return r
                    } catch (e) { }
                return t(n, A, null, [e]).length > 0
            }
            ,
            t.contains = function (e, t) {
                return (e.ownerDocument || e) !== A && L(e),
                    F(e, t)
            }
            ,
            t.attr = function (e, t) {
                (e.ownerDocument || e) !== A && L(e);
                var n = T.attrHandle[t.toLowerCase()]
                    , r = n && Y.call(T.attrHandle, t.toLowerCase()) ? n(e, t, !H) : void 0;
                return void 0 !== r ? r : w.attributes || !H ? e.getAttribute(t) : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }
            ,
            t.error = function (e) {
                throw new Error("Syntax error, unrecognized expression: " + e)
            }
            ,
            t.uniqueSort = function (e) {
                var t, n = [], r = 0, i = 0;
                if (D = !w.detectDuplicates,
                    N = !w.sortStable && e.slice(0),
                    e.sort(U),
                    D) {
                    for (; t = e[i++];)
                        t === e[i] && (r = n.push(i));
                    for (; r--;)
                        e.splice(n[r], 1)
                }
                return N = null,
                    e
            }
            ,
            S = t.getText = function (e) {
                var t, n = "", r = 0, i = e.nodeType;
                if (i) {
                    if (1 === i || 9 === i || 11 === i) {
                        if ("string" == typeof e.textContent)
                            return e.textContent;
                        for (e = e.firstChild; e; e = e.nextSibling)
                            n += S(e)
                    } else if (3 === i || 4 === i)
                        return e.nodeValue
                } else
                    for (; t = e[r++];)
                        n += S(t);
                return n
            }
            ,
            T = t.selectors = {
                cacheLength: 50,
                createPseudo: r,
                match: pe,
                attrHandle: {},
                find: {},
                relative: {
                    ">": {
                        dir: "parentNode",
                        first: !0
                    },
                    " ": {
                        dir: "parentNode"
                    },
                    "+": {
                        dir: "previousSibling",
                        first: !0
                    },
                    "~": {
                        dir: "previousSibling"
                    }
                },
                preFilter: {
                    ATTR: function (e) {
                        return e[1] = e[1].replace(xe, we),
                            e[3] = (e[3] || e[4] || e[5] || "").replace(xe, we),
                            "~=" === e[2] && (e[3] = " " + e[3] + " "),
                            e.slice(0, 4)
                    },
                    CHILD: function (e) {
                        return e[1] = e[1].toLowerCase(),
                            "nth" === e[1].slice(0, 3) ? (e[3] || t.error(e[0]),
                                e[4] = +(e[4] ? e[5] + (e[6] || 1) : 2 * ("even" === e[3] || "odd" === e[3])),
                                e[5] = +(e[7] + e[8] || "odd" === e[3])) : e[3] && t.error(e[0]),
                            e
                    },
                    PSEUDO: function (e) {
                        var t, n = !e[6] && e[2];
                        return pe.CHILD.test(e[0]) ? null : (e[3] ? e[2] = e[4] || e[5] || "" : n && fe.test(n) && (t = j(n, !0)) && (t = n.indexOf(")", n.length - t) - n.length) && (e[0] = e[0].slice(0, t),
                            e[2] = n.slice(0, t)),
                            e.slice(0, 3))
                    }
                },
                filter: {
                    TAG: function (e) {
                        var t = e.replace(xe, we).toLowerCase();
                        return "*" === e ? function () {
                            return !0
                        }
                            : function (e) {
                                return e.nodeName && e.nodeName.toLowerCase() === t
                            }
                    },
                    CLASS: function (e) {
                        var t = z[e + " "];
                        return t || (t = new RegExp("(^|" + ne + ")" + e + "(" + ne + "|$)")) && z(e, (function (e) {
                            return t.test("string" == typeof e.className && e.className || void 0 !== e.getAttribute && e.getAttribute("class") || "")
                        }
                        ))
                    },
                    ATTR: function (e, n, r) {
                        return function (i) {
                            var o = t.attr(i, e);
                            return null == o ? "!=" === n : !n || (o += "",
                                "=" === n ? o === r : "!=" === n ? o !== r : "^=" === n ? r && 0 === o.indexOf(r) : "*=" === n ? r && o.indexOf(r) > -1 : "$=" === n ? r && o.slice(-r.length) === r : "~=" === n ? (" " + o.replace(ae, " ") + " ").indexOf(r) > -1 : "|=" === n && (o === r || o.slice(0, r.length + 1) === r + "-"))
                        }
                    },
                    CHILD: function (e, t, n, r, i) {
                        var o = "nth" !== e.slice(0, 3)
                            , a = "last" !== e.slice(-4)
                            , s = "of-type" === t;
                        return 1 === r && 0 === i ? function (e) {
                            return !!e.parentNode
                        }
                            : function (t, n, l) {
                                var u, c, f, d, p, h, g = o !== a ? "nextSibling" : "previousSibling", m = t.parentNode, v = s && t.nodeName.toLowerCase(), y = !l && !s, b = !1;
                                if (m) {
                                    if (o) {
                                        for (; g;) {
                                            for (d = t; d = d[g];)
                                                if (s ? d.nodeName.toLowerCase() === v : 1 === d.nodeType)
                                                    return !1;
                                            h = g = "only" === e && !h && "nextSibling"
                                        }
                                        return !0
                                    }
                                    if (h = [a ? m.firstChild : m.lastChild],
                                        a && y) {
                                        for (b = (p = (u = (c = (f = (d = m)[R] || (d[R] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === W && u[1]) && u[2],
                                            d = p && m.childNodes[p]; d = ++p && d && d[g] || (b = p = 0) || h.pop();)
                                            if (1 === d.nodeType && ++b && d === t) {
                                                c[e] = [W, p, b];
                                                break
                                            }
                                    } else if (y && (b = p = (u = (c = (f = (d = t)[R] || (d[R] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] || [])[0] === W && u[1]),
                                        !1 === b)
                                        for (; (d = ++p && d && d[g] || (b = p = 0) || h.pop()) && ((s ? d.nodeName.toLowerCase() !== v : 1 !== d.nodeType) || !++b || (y && ((c = (f = d[R] || (d[R] = {}))[d.uniqueID] || (f[d.uniqueID] = {}))[e] = [W, b]),
                                            d !== t));)
                                            ;
                                    return (b -= i) === r || b % r == 0 && b / r >= 0
                                }
                            }
                    },
                    PSEUDO: function (e, n) {
                        var i, o = T.pseudos[e] || T.setFilters[e.toLowerCase()] || t.error("unsupported pseudo: " + e);
                        return o[R] ? o(n) : o.length > 1 ? (i = [e, e, "", n],
                            T.setFilters.hasOwnProperty(e.toLowerCase()) ? r((function (e, t) {
                                for (var r, i = o(e, n), a = i.length; a--;)
                                    e[r = ee(e, i[a])] = !(t[r] = i[a])
                            }
                            )) : function (e) {
                                return o(e, 0, i)
                            }
                        ) : o
                    }
                },
                pseudos: {
                    not: r((function (e) {
                        var t = []
                            , n = []
                            , i = E(e.replace(se, "$1"));
                        return i[R] ? r((function (e, t, n, r) {
                            for (var o, a = i(e, null, r, []), s = e.length; s--;)
                                (o = a[s]) && (e[s] = !(t[s] = o))
                        }
                        )) : function (e, r, o) {
                            return t[0] = e,
                                i(t, null, o, n),
                                t[0] = null,
                                !n.pop()
                        }
                    }
                    )),
                    has: r((function (e) {
                        return function (n) {
                            return t(e, n).length > 0
                        }
                    }
                    )),
                    contains: r((function (e) {
                        return e = e.replace(xe, we),
                            function (t) {
                                return (t.textContent || t.innerText || S(t)).indexOf(e) > -1
                            }
                    }
                    )),
                    lang: r((function (e) {
                        return de.test(e || "") || t.error("unsupported lang: " + e),
                            e = e.replace(xe, we).toLowerCase(),
                            function (t) {
                                var n;
                                do {
                                    if (n = H ? t.lang : t.getAttribute("xml:lang") || t.getAttribute("lang"))
                                        return (n = n.toLowerCase()) === e || 0 === n.indexOf(e + "-")
                                } while ((t = t.parentNode) && 1 === t.nodeType);
                                return !1
                            }
                    }
                    )),
                    target: function (t) {
                        var n = e.location && e.location.hash;
                        return n && n.slice(1) === t.id
                    },
                    root: function (e) {
                        return e === M
                    },
                    focus: function (e) {
                        return e === A.activeElement && (!A.hasFocus || A.hasFocus()) && !!(e.type || e.href || ~e.tabIndex)
                    },
                    enabled: function (e) {
                        return !1 === e.disabled
                    },
                    disabled: function (e) {
                        return !0 === e.disabled
                    },
                    checked: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && !!e.checked || "option" === t && !!e.selected
                    },
                    selected: function (e) {
                        return e.parentNode && e.parentNode.selectedIndex,
                            !0 === e.selected
                    },
                    empty: function (e) {
                        for (e = e.firstChild; e; e = e.nextSibling)
                            if (e.nodeType < 6)
                                return !1;
                        return !0
                    },
                    parent: function (e) {
                        return !T.pseudos.empty(e)
                    },
                    header: function (e) {
                        return ge.test(e.nodeName)
                    },
                    input: function (e) {
                        return he.test(e.nodeName)
                    },
                    button: function (e) {
                        var t = e.nodeName.toLowerCase();
                        return "input" === t && "button" === e.type || "button" === t
                    },
                    text: function (e) {
                        var t;
                        return "input" === e.nodeName.toLowerCase() && "text" === e.type && (null == (t = e.getAttribute("type")) || "text" === t.toLowerCase())
                    },
                    first: u((function () {
                        return [0]
                    }
                    )),
                    last: u((function (e, t) {
                        return [t - 1]
                    }
                    )),
                    eq: u((function (e, t, n) {
                        return [n < 0 ? n + t : n]
                    }
                    )),
                    even: u((function (e, t) {
                        for (var n = 0; n < t; n += 2)
                            e.push(n);
                        return e
                    }
                    )),
                    odd: u((function (e, t) {
                        for (var n = 1; n < t; n += 2)
                            e.push(n);
                        return e
                    }
                    )),
                    lt: u((function (e, t, n) {
                        for (var r = n < 0 ? n + t : n; --r >= 0;)
                            e.push(r);
                        return e
                    }
                    )),
                    gt: u((function (e, t, n) {
                        for (var r = n < 0 ? n + t : n; ++r < t;)
                            e.push(r);
                        return e
                    }
                    ))
                }
            },
            T.pseudos.nth = T.pseudos.eq,
        {
            radio: !0,
            checkbox: !0,
            file: !0,
            password: !0,
            image: !0
        })
            T.pseudos[x] = s(x);
        for (x in {
            submit: !0,
            reset: !0
        })
            T.pseudos[x] = l(x);
        return f.prototype = T.filters = T.pseudos,
            T.setFilters = new f,
            j = t.tokenize = function (e, n) {
                var r, i, o, a, s, l, u, c = $[e + " "];
                if (c)
                    return n ? 0 : c.slice(0);
                for (s = e,
                    l = [],
                    u = T.preFilter; s;) {
                    for (a in r && !(i = le.exec(s)) || (i && (s = s.slice(i[0].length) || s),
                        l.push(o = [])),
                        r = !1,
                        (i = ue.exec(s)) && (r = i.shift(),
                            o.push({
                                value: r,
                                type: i[0].replace(se, " ")
                            }),
                            s = s.slice(r.length)),
                        T.filter)
                        !(i = pe[a].exec(s)) || u[a] && !(i = u[a](i)) || (r = i.shift(),
                            o.push({
                                value: r,
                                type: a,
                                matches: i
                            }),
                            s = s.slice(r.length));
                    if (!r)
                        break
                }
                return n ? s.length : s ? t.error(e) : $(e, l).slice(0)
            }
            ,
            E = t.compile = function (e, t) {
                var n, r = [], i = [], o = X[e + " "];
                if (!o) {
                    for (t || (t = j(e)),
                        n = t.length; n--;)
                        (o = y(t[n]))[R] ? r.push(o) : i.push(o);
                    (o = X(e, b(i, r))).selector = e
                }
                return o
            }
            ,
            k = t.select = function (e, t, n, r) {
                var i, o, a, s, l, u = "function" == typeof e && e, f = !r && j(e = u.selector || e);
                if (n = n || [],
                    1 === f.length) {
                    if ((o = f[0] = f[0].slice(0)).length > 2 && "ID" === (a = o[0]).type && w.getById && 9 === t.nodeType && H && T.relative[o[1].type]) {
                        if (!(t = (T.find.ID(a.matches[0].replace(xe, we), t) || [])[0]))
                            return n;
                        u && (t = t.parentNode),
                            e = e.slice(o.shift().value.length)
                    }
                    for (i = pe.needsContext.test(e) ? 0 : o.length; i-- && (a = o[i],
                        !T.relative[s = a.type]);)
                        if ((l = T.find[s]) && (r = l(a.matches[0].replace(xe, we), ye.test(o[0].type) && c(t.parentNode) || t))) {
                            if (o.splice(i, 1),
                                !(e = r.length && d(o)))
                                return G.apply(n, r),
                                    n;
                            break
                        }
                }
                return (u || E(e, f))(r, t, !H, n, !t || ye.test(e) && c(t.parentNode) || t),
                    n
            }
            ,
            w.sortStable = R.split("").sort(U).join("") === R,
            w.detectDuplicates = !!D,
            L(),
            w.sortDetached = i((function (e) {
                return 1 & e.compareDocumentPosition(A.createElement("div"))
            }
            )),
            i((function (e) {
                return e.innerHTML = "<a href='#'></a>",
                    "#" === e.firstChild.getAttribute("href")
            }
            )) || o("type|href|height|width", (function (e, t, n) {
                if (!n)
                    return e.getAttribute(t, "type" === t.toLowerCase() ? 1 : 2)
            }
            )),
            w.attributes && i((function (e) {
                return e.innerHTML = "<input/>",
                    e.firstChild.setAttribute("value", ""),
                    "" === e.firstChild.getAttribute("value")
            }
            )) || o("value", (function (e, t, n) {
                if (!n && "input" === e.nodeName.toLowerCase())
                    return e.defaultValue
            }
            )),
            i((function (e) {
                return null == e.getAttribute("disabled")
            }
            )) || o(te, (function (e, t, n) {
                var r;
                if (!n)
                    return !0 === e[t] ? t.toLowerCase() : (r = e.getAttributeNode(t)) && r.specified ? r.value : null
            }
            )),
            t
    }(e);
    pe.find = ye,
        pe.expr = ye.selectors,
        pe.expr[":"] = pe.expr.pseudos,
        pe.uniqueSort = pe.unique = ye.uniqueSort,
        pe.text = ye.getText,
        pe.isXMLDoc = ye.isXML,
        pe.contains = ye.contains;
    var be = function (e, t, n) {
        for (var r = [], i = void 0 !== n; (e = e[t]) && 9 !== e.nodeType;)
            if (1 === e.nodeType) {
                if (i && pe(e).is(n))
                    break;
                r.push(e)
            }
        return r
    }
        , xe = function (e, t) {
            for (var n = []; e; e = e.nextSibling)
                1 === e.nodeType && e !== t && n.push(e);
            return n
        }
        , we = pe.expr.match.needsContext
        , Te = /^<([\w-]+)\s*\/?>(?:<\/\1>|)$/
        , Se = /^.[^:#\[\.,]*$/;
    pe.filter = function (e, t, n) {
        var r = t[0];
        return n && (e = ":not(" + e + ")"),
            1 === t.length && 1 === r.nodeType ? pe.find.matchesSelector(r, e) ? [r] : [] : pe.find.matches(e, pe.grep(t, (function (e) {
                return 1 === e.nodeType
            }
            )))
    }
        ,
        pe.fn.extend({
            find: function (e) {
                var t, n = [], r = this, i = r.length;
                if ("string" != typeof e)
                    return this.pushStack(pe(e).filter((function () {
                        for (t = 0; t < i; t++)
                            if (pe.contains(r[t], this))
                                return !0
                    }
                    )));
                for (t = 0; t < i; t++)
                    pe.find(e, r[t], n);
                return (n = this.pushStack(i > 1 ? pe.unique(n) : n)).selector = this.selector ? this.selector + " " + e : e,
                    n
            },
            filter: function (e) {
                return this.pushStack(r(this, e || [], !1))
            },
            not: function (e) {
                return this.pushStack(r(this, e || [], !0))
            },
            is: function (e) {
                return !!r(this, "string" == typeof e && we.test(e) ? pe(e) : e || [], !1).length
            }
        });
    var Ce, je = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]*))$/;
    (pe.fn.init = function (e, t, n) {
        var r, i;
        if (!e)
            return this;
        if (n = n || Ce,
            "string" == typeof e) {
            if (!(r = "<" === e.charAt(0) && ">" === e.charAt(e.length - 1) && e.length >= 3 ? [null, e, null] : je.exec(e)) || !r[1] && t)
                return !t || t.jquery ? (t || n).find(e) : this.constructor(t).find(e);
            if (r[1]) {
                if (t = t instanceof pe ? t[0] : t,
                    pe.merge(this, pe.parseHTML(r[1], t && t.nodeType ? t.ownerDocument || t : re, !0)),
                    Te.test(r[1]) && pe.isPlainObject(t))
                    for (r in t)
                        pe.isFunction(this[r]) ? this[r](t[r]) : this.attr(r, t[r]);
                return this
            }
            if ((i = re.getElementById(r[2])) && i.parentNode) {
                if (i.id !== r[2])
                    return Ce.find(e);
                this.length = 1,
                    this[0] = i
            }
            return this.context = re,
                this.selector = e,
                this
        }
        return e.nodeType ? (this.context = this[0] = e,
            this.length = 1,
            this) : pe.isFunction(e) ? void 0 !== n.ready ? n.ready(e) : e(pe) : (void 0 !== e.selector && (this.selector = e.selector,
                this.context = e.context),
                pe.makeArray(e, this))
    }
    ).prototype = pe.fn,
        Ce = pe(re);
    var Ee = /^(?:parents|prev(?:Until|All))/
        , ke = {
            children: !0,
            contents: !0,
            next: !0,
            prev: !0
        };
    pe.fn.extend({
        has: function (e) {
            var t, n = pe(e, this), r = n.length;
            return this.filter((function () {
                for (t = 0; t < r; t++)
                    if (pe.contains(this, n[t]))
                        return !0
            }
            ))
        },
        closest: function (e, t) {
            for (var n, r = 0, i = this.length, o = [], a = we.test(e) || "string" != typeof e ? pe(e, t || this.context) : 0; r < i; r++)
                for (n = this[r]; n && n !== t; n = n.parentNode)
                    if (n.nodeType < 11 && (a ? a.index(n) > -1 : 1 === n.nodeType && pe.find.matchesSelector(n, e))) {
                        o.push(n);
                        break
                    }
            return this.pushStack(o.length > 1 ? pe.uniqueSort(o) : o)
        },
        index: function (e) {
            return e ? "string" == typeof e ? pe.inArray(this[0], pe(e)) : pe.inArray(e.jquery ? e[0] : e, this) : this[0] && this[0].parentNode ? this.first().prevAll().length : -1
        },
        add: function (e, t) {
            return this.pushStack(pe.uniqueSort(pe.merge(this.get(), pe(e, t))))
        },
        addBack: function (e) {
            return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
        }
    }),
        pe.each({
            parent: function (e) {
                var t = e.parentNode;
                return t && 11 !== t.nodeType ? t : null
            },
            parents: function (e) {
                return be(e, "parentNode")
            },
            parentsUntil: function (e, t, n) {
                return be(e, "parentNode", n)
            },
            next: function (e) {
                return i(e, "nextSibling")
            },
            prev: function (e) {
                return i(e, "previousSibling")
            },
            nextAll: function (e) {
                return be(e, "nextSibling")
            },
            prevAll: function (e) {
                return be(e, "previousSibling")
            },
            nextUntil: function (e, t, n) {
                return be(e, "nextSibling", n)
            },
            prevUntil: function (e, t, n) {
                return be(e, "previousSibling", n)
            },
            siblings: function (e) {
                return xe((e.parentNode || {}).firstChild, e)
            },
            children: function (e) {
                return xe(e.firstChild)
            },
            contents: function (e) {
                return pe.nodeName(e, "iframe") ? e.contentDocument || e.contentWindow.document : pe.merge([], e.childNodes)
            }
        }, (function (e, t) {
            pe.fn[e] = function (n, r) {
                var i = pe.map(this, t, n);
                return "Until" !== e.slice(-5) && (r = n),
                    r && "string" == typeof r && (i = pe.filter(r, i)),
                    this.length > 1 && (ke[e] || (i = pe.uniqueSort(i)),
                        Ee.test(e) && (i = i.reverse())),
                    this.pushStack(i)
            }
        }
        ));
    var _e, Ne, De = /\S+/g;
    for (Ne in pe.Callbacks = function (e) {
        e = "string" == typeof e ? o(e) : pe.extend({}, e);
        var t, n, r, i, a = [], s = [], l = -1, u = function () {
            for (i = e.once,
                r = t = !0; s.length; l = -1)
                for (n = s.shift(); ++l < a.length;)
                    !1 === a[l].apply(n[0], n[1]) && e.stopOnFalse && (l = a.length,
                        n = !1);
            e.memory || (n = !1),
                t = !1,
                i && (a = n ? [] : "")
        }, c = {
            add: function () {
                return a && (n && !t && (l = a.length - 1,
                    s.push(n)),
                    function t(n) {
                        pe.each(n, (function (n, r) {
                            pe.isFunction(r) ? e.unique && c.has(r) || a.push(r) : r && r.length && "string" !== pe.type(r) && t(r)
                        }
                        ))
                    }(arguments),
                    n && !t && u()),
                    this
            },
            remove: function () {
                return pe.each(arguments, (function (e, t) {
                    for (var n; (n = pe.inArray(t, a, n)) > -1;)
                        a.splice(n, 1),
                            n <= l && l--
                }
                )),
                    this
            },
            has: function (e) {
                return e ? pe.inArray(e, a) > -1 : a.length > 0
            },
            empty: function () {
                return a && (a = []),
                    this
            },
            disable: function () {
                return i = s = [],
                    a = n = "",
                    this
            },
            disabled: function () {
                return !a
            },
            lock: function () {
                return i = !0,
                    n || c.disable(),
                    this
            },
            locked: function () {
                return !!i
            },
            fireWith: function (e, n) {
                return i || (n = [e, (n = n || []).slice ? n.slice() : n],
                    s.push(n),
                    t || u()),
                    this
            },
            fire: function () {
                return c.fireWith(this, arguments),
                    this
            },
            fired: function () {
                return !!r
            }
        };
        return c
    }
        ,
        pe.extend({
            Deferred: function (e) {
                var t = [["resolve", "done", pe.Callbacks("once memory"), "resolved"], ["reject", "fail", pe.Callbacks("once memory"), "rejected"], ["notify", "progress", pe.Callbacks("memory")]]
                    , n = "pending"
                    , r = {
                        state: function () {
                            return n
                        },
                        always: function () {
                            return i.done(arguments).fail(arguments),
                                this
                        },
                        then: function () {
                            var e = arguments;
                            return pe.Deferred((function (n) {
                                pe.each(t, (function (t, o) {
                                    var a = pe.isFunction(e[t]) && e[t];
                                    i[o[1]]((function () {
                                        var e = a && a.apply(this, arguments);
                                        e && pe.isFunction(e.promise) ? e.promise().progress(n.notify).done(n.resolve).fail(n.reject) : n[o[0] + "With"](this === r ? n.promise() : this, a ? [e] : arguments)
                                    }
                                    ))
                                }
                                )),
                                    e = null
                            }
                            )).promise()
                        },
                        promise: function (e) {
                            return null != e ? pe.extend(e, r) : r
                        }
                    }
                    , i = {};
                return r.pipe = r.then,
                    pe.each(t, (function (e, o) {
                        var a = o[2]
                            , s = o[3];
                        r[o[1]] = a.add,
                            s && a.add((function () {
                                n = s
                            }
                            ), t[1 ^ e][2].disable, t[2][2].lock),
                            i[o[0]] = function () {
                                return i[o[0] + "With"](this === i ? r : this, arguments),
                                    this
                            }
                            ,
                            i[o[0] + "With"] = a.fireWith
                    }
                    )),
                    r.promise(i),
                    e && e.call(i, i),
                    i
            },
            when: function (e) {
                var t, n, r, i = 0, o = ie.call(arguments), a = o.length, s = 1 !== a || e && pe.isFunction(e.promise) ? a : 0, l = 1 === s ? e : pe.Deferred(), u = function (e, n, r) {
                    return function (i) {
                        n[e] = this,
                            r[e] = arguments.length > 1 ? ie.call(arguments) : i,
                            r === t ? l.notifyWith(n, r) : --s || l.resolveWith(n, r)
                    }
                };
                if (a > 1)
                    for (t = new Array(a),
                        n = new Array(a),
                        r = new Array(a); i < a; i++)
                        o[i] && pe.isFunction(o[i].promise) ? o[i].promise().progress(u(i, n, t)).done(u(i, r, o)).fail(l.reject) : --s;
                return s || l.resolveWith(r, o),
                    l.promise()
            }
        }),
        pe.fn.ready = function (e) {
            return pe.ready.promise().done(e),
                this
        }
        ,
        pe.extend({
            isReady: !1,
            readyWait: 1,
            holdReady: function (e) {
                e ? pe.readyWait++ : pe.ready(!0)
            },
            ready: function (e) {
                (!0 === e ? --pe.readyWait : pe.isReady) || (pe.isReady = !0,
                    !0 !== e && --pe.readyWait > 0 || (_e.resolveWith(re, [pe]),
                        pe.fn.triggerHandler && (pe(re).triggerHandler("ready"),
                            pe(re).off("ready"))))
            }
        }),
        pe.ready.promise = function (t) {
            if (!_e)
                if (_e = pe.Deferred(),
                    "complete" === re.readyState || "loading" !== re.readyState && !re.documentElement.doScroll)
                    e.setTimeout(pe.ready);
                else if (re.addEventListener)
                    re.addEventListener("DOMContentLoaded", s),
                        e.addEventListener("load", s);
                else {
                    re.attachEvent("onreadystatechange", s),
                        e.attachEvent("onload", s);
                    var n = !1;
                    try {
                        n = null == e.frameElement && re.documentElement
                    } catch (e) { }
                    n && n.doScroll && function t() {
                        if (!pe.isReady) {
                            try {
                                n.doScroll("left")
                            } catch (n) {
                                return e.setTimeout(t, 50)
                            }
                            a(),
                                pe.ready()
                        }
                    }()
                }
            return _e.promise(t)
        }
        ,
        pe.ready.promise(),
        pe(fe))
        break;
    fe.ownFirst = "0" === Ne,
        fe.inlineBlockNeedsLayout = !1,
        pe((function () {
            var e, t, n, r;
            (n = re.getElementsByTagName("body")[0]) && n.style && (t = re.createElement("div"),
                (r = re.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
                n.appendChild(r).appendChild(t),
                void 0 !== t.style.zoom && (t.style.cssText = "display:inline;margin:0;border:0;padding:1px;width:1px;zoom:1",
                    fe.inlineBlockNeedsLayout = e = 3 === t.offsetWidth,
                    e && (n.style.zoom = 1)),
                n.removeChild(r))
        }
        )),
        function () {
            var e = re.createElement("div");
            fe.deleteExpando = !0;
            try {
                delete e.test
            } catch (e) {
                fe.deleteExpando = !1
            }
            e = null
        }();
    var Le, Ae = function (e) {
        var t = pe.noData[(e.nodeName + " ").toLowerCase()]
            , n = +e.nodeType || 1;
        return (1 === n || 9 === n) && (!t || !0 !== t && e.getAttribute("classid") === t)
    }, Me = /^(?:\{[\w\W]*\}|\[[\w\W]*\])$/, He = /([A-Z])/g;
    pe.extend({
        cache: {},
        noData: {
            "applet ": !0,
            "embed ": !0,
            "object ": "clsid:D27CDB6E-AE6D-11cf-96B8-444553540000"
        },
        hasData: function (e) {
            return !!(e = e.nodeType ? pe.cache[e[pe.expando]] : e[pe.expando]) && !u(e)
        },
        data: function (e, t, n) {
            return c(e, t, n)
        },
        removeData: function (e, t) {
            return f(e, t)
        },
        _data: function (e, t, n) {
            return c(e, t, n, !0)
        },
        _removeData: function (e, t) {
            return f(e, t, !0)
        }
    }),
        pe.fn.extend({
            data: function (e, t) {
                var n, r, i, o = this[0], a = o && o.attributes;
                if (void 0 === e) {
                    if (this.length && (i = pe.data(o),
                        1 === o.nodeType && !pe._data(o, "parsedAttrs"))) {
                        for (n = a.length; n--;)
                            a[n] && 0 === (r = a[n].name).indexOf("data-") && l(o, r = pe.camelCase(r.slice(5)), i[r]);
                        pe._data(o, "parsedAttrs", !0)
                    }
                    return i
                }
                return "object" == typeof e ? this.each((function () {
                    pe.data(this, e)
                }
                )) : arguments.length > 1 ? this.each((function () {
                    pe.data(this, e, t)
                }
                )) : o ? l(o, e, pe.data(o, e)) : void 0
            },
            removeData: function (e) {
                return this.each((function () {
                    pe.removeData(this, e)
                }
                ))
            }
        }),
        pe.extend({
            queue: function (e, t, n) {
                var r;
                if (e)
                    return t = (t || "fx") + "queue",
                        r = pe._data(e, t),
                        n && (!r || pe.isArray(n) ? r = pe._data(e, t, pe.makeArray(n)) : r.push(n)),
                        r || []
            },
            dequeue: function (e, t) {
                t = t || "fx";
                var n = pe.queue(e, t)
                    , r = n.length
                    , i = n.shift()
                    , o = pe._queueHooks(e, t)
                    , a = function () {
                        pe.dequeue(e, t)
                    };
                "inprogress" === i && (i = n.shift(),
                    r--),
                    i && ("fx" === t && n.unshift("inprogress"),
                        delete o.stop,
                        i.call(e, a, o)),
                    !r && o && o.empty.fire()
            },
            _queueHooks: function (e, t) {
                var n = t + "queueHooks";
                return pe._data(e, n) || pe._data(e, n, {
                    empty: pe.Callbacks("once memory").add((function () {
                        pe._removeData(e, t + "queue"),
                            pe._removeData(e, n)
                    }
                    ))
                })
            }
        }),
        pe.fn.extend({
            queue: function (e, t) {
                var n = 2;
                return "string" != typeof e && (t = e,
                    e = "fx",
                    n--),
                    arguments.length < n ? pe.queue(this[0], e) : void 0 === t ? this : this.each((function () {
                        var n = pe.queue(this, e, t);
                        pe._queueHooks(this, e),
                            "fx" === e && "inprogress" !== n[0] && pe.dequeue(this, e)
                    }
                    ))
            },
            dequeue: function (e) {
                return this.each((function () {
                    pe.dequeue(this, e)
                }
                ))
            },
            clearQueue: function (e) {
                return this.queue(e || "fx", [])
            },
            promise: function (e, t) {
                var n, r = 1, i = pe.Deferred(), o = this, a = this.length, s = function () {
                    --r || i.resolveWith(o, [o])
                };
                for ("string" != typeof e && (t = e,
                    e = void 0),
                    e = e || "fx"; a--;)
                    (n = pe._data(o[a], e + "queueHooks")) && n.empty && (r++,
                        n.empty.add(s));
                return s(),
                    i.promise(t)
            }
        }),
        fe.shrinkWrapBlocks = function () {
            return null != Le ? Le : (Le = !1,
                (t = re.getElementsByTagName("body")[0]) && t.style ? (e = re.createElement("div"),
                    (n = re.createElement("div")).style.cssText = "position:absolute;border:0;width:0;height:0;top:0;left:-9999px",
                    t.appendChild(n).appendChild(e),
                    void 0 !== e.style.zoom && (e.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:1px;width:1px;zoom:1",
                        e.appendChild(re.createElement("div")).style.width = "5px",
                        Le = 3 !== e.offsetWidth),
                    t.removeChild(n),
                    Le) : void 0);
            var e, t, n
        }
        ;
    var qe, Oe, Pe, Fe = /[+-]?(?:\d*\.|)\d+(?:[eE][+-]?\d+|)/.source, Re = new RegExp("^(?:([+-])=|)(" + Fe + ")([a-z%]*)$", "i"), Ie = ["Top", "Right", "Bottom", "Left"], We = function (e, t) {
        return e = t || e,
            "none" === pe.css(e, "display") || !pe.contains(e.ownerDocument, e)
    }, Be = function (e, t, n, r, i, o, a) {
        var s = 0
            , l = e.length
            , u = null == n;
        if ("object" === pe.type(n))
            for (s in i = !0,
                n)
                Be(e, t, s, n[s], !0, o, a);
        else if (void 0 !== r && (i = !0,
            pe.isFunction(r) || (a = !0),
            u && (a ? (t.call(e, r),
                t = null) : (u = t,
                    t = function (e, t, n) {
                        return u.call(pe(e), n)
                    }
            )),
            t))
            for (; s < l; s++)
                t(e[s], n, a ? r : r.call(e[s], s, t(e[s], n)));
        return i ? e : u ? t.call(e) : l ? t(e[0], n) : o
    }, ze = /^(?:checkbox|radio)$/i, $e = /<([\w:-]+)/, Xe = /^$|\/(?:java|ecma)script/i, Ue = /^\s+/, Je = "abbr|article|aside|audio|bdi|canvas|data|datalist|details|dialog|figcaption|figure|footer|header|hgroup|main|mark|meter|nav|output|picture|progress|section|summary|template|time|video";
    qe = re.createElement("div"),
        Oe = re.createDocumentFragment(),
        Pe = re.createElement("input"),
        qe.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
        fe.leadingWhitespace = 3 === qe.firstChild.nodeType,
        fe.tbody = !qe.getElementsByTagName("tbody").length,
        fe.htmlSerialize = !!qe.getElementsByTagName("link").length,
        fe.html5Clone = "<:nav></:nav>" !== re.createElement("nav").cloneNode(!0).outerHTML,
        Pe.type = "checkbox",
        Pe.checked = !0,
        Oe.appendChild(Pe),
        fe.appendChecked = Pe.checked,
        qe.innerHTML = "<textarea>x</textarea>",
        fe.noCloneChecked = !!qe.cloneNode(!0).lastChild.defaultValue,
        Oe.appendChild(qe),
        (Pe = re.createElement("input")).setAttribute("type", "radio"),
        Pe.setAttribute("checked", "checked"),
        Pe.setAttribute("name", "t"),
        qe.appendChild(Pe),
        fe.checkClone = qe.cloneNode(!0).cloneNode(!0).lastChild.checked,
        fe.noCloneEvent = !!qe.addEventListener,
        qe[pe.expando] = 1,
        fe.attributes = !qe.getAttribute(pe.expando);
    var Ye = {
        option: [1, "<select multiple='multiple'>", "</select>"],
        legend: [1, "<fieldset>", "</fieldset>"],
        area: [1, "<map>", "</map>"],
        param: [1, "<object>", "</object>"],
        thead: [1, "<table>", "</table>"],
        tr: [2, "<table><tbody>", "</tbody></table>"],
        col: [2, "<table><tbody></tbody><colgroup>", "</colgroup></table>"],
        td: [3, "<table><tbody><tr>", "</tr></tbody></table>"],
        _default: fe.htmlSerialize ? [0, "", ""] : [1, "X<div>", "</div>"]
    };
    Ye.optgroup = Ye.option,
        Ye.tbody = Ye.tfoot = Ye.colgroup = Ye.caption = Ye.thead,
        Ye.th = Ye.td;
    var Qe = /<|&#?\w+;/
        , Ve = /<tbody/i;
    !function () {
        var t, n, r = re.createElement("div");
        for (t in {
            submit: !0,
            change: !0,
            focusin: !0
        })
            n = "on" + t,
                (fe[t] = n in e) || (r.setAttribute(n, "t"),
                    fe[t] = !1 === r.attributes[n].expando);
        r = null
    }();
    var Ke = /^(?:input|select|textarea)$/i
        , Ge = /^key/
        , Ze = /^(?:mouse|pointer|contextmenu|drag|drop)|click/
        , et = /^(?:focusinfocus|focusoutblur)$/
        , tt = /^([^.]*)(?:\.(.+)|)/;
    pe.event = {
        global: {},
        add: function (e, t, n, r, i) {
            var o, a, s, l, u, c, f, d, p, h, g, m = pe._data(e);
            if (m) {
                for (n.handler && (n = (l = n).handler,
                    i = l.selector),
                    n.guid || (n.guid = pe.guid++),
                    (a = m.events) || (a = m.events = {}),
                    (c = m.handle) || (c = m.handle = function (e) {
                        return void 0 === pe || e && pe.event.triggered === e.type ? void 0 : pe.event.dispatch.apply(c.elem, arguments)
                    }
                        ,
                        c.elem = e),
                    s = (t = (t || "").match(De) || [""]).length; s--;)
                    p = g = (o = tt.exec(t[s]) || [])[1],
                        h = (o[2] || "").split(".").sort(),
                        p && (u = pe.event.special[p] || {},
                            p = (i ? u.delegateType : u.bindType) || p,
                            u = pe.event.special[p] || {},
                            f = pe.extend({
                                type: p,
                                origType: g,
                                data: r,
                                handler: n,
                                guid: n.guid,
                                selector: i,
                                needsContext: i && pe.expr.match.needsContext.test(i),
                                namespace: h.join(".")
                            }, l),
                            (d = a[p]) || ((d = a[p] = []).delegateCount = 0,
                                u.setup && !1 !== u.setup.call(e, r, h, c) || (e.addEventListener ? e.addEventListener(p, c, !1) : e.attachEvent && e.attachEvent("on" + p, c))),
                            u.add && (u.add.call(e, f),
                                f.handler.guid || (f.handler.guid = n.guid)),
                            i ? d.splice(d.delegateCount++, 0, f) : d.push(f),
                            pe.event.global[p] = !0);
                e = null
            }
        },
        remove: function (e, t, n, r, i) {
            var o, a, s, l, u, c, f, d, p, h, g, m = pe.hasData(e) && pe._data(e);
            if (m && (c = m.events)) {
                for (u = (t = (t || "").match(De) || [""]).length; u--;)
                    if (p = g = (s = tt.exec(t[u]) || [])[1],
                        h = (s[2] || "").split(".").sort(),
                        p) {
                        for (f = pe.event.special[p] || {},
                            d = c[p = (r ? f.delegateType : f.bindType) || p] || [],
                            s = s[2] && new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)"),
                            l = o = d.length; o--;)
                            a = d[o],
                                !i && g !== a.origType || n && n.guid !== a.guid || s && !s.test(a.namespace) || r && r !== a.selector && ("**" !== r || !a.selector) || (d.splice(o, 1),
                                    a.selector && d.delegateCount--,
                                    f.remove && f.remove.call(e, a));
                        l && !d.length && (f.teardown && !1 !== f.teardown.call(e, h, m.handle) || pe.removeEvent(e, p, m.handle),
                            delete c[p])
                    } else
                        for (p in c)
                            pe.event.remove(e, p + t[u], n, r, !0);
                pe.isEmptyObject(c) && (delete m.handle,
                    pe._removeData(e, "events"))
            }
        },
        trigger: function (t, n, r, i) {
            var o, a, s, l, u, c, f, d = [r || re], p = ce.call(t, "type") ? t.type : t, h = ce.call(t, "namespace") ? t.namespace.split(".") : [];
            if (s = c = r = r || re,
                3 !== r.nodeType && 8 !== r.nodeType && !et.test(p + pe.event.triggered) && (p.indexOf(".") > -1 && (h = p.split("."),
                    p = h.shift(),
                    h.sort()),
                    a = p.indexOf(":") < 0 && "on" + p,
                    (t = t[pe.expando] ? t : new pe.Event(p, "object" == typeof t && t)).isTrigger = i ? 2 : 3,
                    t.namespace = h.join("."),
                    t.rnamespace = t.namespace ? new RegExp("(^|\\.)" + h.join("\\.(?:.*\\.|)") + "(\\.|$)") : null,
                    t.result = void 0,
                    t.target || (t.target = r),
                    n = null == n ? [t] : pe.makeArray(n, [t]),
                    u = pe.event.special[p] || {},
                    i || !u.trigger || !1 !== u.trigger.apply(r, n))) {
                if (!i && !u.noBubble && !pe.isWindow(r)) {
                    for (l = u.delegateType || p,
                        et.test(l + p) || (s = s.parentNode); s; s = s.parentNode)
                        d.push(s),
                            c = s;
                    c === (r.ownerDocument || re) && d.push(c.defaultView || c.parentWindow || e)
                }
                for (f = 0; (s = d[f++]) && !t.isPropagationStopped();)
                    t.type = f > 1 ? l : u.bindType || p,
                        (o = (pe._data(s, "events") || {})[t.type] && pe._data(s, "handle")) && o.apply(s, n),
                        (o = a && s[a]) && o.apply && Ae(s) && (t.result = o.apply(s, n),
                            !1 === t.result && t.preventDefault());
                if (t.type = p,
                    !i && !t.isDefaultPrevented() && (!u._default || !1 === u._default.apply(d.pop(), n)) && Ae(r) && a && r[p] && !pe.isWindow(r)) {
                    (c = r[a]) && (r[a] = null),
                        pe.event.triggered = p;
                    try {
                        r[p]()
                    } catch (e) { }
                    pe.event.triggered = void 0,
                        c && (r[a] = c)
                }
                return t.result
            }
        },
        dispatch: function (e) {
            e = pe.event.fix(e);
            var t, n, r, i, o, a = [], s = ie.call(arguments), l = (pe._data(this, "events") || {})[e.type] || [], u = pe.event.special[e.type] || {};
            if (s[0] = e,
                e.delegateTarget = this,
                !u.preDispatch || !1 !== u.preDispatch.call(this, e)) {
                for (a = pe.event.handlers.call(this, e, l),
                    t = 0; (i = a[t++]) && !e.isPropagationStopped();)
                    for (e.currentTarget = i.elem,
                        n = 0; (o = i.handlers[n++]) && !e.isImmediatePropagationStopped();)
                        e.rnamespace && !e.rnamespace.test(o.namespace) || (e.handleObj = o,
                            e.data = o.data,
                            void 0 !== (r = ((pe.event.special[o.origType] || {}).handle || o.handler).apply(i.elem, s)) && !1 === (e.result = r) && (e.preventDefault(),
                                e.stopPropagation()));
                return u.postDispatch && u.postDispatch.call(this, e),
                    e.result
            }
        },
        handlers: function (e, t) {
            var n, r, i, o, a = [], s = t.delegateCount, l = e.target;
            if (s && l.nodeType && ("click" !== e.type || isNaN(e.button) || e.button < 1))
                for (; l != this; l = l.parentNode || this)
                    if (1 === l.nodeType && (!0 !== l.disabled || "click" !== e.type)) {
                        for (r = [],
                            n = 0; n < s; n++)
                            void 0 === r[i = (o = t[n]).selector + " "] && (r[i] = o.needsContext ? pe(i, this).index(l) > -1 : pe.find(i, this, null, [l]).length),
                                r[i] && r.push(o);
                        r.length && a.push({
                            elem: l,
                            handlers: r
                        })
                    }
            return s < t.length && a.push({
                elem: this,
                handlers: t.slice(s)
            }),
                a
        },
        fix: function (e) {
            if (e[pe.expando])
                return e;
            var t, n, r, i = e.type, o = e, a = this.fixHooks[i];
            for (a || (this.fixHooks[i] = a = Ze.test(i) ? this.mouseHooks : Ge.test(i) ? this.keyHooks : {}),
                r = a.props ? this.props.concat(a.props) : this.props,
                e = new pe.Event(o),
                t = r.length; t--;)
                e[n = r[t]] = o[n];
            return e.target || (e.target = o.srcElement || re),
                3 === e.target.nodeType && (e.target = e.target.parentNode),
                e.metaKey = !!e.metaKey,
                a.filter ? a.filter(e, o) : e
        },
        props: "altKey bubbles cancelable ctrlKey currentTarget detail eventPhase metaKey relatedTarget shiftKey target timeStamp view which".split(" "),
        fixHooks: {},
        keyHooks: {
            props: "char charCode key keyCode".split(" "),
            filter: function (e, t) {
                return null == e.which && (e.which = null != t.charCode ? t.charCode : t.keyCode),
                    e
            }
        },
        mouseHooks: {
            props: "button buttons clientX clientY fromElement offsetX offsetY pageX pageY screenX screenY toElement".split(" "),
            filter: function (e, t) {
                var n, r, i, o = t.button, a = t.fromElement;
                return null == e.pageX && null != t.clientX && (i = (r = e.target.ownerDocument || re).documentElement,
                    n = r.body,
                    e.pageX = t.clientX + (i && i.scrollLeft || n && n.scrollLeft || 0) - (i && i.clientLeft || n && n.clientLeft || 0),
                    e.pageY = t.clientY + (i && i.scrollTop || n && n.scrollTop || 0) - (i && i.clientTop || n && n.clientTop || 0)),
                    !e.relatedTarget && a && (e.relatedTarget = a === e.target ? t.toElement : a),
                    e.which || void 0 === o || (e.which = 1 & o ? 1 : 2 & o ? 3 : 4 & o ? 2 : 0),
                    e
            }
        },
        special: {
            load: {
                noBubble: !0
            },
            focus: {
                trigger: function () {
                    if (this !== x() && this.focus)
                        try {
                            return this.focus(),
                                !1
                        } catch (e) { }
                },
                delegateType: "focusin"
            },
            blur: {
                trigger: function () {
                    if (this === x() && this.blur)
                        return this.blur(),
                            !1
                },
                delegateType: "focusout"
            },
            click: {
                trigger: function () {
                    if (pe.nodeName(this, "input") && "checkbox" === this.type && this.click)
                        return this.click(),
                            !1
                },
                _default: function (e) {
                    return pe.nodeName(e.target, "a")
                }
            },
            beforeunload: {
                postDispatch: function (e) {
                    void 0 !== e.result && e.originalEvent && (e.originalEvent.returnValue = e.result)
                }
            }
        },
        simulate: function (e, t, n) {
            var r = pe.extend(new pe.Event, n, {
                type: e,
                isSimulated: !0
            });
            pe.event.trigger(r, null, t),
                r.isDefaultPrevented() && n.preventDefault()
        }
    },
        pe.removeEvent = re.removeEventListener ? function (e, t, n) {
            e.removeEventListener && e.removeEventListener(t, n)
        }
            : function (e, t, n) {
                var r = "on" + t;
                e.detachEvent && (void 0 === e[r] && (e[r] = null),
                    e.detachEvent(r, n))
            }
        ,
        pe.Event = function (e, t) {
            if (!(this instanceof pe.Event))
                return new pe.Event(e, t);
            e && e.type ? (this.originalEvent = e,
                this.type = e.type,
                this.isDefaultPrevented = e.defaultPrevented || void 0 === e.defaultPrevented && !1 === e.returnValue ? y : b) : this.type = e,
                t && pe.extend(this, t),
                this.timeStamp = e && e.timeStamp || pe.now(),
                this[pe.expando] = !0
        }
        ,
        pe.Event.prototype = {
            constructor: pe.Event,
            isDefaultPrevented: b,
            isPropagationStopped: b,
            isImmediatePropagationStopped: b,
            preventDefault: function () {
                var e = this.originalEvent;
                this.isDefaultPrevented = y,
                    e && (e.preventDefault ? e.preventDefault() : e.returnValue = !1)
            },
            stopPropagation: function () {
                var e = this.originalEvent;
                this.isPropagationStopped = y,
                    e && !this.isSimulated && (e.stopPropagation && e.stopPropagation(),
                        e.cancelBubble = !0)
            },
            stopImmediatePropagation: function () {
                var e = this.originalEvent;
                this.isImmediatePropagationStopped = y,
                    e && e.stopImmediatePropagation && e.stopImmediatePropagation(),
                    this.stopPropagation()
            }
        },
        pe.each({
            mouseenter: "mouseover",
            mouseleave: "mouseout",
            pointerenter: "pointerover",
            pointerleave: "pointerout"
        }, (function (e, t) {
            pe.event.special[e] = {
                delegateType: t,
                bindType: t,
                handle: function (e) {
                    var n, r = this, i = e.relatedTarget, o = e.handleObj;
                    return i && (i === r || pe.contains(r, i)) || (e.type = o.origType,
                        n = o.handler.apply(this, arguments),
                        e.type = t),
                        n
                }
            }
        }
        )),
        fe.submit || (pe.event.special.submit = {
            setup: function () {
                if (pe.nodeName(this, "form"))
                    return !1;
                pe.event.add(this, "click._submit keypress._submit", (function (e) {
                    var t = e.target
                        , n = pe.nodeName(t, "input") || pe.nodeName(t, "button") ? pe.prop(t, "form") : void 0;
                    n && !pe._data(n, "submit") && (pe.event.add(n, "submit._submit", (function (e) {
                        e._submitBubble = !0
                    }
                    )),
                        pe._data(n, "submit", !0))
                }
                ))
            },
            postDispatch: function (e) {
                e._submitBubble && (delete e._submitBubble,
                    this.parentNode && !e.isTrigger && pe.event.simulate("submit", this.parentNode, e))
            },
            teardown: function () {
                if (pe.nodeName(this, "form"))
                    return !1;
                pe.event.remove(this, "._submit")
            }
        }),
        fe.change || (pe.event.special.change = {
            setup: function () {
                if (Ke.test(this.nodeName))
                    return "checkbox" !== this.type && "radio" !== this.type || (pe.event.add(this, "propertychange._change", (function (e) {
                        "checked" === e.originalEvent.propertyName && (this._justChanged = !0)
                    }
                    )),
                        pe.event.add(this, "click._change", (function (e) {
                            this._justChanged && !e.isTrigger && (this._justChanged = !1),
                                pe.event.simulate("change", this, e)
                        }
                        ))),
                        !1;
                pe.event.add(this, "beforeactivate._change", (function (e) {
                    var t = e.target;
                    Ke.test(t.nodeName) && !pe._data(t, "change") && (pe.event.add(t, "change._change", (function (e) {
                        !this.parentNode || e.isSimulated || e.isTrigger || pe.event.simulate("change", this.parentNode, e)
                    }
                    )),
                        pe._data(t, "change", !0))
                }
                ))
            },
            handle: function (e) {
                var t = e.target;
                if (this !== t || e.isSimulated || e.isTrigger || "radio" !== t.type && "checkbox" !== t.type)
                    return e.handleObj.handler.apply(this, arguments)
            },
            teardown: function () {
                return pe.event.remove(this, "._change"),
                    !Ke.test(this.nodeName)
            }
        }),
        fe.focusin || pe.each({
            focus: "focusin",
            blur: "focusout"
        }, (function (e, t) {
            var n = function (e) {
                pe.event.simulate(t, e.target, pe.event.fix(e))
            };
            pe.event.special[t] = {
                setup: function () {
                    var r = this.ownerDocument || this
                        , i = pe._data(r, t);
                    i || r.addEventListener(e, n, !0),
                        pe._data(r, t, (i || 0) + 1)
                },
                teardown: function () {
                    var r = this.ownerDocument || this
                        , i = pe._data(r, t) - 1;
                    i ? pe._data(r, t, i) : (r.removeEventListener(e, n, !0),
                        pe._removeData(r, t))
                }
            }
        }
        )),
        pe.fn.extend({
            on: function (e, t, n, r) {
                return w(this, e, t, n, r)
            },
            one: function (e, t, n, r) {
                return w(this, e, t, n, r, 1)
            },
            off: function (e, t, n) {
                var r, i;
                if (e && e.preventDefault && e.handleObj)
                    return r = e.handleObj,
                        pe(e.delegateTarget).off(r.namespace ? r.origType + "." + r.namespace : r.origType, r.selector, r.handler),
                        this;
                if ("object" == typeof e) {
                    for (i in e)
                        this.off(i, t, e[i]);
                    return this
                }
                return !1 !== t && "function" != typeof t || (n = t,
                    t = void 0),
                    !1 === n && (n = b),
                    this.each((function () {
                        pe.event.remove(this, e, n, t)
                    }
                    ))
            },
            trigger: function (e, t) {
                return this.each((function () {
                    pe.event.trigger(e, t, this)
                }
                ))
            },
            triggerHandler: function (e, t) {
                var n = this[0];
                if (n)
                    return pe.event.trigger(e, t, n, !0)
            }
        });
    var nt = / jQuery\d+="(?:null|\d+)"/g
        , rt = new RegExp("<(?:" + Je + ")[\\s/>]", "i")
        , it = /<(?!area|br|col|embed|hr|img|input|link|meta|param)(([\w:-]+)[^>]*)\/>/gi
        , ot = /<script|<style|<link/i
        , at = /checked\s*(?:[^=]|=\s*.checked.)/i
        , st = /^true\/(.*)/
        , lt = /^\s*<!(?:\[CDATA\[|--)|(?:\]\]|--)>\s*$/g
        , ut = p(re).appendChild(re.createElement("div"));
    pe.extend({
        htmlPrefilter: function (e) {
            return e.replace(it, "<$1></$2>")
        },
        clone: function (e, t, n) {
            var r, i, o, a, s, l = pe.contains(e.ownerDocument, e);
            if (fe.html5Clone || pe.isXMLDoc(e) || !rt.test("<" + e.nodeName + ">") ? o = e.cloneNode(!0) : (ut.innerHTML = e.outerHTML,
                ut.removeChild(o = ut.firstChild)),
                !(fe.noCloneEvent && fe.noCloneChecked || 1 !== e.nodeType && 11 !== e.nodeType || pe.isXMLDoc(e)))
                for (r = h(o),
                    s = h(e),
                    a = 0; null != (i = s[a]); ++a)
                    r[a] && E(i, r[a]);
            if (t)
                if (n)
                    for (s = s || h(e),
                        r = r || h(o),
                        a = 0; null != (i = s[a]); a++)
                        j(i, r[a]);
                else
                    j(e, o);
            return (r = h(o, "script")).length > 0 && g(r, !l && h(e, "script")),
                r = s = i = null,
                o
        },
        cleanData: function (e, t) {
            for (var n, r, i, o, a = 0, s = pe.expando, l = pe.cache, u = fe.attributes, c = pe.event.special; null != (n = e[a]); a++)
                if ((t || Ae(n)) && (o = (i = n[s]) && l[i])) {
                    if (o.events)
                        for (r in o.events)
                            c[r] ? pe.event.remove(n, r) : pe.removeEvent(n, r, o.handle);
                    l[i] && (delete l[i],
                        u || void 0 === n.removeAttribute ? n[s] = void 0 : n.removeAttribute(s),
                        ne.push(i))
                }
        }
    }),
        pe.fn.extend({
            domManip: k,
            detach: function (e) {
                return _(this, e, !0)
            },
            remove: function (e) {
                return _(this, e)
            },
            text: function (e) {
                return Be(this, (function (e) {
                    return void 0 === e ? pe.text(this) : this.empty().append((this[0] && this[0].ownerDocument || re).createTextNode(e))
                }
                ), null, e, arguments.length)
            },
            append: function () {
                return k(this, arguments, (function (e) {
                    1 !== this.nodeType && 11 !== this.nodeType && 9 !== this.nodeType || T(this, e).appendChild(e)
                }
                ))
            },
            prepend: function () {
                return k(this, arguments, (function (e) {
                    if (1 === this.nodeType || 11 === this.nodeType || 9 === this.nodeType) {
                        var t = T(this, e);
                        t.insertBefore(e, t.firstChild)
                    }
                }
                ))
            },
            before: function () {
                return k(this, arguments, (function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this)
                }
                ))
            },
            after: function () {
                return k(this, arguments, (function (e) {
                    this.parentNode && this.parentNode.insertBefore(e, this.nextSibling)
                }
                ))
            },
            empty: function () {
                for (var e, t = 0; null != (e = this[t]); t++) {
                    for (1 === e.nodeType && pe.cleanData(h(e, !1)); e.firstChild;)
                        e.removeChild(e.firstChild);
                    e.options && pe.nodeName(e, "select") && (e.options.length = 0)
                }
                return this
            },
            clone: function (e, t) {
                return e = null != e && e,
                    t = null == t ? e : t,
                    this.map((function () {
                        return pe.clone(this, e, t)
                    }
                    ))
            },
            html: function (e) {
                return Be(this, (function (e) {
                    var t = this[0] || {}
                        , n = 0
                        , r = this.length;
                    if (void 0 === e)
                        return 1 === t.nodeType ? t.innerHTML.replace(nt, "") : void 0;
                    if ("string" == typeof e && !ot.test(e) && (fe.htmlSerialize || !rt.test(e)) && (fe.leadingWhitespace || !Ue.test(e)) && !Ye[($e.exec(e) || ["", ""])[1].toLowerCase()]) {
                        e = pe.htmlPrefilter(e);
                        try {
                            for (; n < r; n++)
                                1 === (t = this[n] || {}).nodeType && (pe.cleanData(h(t, !1)),
                                    t.innerHTML = e);
                            t = 0
                        } catch (e) { }
                    }
                    t && this.empty().append(e)
                }
                ), null, e, arguments.length)
            },
            replaceWith: function () {
                var e = [];
                return k(this, arguments, (function (t) {
                    var n = this.parentNode;
                    pe.inArray(this, e) < 0 && (pe.cleanData(h(this)),
                        n && n.replaceChild(t, this))
                }
                ), e)
            }
        }),
        pe.each({
            appendTo: "append",
            prependTo: "prepend",
            insertBefore: "before",
            insertAfter: "after",
            replaceAll: "replaceWith"
        }, (function (e, t) {
            pe.fn[e] = function (e) {
                for (var n, r = 0, i = [], o = pe(e), a = o.length - 1; r <= a; r++)
                    n = r === a ? this : this.clone(!0),
                        pe(o[r])[t](n),
                        ae.apply(i, n.get());
                return this.pushStack(i)
            }
        }
        ));
    var ct, ft = {
        HTML: "block",
        BODY: "block"
    }, dt = /^margin/, pt = new RegExp("^(" + Fe + ")(?!px)[a-z%]+$", "i"), ht = function (e, t, n, r) {
        var i, o, a = {};
        for (o in t)
            a[o] = e.style[o],
                e.style[o] = t[o];
        for (o in i = n.apply(e, r || []),
            t)
            e.style[o] = a[o];
        return i
    }, gt = re.documentElement;
    !function () {
        function t() {
            var t, c, f = re.documentElement;
            f.appendChild(l),
                u.style.cssText = "-webkit-box-sizing:border-box;box-sizing:border-box;position:relative;display:block;margin:auto;border:1px;padding:1px;top:1%;width:50%",
                n = i = s = !1,
                r = a = !0,
                e.getComputedStyle && (c = e.getComputedStyle(u),
                    n = "1%" !== (c || {}).top,
                    s = "2px" === (c || {}).marginLeft,
                    i = "4px" === (c || {
                        width: "4px"
                    }).width,
                    u.style.marginRight = "50%",
                    r = "4px" === (c || {
                        marginRight: "4px"
                    }).marginRight,
                    (t = u.appendChild(re.createElement("div"))).style.cssText = u.style.cssText = "-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;display:block;margin:0;border:0;padding:0",
                    t.style.marginRight = t.style.width = "0",
                    u.style.width = "1px",
                    a = !parseFloat((e.getComputedStyle(t) || {}).marginRight),
                    u.removeChild(t)),
                u.style.display = "none",
                (o = 0 === u.getClientRects().length) && (u.style.display = "",
                    u.innerHTML = "<table><tr><td></td><td>t</td></tr></table>",
                    u.childNodes[0].style.borderCollapse = "separate",
                    (t = u.getElementsByTagName("td"))[0].style.cssText = "margin:0;border:0;padding:0;display:none",
                    (o = 0 === t[0].offsetHeight) && (t[0].style.display = "",
                        t[1].style.display = "none",
                        o = 0 === t[0].offsetHeight)),
                f.removeChild(l)
        }
        var n, r, i, o, a, s, l = re.createElement("div"), u = re.createElement("div");
        u.style && (u.style.cssText = "float:left;opacity:.5",
            fe.opacity = "0.5" === u.style.opacity,
            fe.cssFloat = !!u.style.cssFloat,
            u.style.backgroundClip = "content-box",
            u.cloneNode(!0).style.backgroundClip = "",
            fe.clearCloneStyle = "content-box" === u.style.backgroundClip,
            (l = re.createElement("div")).style.cssText = "border:0;width:8px;height:0;top:0;left:-9999px;padding:0;margin-top:1px;position:absolute",
            u.innerHTML = "",
            l.appendChild(u),
            fe.boxSizing = "" === u.style.boxSizing || "" === u.style.MozBoxSizing || "" === u.style.WebkitBoxSizing,
            pe.extend(fe, {
                reliableHiddenOffsets: function () {
                    return null == n && t(),
                        o
                },
                boxSizingReliable: function () {
                    return null == n && t(),
                        i
                },
                pixelMarginRight: function () {
                    return null == n && t(),
                        r
                },
                pixelPosition: function () {
                    return null == n && t(),
                        n
                },
                reliableMarginRight: function () {
                    return null == n && t(),
                        a
                },
                reliableMarginLeft: function () {
                    return null == n && t(),
                        s
                }
            }))
    }();
    var mt, vt, yt = /^(top|right|bottom|left)$/;
    e.getComputedStyle ? (mt = function (t) {
        var n = t.ownerDocument.defaultView;
        return n && n.opener || (n = e),
            n.getComputedStyle(t)
    }
        ,
        vt = function (e, t, n) {
            var r, i, o, a, s = e.style;
            return "" !== (a = (n = n || mt(e)) ? n.getPropertyValue(t) || n[t] : void 0) && void 0 !== a || pe.contains(e.ownerDocument, e) || (a = pe.style(e, t)),
                n && !fe.pixelMarginRight() && pt.test(a) && dt.test(t) && (r = s.width,
                    i = s.minWidth,
                    o = s.maxWidth,
                    s.minWidth = s.maxWidth = s.width = a,
                    a = n.width,
                    s.width = r,
                    s.minWidth = i,
                    s.maxWidth = o),
                void 0 === a ? a : a + ""
        }
    ) : gt.currentStyle && (mt = function (e) {
        return e.currentStyle
    }
        ,
        vt = function (e, t, n) {
            var r, i, o, a, s = e.style;
            return null == (a = (n = n || mt(e)) ? n[t] : void 0) && s && s[t] && (a = s[t]),
                pt.test(a) && !yt.test(t) && (r = s.left,
                    (o = (i = e.runtimeStyle) && i.left) && (i.left = e.currentStyle.left),
                    s.left = "fontSize" === t ? "1em" : a,
                    a = s.pixelLeft + "px",
                    s.left = r,
                    o && (i.left = o)),
                void 0 === a ? a : a + "" || "auto"
        }
    );
    var bt = /alpha\([^)]*\)/i
        , xt = /opacity\s*=\s*([^)]*)/i
        , wt = /^(none|table(?!-c[ea]).+)/
        , Tt = new RegExp("^(" + Fe + ")(.*)$", "i")
        , St = {
            position: "absolute",
            visibility: "hidden",
            display: "block"
        }
        , Ct = {
            letterSpacing: "0",
            fontWeight: "400"
        }
        , jt = ["Webkit", "O", "Moz", "ms"]
        , Et = re.createElement("div").style;
    pe.extend({
        cssHooks: {
            opacity: {
                get: function (e, t) {
                    if (t) {
                        var n = vt(e, "opacity");
                        return "" === n ? "1" : n
                    }
                }
            }
        },
        cssNumber: {
            animationIterationCount: !0,
            columnCount: !0,
            fillOpacity: !0,
            flexGrow: !0,
            flexShrink: !0,
            fontWeight: !0,
            lineHeight: !0,
            opacity: !0,
            order: !0,
            orphans: !0,
            widows: !0,
            zIndex: !0,
            zoom: !0
        },
        cssProps: {
            float: fe.cssFloat ? "cssFloat" : "styleFloat"
        },
        style: function (e, t, n, r) {
            if (e && 3 !== e.nodeType && 8 !== e.nodeType && e.style) {
                var i, o, a, s = pe.camelCase(t), l = e.style;
                if (t = pe.cssProps[s] || (pe.cssProps[s] = A(s) || s),
                    a = pe.cssHooks[t] || pe.cssHooks[s],
                    void 0 === n)
                    return a && "get" in a && void 0 !== (i = a.get(e, !1, r)) ? i : l[t];
                if (!("string" === (o = typeof n) && (i = Re.exec(n)) && i[1] && (n = d(e, t, i),
                    o = "number"),
                    null == n || n != n || ("number" === o && (n += i && i[3] || (pe.cssNumber[s] ? "" : "px")),
                        fe.clearCloneStyle || "" !== n || 0 !== t.indexOf("background") || (l[t] = "inherit"),
                        a && "set" in a && void 0 === (n = a.set(e, n, r)))))
                    try {
                        l[t] = n
                    } catch (e) { }
            }
        },
        css: function (e, t, n, r) {
            var i, o, a, s = pe.camelCase(t);
            return t = pe.cssProps[s] || (pe.cssProps[s] = A(s) || s),
                (a = pe.cssHooks[t] || pe.cssHooks[s]) && "get" in a && (o = a.get(e, !0, n)),
                void 0 === o && (o = vt(e, t, r)),
                "normal" === o && t in Ct && (o = Ct[t]),
                "" === n || n ? (i = parseFloat(o),
                    !0 === n || isFinite(i) ? i || 0 : o) : o
        }
    }),
        pe.each(["height", "width"], (function (e, t) {
            pe.cssHooks[t] = {
                get: function (e, n, r) {
                    if (n)
                        return wt.test(pe.css(e, "display")) && 0 === e.offsetWidth ? ht(e, St, (function () {
                            return O(e, t, r)
                        }
                        )) : O(e, t, r)
                },
                set: function (e, n, r) {
                    var i = r && mt(e);
                    return H(e, n, r ? q(e, t, r, fe.boxSizing && "border-box" === pe.css(e, "boxSizing", !1, i), i) : 0)
                }
            }
        }
        )),
        fe.opacity || (pe.cssHooks.opacity = {
            get: function (e, t) {
                return xt.test((t && e.currentStyle ? e.currentStyle.filter : e.style.filter) || "") ? .01 * parseFloat(RegExp.$1) + "" : t ? "1" : ""
            },
            set: function (e, t) {
                var n = e.style
                    , r = e.currentStyle
                    , i = pe.isNumeric(t) ? "alpha(opacity=" + 100 * t + ")" : ""
                    , o = r && r.filter || n.filter || "";
                n.zoom = 1,
                    (t >= 1 || "" === t) && "" === pe.trim(o.replace(bt, "")) && n.removeAttribute && (n.removeAttribute("filter"),
                        "" === t || r && !r.filter) || (n.filter = bt.test(o) ? o.replace(bt, i) : o + " " + i)
            }
        }),
        pe.cssHooks.marginRight = L(fe.reliableMarginRight, (function (e, t) {
            if (t)
                return ht(e, {
                    display: "inline-block"
                }, vt, [e, "marginRight"])
        }
        )),
        pe.cssHooks.marginLeft = L(fe.reliableMarginLeft, (function (e, t) {
            if (t)
                return (parseFloat(vt(e, "marginLeft")) || (pe.contains(e.ownerDocument, e) ? e.getBoundingClientRect().left - ht(e, {
                    marginLeft: 0
                }, (function () {
                    return e.getBoundingClientRect().left
                }
                )) : 0)) + "px"
        }
        )),
        pe.each({
            margin: "",
            padding: "",
            border: "Width"
        }, (function (e, t) {
            pe.cssHooks[e + t] = {
                expand: function (n) {
                    for (var r = 0, i = {}, o = "string" == typeof n ? n.split(" ") : [n]; r < 4; r++)
                        i[e + Ie[r] + t] = o[r] || o[r - 2] || o[0];
                    return i
                }
            },
                dt.test(e) || (pe.cssHooks[e + t].set = H)
        }
        )),
        pe.fn.extend({
            css: function (e, t) {
                return Be(this, (function (e, t, n) {
                    var r, i, o = {}, a = 0;
                    if (pe.isArray(t)) {
                        for (r = mt(e),
                            i = t.length; a < i; a++)
                            o[t[a]] = pe.css(e, t[a], !1, r);
                        return o
                    }
                    return void 0 !== n ? pe.style(e, t, n) : pe.css(e, t)
                }
                ), e, t, arguments.length > 1)
            },
            show: function () {
                return M(this, !0)
            },
            hide: function () {
                return M(this)
            },
            toggle: function (e) {
                return "boolean" == typeof e ? e ? this.show() : this.hide() : this.each((function () {
                    We(this) ? pe(this).show() : pe(this).hide()
                }
                ))
            }
        }),
        pe.Tween = P,
        P.prototype = {
            constructor: P,
            init: function (e, t, n, r, i, o) {
                this.elem = e,
                    this.prop = n,
                    this.easing = i || pe.easing._default,
                    this.options = t,
                    this.start = this.now = this.cur(),
                    this.end = r,
                    this.unit = o || (pe.cssNumber[n] ? "" : "px")
            },
            cur: function () {
                var e = P.propHooks[this.prop];
                return e && e.get ? e.get(this) : P.propHooks._default.get(this)
            },
            run: function (e) {
                var t, n = P.propHooks[this.prop];
                return this.options.duration ? this.pos = t = pe.easing[this.easing](e, this.options.duration * e, 0, 1, this.options.duration) : this.pos = t = e,
                    this.now = (this.end - this.start) * t + this.start,
                    this.options.step && this.options.step.call(this.elem, this.now, this),
                    n && n.set ? n.set(this) : P.propHooks._default.set(this),
                    this
            }
        },
        P.prototype.init.prototype = P.prototype,
        P.propHooks = {
            _default: {
                get: function (e) {
                    var t;
                    return 1 !== e.elem.nodeType || null != e.elem[e.prop] && null == e.elem.style[e.prop] ? e.elem[e.prop] : (t = pe.css(e.elem, e.prop, "")) && "auto" !== t ? t : 0
                },
                set: function (e) {
                    pe.fx.step[e.prop] ? pe.fx.step[e.prop](e) : 1 !== e.elem.nodeType || null == e.elem.style[pe.cssProps[e.prop]] && !pe.cssHooks[e.prop] ? e.elem[e.prop] = e.now : pe.style(e.elem, e.prop, e.now + e.unit)
                }
            }
        },
        P.propHooks.scrollTop = P.propHooks.scrollLeft = {
            set: function (e) {
                e.elem.nodeType && e.elem.parentNode && (e.elem[e.prop] = e.now)
            }
        },
        pe.easing = {
            linear: function (e) {
                return e
            },
            swing: function (e) {
                return .5 - Math.cos(e * Math.PI) / 2
            },
            _default: "swing"
        },
        pe.fx = P.prototype.init,
        pe.fx.step = {};
    var kt, _t, Nt = /^(?:toggle|show|hide)$/, Dt = /queueHooks$/;
    pe.Animation = pe.extend(z, {
        tweeners: {
            "*": [function (e, t) {
                var n = this.createTween(e, t);
                return d(n.elem, e, Re.exec(t), n),
                    n
            }
            ]
        },
        tweener: function (e, t) {
            pe.isFunction(e) ? (t = e,
                e = ["*"]) : e = e.match(De);
            for (var n, r = 0, i = e.length; r < i; r++)
                n = e[r],
                    z.tweeners[n] = z.tweeners[n] || [],
                    z.tweeners[n].unshift(t)
        },
        prefilters: [W],
        prefilter: function (e, t) {
            t ? z.prefilters.unshift(e) : z.prefilters.push(e)
        }
    }),
        pe.speed = function (e, t, n) {
            var r = e && "object" == typeof e ? pe.extend({}, e) : {
                complete: n || !n && t || pe.isFunction(e) && e,
                duration: e,
                easing: n && t || t && !pe.isFunction(t) && t
            };
            return r.duration = pe.fx.off ? 0 : "number" == typeof r.duration ? r.duration : r.duration in pe.fx.speeds ? pe.fx.speeds[r.duration] : pe.fx.speeds._default,
                null != r.queue && !0 !== r.queue || (r.queue = "fx"),
                r.old = r.complete,
                r.complete = function () {
                    pe.isFunction(r.old) && r.old.call(this),
                        r.queue && pe.dequeue(this, r.queue)
                }
                ,
                r
        }
        ,
        pe.fn.extend({
            fadeTo: function (e, t, n, r) {
                return this.filter(We).css("opacity", 0).show().end().animate({
                    opacity: t
                }, e, n, r)
            },
            animate: function (e, t, n, r) {
                var i = pe.isEmptyObject(e)
                    , o = pe.speed(t, n, r)
                    , a = function () {
                        var t = z(this, pe.extend({}, e), o);
                        (i || pe._data(this, "finish")) && t.stop(!0)
                    };
                return a.finish = a,
                    i || !1 === o.queue ? this.each(a) : this.queue(o.queue, a)
            },
            stop: function (e, t, n) {
                var r = function (e) {
                    var t = e.stop;
                    delete e.stop,
                        t(n)
                };
                return "string" != typeof e && (n = t,
                    t = e,
                    e = void 0),
                    t && !1 !== e && this.queue(e || "fx", []),
                    this.each((function () {
                        var t = !0
                            , i = null != e && e + "queueHooks"
                            , o = pe.timers
                            , a = pe._data(this);
                        if (i)
                            a[i] && a[i].stop && r(a[i]);
                        else
                            for (i in a)
                                a[i] && a[i].stop && Dt.test(i) && r(a[i]);
                        for (i = o.length; i--;)
                            o[i].elem !== this || null != e && o[i].queue !== e || (o[i].anim.stop(n),
                                t = !1,
                                o.splice(i, 1));
                        !t && n || pe.dequeue(this, e)
                    }
                    ))
            },
            finish: function (e) {
                return !1 !== e && (e = e || "fx"),
                    this.each((function () {
                        var t, n = pe._data(this), r = n[e + "queue"], i = n[e + "queueHooks"], o = pe.timers, a = r ? r.length : 0;
                        for (n.finish = !0,
                            pe.queue(this, e, []),
                            i && i.stop && i.stop.call(this, !0),
                            t = o.length; t--;)
                            o[t].elem === this && o[t].queue === e && (o[t].anim.stop(!0),
                                o.splice(t, 1));
                        for (t = 0; t < a; t++)
                            r[t] && r[t].finish && r[t].finish.call(this);
                        delete n.finish
                    }
                    ))
            }
        }),
        pe.each(["toggle", "show", "hide"], (function (e, t) {
            var n = pe.fn[t];
            pe.fn[t] = function (e, r, i) {
                return null == e || "boolean" == typeof e ? n.apply(this, arguments) : this.animate(R(t, !0), e, r, i)
            }
        }
        )),
        pe.each({
            slideDown: R("show"),
            slideUp: R("hide"),
            slideToggle: R("toggle"),
            fadeIn: {
                opacity: "show"
            },
            fadeOut: {
                opacity: "hide"
            },
            fadeToggle: {
                opacity: "toggle"
            }
        }, (function (e, t) {
            pe.fn[e] = function (e, n, r) {
                return this.animate(t, e, n, r)
            }
        }
        )),
        pe.timers = [],
        pe.fx.tick = function () {
            var e, t = pe.timers, n = 0;
            for (kt = pe.now(); n < t.length; n++)
                (e = t[n])() || t[n] !== e || t.splice(n--, 1);
            t.length || pe.fx.stop(),
                kt = void 0
        }
        ,
        pe.fx.timer = function (e) {
            pe.timers.push(e),
                e() ? pe.fx.start() : pe.timers.pop()
        }
        ,
        pe.fx.interval = 13,
        pe.fx.start = function () {
            _t || (_t = e.setInterval(pe.fx.tick, pe.fx.interval))
        }
        ,
        pe.fx.stop = function () {
            e.clearInterval(_t),
                _t = null
        }
        ,
        pe.fx.speeds = {
            slow: 600,
            fast: 200,
            _default: 400
        },
        pe.fn.delay = function (t, n) {
            return t = pe.fx && pe.fx.speeds[t] || t,
                n = n || "fx",
                this.queue(n, (function (n, r) {
                    var i = e.setTimeout(n, t);
                    r.stop = function () {
                        e.clearTimeout(i)
                    }
                }
                ))
        }
        ,
        function () {
            var e, t = re.createElement("input"), n = re.createElement("div"), r = re.createElement("select"), i = r.appendChild(re.createElement("option"));
            (n = re.createElement("div")).setAttribute("className", "t"),
                n.innerHTML = "  <link/><table></table><a href='/a'>a</a><input type='checkbox'/>",
                e = n.getElementsByTagName("a")[0],
                t.setAttribute("type", "checkbox"),
                n.appendChild(t),
                (e = n.getElementsByTagName("a")[0]).style.cssText = "top:1px",
                fe.getSetAttribute = "t" !== n.className,
                fe.style = /top/.test(e.getAttribute("style")),
                fe.hrefNormalized = "/a" === e.getAttribute("href"),
                fe.checkOn = !!t.value,
                fe.optSelected = i.selected,
                fe.enctype = !!re.createElement("form").enctype,
                r.disabled = !0,
                fe.optDisabled = !i.disabled,
                (t = re.createElement("input")).setAttribute("value", ""),
                fe.input = "" === t.getAttribute("value"),
                t.value = "t",
                t.setAttribute("type", "radio"),
                fe.radioValue = "t" === t.value
        }();
    var Lt = /\r/g
        , At = /[\x20\t\r\n\f]+/g;
    pe.fn.extend({
        val: function (e) {
            var t, n, r, i = this[0];
            return arguments.length ? (r = pe.isFunction(e),
                this.each((function (n) {
                    var i;
                    1 === this.nodeType && (null == (i = r ? e.call(this, n, pe(this).val()) : e) ? i = "" : "number" == typeof i ? i += "" : pe.isArray(i) && (i = pe.map(i, (function (e) {
                        return null == e ? "" : e + ""
                    }
                    ))),
                        (t = pe.valHooks[this.type] || pe.valHooks[this.nodeName.toLowerCase()]) && "set" in t && void 0 !== t.set(this, i, "value") || (this.value = i))
                }
                ))) : i ? (t = pe.valHooks[i.type] || pe.valHooks[i.nodeName.toLowerCase()]) && "get" in t && void 0 !== (n = t.get(i, "value")) ? n : "string" == typeof (n = i.value) ? n.replace(Lt, "") : null == n ? "" : n : void 0
        }
    }),
        pe.extend({
            valHooks: {
                option: {
                    get: function (e) {
                        var t = pe.find.attr(e, "value");
                        return null != t ? t : pe.trim(pe.text(e)).replace(At, " ")
                    }
                },
                select: {
                    get: function (e) {
                        for (var t, n, r = e.options, i = e.selectedIndex, o = "select-one" === e.type || i < 0, a = o ? null : [], s = o ? i + 1 : r.length, l = i < 0 ? s : o ? i : 0; l < s; l++)
                            if (((n = r[l]).selected || l === i) && (fe.optDisabled ? !n.disabled : null === n.getAttribute("disabled")) && (!n.parentNode.disabled || !pe.nodeName(n.parentNode, "optgroup"))) {
                                if (t = pe(n).val(),
                                    o)
                                    return t;
                                a.push(t)
                            }
                        return a
                    },
                    set: function (e, t) {
                        for (var n, r, i = e.options, o = pe.makeArray(t), a = i.length; a--;)
                            if (r = i[a],
                                pe.inArray(pe.valHooks.option.get(r), o) > -1)
                                try {
                                    r.selected = n = !0
                                } catch (e) {
                                    r.scrollHeight
                                }
                            else
                                r.selected = !1;
                        return n || (e.selectedIndex = -1),
                            i
                    }
                }
            }
        }),
        pe.each(["radio", "checkbox"], (function () {
            pe.valHooks[this] = {
                set: function (e, t) {
                    if (pe.isArray(t))
                        return e.checked = pe.inArray(pe(e).val(), t) > -1
                }
            },
                fe.checkOn || (pe.valHooks[this].get = function (e) {
                    return null === e.getAttribute("value") ? "on" : e.value
                }
                )
        }
        ));
    var Mt, Ht, qt = pe.expr.attrHandle, Ot = /^(?:checked|selected)$/i, Pt = fe.getSetAttribute, Ft = fe.input;
    pe.fn.extend({
        attr: function (e, t) {
            return Be(this, pe.attr, e, t, arguments.length > 1)
        },
        removeAttr: function (e) {
            return this.each((function () {
                pe.removeAttr(this, e)
            }
            ))
        }
    }),
        pe.extend({
            attr: function (e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                    return void 0 === e.getAttribute ? pe.prop(e, t, n) : (1 === o && pe.isXMLDoc(e) || (t = t.toLowerCase(),
                        i = pe.attrHooks[t] || (pe.expr.match.bool.test(t) ? Ht : Mt)),
                        void 0 !== n ? null === n ? void pe.removeAttr(e, t) : i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : (e.setAttribute(t, n + ""),
                            n) : i && "get" in i && null !== (r = i.get(e, t)) ? r : null == (r = pe.find.attr(e, t)) ? void 0 : r)
            },
            attrHooks: {
                type: {
                    set: function (e, t) {
                        if (!fe.radioValue && "radio" === t && pe.nodeName(e, "input")) {
                            var n = e.value;
                            return e.setAttribute("type", t),
                                n && (e.value = n),
                                t
                        }
                    }
                }
            },
            removeAttr: function (e, t) {
                var n, r, i = 0, o = t && t.match(De);
                if (o && 1 === e.nodeType)
                    for (; n = o[i++];)
                        r = pe.propFix[n] || n,
                            pe.expr.match.bool.test(n) ? Ft && Pt || !Ot.test(n) ? e[r] = !1 : e[pe.camelCase("default-" + n)] = e[r] = !1 : pe.attr(e, n, ""),
                            e.removeAttribute(Pt ? n : r)
            }
        }),
        Ht = {
            set: function (e, t, n) {
                return !1 === t ? pe.removeAttr(e, n) : Ft && Pt || !Ot.test(n) ? e.setAttribute(!Pt && pe.propFix[n] || n, n) : e[pe.camelCase("default-" + n)] = e[n] = !0,
                    n
            }
        },
        pe.each(pe.expr.match.bool.source.match(/\w+/g), (function (e, t) {
            var n = qt[t] || pe.find.attr;
            Ft && Pt || !Ot.test(t) ? qt[t] = function (e, t, r) {
                var i, o;
                return r || (o = qt[t],
                    qt[t] = i,
                    i = null != n(e, t, r) ? t.toLowerCase() : null,
                    qt[t] = o),
                    i
            }
                : qt[t] = function (e, t, n) {
                    if (!n)
                        return e[pe.camelCase("default-" + t)] ? t.toLowerCase() : null
                }
        }
        )),
        Ft && Pt || (pe.attrHooks.value = {
            set: function (e, t, n) {
                if (!pe.nodeName(e, "input"))
                    return Mt && Mt.set(e, t, n);
                e.defaultValue = t
            }
        }),
        Pt || (Mt = {
            set: function (e, t, n) {
                var r = e.getAttributeNode(n);
                if (r || e.setAttributeNode(r = e.ownerDocument.createAttribute(n)),
                    r.value = t += "",
                    "value" === n || t === e.getAttribute(n))
                    return t
            }
        },
            qt.id = qt.name = qt.coords = function (e, t, n) {
                var r;
                if (!n)
                    return (r = e.getAttributeNode(t)) && "" !== r.value ? r.value : null
            }
            ,
            pe.valHooks.button = {
                get: function (e, t) {
                    var n = e.getAttributeNode(t);
                    if (n && n.specified)
                        return n.value
                },
                set: Mt.set
            },
            pe.attrHooks.contenteditable = {
                set: function (e, t, n) {
                    Mt.set(e, "" !== t && t, n)
                }
            },
            pe.each(["width", "height"], (function (e, t) {
                pe.attrHooks[t] = {
                    set: function (e, n) {
                        if ("" === n)
                            return e.setAttribute(t, "auto"),
                                n
                    }
                }
            }
            ))),
        fe.style || (pe.attrHooks.style = {
            get: function (e) {
                return e.style.cssText || void 0
            },
            set: function (e, t) {
                return e.style.cssText = t + ""
            }
        });
    var Rt = /^(?:input|select|textarea|button|object)$/i
        , It = /^(?:a|area)$/i;
    pe.fn.extend({
        prop: function (e, t) {
            return Be(this, pe.prop, e, t, arguments.length > 1)
        },
        removeProp: function (e) {
            return e = pe.propFix[e] || e,
                this.each((function () {
                    try {
                        this[e] = void 0,
                            delete this[e]
                    } catch (e) { }
                }
                ))
        }
    }),
        pe.extend({
            prop: function (e, t, n) {
                var r, i, o = e.nodeType;
                if (3 !== o && 8 !== o && 2 !== o)
                    return 1 === o && pe.isXMLDoc(e) || (t = pe.propFix[t] || t,
                        i = pe.propHooks[t]),
                        void 0 !== n ? i && "set" in i && void 0 !== (r = i.set(e, n, t)) ? r : e[t] = n : i && "get" in i && null !== (r = i.get(e, t)) ? r : e[t]
            },
            propHooks: {
                tabIndex: {
                    get: function (e) {
                        var t = pe.find.attr(e, "tabindex");
                        return t ? parseInt(t, 10) : Rt.test(e.nodeName) || It.test(e.nodeName) && e.href ? 0 : -1
                    }
                }
            },
            propFix: {
                for: "htmlFor",
                class: "className"
            }
        }),
        fe.hrefNormalized || pe.each(["href", "src"], (function (e, t) {
            pe.propHooks[t] = {
                get: function (e) {
                    return e.getAttribute(t, 4)
                }
            }
        }
        )),
        fe.optSelected || (pe.propHooks.selected = {
            get: function (e) {
                var t = e.parentNode;
                return t && (t.selectedIndex,
                    t.parentNode && t.parentNode.selectedIndex),
                    null
            },
            set: function (e) {
                var t = e.parentNode;
                t && (t.selectedIndex,
                    t.parentNode && t.parentNode.selectedIndex)
            }
        }),
        pe.each(["tabIndex", "readOnly", "maxLength", "cellSpacing", "cellPadding", "rowSpan", "colSpan", "useMap", "frameBorder", "contentEditable"], (function () {
            pe.propFix[this.toLowerCase()] = this
        }
        )),
        fe.enctype || (pe.propFix.enctype = "encoding");
    var Wt = /[\t\r\n\f]/g;
    pe.fn.extend({
        addClass: function (e) {
            var t, n, r, i, o, a, s, l = 0;
            if (pe.isFunction(e))
                return this.each((function (t) {
                    pe(this).addClass(e.call(this, t, $(this)))
                }
                ));
            if ("string" == typeof e && e)
                for (t = e.match(De) || []; n = this[l++];)
                    if (i = $(n),
                        r = 1 === n.nodeType && (" " + i + " ").replace(Wt, " ")) {
                        for (a = 0; o = t[a++];)
                            r.indexOf(" " + o + " ") < 0 && (r += o + " ");
                        i !== (s = pe.trim(r)) && pe.attr(n, "class", s)
                    }
            return this
        },
        removeClass: function (e) {
            var t, n, r, i, o, a, s, l = 0;
            if (pe.isFunction(e))
                return this.each((function (t) {
                    pe(this).removeClass(e.call(this, t, $(this)))
                }
                ));
            if (!arguments.length)
                return this.attr("class", "");
            if ("string" == typeof e && e)
                for (t = e.match(De) || []; n = this[l++];)
                    if (i = $(n),
                        r = 1 === n.nodeType && (" " + i + " ").replace(Wt, " ")) {
                        for (a = 0; o = t[a++];)
                            for (; r.indexOf(" " + o + " ") > -1;)
                                r = r.replace(" " + o + " ", " ");
                        i !== (s = pe.trim(r)) && pe.attr(n, "class", s)
                    }
            return this
        },
        toggleClass: function (e, t) {
            var n = typeof e;
            return "boolean" == typeof t && "string" === n ? t ? this.addClass(e) : this.removeClass(e) : pe.isFunction(e) ? this.each((function (n) {
                pe(this).toggleClass(e.call(this, n, $(this), t), t)
            }
            )) : this.each((function () {
                var t, r, i, o;
                if ("string" === n)
                    for (r = 0,
                        i = pe(this),
                        o = e.match(De) || []; t = o[r++];)
                        i.hasClass(t) ? i.removeClass(t) : i.addClass(t);
                else
                    void 0 !== e && "boolean" !== n || ((t = $(this)) && pe._data(this, "__className__", t),
                        pe.attr(this, "class", t || !1 === e ? "" : pe._data(this, "__className__") || ""))
            }
            ))
        },
        hasClass: function (e) {
            var t, n, r = 0;
            for (t = " " + e + " "; n = this[r++];)
                if (1 === n.nodeType && (" " + $(n) + " ").replace(Wt, " ").indexOf(t) > -1)
                    return !0;
            return !1
        }
    }),
        pe.each("blur focus focusin focusout load resize scroll unload click dblclick mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave change select submit keydown keypress keyup error contextmenu".split(" "), (function (e, t) {
            pe.fn[t] = function (e, n) {
                return arguments.length > 0 ? this.on(t, null, e, n) : this.trigger(t)
            }
        }
        )),
        pe.fn.extend({
            hover: function (e, t) {
                return this.mouseenter(e).mouseleave(t || e)
            }
        });
    var Bt = e.location
        , zt = pe.now()
        , $t = /\?/
        , Xt = /(,)|(\[|{)|(}|])|"(?:[^"\\\r\n]|\\["\\\/bfnrt]|\\u[\da-fA-F]{4})*"\s*:?|true|false|null|-?(?!0\d)\d+(?:\.\d+|)(?:[eE][+-]?\d+|)/g;
    pe.parseJSON = function (t) {
        if (e.JSON && e.JSON.parse)
            return e.JSON.parse(t + "");
        var n, r = null, i = pe.trim(t + "");
        return i && !pe.trim(i.replace(Xt, (function (e, t, i, o) {
            return n && t && (r = 0),
                0 === r ? e : (n = i || t,
                    r += !o - !i,
                    "")
        }
        ))) ? Function("return " + i)() : pe.error("Invalid JSON: " + t)
    }
        ,
        pe.parseXML = function (t) {
            var n;
            if (!t || "string" != typeof t)
                return null;
            try {
                e.DOMParser ? n = (new e.DOMParser).parseFromString(t, "text/xml") : ((n = new e.ActiveXObject("Microsoft.XMLDOM")).async = "false",
                    n.loadXML(t))
            } catch (e) {
                n = void 0
            }
            return n && n.documentElement && !n.getElementsByTagName("parsererror").length || pe.error("Invalid XML: " + t),
                n
        }
        ;
    var Ut = /#.*$/
        , Jt = /([?&])_=[^&]*/
        , Yt = /^(.*?):[ \t]*([^\r\n]*)\r?$/gm
        , Qt = /^(?:about|app|app-storage|.+-extension|file|res|widget):$/
        , Vt = /^(?:GET|HEAD)$/
        , Kt = /^\/\//
        , Gt = /^([\w.+-]+:)(?:\/\/(?:[^\/?#]*@|)([^\/?#:]*)(?::(\d+)|)|)/
        , Zt = {}
        , en = {}
        , tn = "*/".concat("*")
        , nn = Bt.href
        , rn = Gt.exec(nn.toLowerCase()) || [];
    pe.extend({
        active: 0,
        lastModified: {},
        etag: {},
        ajaxSettings: {
            url: nn,
            type: "GET",
            isLocal: Qt.test(rn[1]),
            global: !0,
            processData: !0,
            async: !0,
            contentType: "application/x-www-form-urlencoded; charset=UTF-8",
            accepts: {
                "*": tn,
                text: "text/plain",
                html: "text/html",
                xml: "application/xml, text/xml",
                json: "application/json, text/javascript"
            },
            contents: {
                xml: /\bxml\b/,
                html: /\bhtml/,
                json: /\bjson\b/
            },
            responseFields: {
                xml: "responseXML",
                text: "responseText",
                json: "responseJSON"
            },
            converters: {
                "* text": String,
                "text html": !0,
                "text json": pe.parseJSON,
                "text xml": pe.parseXML
            },
            flatOptions: {
                url: !0,
                context: !0
            }
        },
        ajaxSetup: function (e, t) {
            return t ? J(J(e, pe.ajaxSettings), t) : J(pe.ajaxSettings, e)
        },
        ajaxPrefilter: X(Zt),
        ajaxTransport: X(en),
        ajax: function (t, n) {
            function r(t, n, r, i) {
                var o, f, y, b, w, S = n;
                2 !== x && (x = 2,
                    l && e.clearTimeout(l),
                    c = void 0,
                    s = i || "",
                    T.readyState = t > 0 ? 4 : 0,
                    o = t >= 200 && t < 300 || 304 === t,
                    r && (b = Y(d, T, r)),
                    b = Q(d, b, T, o),
                    o ? (d.ifModified && ((w = T.getResponseHeader("Last-Modified")) && (pe.lastModified[a] = w),
                        (w = T.getResponseHeader("etag")) && (pe.etag[a] = w)),
                        204 === t || "HEAD" === d.type ? S = "nocontent" : 304 === t ? S = "notmodified" : (S = b.state,
                            f = b.data,
                            o = !(y = b.error))) : (y = S,
                                !t && S || (S = "error",
                                    t < 0 && (t = 0))),
                    T.status = t,
                    T.statusText = (n || S) + "",
                    o ? g.resolveWith(p, [f, S, T]) : g.rejectWith(p, [T, S, y]),
                    T.statusCode(v),
                    v = void 0,
                    u && h.trigger(o ? "ajaxSuccess" : "ajaxError", [T, d, o ? f : y]),
                    m.fireWith(p, [T, S]),
                    u && (h.trigger("ajaxComplete", [T, d]),
                        --pe.active || pe.event.trigger("ajaxStop")))
            }
            "object" == typeof t && (n = t,
                t = void 0),
                n = n || {};
            var i, o, a, s, l, u, c, f, d = pe.ajaxSetup({}, n), p = d.context || d, h = d.context && (p.nodeType || p.jquery) ? pe(p) : pe.event, g = pe.Deferred(), m = pe.Callbacks("once memory"), v = d.statusCode || {}, y = {}, b = {}, x = 0, w = "canceled", T = {
                readyState: 0,
                getResponseHeader: function (e) {
                    var t;
                    if (2 === x) {
                        if (!f)
                            for (f = {}; t = Yt.exec(s);)
                                f[t[1].toLowerCase()] = t[2];
                        t = f[e.toLowerCase()]
                    }
                    return null == t ? null : t
                },
                getAllResponseHeaders: function () {
                    return 2 === x ? s : null
                },
                setRequestHeader: function (e, t) {
                    var n = e.toLowerCase();
                    return x || (e = b[n] = b[n] || e,
                        y[e] = t),
                        this
                },
                overrideMimeType: function (e) {
                    return x || (d.mimeType = e),
                        this
                },
                statusCode: function (e) {
                    var t;
                    if (e)
                        if (x < 2)
                            for (t in e)
                                v[t] = [v[t], e[t]];
                        else
                            T.always(e[T.status]);
                    return this
                },
                abort: function (e) {
                    var t = e || w;
                    return c && c.abort(t),
                        r(0, t),
                        this
                }
            };
            if (g.promise(T).complete = m.add,
                T.success = T.done,
                T.error = T.fail,
                d.url = ((t || d.url || nn) + "").replace(Ut, "").replace(Kt, rn[1] + "//"),
                d.type = n.method || n.type || d.method || d.type,
                d.dataTypes = pe.trim(d.dataType || "*").toLowerCase().match(De) || [""],
                null == d.crossDomain && (i = Gt.exec(d.url.toLowerCase()),
                    d.crossDomain = !(!i || i[1] === rn[1] && i[2] === rn[2] && (i[3] || ("http:" === i[1] ? "80" : "443")) === (rn[3] || ("http:" === rn[1] ? "80" : "443")))),
                d.data && d.processData && "string" != typeof d.data && (d.data = pe.param(d.data, d.traditional)),
                U(Zt, d, n, T),
                2 === x)
                return T;
            for (o in (u = pe.event && d.global) && 0 == pe.active++ && pe.event.trigger("ajaxStart"),
                d.type = d.type.toUpperCase(),
                d.hasContent = !Vt.test(d.type),
                a = d.url,
                d.hasContent || (d.data && (a = d.url += ($t.test(a) ? "&" : "?") + d.data,
                    delete d.data),
                    !1 === d.cache && (d.url = Jt.test(a) ? a.replace(Jt, "$1_=" + zt++) : a + ($t.test(a) ? "&" : "?") + "_=" + zt++)),
                d.ifModified && (pe.lastModified[a] && T.setRequestHeader("If-Modified-Since", pe.lastModified[a]),
                    pe.etag[a] && T.setRequestHeader("If-None-Match", pe.etag[a])),
                (d.data && d.hasContent && !1 !== d.contentType || n.contentType) && T.setRequestHeader("Content-Type", d.contentType),
                T.setRequestHeader("Accept", d.dataTypes[0] && d.accepts[d.dataTypes[0]] ? d.accepts[d.dataTypes[0]] + ("*" !== d.dataTypes[0] ? ", " + tn + "; q=0.01" : "") : d.accepts["*"]),
                d.headers)
                T.setRequestHeader(o, d.headers[o]);
            if (d.beforeSend && (!1 === d.beforeSend.call(p, T, d) || 2 === x))
                return T.abort();
            for (o in w = "abort",
            {
                success: 1,
                error: 1,
                complete: 1
            })
                T[o](d[o]);
            if (c = U(en, d, n, T)) {
                if (T.readyState = 1,
                    u && h.trigger("ajaxSend", [T, d]),
                    2 === x)
                    return T;
                d.async && d.timeout > 0 && (l = e.setTimeout((function () {
                    T.abort("timeout")
                }
                ), d.timeout));
                try {
                    x = 1,
                        c.send(y, r)
                } catch (e) {
                    if (!(x < 2))
                        throw e;
                    r(-1, e)
                }
            } else
                r(-1, "No Transport");
            return T
        },
        getJSON: function (e, t, n) {
            return pe.get(e, t, n, "json")
        },
        getScript: function (e, t) {
            return pe.get(e, void 0, t, "script")
        }
    }),
        pe.each(["get", "post"], (function (e, t) {
            pe[t] = function (e, n, r, i) {
                return pe.isFunction(n) && (i = i || r,
                    r = n,
                    n = void 0),
                    pe.ajax(pe.extend({
                        url: e,
                        type: t,
                        dataType: i,
                        data: n,
                        success: r
                    }, pe.isPlainObject(e) && e))
            }
        }
        )),
        pe._evalUrl = function (e) {
            return pe.ajax({
                url: e,
                type: "GET",
                dataType: "script",
                cache: !0,
                async: !1,
                global: !1,
                throws: !0
            })
        }
        ,
        pe.fn.extend({
            wrapAll: function (e) {
                if (pe.isFunction(e))
                    return this.each((function (t) {
                        pe(this).wrapAll(e.call(this, t))
                    }
                    ));
                if (this[0]) {
                    var t = pe(e, this[0].ownerDocument).eq(0).clone(!0);
                    this[0].parentNode && t.insertBefore(this[0]),
                        t.map((function () {
                            for (var e = this; e.firstChild && 1 === e.firstChild.nodeType;)
                                e = e.firstChild;
                            return e
                        }
                        )).append(this)
                }
                return this
            },
            wrapInner: function (e) {
                return pe.isFunction(e) ? this.each((function (t) {
                    pe(this).wrapInner(e.call(this, t))
                }
                )) : this.each((function () {
                    var t = pe(this)
                        , n = t.contents();
                    n.length ? n.wrapAll(e) : t.append(e)
                }
                ))
            },
            wrap: function (e) {
                var t = pe.isFunction(e);
                return this.each((function (n) {
                    pe(this).wrapAll(t ? e.call(this, n) : e)
                }
                ))
            },
            unwrap: function () {
                return this.parent().each((function () {
                    pe.nodeName(this, "body") || pe(this).replaceWith(this.childNodes)
                }
                )).end()
            }
        }),
        pe.expr.filters.hidden = function (e) {
            return fe.reliableHiddenOffsets() ? e.offsetWidth <= 0 && e.offsetHeight <= 0 && !e.getClientRects().length : K(e)
        }
        ,
        pe.expr.filters.visible = function (e) {
            return !pe.expr.filters.hidden(e)
        }
        ;
    var on = /%20/g
        , an = /\[\]$/
        , sn = /\r?\n/g
        , ln = /^(?:submit|button|image|reset|file)$/i
        , un = /^(?:input|select|textarea|keygen)/i;
    pe.param = function (e, t) {
        var n, r = [], i = function (e, t) {
            t = pe.isFunction(t) ? t() : null == t ? "" : t,
                r[r.length] = encodeURIComponent(e) + "=" + encodeURIComponent(t)
        };
        if (void 0 === t && (t = pe.ajaxSettings && pe.ajaxSettings.traditional),
            pe.isArray(e) || e.jquery && !pe.isPlainObject(e))
            pe.each(e, (function () {
                i(this.name, this.value)
            }
            ));
        else
            for (n in e)
                G(n, e[n], t, i);
        return r.join("&").replace(on, "+")
    }
        ,
        pe.fn.extend({
            serialize: function () {
                return pe.param(this.serializeArray())
            },
            serializeArray: function () {
                return this.map((function () {
                    var e = pe.prop(this, "elements");
                    return e ? pe.makeArray(e) : this
                }
                )).filter((function () {
                    var e = this.type;
                    return this.name && !pe(this).is(":disabled") && un.test(this.nodeName) && !ln.test(e) && (this.checked || !ze.test(e))
                }
                )).map((function (e, t) {
                    var n = pe(this).val();
                    return null == n ? null : pe.isArray(n) ? pe.map(n, (function (e) {
                        return {
                            name: t.name,
                            value: e.replace(sn, "\r\n")
                        }
                    }
                    )) : {
                        name: t.name,
                        value: n.replace(sn, "\r\n")
                    }
                }
                )).get()
            }
        }),
        pe.ajaxSettings.xhr = void 0 !== e.ActiveXObject ? function () {
            return this.isLocal ? ee() : re.documentMode > 8 ? Z() : /^(get|post|head|put|delete|options)$/i.test(this.type) && Z() || ee()
        }
            : Z;
    var cn = 0
        , fn = {}
        , dn = pe.ajaxSettings.xhr();
    e.attachEvent && e.attachEvent("onunload", (function () {
        for (var e in fn)
            fn[e](void 0, !0)
    }
    )),
        fe.cors = !!dn && "withCredentials" in dn,
        (dn = fe.ajax = !!dn) && pe.ajaxTransport((function (t) {
            var n;
            if (!t.crossDomain || fe.cors)
                return {
                    send: function (r, i) {
                        var o, a = t.xhr(), s = ++cn;
                        if (a.open(t.type, t.url, t.async, t.username, t.password),
                            t.xhrFields)
                            for (o in t.xhrFields)
                                a[o] = t.xhrFields[o];
                        for (o in t.mimeType && a.overrideMimeType && a.overrideMimeType(t.mimeType),
                            t.crossDomain || r["X-Requested-With"] || (r["X-Requested-With"] = "XMLHttpRequest"),
                            r)
                            void 0 !== r[o] && a.setRequestHeader(o, r[o] + "");
                        a.send(t.hasContent && t.data || null),
                            n = function (e, r) {
                                var o, l, u;
                                if (n && (r || 4 === a.readyState))
                                    if (delete fn[s],
                                        n = void 0,
                                        a.onreadystatechange = pe.noop,
                                        r)
                                        4 !== a.readyState && a.abort();
                                    else {
                                        u = {},
                                            o = a.status,
                                            "string" == typeof a.responseText && (u.text = a.responseText);
                                        try {
                                            l = a.statusText
                                        } catch (e) {
                                            l = ""
                                        }
                                        o || !t.isLocal || t.crossDomain ? 1223 === o && (o = 204) : o = u.text ? 200 : 404
                                    }
                                u && i(o, l, u, a.getAllResponseHeaders())
                            }
                            ,
                            t.async ? 4 === a.readyState ? e.setTimeout(n) : a.onreadystatechange = fn[s] = n : n()
                    },
                    abort: function () {
                        n && n(void 0, !0)
                    }
                }
        }
        )),
        pe.ajaxSetup({
            accepts: {
                script: "text/javascript, application/javascript, application/ecmascript, application/x-ecmascript"
            },
            contents: {
                script: /\b(?:java|ecma)script\b/
            },
            converters: {
                "text script": function (e) {
                    return pe.globalEval(e),
                        e
                }
            }
        }),
        pe.ajaxPrefilter("script", (function (e) {
            void 0 === e.cache && (e.cache = !1),
                e.crossDomain && (e.type = "GET",
                    e.global = !1)
        }
        )),
        pe.ajaxTransport("script", (function (e) {
            if (e.crossDomain) {
                var t, n = re.head || pe("head")[0] || re.documentElement;
                return {
                    send: function (r, i) {
                        (t = re.createElement("script")).async = !0,
                            e.scriptCharset && (t.charset = e.scriptCharset),
                            t.src = e.url,
                            t.onload = t.onreadystatechange = function (e, n) {
                                (n || !t.readyState || /loaded|complete/.test(t.readyState)) && (t.onload = t.onreadystatechange = null,
                                    t.parentNode && t.parentNode.removeChild(t),
                                    t = null,
                                    n || i(200, "success"))
                            }
                            ,
                            n.insertBefore(t, n.firstChild)
                    },
                    abort: function () {
                        t && t.onload(void 0, !0)
                    }
                }
            }
        }
        ));
    var pn = []
        , hn = /(=)\?(?=&|$)|\?\?/;
    pe.ajaxSetup({
        jsonp: "callback",
        jsonpCallback: function () {
            var e = pn.pop() || pe.expando + "_" + zt++;
            return this[e] = !0,
                e
        }
    }),
        pe.ajaxPrefilter("json jsonp", (function (t, n, r) {
            var i, o, a, s = !1 !== t.jsonp && (hn.test(t.url) ? "url" : "string" == typeof t.data && 0 === (t.contentType || "").indexOf("application/x-www-form-urlencoded") && hn.test(t.data) && "data");
            if (s || "jsonp" === t.dataTypes[0])
                return i = t.jsonpCallback = pe.isFunction(t.jsonpCallback) ? t.jsonpCallback() : t.jsonpCallback,
                    s ? t[s] = t[s].replace(hn, "$1" + i) : !1 !== t.jsonp && (t.url += ($t.test(t.url) ? "&" : "?") + t.jsonp + "=" + i),
                    t.converters["script json"] = function () {
                        return a || pe.error(i + " was not called"),
                            a[0]
                    }
                    ,
                    t.dataTypes[0] = "json",
                    o = e[i],
                    e[i] = function () {
                        a = arguments
                    }
                    ,
                    r.always((function () {
                        void 0 === o ? pe(e).removeProp(i) : e[i] = o,
                            t[i] && (t.jsonpCallback = n.jsonpCallback,
                                pn.push(i)),
                            a && pe.isFunction(o) && o(a[0]),
                            a = o = void 0
                    }
                    )),
                    "script"
        }
        )),
        pe.parseHTML = function (e, t, n) {
            if (!e || "string" != typeof e)
                return null;
            "boolean" == typeof t && (n = t,
                t = !1),
                t = t || re;
            var r = Te.exec(e)
                , i = !n && [];
            return r ? [t.createElement(r[1])] : (r = v([e], t, i),
                i && i.length && pe(i).remove(),
                pe.merge([], r.childNodes))
        }
        ;
    var gn = pe.fn.load;
    pe.fn.load = function (e, t, n) {
        if ("string" != typeof e && gn)
            return gn.apply(this, arguments);
        var r, i, o, a = this, s = e.indexOf(" ");
        return s > -1 && (r = pe.trim(e.slice(s, e.length)),
            e = e.slice(0, s)),
            pe.isFunction(t) ? (n = t,
                t = void 0) : t && "object" == typeof t && (i = "POST"),
            a.length > 0 && pe.ajax({
                url: e,
                type: i || "GET",
                dataType: "html",
                data: t
            }).done((function (e) {
                o = arguments,
                    a.html(r ? pe("<div>").append(pe.parseHTML(e)).find(r) : e)
            }
            )).always(n && function (e, t) {
                a.each((function () {
                    n.apply(this, o || [e.responseText, t, e])
                }
                ))
            }
            ),
            this
    }
        ,
        pe.each(["ajaxStart", "ajaxStop", "ajaxComplete", "ajaxError", "ajaxSuccess", "ajaxSend"], (function (e, t) {
            pe.fn[t] = function (e) {
                return this.on(t, e)
            }
        }
        )),
        pe.expr.filters.animated = function (e) {
            return pe.grep(pe.timers, (function (t) {
                return e === t.elem
            }
            )).length
        }
        ,
        pe.offset = {
            setOffset: function (e, t, n) {
                var r, i, o, a, s, l, u = pe.css(e, "position"), c = pe(e), f = {};
                "static" === u && (e.style.position = "relative"),
                    s = c.offset(),
                    o = pe.css(e, "top"),
                    l = pe.css(e, "left"),
                    ("absolute" === u || "fixed" === u) && pe.inArray("auto", [o, l]) > -1 ? (a = (r = c.position()).top,
                        i = r.left) : (a = parseFloat(o) || 0,
                            i = parseFloat(l) || 0),
                    pe.isFunction(t) && (t = t.call(e, n, pe.extend({}, s))),
                    null != t.top && (f.top = t.top - s.top + a),
                    null != t.left && (f.left = t.left - s.left + i),
                    "using" in t ? t.using.call(e, f) : c.css(f)
            }
        },
        pe.fn.extend({
            offset: function (e) {
                if (arguments.length)
                    return void 0 === e ? this : this.each((function (t) {
                        pe.offset.setOffset(this, e, t)
                    }
                    ));
                var t, n, r = {
                    top: 0,
                    left: 0
                }, i = this[0], o = i && i.ownerDocument;
                return o ? (t = o.documentElement,
                    pe.contains(t, i) ? (void 0 !== i.getBoundingClientRect && (r = i.getBoundingClientRect()),
                        n = te(o),
                    {
                        top: r.top + (n.pageYOffset || t.scrollTop) - (t.clientTop || 0),
                        left: r.left + (n.pageXOffset || t.scrollLeft) - (t.clientLeft || 0)
                    }) : r) : void 0
            },
            position: function () {
                if (this[0]) {
                    var e, t, n = {
                        top: 0,
                        left: 0
                    }, r = this[0];
                    return "fixed" === pe.css(r, "position") ? t = r.getBoundingClientRect() : (e = this.offsetParent(),
                        t = this.offset(),
                        pe.nodeName(e[0], "html") || (n = e.offset()),
                        n.top += pe.css(e[0], "borderTopWidth", !0),
                        n.left += pe.css(e[0], "borderLeftWidth", !0)),
                    {
                        top: t.top - n.top - pe.css(r, "marginTop", !0),
                        left: t.left - n.left - pe.css(r, "marginLeft", !0)
                    }
                }
            },
            offsetParent: function () {
                return this.map((function () {
                    for (var e = this.offsetParent; e && !pe.nodeName(e, "html") && "static" === pe.css(e, "position");)
                        e = e.offsetParent;
                    return e || gt
                }
                ))
            }
        }),
        pe.each({
            scrollLeft: "pageXOffset",
            scrollTop: "pageYOffset"
        }, (function (e, t) {
            var n = /Y/.test(t);
            pe.fn[e] = function (r) {
                return Be(this, (function (e, r, i) {
                    var o = te(e);
                    if (void 0 === i)
                        return o ? t in o ? o[t] : o.document.documentElement[r] : e[r];
                    o ? o.scrollTo(n ? pe(o).scrollLeft() : i, n ? i : pe(o).scrollTop()) : e[r] = i
                }
                ), e, r, arguments.length, null)
            }
        }
        )),
        pe.each(["top", "left"], (function (e, t) {
            pe.cssHooks[t] = L(fe.pixelPosition, (function (e, n) {
                if (n)
                    return n = vt(e, t),
                        pt.test(n) ? pe(e).position()[t] + "px" : n
            }
            ))
        }
        )),
        pe.each({
            Height: "height",
            Width: "width"
        }, (function (e, t) {
            pe.each({
                padding: "inner" + e,
                content: t,
                "": "outer" + e
            }, (function (n, r) {
                pe.fn[r] = function (r, i) {
                    var o = arguments.length && (n || "boolean" != typeof r)
                        , a = n || (!0 === r || !0 === i ? "margin" : "border");
                    return Be(this, (function (t, n, r) {
                        var i;
                        return pe.isWindow(t) ? t.document.documentElement["client" + e] : 9 === t.nodeType ? (i = t.documentElement,
                            Math.max(t.body["scroll" + e], i["scroll" + e], t.body["offset" + e], i["offset" + e], i["client" + e])) : void 0 === r ? pe.css(t, n, a) : pe.style(t, n, r, a)
                    }
                    ), t, o ? r : void 0, o, null)
                }
            }
            ))
        }
        )),
        pe.fn.extend({
            bind: function (e, t, n) {
                return this.on(e, null, t, n)
            },
            unbind: function (e, t) {
                return this.off(e, null, t)
            },
            delegate: function (e, t, n, r) {
                return this.on(t, e, n, r)
            },
            undelegate: function (e, t, n) {
                return 1 === arguments.length ? this.off(e, "**") : this.off(t, e || "**", n)
            }
        }),
        pe.fn.size = function () {
            return this.length
        }
        ,
        pe.fn.andSelf = pe.fn.addBack,
        "function" == typeof define && define.amd && define("jquery", [], (function () {
            return pe
        }
        ));
    var mn = e.jQuery
        , vn = e.$;
    return pe.noConflict = function (t) {
        return e.$ === pe && (e.$ = vn),
            t && e.jQuery === pe && (e.jQuery = mn),
            pe
    }
        ,
        t || (e.jQuery = e.$ = pe),
        pe
}
)),
    function () {
        "use strict";
        var e = function (e, t) {
            var n;
            e.rails !== t && e.error("jquery-ujs has already been loaded!");
            var r = e(document);
            e.rails = n = {
                linkClickSelector: "a[data-confirm], a[data-method], a[data-remote]:not([disabled]), a[data-disable-with], a[data-disable]",
                buttonClickSelector: "button[data-remote]:not([form]):not(form button), button[data-confirm]:not([form]):not(form button)",
                inputChangeSelector: "select[data-remote], input[data-remote], textarea[data-remote]",
                formSubmitSelector: "form:not([data-turbo=true])",
                formInputClickSelector: "form:not([data-turbo=true]) input[type=submit], form:not([data-turbo=true]) input[type=image], form:not([data-turbo=true]) button[type=submit], form:not([data-turbo=true]) button:not([type]), input[type=submit][form], input[type=image][form], button[type=submit][form], button[form]:not([type])",
                disableSelector: "input[data-disable-with]:enabled, button[data-disable-with]:enabled, textarea[data-disable-with]:enabled, input[data-disable]:enabled, button[data-disable]:enabled, textarea[data-disable]:enabled",
                enableSelector: "input[data-disable-with]:disabled, button[data-disable-with]:disabled, textarea[data-disable-with]:disabled, input[data-disable]:disabled, button[data-disable]:disabled, textarea[data-disable]:disabled",
                requiredInputSelector: "input[name][required]:not([disabled]), textarea[name][required]:not([disabled])",
                fileInputSelector: "input[name][type=file]:not([disabled])",
                linkDisableSelector: "a[data-disable-with], a[data-disable]",
                buttonDisableSelector: "button[data-remote][data-disable-with], button[data-remote][data-disable]",
                csrfToken: function () {
                    return e("meta[name=csrf-token]").attr("content")
                },
                csrfParam: function () {
                    return e("meta[name=csrf-param]").attr("content")
                },
                CSRFProtection: function (e) {
                    var t = n.csrfToken();
                    t && e.setRequestHeader("X-CSRF-Token", t)
                },
                refreshCSRFTokens: function () {
                    e('form input[name="' + n.csrfParam() + '"]').val(n.csrfToken())
                },
                fire: function (t, n, r) {
                    var i = e.Event(n);
                    return t.trigger(i, r),
                        !1 !== i.result
                },
                confirm: function (e) {
                    return confirm(e)
                },
                ajax: function (t) {
                    return e.ajax(t)
                },
                href: function (e) {
                    return e[0].href
                },
                isRemote: function (e) {
                    return e.data("remote") !== t && !1 !== e.data("remote")
                },
                handleRemote: function (r) {
                    var i, o, a, s, l, u;
                    if (n.fire(r, "ajax:before")) {
                        if (s = r.data("with-credentials") || null,
                            l = r.data("type") || e.ajaxSettings && e.ajaxSettings.dataType,
                            r.is("form")) {
                            i = r.data("ujs:submit-button-formmethod") || r.attr("method"),
                                o = r.data("ujs:submit-button-formaction") || r.attr("action"),
                                a = e(r[0]).serializeArray();
                            var c = r.data("ujs:submit-button");
                            c && (a.push(c),
                                r.data("ujs:submit-button", null)),
                                r.data("ujs:submit-button-formmethod", null),
                                r.data("ujs:submit-button-formaction", null)
                        } else
                            r.is(n.inputChangeSelector) ? (i = r.data("method"),
                                o = r.data("url"),
                                a = r.serialize(),
                                r.data("params") && (a = a + "&" + r.data("params"))) : r.is(n.buttonClickSelector) ? (i = r.data("method") || "get",
                                    o = r.data("url"),
                                    a = r.serialize(),
                                    r.data("params") && (a = a + "&" + r.data("params"))) : (i = r.data("method"),
                                        o = n.href(r),
                                        a = r.data("params") || null);
                        return u = {
                            type: i || "GET",
                            data: a,
                            dataType: l,
                            beforeSend: function (e, i) {
                                if (i.dataType === t && e.setRequestHeader("accept", "*/*;q=0.5, " + i.accepts.script),
                                    !n.fire(r, "ajax:beforeSend", [e, i]))
                                    return !1;
                                r.trigger("ajax:send", e)
                            },
                            success: function (e, t, n) {
                                r.trigger("ajax:success", [e, t, n])
                            },
                            complete: function (e, t) {
                                r.trigger("ajax:complete", [e, t])
                            },
                            error: function (e, t, n) {
                                r.trigger("ajax:error", [e, t, n])
                            },
                            crossDomain: n.isCrossDomain(o)
                        },
                            s && (u.xhrFields = {
                                withCredentials: s
                            }),
                            o && (u.url = o),
                            n.ajax(u)
                    }
                    return !1
                },
                isCrossDomain: function (e) {
                    var t = document.createElement("a");
                    t.href = location.href;
                    var n = document.createElement("a");
                    try {
                        return n.href = e,
                            n.href = n.href,
                            !((!n.protocol || ":" === n.protocol) && !n.host || t.protocol + "//" + t.host == n.protocol + "//" + n.host)
                    } catch (e) {
                        return !0
                    }
                },
                handleMethod: function (r) {
                    var i = n.href(r)
                        , o = r.data("method")
                        , a = r.attr("target")
                        , s = n.csrfToken()
                        , l = n.csrfParam()
                        , u = e('<form method="post" action="' + i + '"></form>')
                        , c = '<input name="_method" value="' + o + '" type="hidden" />';
                    l === t || s === t || n.isCrossDomain(i) || (c += '<input name="' + l + '" value="' + s + '" type="hidden" />'),
                        a && u.attr("target", a),
                        u.hide().append(c).appendTo("body"),
                        u.submit()
                },
                formElements: function (t, n) {
                    return t.is("form") ? e(t[0].elements).filter(n) : t.find(n)
                },
                disableFormElements: function (t) {
                    n.formElements(t, n.disableSelector).each((function () {
                        n.disableFormElement(e(this))
                    }
                    ))
                },
                disableFormElement: function (e) {
                    var n, r;
                    n = e.is("button") ? "html" : "val",
                        (r = e.data("disable-with")) !== t && (e.data("ujs:enable-with", e[n]()),
                            e[n](r)),
                        e.prop("disabled", !0),
                        e.data("ujs:disabled", !0)
                },
                enableFormElements: function (t) {
                    n.formElements(t, n.enableSelector).each((function () {
                        n.enableFormElement(e(this))
                    }
                    ))
                },
                enableFormElement: function (e) {
                    var n = e.is("button") ? "html" : "val";
                    e.data("ujs:enable-with") !== t && (e[n](e.data("ujs:enable-with")),
                        e.removeData("ujs:enable-with")),
                        e.prop("disabled", !1),
                        e.removeData("ujs:disabled")
                },
                allowAction: function (e) {
                    var t, r = e.data("confirm"), i = !1;
                    if (!r)
                        return !0;
                    if (n.fire(e, "confirm")) {
                        try {
                            i = n.confirm(r)
                        } catch (e) {
                            (console.error || console.log).call(console, e.stack || e)
                        }
                        t = n.fire(e, "confirm:complete", [i])
                    }
                    return i && t
                },
                blankInputs: function (t, n, r) {
                    var i, o, a, s = e(), l = n || "input,textarea", u = t.find(l), c = {};
                    return u.each((function () {
                        (i = e(this)).is("input[type=radio]") ? (a = i.attr("name"),
                            c[a] || (0 === t.find('input[type=radio]:checked[name="' + a + '"]').length && (o = t.find('input[type=radio][name="' + a + '"]'),
                                s = s.add(o)),
                                c[a] = a)) : (i.is("input[type=checkbox],input[type=radio]") ? i.is(":checked") : !!i.val()) === r && (s = s.add(i))
                    }
                    )),
                        !!s.length && s
                },
                nonBlankInputs: function (e, t) {
                    return n.blankInputs(e, t, !0)
                },
                stopEverything: function (t) {
                    return e(t.target).trigger("ujs:everythingStopped"),
                        t.stopImmediatePropagation(),
                        !1
                },
                disableElement: function (e) {
                    var r = e.data("disable-with");
                    r !== t && (e.data("ujs:enable-with", e.html()),
                        e.html(r)),
                        e.on("click.railsDisable", (function (e) {
                            return n.stopEverything(e)
                        }
                        )),
                        e.data("ujs:disabled", !0)
                },
                enableElement: function (e) {
                    e.data("ujs:enable-with") !== t && (e.html(e.data("ujs:enable-with")),
                        e.removeData("ujs:enable-with")),
                        e.off("click.railsDisable"),
                        e.removeData("ujs:disabled")
                }
            },
                n.fire(r, "rails:attachBindings") && (e.ajaxPrefilter((function (e, t, r) {
                    e.crossDomain || n.CSRFProtection(r)
                }
                )),
                    e(window).on("pageshow.rails", (function () {
                        e(e.rails.enableSelector).each((function () {
                            var t = e(this);
                            t.data("ujs:disabled") && e.rails.enableFormElement(t)
                        }
                        )),
                            e(e.rails.linkDisableSelector).each((function () {
                                var t = e(this);
                                t.data("ujs:disabled") && e.rails.enableElement(t)
                            }
                            ))
                    }
                    )),
                    r.on("ajax:complete", n.linkDisableSelector, (function () {
                        n.enableElement(e(this))
                    }
                    )),
                    r.on("ajax:complete", n.buttonDisableSelector, (function () {
                        n.enableFormElement(e(this))
                    }
                    )),
                    r.on("click.rails", n.linkClickSelector, (function (t) {
                        var r = e(this)
                            , i = r.data("method")
                            , o = r.data("params")
                            , a = t.metaKey || t.ctrlKey;
                        if (!n.allowAction(r))
                            return n.stopEverything(t);
                        if (!a && r.is(n.linkDisableSelector) && n.disableElement(r),
                            n.isRemote(r)) {
                            if (a && (!i || "GET" === i) && !o)
                                return !0;
                            var s = n.handleRemote(r);
                            return !1 === s ? n.enableElement(r) : s.fail((function () {
                                n.enableElement(r)
                            }
                            )),
                                !1
                        }
                        return i ? (n.handleMethod(r),
                            !1) : void 0
                    }
                    )),
                    r.on("click.rails", n.buttonClickSelector, (function (t) {
                        var r = e(this);
                        if (!n.allowAction(r) || !n.isRemote(r))
                            return n.stopEverything(t);
                        r.is(n.buttonDisableSelector) && n.disableFormElement(r);
                        var i = n.handleRemote(r);
                        return !1 === i ? n.enableFormElement(r) : i.fail((function () {
                            n.enableFormElement(r)
                        }
                        )),
                            !1
                    }
                    )),
                    r.on("change.rails", n.inputChangeSelector, (function (t) {
                        var r = e(this);
                        return n.allowAction(r) && n.isRemote(r) ? (n.handleRemote(r),
                            !1) : n.stopEverything(t)
                    }
                    )),
                    r.on("submit.rails", n.formSubmitSelector, (function (r) {
                        var i, o, a = e(this), s = n.isRemote(a);
                        if (!n.allowAction(a))
                            return n.stopEverything(r);
                        if (a.attr("novalidate") === t)
                            if (a.data("ujs:formnovalidate-button") === t) {
                                if ((i = n.blankInputs(a, n.requiredInputSelector, !1)) && n.fire(a, "ajax:aborted:required", [i]))
                                    return n.stopEverything(r)
                            } else
                                a.data("ujs:formnovalidate-button", t);
                        if (s) {
                            if (o = n.nonBlankInputs(a, n.fileInputSelector)) {
                                setTimeout((function () {
                                    n.disableFormElements(a)
                                }
                                ), 13);
                                var l = n.fire(a, "ajax:aborted:file", [o]);
                                return l || setTimeout((function () {
                                    n.enableFormElements(a)
                                }
                                ), 13),
                                    l
                            }
                            return n.handleRemote(a),
                                !1
                        }
                        setTimeout((function () {
                            n.disableFormElements(a)
                        }
                        ), 13)
                    }
                    )),
                    r.on("click.rails", n.formInputClickSelector, (function (t) {
                        var r = e(this);
                        if (!n.allowAction(r))
                            return n.stopEverything(t);
                        var i = r.attr("name")
                            , o = i ? {
                                name: i,
                                value: r.val()
                            } : null
                            , a = r.closest("form");
                        0 === a.length && (a = e("#" + r.attr("form"))),
                            a.data("ujs:submit-button", o),
                            a.data("ujs:formnovalidate-button", r.attr("formnovalidate")),
                            a.data("ujs:submit-button-formaction", r.attr("formaction")),
                            a.data("ujs:submit-button-formmethod", r.attr("formmethod"))
                    }
                    )),
                    r.on("ajax:send.rails", n.formSubmitSelector, (function (t) {
                        this === t.target && n.disableFormElements(e(this))
                    }
                    )),
                    r.on("ajax:complete.rails", n.formSubmitSelector, (function (t) {
                        this === t.target && n.enableFormElements(e(this))
                    }
                    )),
                    e((function () {
                        n.refreshCSRFTokens()
                    }
                    )))
        };
        window.jQuery ? e(jQuery) : "object" == typeof exports && "object" == typeof module && (module.exports = e)
    }(),
    function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e(jQuery)
    }((function (e) {
        e.ui = e.ui || {},
            e.ui.version = "1.12.1";
        var t = "ui-effects-"
            , n = "ui-effects-style"
            , r = "ui-effects-animated"
            , i = e;
        e.effects = {
            effect: {}
        },
            function (e, t) {
                function n(e, t, n) {
                    var r = f[t.type] || {};
                    return null == e ? n || !t.def ? null : t.def : (e = r.floor ? ~~e : parseFloat(e),
                        isNaN(e) ? t.def : r.mod ? (e + r.mod) % r.mod : 0 > e ? 0 : e > r.max ? r.max : e)
                }
                function r(n) {
                    var r = u()
                        , i = r._rgba = [];
                    return n = n.toLowerCase(),
                        h(l, (function (e, o) {
                            var a, s = o.re.exec(n), l = s && o.parse(s), u = o.space || "rgba";
                            return l ? (a = r[u](l),
                                r[c[u].cache] = a[c[u].cache],
                                i = r._rgba = a._rgba,
                                !1) : t
                        }
                        )),
                        i.length ? ("0,0,0,0" === i.join() && e.extend(i, o.transparent),
                            r) : o[n]
                }
                function i(e, t, n) {
                    return 1 > 6 * (n = (n + 1) % 1) ? e + 6 * (t - e) * n : 1 > 2 * n ? t : 2 > 3 * n ? e + 6 * (t - e) * (2 / 3 - n) : e
                }
                var o, a = "backgroundColor borderBottomColor borderLeftColor borderRightColor borderTopColor color columnRuleColor outlineColor textDecorationColor textEmphasisColor", s = /^([\-+])=\s*(\d+\.?\d*)/, l = [{
                    re: /rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function (e) {
                        return [e[1], e[2], e[3], e[4]]
                    }
                }, {
                    re: /rgba?\(\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    parse: function (e) {
                        return [2.55 * e[1], 2.55 * e[2], 2.55 * e[3], e[4]]
                    }
                }, {
                    re: /#([a-f0-9]{2})([a-f0-9]{2})([a-f0-9]{2})/,
                    parse: function (e) {
                        return [parseInt(e[1], 16), parseInt(e[2], 16), parseInt(e[3], 16)]
                    }
                }, {
                    re: /#([a-f0-9])([a-f0-9])([a-f0-9])/,
                    parse: function (e) {
                        return [parseInt(e[1] + e[1], 16), parseInt(e[2] + e[2], 16), parseInt(e[3] + e[3], 16)]
                    }
                }, {
                    re: /hsla?\(\s*(\d+(?:\.\d+)?)\s*,\s*(\d+(?:\.\d+)?)\%\s*,\s*(\d+(?:\.\d+)?)\%\s*(?:,\s*(\d?(?:\.\d+)?)\s*)?\)/,
                    space: "hsla",
                    parse: function (e) {
                        return [e[1], e[2] / 100, e[3] / 100, e[4]]
                    }
                }], u = e.Color = function (t, n, r, i) {
                    return new e.Color.fn.parse(t, n, r, i)
                }
                    , c = {
                        rgba: {
                            props: {
                                red: {
                                    idx: 0,
                                    type: "byte"
                                },
                                green: {
                                    idx: 1,
                                    type: "byte"
                                },
                                blue: {
                                    idx: 2,
                                    type: "byte"
                                }
                            }
                        },
                        hsla: {
                            props: {
                                hue: {
                                    idx: 0,
                                    type: "degrees"
                                },
                                saturation: {
                                    idx: 1,
                                    type: "percent"
                                },
                                lightness: {
                                    idx: 2,
                                    type: "percent"
                                }
                            }
                        }
                    }, f = {
                        byte: {
                            floor: !0,
                            max: 255
                        },
                        percent: {
                            max: 1
                        },
                        degrees: {
                            mod: 360,
                            floor: !0
                        }
                    }, d = u.support = {}, p = e("<p>")[0], h = e.each;
                p.style.cssText = "background-color:rgba(1,1,1,.5)",
                    d.rgba = p.style.backgroundColor.indexOf("rgba") > -1,
                    h(c, (function (e, t) {
                        t.cache = "_" + e,
                            t.props.alpha = {
                                idx: 3,
                                type: "percent",
                                def: 1
                            }
                    }
                    )),
                    u.fn = e.extend(u.prototype, {
                        parse: function (i, a, s, l) {
                            if (i === t)
                                return this._rgba = [null, null, null, null],
                                    this;
                            (i.jquery || i.nodeType) && (i = e(i).css(a),
                                a = t);
                            var f = this
                                , d = e.type(i)
                                , p = this._rgba = [];
                            return a !== t && (i = [i, a, s, l],
                                d = "array"),
                                "string" === d ? this.parse(r(i) || o._default) : "array" === d ? (h(c.rgba.props, (function (e, t) {
                                    p[t.idx] = n(i[t.idx], t)
                                }
                                )),
                                    this) : "object" === d ? (h(c, i instanceof u ? function (e, t) {
                                        i[t.cache] && (f[t.cache] = i[t.cache].slice())
                                    }
                                        : function (t, r) {
                                            var o = r.cache;
                                            h(r.props, (function (e, t) {
                                                if (!f[o] && r.to) {
                                                    if ("alpha" === e || null == i[e])
                                                        return;
                                                    f[o] = r.to(f._rgba)
                                                }
                                                f[o][t.idx] = n(i[e], t, !0)
                                            }
                                            )),
                                                f[o] && 0 > e.inArray(null, f[o].slice(0, 3)) && (f[o][3] = 1,
                                                    r.from && (f._rgba = r.from(f[o])))
                                        }
                                    ),
                                        this) : t
                        },
                        is: function (e) {
                            var n = u(e)
                                , r = !0
                                , i = this;
                            return h(c, (function (e, o) {
                                var a, s = n[o.cache];
                                return s && (a = i[o.cache] || o.to && o.to(i._rgba) || [],
                                    h(o.props, (function (e, n) {
                                        return null != s[n.idx] ? r = s[n.idx] === a[n.idx] : t
                                    }
                                    ))),
                                    r
                            }
                            )),
                                r
                        },
                        _space: function () {
                            var e = []
                                , t = this;
                            return h(c, (function (n, r) {
                                t[r.cache] && e.push(n)
                            }
                            )),
                                e.pop()
                        },
                        transition: function (e, t) {
                            var r = u(e)
                                , i = r._space()
                                , o = c[i]
                                , a = 0 === this.alpha() ? u("transparent") : this
                                , s = a[o.cache] || o.to(a._rgba)
                                , l = s.slice();
                            return r = r[o.cache],
                                h(o.props, (function (e, i) {
                                    var o = i.idx
                                        , a = s[o]
                                        , u = r[o]
                                        , c = f[i.type] || {};
                                    null !== u && (null === a ? l[o] = u : (c.mod && (u - a > c.mod / 2 ? a += c.mod : a - u > c.mod / 2 && (a -= c.mod)),
                                        l[o] = n((u - a) * t + a, i)))
                                }
                                )),
                                this[i](l)
                        },
                        blend: function (t) {
                            if (1 === this._rgba[3])
                                return this;
                            var n = this._rgba.slice()
                                , r = n.pop()
                                , i = u(t)._rgba;
                            return u(e.map(n, (function (e, t) {
                                return (1 - r) * i[t] + r * e
                            }
                            )))
                        },
                        toRgbaString: function () {
                            var t = "rgba("
                                , n = e.map(this._rgba, (function (e, t) {
                                    return null == e ? t > 2 ? 1 : 0 : e
                                }
                                ));
                            return 1 === n[3] && (n.pop(),
                                t = "rgb("),
                                t + n.join() + ")"
                        },
                        toHslaString: function () {
                            var t = "hsla("
                                , n = e.map(this.hsla(), (function (e, t) {
                                    return null == e && (e = t > 2 ? 1 : 0),
                                        t && 3 > t && (e = Math.round(100 * e) + "%"),
                                        e
                                }
                                ));
                            return 1 === n[3] && (n.pop(),
                                t = "hsl("),
                                t + n.join() + ")"
                        },
                        toHexString: function (t) {
                            var n = this._rgba.slice()
                                , r = n.pop();
                            return t && n.push(~~(255 * r)),
                                "#" + e.map(n, (function (e) {
                                    return 1 === (e = (e || 0).toString(16)).length ? "0" + e : e
                                }
                                )).join("")
                        },
                        toString: function () {
                            return 0 === this._rgba[3] ? "transparent" : this.toRgbaString()
                        }
                    }),
                    u.fn.parse.prototype = u.fn,
                    c.hsla.to = function (e) {
                        if (null == e[0] || null == e[1] || null == e[2])
                            return [null, null, null, e[3]];
                        var t, n, r = e[0] / 255, i = e[1] / 255, o = e[2] / 255, a = e[3], s = Math.max(r, i, o), l = Math.min(r, i, o), u = s - l, c = s + l, f = .5 * c;
                        return t = l === s ? 0 : r === s ? 60 * (i - o) / u + 360 : i === s ? 60 * (o - r) / u + 120 : 60 * (r - i) / u + 240,
                            n = 0 === u ? 0 : .5 >= f ? u / c : u / (2 - c),
                            [Math.round(t) % 360, n, f, null == a ? 1 : a]
                    }
                    ,
                    c.hsla.from = function (e) {
                        if (null == e[0] || null == e[1] || null == e[2])
                            return [null, null, null, e[3]];
                        var t = e[0] / 360
                            , n = e[1]
                            , r = e[2]
                            , o = e[3]
                            , a = .5 >= r ? r * (1 + n) : r + n - r * n
                            , s = 2 * r - a;
                        return [Math.round(255 * i(s, a, t + 1 / 3)), Math.round(255 * i(s, a, t)), Math.round(255 * i(s, a, t - 1 / 3)), o]
                    }
                    ,
                    h(c, (function (r, i) {
                        var o = i.props
                            , a = i.cache
                            , l = i.to
                            , c = i.from;
                        u.fn[r] = function (r) {
                            if (l && !this[a] && (this[a] = l(this._rgba)),
                                r === t)
                                return this[a].slice();
                            var i, s = e.type(r), f = "array" === s || "object" === s ? r : arguments, d = this[a].slice();
                            return h(o, (function (e, t) {
                                var r = f["object" === s ? e : t.idx];
                                null == r && (r = d[t.idx]),
                                    d[t.idx] = n(r, t)
                            }
                            )),
                                c ? ((i = u(c(d)))[a] = d,
                                    i) : u(d)
                        }
                            ,
                            h(o, (function (t, n) {
                                u.fn[t] || (u.fn[t] = function (i) {
                                    var o, a = e.type(i), l = "alpha" === t ? this._hsla ? "hsla" : "rgba" : r, u = this[l](), c = u[n.idx];
                                    return "undefined" === a ? c : ("function" === a && (i = i.call(this, c),
                                        a = e.type(i)),
                                        null == i && n.empty ? this : ("string" === a && ((o = s.exec(i)) && (i = c + parseFloat(o[2]) * ("+" === o[1] ? 1 : -1))),
                                            u[n.idx] = i,
                                            this[l](u)))
                                }
                                )
                            }
                            ))
                    }
                    )),
                    u.hook = function (t) {
                        var n = t.split(" ");
                        h(n, (function (t, n) {
                            e.cssHooks[n] = {
                                set: function (t, i) {
                                    var o, a, s = "";
                                    if ("transparent" !== i && ("string" !== e.type(i) || (o = r(i)))) {
                                        if (i = u(o || i),
                                            !d.rgba && 1 !== i._rgba[3]) {
                                            for (a = "backgroundColor" === n ? t.parentNode : t; ("" === s || "transparent" === s) && a && a.style;)
                                                try {
                                                    s = e.css(a, "backgroundColor"),
                                                        a = a.parentNode
                                                } catch (e) { }
                                            i = i.blend(s && "transparent" !== s ? s : "_default")
                                        }
                                        i = i.toRgbaString()
                                    }
                                    try {
                                        t.style[n] = i
                                    } catch (e) { }
                                }
                            },
                                e.fx.step[n] = function (t) {
                                    t.colorInit || (t.start = u(t.elem, n),
                                        t.end = u(t.end),
                                        t.colorInit = !0),
                                        e.cssHooks[n].set(t.elem, t.start.transition(t.end, t.pos))
                                }
                        }
                        ))
                    }
                    ,
                    u.hook(a),
                    e.cssHooks.borderColor = {
                        expand: function (e) {
                            var t = {};
                            return h(["Top", "Right", "Bottom", "Left"], (function (n, r) {
                                t["border" + r + "Color"] = e
                            }
                            )),
                                t
                        }
                    },
                    o = e.Color.names = {
                        aqua: "#00ffff",
                        black: "#000000",
                        blue: "#0000ff",
                        fuchsia: "#ff00ff",
                        gray: "#808080",
                        green: "#008000",
                        lime: "#00ff00",
                        maroon: "#800000",
                        navy: "#000080",
                        olive: "#808000",
                        purple: "#800080",
                        red: "#ff0000",
                        silver: "#c0c0c0",
                        teal: "#008080",
                        white: "#ffffff",
                        yellow: "#ffff00",
                        transparent: [null, null, null, 0],
                        _default: "#ffffff"
                    }
            }(i),
            function () {
                function t(t) {
                    var n, r, i = t.ownerDocument.defaultView ? t.ownerDocument.defaultView.getComputedStyle(t, null) : t.currentStyle, o = {};
                    if (i && i.length && i[0] && i[i[0]])
                        for (r = i.length; r--;)
                            "string" == typeof i[n = i[r]] && (o[e.camelCase(n)] = i[n]);
                    else
                        for (n in i)
                            "string" == typeof i[n] && (o[n] = i[n]);
                    return o
                }
                function n(t, n) {
                    var r, i, a = {};
                    for (r in n)
                        i = n[r],
                            t[r] !== i && (o[r] || (e.fx.step[r] || !isNaN(parseFloat(i))) && (a[r] = i));
                    return a
                }
                var r = ["add", "remove", "toggle"]
                    , o = {
                        border: 1,
                        borderBottom: 1,
                        borderColor: 1,
                        borderLeft: 1,
                        borderRight: 1,
                        borderTop: 1,
                        borderWidth: 1,
                        margin: 1,
                        padding: 1
                    };
                e.each(["borderLeftStyle", "borderRightStyle", "borderBottomStyle", "borderTopStyle"], (function (t, n) {
                    e.fx.step[n] = function (e) {
                        ("none" !== e.end && !e.setAttr || 1 === e.pos && !e.setAttr) && (i.style(e.elem, n, e.end),
                            e.setAttr = !0)
                    }
                }
                )),
                    e.fn.addBack || (e.fn.addBack = function (e) {
                        return this.add(null == e ? this.prevObject : this.prevObject.filter(e))
                    }
                    ),
                    e.effects.animateClass = function (i, o, a, s) {
                        var l = e.speed(o, a, s);
                        return this.queue((function () {
                            var o, a = e(this), s = a.attr("class") || "", u = l.children ? a.find("*").addBack() : a;
                            u = u.map((function () {
                                return {
                                    el: e(this),
                                    start: t(this)
                                }
                            }
                            )),
                                o = function () {
                                    e.each(r, (function (e, t) {
                                        i[t] && a[t + "Class"](i[t])
                                    }
                                    ))
                                }
                                ,
                                o(),
                                u = u.map((function () {
                                    return this.end = t(this.el[0]),
                                        this.diff = n(this.start, this.end),
                                        this
                                }
                                )),
                                a.attr("class", s),
                                u = u.map((function () {
                                    var t = this
                                        , n = e.Deferred()
                                        , r = e.extend({}, l, {
                                            queue: !1,
                                            complete: function () {
                                                n.resolve(t)
                                            }
                                        });
                                    return this.el.animate(this.diff, r),
                                        n.promise()
                                }
                                )),
                                e.when.apply(e, u.get()).done((function () {
                                    o(),
                                        e.each(arguments, (function () {
                                            var t = this.el;
                                            e.each(this.diff, (function (e) {
                                                t.css(e, "")
                                            }
                                            ))
                                        }
                                        )),
                                        l.complete.call(a[0])
                                }
                                ))
                        }
                        ))
                    }
                    ,
                    e.fn.extend({
                        addClass: function (t) {
                            return function (n, r, i, o) {
                                return r ? e.effects.animateClass.call(this, {
                                    add: n
                                }, r, i, o) : t.apply(this, arguments)
                            }
                        }(e.fn.addClass),
                        removeClass: function (t) {
                            return function (n, r, i, o) {
                                return arguments.length > 1 ? e.effects.animateClass.call(this, {
                                    remove: n
                                }, r, i, o) : t.apply(this, arguments)
                            }
                        }(e.fn.removeClass),
                        toggleClass: function (t) {
                            return function (n, r, i, o, a) {
                                return "boolean" == typeof r || void 0 === r ? i ? e.effects.animateClass.call(this, r ? {
                                    add: n
                                } : {
                                    remove: n
                                }, i, o, a) : t.apply(this, arguments) : e.effects.animateClass.call(this, {
                                    toggle: n
                                }, r, i, o)
                            }
                        }(e.fn.toggleClass),
                        switchClass: function (t, n, r, i, o) {
                            return e.effects.animateClass.call(this, {
                                add: n,
                                remove: t
                            }, r, i, o)
                        }
                    })
            }(),
            function () {
                function i(t, n, r, i) {
                    return e.isPlainObject(t) && (n = t,
                        t = t.effect),
                        t = {
                            effect: t
                        },
                        null == n && (n = {}),
                        e.isFunction(n) && (i = n,
                            r = null,
                            n = {}),
                        ("number" == typeof n || e.fx.speeds[n]) && (i = r,
                            r = n,
                            n = {}),
                        e.isFunction(r) && (i = r,
                            r = null),
                        n && e.extend(t, n),
                        r = r || n.duration,
                        t.duration = e.fx.off ? 0 : "number" == typeof r ? r : r in e.fx.speeds ? e.fx.speeds[r] : e.fx.speeds._default,
                        t.complete = i || n.complete,
                        t
                }
                function o(t) {
                    return !(t && "number" != typeof t && !e.fx.speeds[t]) || ("string" == typeof t && !e.effects.effect[t] || (!!e.isFunction(t) || "object" == typeof t && !t.effect))
                }
                function a(e, t) {
                    var n = t.outerWidth()
                        , r = t.outerHeight()
                        , i = /^rect\((-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto),?\s*(-?\d*\.?\d*px|-?\d+%|auto)\)$/.exec(e) || ["", 0, n, r, 0];
                    return {
                        top: parseFloat(i[1]) || 0,
                        right: "auto" === i[2] ? n : parseFloat(i[2]),
                        bottom: "auto" === i[3] ? r : parseFloat(i[3]),
                        left: parseFloat(i[4]) || 0
                    }
                }
                e.expr && e.expr.filters && e.expr.filters.animated && (e.expr.filters.animated = function (t) {
                    return function (n) {
                        return !!e(n).data(r) || t(n)
                    }
                }(e.expr.filters.animated)),
                    !1 !== e.uiBackCompat && e.extend(e.effects, {
                        save: function (e, n) {
                            for (var r = 0, i = n.length; i > r; r++)
                                null !== n[r] && e.data(t + n[r], e[0].style[n[r]])
                        },
                        restore: function (e, n) {
                            for (var r, i = 0, o = n.length; o > i; i++)
                                null !== n[i] && (r = e.data(t + n[i]),
                                    e.css(n[i], r))
                        },
                        setMode: function (e, t) {
                            return "toggle" === t && (t = e.is(":hidden") ? "show" : "hide"),
                                t
                        },
                        createWrapper: function (t) {
                            if (t.parent().is(".ui-effects-wrapper"))
                                return t.parent();
                            var n = {
                                width: t.outerWidth(!0),
                                height: t.outerHeight(!0),
                                float: t.css("float")
                            }
                                , r = e("<div></div>").addClass("ui-effects-wrapper").css({
                                    fontSize: "100%",
                                    background: "transparent",
                                    border: "none",
                                    margin: 0,
                                    padding: 0
                                })
                                , i = {
                                    width: t.width(),
                                    height: t.height()
                                }
                                , o = document.activeElement;
                            try {
                                o.id
                            } catch (e) {
                                o = document.body
                            }
                            return t.wrap(r),
                                (t[0] === o || e.contains(t[0], o)) && e(o).trigger("focus"),
                                r = t.parent(),
                                "static" === t.css("position") ? (r.css({
                                    position: "relative"
                                }),
                                    t.css({
                                        position: "relative"
                                    })) : (e.extend(n, {
                                        position: t.css("position"),
                                        zIndex: t.css("z-index")
                                    }),
                                        e.each(["top", "left", "bottom", "right"], (function (e, r) {
                                            n[r] = t.css(r),
                                                isNaN(parseInt(n[r], 10)) && (n[r] = "auto")
                                        }
                                        )),
                                        t.css({
                                            position: "relative",
                                            top: 0,
                                            left: 0,
                                            right: "auto",
                                            bottom: "auto"
                                        })),
                                t.css(i),
                                r.css(n).show()
                        },
                        removeWrapper: function (t) {
                            var n = document.activeElement;
                            return t.parent().is(".ui-effects-wrapper") && (t.parent().replaceWith(t),
                                (t[0] === n || e.contains(t[0], n)) && e(n).trigger("focus")),
                                t
                        }
                    }),
                    e.extend(e.effects, {
                        version: "1.12.1",
                        define: function (t, n, r) {
                            return r || (r = n,
                                n = "effect"),
                                e.effects.effect[t] = r,
                                e.effects.effect[t].mode = n,
                                r
                        },
                        scaledDimensions: function (e, t, n) {
                            if (0 === t)
                                return {
                                    height: 0,
                                    width: 0,
                                    outerHeight: 0,
                                    outerWidth: 0
                                };
                            var r = "horizontal" !== n ? (t || 100) / 100 : 1
                                , i = "vertical" !== n ? (t || 100) / 100 : 1;
                            return {
                                height: e.height() * i,
                                width: e.width() * r,
                                outerHeight: e.outerHeight() * i,
                                outerWidth: e.outerWidth() * r
                            }
                        },
                        clipToBox: function (e) {
                            return {
                                width: e.clip.right - e.clip.left,
                                height: e.clip.bottom - e.clip.top,
                                left: e.clip.left,
                                top: e.clip.top
                            }
                        },
                        unshift: function (e, t, n) {
                            var r = e.queue();
                            t > 1 && r.splice.apply(r, [1, 0].concat(r.splice(t, n))),
                                e.dequeue()
                        },
                        saveStyle: function (e) {
                            e.data(n, e[0].style.cssText)
                        },
                        restoreStyle: function (e) {
                            e[0].style.cssText = e.data(n) || "",
                                e.removeData(n)
                        },
                        mode: function (e, t) {
                            var n = e.is(":hidden");
                            return "toggle" === t && (t = n ? "show" : "hide"),
                                (n ? "hide" === t : "show" === t) && (t = "none"),
                                t
                        },
                        getBaseline: function (e, t) {
                            var n, r;
                            switch (e[0]) {
                                case "top":
                                    n = 0;
                                    break;
                                case "middle":
                                    n = .5;
                                    break;
                                case "bottom":
                                    n = 1;
                                    break;
                                default:
                                    n = e[0] / t.height
                            }
                            switch (e[1]) {
                                case "left":
                                    r = 0;
                                    break;
                                case "center":
                                    r = .5;
                                    break;
                                case "right":
                                    r = 1;
                                    break;
                                default:
                                    r = e[1] / t.width
                            }
                            return {
                                x: r,
                                y: n
                            }
                        },
                        createPlaceholder: function (n) {
                            var r, i = n.css("position"), o = n.position();
                            return n.css({
                                marginTop: n.css("marginTop"),
                                marginBottom: n.css("marginBottom"),
                                marginLeft: n.css("marginLeft"),
                                marginRight: n.css("marginRight")
                            }).outerWidth(n.outerWidth()).outerHeight(n.outerHeight()),
                                /^(static|relative)/.test(i) && (i = "absolute",
                                    r = e("<" + n[0].nodeName + ">").insertAfter(n).css({
                                        display: /^(inline|ruby)/.test(n.css("display")) ? "inline-block" : "block",
                                        visibility: "hidden",
                                        marginTop: n.css("marginTop"),
                                        marginBottom: n.css("marginBottom"),
                                        marginLeft: n.css("marginLeft"),
                                        marginRight: n.css("marginRight"),
                                        float: n.css("float")
                                    }).outerWidth(n.outerWidth()).outerHeight(n.outerHeight()).addClass("ui-effects-placeholder"),
                                    n.data(t + "placeholder", r)),
                                n.css({
                                    position: i,
                                    left: o.left,
                                    top: o.top
                                }),
                                r
                        },
                        removePlaceholder: function (e) {
                            var n = t + "placeholder"
                                , r = e.data(n);
                            r && (r.remove(),
                                e.removeData(n))
                        },
                        cleanUp: function (t) {
                            e.effects.restoreStyle(t),
                                e.effects.removePlaceholder(t)
                        },
                        setTransition: function (t, n, r, i) {
                            return i = i || {},
                                e.each(n, (function (e, n) {
                                    var o = t.cssUnit(n);
                                    o[0] > 0 && (i[n] = o[0] * r + o[1])
                                }
                                )),
                                i
                        }
                    }),
                    e.fn.extend({
                        effect: function () {
                            function t(t) {
                                function i() {
                                    l.removeData(r),
                                        e.effects.cleanUp(l),
                                        "hide" === n.mode && l.hide(),
                                        s()
                                }
                                function s() {
                                    e.isFunction(u) && u.call(l[0]),
                                        e.isFunction(t) && t()
                                }
                                var l = e(this);
                                n.mode = f.shift(),
                                    !1 === e.uiBackCompat || a ? "none" === n.mode ? (l[c](),
                                        s()) : o.call(l[0], n, i) : (l.is(":hidden") ? "hide" === c : "show" === c) ? (l[c](),
                                            s()) : o.call(l[0], n, s)
                            }
                            var n = i.apply(this, arguments)
                                , o = e.effects.effect[n.effect]
                                , a = o.mode
                                , s = n.queue
                                , l = s || "fx"
                                , u = n.complete
                                , c = n.mode
                                , f = []
                                , d = function (t) {
                                    var n = e(this)
                                        , i = e.effects.mode(n, c) || a;
                                    n.data(r, !0),
                                        f.push(i),
                                        a && ("show" === i || i === a && "hide" === i) && n.show(),
                                        a && "none" === i || e.effects.saveStyle(n),
                                        e.isFunction(t) && t()
                                };
                            return e.fx.off || !o ? c ? this[c](n.duration, u) : this.each((function () {
                                u && u.call(this)
                            }
                            )) : !1 === s ? this.each(d).each(t) : this.queue(l, d).queue(l, t)
                        },
                        show: function (e) {
                            return function (t) {
                                if (o(t))
                                    return e.apply(this, arguments);
                                var n = i.apply(this, arguments);
                                return n.mode = "show",
                                    this.effect.call(this, n)
                            }
                        }(e.fn.show),
                        hide: function (e) {
                            return function (t) {
                                if (o(t))
                                    return e.apply(this, arguments);
                                var n = i.apply(this, arguments);
                                return n.mode = "hide",
                                    this.effect.call(this, n)
                            }
                        }(e.fn.hide),
                        toggle: function (e) {
                            return function (t) {
                                if (o(t) || "boolean" == typeof t)
                                    return e.apply(this, arguments);
                                var n = i.apply(this, arguments);
                                return n.mode = "toggle",
                                    this.effect.call(this, n)
                            }
                        }(e.fn.toggle),
                        cssUnit: function (t) {
                            var n = this.css(t)
                                , r = [];
                            return e.each(["em", "px", "%", "pt"], (function (e, t) {
                                n.indexOf(t) > 0 && (r = [parseFloat(n), t])
                            }
                            )),
                                r
                        },
                        cssClip: function (e) {
                            return e ? this.css("clip", "rect(" + e.top + "px " + e.right + "px " + e.bottom + "px " + e.left + "px)") : a(this.css("clip"), this)
                        },
                        transfer: function (t, n) {
                            var r = e(this)
                                , i = e(t.to)
                                , o = "fixed" === i.css("position")
                                , a = e("body")
                                , s = o ? a.scrollTop() : 0
                                , l = o ? a.scrollLeft() : 0
                                , u = i.offset()
                                , c = {
                                    top: u.top - s,
                                    left: u.left - l,
                                    height: i.innerHeight(),
                                    width: i.innerWidth()
                                }
                                , f = r.offset()
                                , d = e("<div class='ui-effects-transfer'></div>").appendTo("body").addClass(t.className).css({
                                    top: f.top - s,
                                    left: f.left - l,
                                    height: r.innerHeight(),
                                    width: r.innerWidth(),
                                    position: o ? "fixed" : "absolute"
                                }).animate(c, t.duration, t.easing, (function () {
                                    d.remove(),
                                        e.isFunction(n) && n()
                                }
                                ))
                        }
                    }),
                    e.fx.step.clip = function (t) {
                        t.clipInit || (t.start = e(t.elem).cssClip(),
                            "string" == typeof t.end && (t.end = a(t.end, t.elem)),
                            t.clipInit = !0),
                            e(t.elem).cssClip({
                                top: t.pos * (t.end.top - t.start.top) + t.start.top,
                                right: t.pos * (t.end.right - t.start.right) + t.start.right,
                                bottom: t.pos * (t.end.bottom - t.start.bottom) + t.start.bottom,
                                left: t.pos * (t.end.left - t.start.left) + t.start.left
                            })
                    }
            }(),
            function () {
                var t = {};
                e.each(["Quad", "Cubic", "Quart", "Quint", "Expo"], (function (e, n) {
                    t[n] = function (t) {
                        return Math.pow(t, e + 2)
                    }
                }
                )),
                    e.extend(t, {
                        Sine: function (e) {
                            return 1 - Math.cos(e * Math.PI / 2)
                        },
                        Circ: function (e) {
                            return 1 - Math.sqrt(1 - e * e)
                        },
                        Elastic: function (e) {
                            return 0 === e || 1 === e ? e : -Math.pow(2, 8 * (e - 1)) * Math.sin((80 * (e - 1) - 7.5) * Math.PI / 15)
                        },
                        Back: function (e) {
                            return e * e * (3 * e - 2)
                        },
                        Bounce: function (e) {
                            for (var t, n = 4; ((t = Math.pow(2, --n)) - 1) / 11 > e;)
                                ;
                            return 1 / Math.pow(4, 3 - n) - 7.5625 * Math.pow((3 * t - 2) / 22 - e, 2)
                        }
                    }),
                    e.each(t, (function (t, n) {
                        e.easing["easeIn" + t] = n,
                            e.easing["easeOut" + t] = function (e) {
                                return 1 - n(1 - e)
                            }
                            ,
                            e.easing["easeInOut" + t] = function (e) {
                                return .5 > e ? n(2 * e) / 2 : 1 - n(-2 * e + 2) / 2
                            }
                    }
                    ))
            }();
        e.effects;
        e.effects.define("blind", "hide", (function (t, n) {
            var r = {
                up: ["bottom", "top"],
                vertical: ["bottom", "top"],
                down: ["top", "bottom"],
                left: ["right", "left"],
                horizontal: ["right", "left"],
                right: ["left", "right"]
            }
                , i = e(this)
                , o = t.direction || "up"
                , a = i.cssClip()
                , s = {
                    clip: e.extend({}, a)
                }
                , l = e.effects.createPlaceholder(i);
            s.clip[r[o][0]] = s.clip[r[o][1]],
                "show" === t.mode && (i.cssClip(s.clip),
                    l && l.css(e.effects.clipToBox(s)),
                    s.clip = a),
                l && l.animate(e.effects.clipToBox(s), t.duration, t.easing),
                i.animate(s, {
                    queue: !1,
                    duration: t.duration,
                    easing: t.easing,
                    complete: n
                })
        }
        )),
            e.effects.define("bounce", (function (t, n) {
                var r, i, o, a = e(this), s = t.mode, l = "hide" === s, u = "show" === s, c = t.direction || "up", f = t.distance, d = t.times || 5, p = 2 * d + (u || l ? 1 : 0), h = t.duration / p, g = t.easing, m = "up" === c || "down" === c ? "top" : "left", v = "up" === c || "left" === c, y = 0, b = a.queue().length;
                for (e.effects.createPlaceholder(a),
                    o = a.css(m),
                    f || (f = a["top" === m ? "outerHeight" : "outerWidth"]() / 3),
                    u && ((i = {
                        opacity: 1
                    })[m] = o,
                        a.css("opacity", 0).css(m, v ? 2 * -f : 2 * f).animate(i, h, g)),
                    l && (f /= Math.pow(2, d - 1)),
                    (i = {})[m] = o; d > y; y++)
                    (r = {})[m] = (v ? "-=" : "+=") + f,
                        a.animate(r, h, g).animate(i, h, g),
                        f = l ? 2 * f : f / 2;
                l && ((r = {
                    opacity: 0
                })[m] = (v ? "-=" : "+=") + f,
                    a.animate(r, h, g)),
                    a.queue(n),
                    e.effects.unshift(a, b, p + 1)
            }
            )),
            e.effects.define("clip", "hide", (function (t, n) {
                var r, i = {}, o = e(this), a = t.direction || "vertical", s = "both" === a, l = s || "horizontal" === a, u = s || "vertical" === a;
                r = o.cssClip(),
                    i.clip = {
                        top: u ? (r.bottom - r.top) / 2 : r.top,
                        right: l ? (r.right - r.left) / 2 : r.right,
                        bottom: u ? (r.bottom - r.top) / 2 : r.bottom,
                        left: l ? (r.right - r.left) / 2 : r.left
                    },
                    e.effects.createPlaceholder(o),
                    "show" === t.mode && (o.cssClip(i.clip),
                        i.clip = r),
                    o.animate(i, {
                        queue: !1,
                        duration: t.duration,
                        easing: t.easing,
                        complete: n
                    })
            }
            )),
            e.effects.define("drop", "hide", (function (t, n) {
                var r, i = e(this), o = "show" === t.mode, a = t.direction || "left", s = "up" === a || "down" === a ? "top" : "left", l = "up" === a || "left" === a ? "-=" : "+=", u = "+=" === l ? "-=" : "+=", c = {
                    opacity: 0
                };
                e.effects.createPlaceholder(i),
                    r = t.distance || i["top" === s ? "outerHeight" : "outerWidth"](!0) / 2,
                    c[s] = l + r,
                    o && (i.css(c),
                        c[s] = u + r,
                        c.opacity = 1),
                    i.animate(c, {
                        queue: !1,
                        duration: t.duration,
                        easing: t.easing,
                        complete: n
                    })
            }
            )),
            e.effects.define("explode", "hide", (function (t, n) {
                function r() {
                    y.push(this),
                        y.length === f * d && i()
                }
                function i() {
                    p.css({
                        visibility: "visible"
                    }),
                        e(y).remove(),
                        n()
                }
                var o, a, s, l, u, c, f = t.pieces ? Math.round(Math.sqrt(t.pieces)) : 3, d = f, p = e(this), h = "show" === t.mode, g = p.show().css("visibility", "hidden").offset(), m = Math.ceil(p.outerWidth() / d), v = Math.ceil(p.outerHeight() / f), y = [];
                for (o = 0; f > o; o++)
                    for (l = g.top + o * v,
                        c = o - (f - 1) / 2,
                        a = 0; d > a; a++)
                        s = g.left + a * m,
                            u = a - (d - 1) / 2,
                            p.clone().appendTo("body").wrap("<div></div>").css({
                                position: "absolute",
                                visibility: "visible",
                                left: -a * m,
                                top: -o * v
                            }).parent().addClass("ui-effects-explode").css({
                                position: "absolute",
                                overflow: "hidden",
                                width: m,
                                height: v,
                                left: s + (h ? u * m : 0),
                                top: l + (h ? c * v : 0),
                                opacity: h ? 0 : 1
                            }).animate({
                                left: s + (h ? 0 : u * m),
                                top: l + (h ? 0 : c * v),
                                opacity: h ? 1 : 0
                            }, t.duration || 500, t.easing, r)
            }
            )),
            e.effects.define("fade", "toggle", (function (t, n) {
                var r = "show" === t.mode;
                e(this).css("opacity", r ? 0 : 1).animate({
                    opacity: r ? 1 : 0
                }, {
                    queue: !1,
                    duration: t.duration,
                    easing: t.easing,
                    complete: n
                })
            }
            )),
            e.effects.define("fold", "hide", (function (t, n) {
                var r = e(this)
                    , i = t.mode
                    , o = "show" === i
                    , a = "hide" === i
                    , s = t.size || 15
                    , l = /([0-9]+)%/.exec(s)
                    , u = !!t.horizFirst ? ["right", "bottom"] : ["bottom", "right"]
                    , c = t.duration / 2
                    , f = e.effects.createPlaceholder(r)
                    , d = r.cssClip()
                    , p = {
                        clip: e.extend({}, d)
                    }
                    , h = {
                        clip: e.extend({}, d)
                    }
                    , g = [d[u[0]], d[u[1]]]
                    , m = r.queue().length;
                l && (s = parseInt(l[1], 10) / 100 * g[a ? 0 : 1]),
                    p.clip[u[0]] = s,
                    h.clip[u[0]] = s,
                    h.clip[u[1]] = 0,
                    o && (r.cssClip(h.clip),
                        f && f.css(e.effects.clipToBox(h)),
                        h.clip = d),
                    r.queue((function (n) {
                        f && f.animate(e.effects.clipToBox(p), c, t.easing).animate(e.effects.clipToBox(h), c, t.easing),
                            n()
                    }
                    )).animate(p, c, t.easing).animate(h, c, t.easing).queue(n),
                    e.effects.unshift(r, m, 4)
            }
            )),
            e.effects.define("highlight", "show", (function (t, n) {
                var r = e(this)
                    , i = {
                        backgroundColor: r.css("backgroundColor")
                    };
                "hide" === t.mode && (i.opacity = 0),
                    e.effects.saveStyle(r),
                    r.css({
                        backgroundImage: "none",
                        backgroundColor: t.color || "#ffff99"
                    }).animate(i, {
                        queue: !1,
                        duration: t.duration,
                        easing: t.easing,
                        complete: n
                    })
            }
            )),
            e.effects.define("size", (function (t, n) {
                var r, i, o, a = e(this), s = ["fontSize"], l = ["borderTopWidth", "borderBottomWidth", "paddingTop", "paddingBottom"], u = ["borderLeftWidth", "borderRightWidth", "paddingLeft", "paddingRight"], c = t.mode, f = "effect" !== c, d = t.scale || "both", p = t.origin || ["middle", "center"], h = a.css("position"), g = a.position(), m = e.effects.scaledDimensions(a), v = t.from || m, y = t.to || e.effects.scaledDimensions(a, 0);
                e.effects.createPlaceholder(a),
                    "show" === c && (o = v,
                        v = y,
                        y = o),
                    i = {
                        from: {
                            y: v.height / m.height,
                            x: v.width / m.width
                        },
                        to: {
                            y: y.height / m.height,
                            x: y.width / m.width
                        }
                    },
                    ("box" === d || "both" === d) && (i.from.y !== i.to.y && (v = e.effects.setTransition(a, l, i.from.y, v),
                        y = e.effects.setTransition(a, l, i.to.y, y)),
                        i.from.x !== i.to.x && (v = e.effects.setTransition(a, u, i.from.x, v),
                            y = e.effects.setTransition(a, u, i.to.x, y))),
                    ("content" === d || "both" === d) && i.from.y !== i.to.y && (v = e.effects.setTransition(a, s, i.from.y, v),
                        y = e.effects.setTransition(a, s, i.to.y, y)),
                    p && (r = e.effects.getBaseline(p, m),
                        v.top = (m.outerHeight - v.outerHeight) * r.y + g.top,
                        v.left = (m.outerWidth - v.outerWidth) * r.x + g.left,
                        y.top = (m.outerHeight - y.outerHeight) * r.y + g.top,
                        y.left = (m.outerWidth - y.outerWidth) * r.x + g.left),
                    a.css(v),
                    ("content" === d || "both" === d) && (l = l.concat(["marginTop", "marginBottom"]).concat(s),
                        u = u.concat(["marginLeft", "marginRight"]),
                        a.find("*[width]").each((function () {
                            var n = e(this)
                                , r = e.effects.scaledDimensions(n)
                                , o = {
                                    height: r.height * i.from.y,
                                    width: r.width * i.from.x,
                                    outerHeight: r.outerHeight * i.from.y,
                                    outerWidth: r.outerWidth * i.from.x
                                }
                                , a = {
                                    height: r.height * i.to.y,
                                    width: r.width * i.to.x,
                                    outerHeight: r.height * i.to.y,
                                    outerWidth: r.width * i.to.x
                                };
                            i.from.y !== i.to.y && (o = e.effects.setTransition(n, l, i.from.y, o),
                                a = e.effects.setTransition(n, l, i.to.y, a)),
                                i.from.x !== i.to.x && (o = e.effects.setTransition(n, u, i.from.x, o),
                                    a = e.effects.setTransition(n, u, i.to.x, a)),
                                f && e.effects.saveStyle(n),
                                n.css(o),
                                n.animate(a, t.duration, t.easing, (function () {
                                    f && e.effects.restoreStyle(n)
                                }
                                ))
                        }
                        ))),
                    a.animate(y, {
                        queue: !1,
                        duration: t.duration,
                        easing: t.easing,
                        complete: function () {
                            var t = a.offset();
                            0 === y.opacity && a.css("opacity", v.opacity),
                                f || (a.css("position", "static" === h ? "relative" : h).offset(t),
                                    e.effects.saveStyle(a)),
                                n()
                        }
                    })
            }
            )),
            e.effects.define("scale", (function (t, n) {
                var r = e(this)
                    , i = t.mode
                    , o = parseInt(t.percent, 10) || (0 === parseInt(t.percent, 10) || "effect" !== i ? 0 : 100)
                    , a = e.extend(!0, {
                        from: e.effects.scaledDimensions(r),
                        to: e.effects.scaledDimensions(r, o, t.direction || "both"),
                        origin: t.origin || ["middle", "center"]
                    }, t);
                t.fade && (a.from.opacity = 1,
                    a.to.opacity = 0),
                    e.effects.effect.size.call(this, a, n)
            }
            )),
            e.effects.define("puff", "hide", (function (t, n) {
                var r = e.extend(!0, {}, t, {
                    fade: !0,
                    percent: parseInt(t.percent, 10) || 150
                });
                e.effects.effect.scale.call(this, r, n)
            }
            )),
            e.effects.define("pulsate", "show", (function (t, n) {
                var r = e(this)
                    , i = t.mode
                    , o = "show" === i
                    , a = o || "hide" === i
                    , s = 2 * (t.times || 5) + (a ? 1 : 0)
                    , l = t.duration / s
                    , u = 0
                    , c = 1
                    , f = r.queue().length;
                for ((o || !r.is(":visible")) && (r.css("opacity", 0).show(),
                    u = 1); s > c; c++)
                    r.animate({
                        opacity: u
                    }, l, t.easing),
                        u = 1 - u;
                r.animate({
                    opacity: u
                }, l, t.easing),
                    r.queue(n),
                    e.effects.unshift(r, f, s + 1)
            }
            )),
            e.effects.define("shake", (function (t, n) {
                var r = 1
                    , i = e(this)
                    , o = t.direction || "left"
                    , a = t.distance || 20
                    , s = t.times || 3
                    , l = 2 * s + 1
                    , u = Math.round(t.duration / l)
                    , c = "up" === o || "down" === o ? "top" : "left"
                    , f = "up" === o || "left" === o
                    , d = {}
                    , p = {}
                    , h = {}
                    , g = i.queue().length;
                for (e.effects.createPlaceholder(i),
                    d[c] = (f ? "-=" : "+=") + a,
                    p[c] = (f ? "+=" : "-=") + 2 * a,
                    h[c] = (f ? "-=" : "+=") + 2 * a,
                    i.animate(d, u, t.easing); s > r; r++)
                    i.animate(p, u, t.easing).animate(h, u, t.easing);
                i.animate(p, u, t.easing).animate(d, u / 2, t.easing).queue(n),
                    e.effects.unshift(i, g, l + 1)
            }
            )),
            e.effects.define("slide", "show", (function (t, n) {
                var r, i, o = e(this), a = {
                    up: ["bottom", "top"],
                    down: ["top", "bottom"],
                    left: ["right", "left"],
                    right: ["left", "right"]
                }, s = t.mode, l = t.direction || "left", u = "up" === l || "down" === l ? "top" : "left", c = "up" === l || "left" === l, f = t.distance || o["top" === u ? "outerHeight" : "outerWidth"](!0), d = {};
                e.effects.createPlaceholder(o),
                    r = o.cssClip(),
                    i = o.position()[u],
                    d[u] = (c ? -1 : 1) * f + i,
                    d.clip = o.cssClip(),
                    d.clip[a[l][1]] = d.clip[a[l][0]],
                    "show" === s && (o.cssClip(d.clip),
                        o.css(u, d[u]),
                        d.clip = r,
                        d[u] = i),
                    o.animate(d, {
                        queue: !1,
                        duration: t.duration,
                        easing: t.easing,
                        complete: n
                    })
            }
            )),
            !1 !== e.uiBackCompat && e.effects.define("transfer", (function (t, n) {
                e(this).transfer(t, n)
            }
            ))
    }
    )),
    function () {
        "use strict";
        function e() {
            var e = !1;
            if ("sessionStorage" in window)
                try {
                    window.sessionStorage.setItem("_tmptest", "tmpval"),
                        e = !0,
                        window.sessionStorage.removeItem("_tmptest")
                } catch (e) { }
            var t = !1;
            if ("localStorage" in window)
                try {
                    window.localStorage.setItem("_tmptest", "tmpval"),
                        t = !0,
                        window.localStorage.removeItem("_tmptest")
                } catch (e) { }
            if (e)
                try {
                    window.sessionStorage && (w = window.sessionStorage,
                        C = "sessionStorage",
                        k = w.jStorage_update)
                } catch (e) { }
            else if (t)
                try {
                    window.localStorage && (w = window.localStorage,
                        C = "localStorage",
                        k = w.jStorage_update)
                } catch (e) { }
            else if ("globalStorage" in window)
                try {
                    window.globalStorage && (w = "localhost" == window.location.hostname ? window.globalStorage["localhost.localdomain"] : window.globalStorage[window.location.hostname],
                        C = "globalStorage",
                        k = w.jStorage_update)
                } catch (e) { }
            else {
                if (!(T = document.createElement("link")).addBehavior)
                    return void (T = null);
                T.style.behavior = "url(#default#userData)",
                    document.getElementsByTagName("head")[0].appendChild(T);
                try {
                    T.load("jStorage")
                } catch (e) {
                    T.setAttribute("jStorage", "{}"),
                        T.save("jStorage"),
                        T.load("jStorage")
                }
                var i = "{}";
                try {
                    i = T.getAttribute("jStorage")
                } catch (e) { }
                try {
                    k = T.getAttribute("jStorage_update")
                } catch (e) { }
                w.jStorage = i,
                    C = "userDataBehavior"
            }
            s(),
                c(),
                n(),
                f(),
                "addEventListener" in window && window.addEventListener("pageshow", (function (e) {
                    e.persisted && r()
                }
                ), !1)
        }
        function t() {
            var e = "{}";
            if ("userDataBehavior" == C) {
                T.load("jStorage");
                try {
                    e = T.getAttribute("jStorage")
                } catch (e) { }
                try {
                    k = T.getAttribute("jStorage_update")
                } catch (e) { }
                w.jStorage = e
            }
            s(),
                c(),
                f()
        }
        function n() {
            "sessionStorage" == C || "localStorage" == C || "globalStorage" == C ? "addEventListener" in window ? window.addEventListener("storage", r, !1) : document.attachEvent("onstorage", r) : "userDataBehavior" == C && setInterval(r, 1e3)
        }
        function r() {
            var e;
            clearTimeout(E),
                E = setTimeout((function () {
                    if ("sessionStorage" == C || "localStorage" == C || "globalStorage" == C)
                        e = w.jStorage_update;
                    else if ("userDataBehavior" == C) {
                        T.load("jStorage");
                        try {
                            e = T.getAttribute("jStorage_update")
                        } catch (e) { }
                    }
                    e && e != k && (k = e,
                        i())
                }
                ), 25)
        }
        function i() {
            var e, n = y.parse(y.stringify(x.__jstorage_meta.CRC32));
            t(),
                e = y.parse(y.stringify(x.__jstorage_meta.CRC32));
            var r, i = [], a = [];
            for (r in n)
                if (n.hasOwnProperty(r)) {
                    if (!e[r]) {
                        a.push(r);
                        continue
                    }
                    n[r] != e[r] && "2." == String(n[r]).substr(0, 2) && i.push(r)
                }
            for (r in e)
                e.hasOwnProperty(r) && (n[r] || i.push(r));
            o(i, "updated"),
                o(a, "deleted")
        }
        function o(e, t) {
            var n, r, i, o;
            if (e = [].concat(e || []),
                "flushed" == t) {
                for (var a in e = [],
                    j)
                    j.hasOwnProperty(a) && e.push(a);
                t = "deleted"
            }
            for (n = 0,
                i = e.length; n < i; n++) {
                if (j[e[n]])
                    for (r = 0,
                        o = j[e[n]].length; r < o; r++)
                        j[e[n]][r](e[n], t);
                if (j["*"])
                    for (r = 0,
                        o = j["*"].length; r < o; r++)
                        j["*"][r](e[n], t)
            }
        }
        function a() {
            var e = (+new Date).toString();
            if ("sessionStorage" == C || "localStorage" == C || "globalStorage" == C)
                try {
                    w.jStorage_update = e
                } catch (e) {
                    C = !1
                }
            else
                "userDataBehavior" == C && (T.setAttribute("jStorage_update", e),
                    T.save("jStorage"));
            r()
        }
        function s() {
            if (w.jStorage)
                try {
                    x = y.parse(String(w.jStorage))
                } catch (e) {
                    w.jStorage = "{}"
                }
            else
                w.jStorage = "{}";
            S = w.jStorage ? String(w.jStorage).length : 0,
                x.__jstorage_meta || (x.__jstorage_meta = {}),
                x.__jstorage_meta.CRC32 || (x.__jstorage_meta.CRC32 = {})
        }
        function l() {
            p();
            try {
                w.jStorage = y.stringify(x),
                    T && (T.setAttribute("jStorage", w.jStorage),
                        T.save("jStorage")),
                    S = w.jStorage ? String(w.jStorage).length : 0
            } catch (e) { }
        }
        function u(e) {
            if ("string" != typeof e && "number" != typeof e)
                throw new TypeError("Key name must be string or numeric");
            if ("__jstorage_meta" == e)
                throw new TypeError("Reserved key name");
            return !0
        }
        function c() {
            var e, t, n, r, i = 1 / 0, s = !1, u = [];
            if (clearTimeout(b),
                x.__jstorage_meta && "object" == typeof x.__jstorage_meta.TTL) {
                for (t in e = +new Date,
                    n = x.__jstorage_meta.TTL,
                    r = x.__jstorage_meta.CRC32,
                    n)
                    n.hasOwnProperty(t) && (n[t] <= e ? (delete n[t],
                        delete r[t],
                        delete x[t],
                        s = !0,
                        u.push(t)) : n[t] < i && (i = n[t]));
                i != 1 / 0 && (b = setTimeout(c, Math.min(i - e, 2147483647))),
                    s && (l(),
                        a(),
                        o(u, "deleted"))
            }
        }
        function f() {
            var e;
            if (x.__jstorage_meta.PubSub) {
                var t, n = N, r = [];
                for (e = x.__jstorage_meta.PubSub.length - 1; e >= 0; e--)
                    (t = x.__jstorage_meta.PubSub[e])[0] > N && (n = t[0],
                        r.unshift(t));
                for (e = r.length - 1; e >= 0; e--)
                    d(r[e][1], r[e][2]);
                N = n
            }
        }
        function d(e, t) {
            if (_[e])
                for (var n = 0, r = _[e].length; n < r; n++)
                    try {
                        _[e][n](e, y.parse(y.stringify(t)))
                    } catch (e) { }
        }
        function p() {
            if (x.__jstorage_meta.PubSub) {
                for (var e = +new Date - 2e3, t = 0, n = x.__jstorage_meta.PubSub.length; t < n; t++)
                    if (x.__jstorage_meta.PubSub[t][0] <= e) {
                        x.__jstorage_meta.PubSub.splice(t, x.__jstorage_meta.PubSub.length - t);
                        break
                    }
                x.__jstorage_meta.PubSub.length || delete x.__jstorage_meta.PubSub
            }
        }
        function h(e, t) {
            x.__jstorage_meta || (x.__jstorage_meta = {}),
                x.__jstorage_meta.PubSub || (x.__jstorage_meta.PubSub = []),
                x.__jstorage_meta.PubSub.unshift([+new Date, e, t]),
                l(),
                a()
        }
        function g(e, t) {
            for (var n, r = e.length, i = t ^ r, o = 0; r >= 4;)
                n = 1540483477 * (65535 & (n = 255 & e.charCodeAt(o) | (255 & e.charCodeAt(++o)) << 8 | (255 & e.charCodeAt(++o)) << 16 | (255 & e.charCodeAt(++o)) << 24)) + ((1540483477 * (n >>> 16) & 65535) << 16),
                    i = 1540483477 * (65535 & i) + ((1540483477 * (i >>> 16) & 65535) << 16) ^ (n = 1540483477 * (65535 & (n ^= n >>> 24)) + ((1540483477 * (n >>> 16) & 65535) << 16)),
                    r -= 4,
                    ++o;
            switch (r) {
                case 3:
                    i ^= (255 & e.charCodeAt(o + 2)) << 16;
                case 2:
                    i ^= (255 & e.charCodeAt(o + 1)) << 8;
                case 1:
                    i = 1540483477 * (65535 & (i ^= 255 & e.charCodeAt(o))) + ((1540483477 * (i >>> 16) & 65535) << 16)
            }
            return i = 1540483477 * (65535 & (i ^= i >>> 13)) + ((1540483477 * (i >>> 16) & 65535) << 16),
                (i ^= i >>> 15) >>> 0
        }
        var m = "0.4.13"
            , v = window.jQuery || window.$ || (window.$ = {})
            , y = {
                parse: window.JSON && (window.JSON.parse || window.JSON.decode) || String.prototype.evalJSON && function (e) {
                    return String(e).evalJSON()
                }
                    || v.parseJSON || v.evalJSON,
                stringify: Object.toJSON || window.JSON && (window.JSON.stringify || window.JSON.encode) || v.toJSON
            };
        if ("function" != typeof y.parse || "function" != typeof y.stringify)
            throw new Error("No JSON support found, include //cdnjs.cloudflare.com/ajax/libs/json2/20110223/json2.js to page");
        var b, x = {
            __jstorage_meta: {
                CRC32: {}
            }
        }, w = {
            jStorage: "{}"
        }, T = null, S = 0, C = !1, j = {}, E = !1, k = 0, _ = {}, N = +new Date, D = {
            isXML: function (e) {
                var t = (e ? e.ownerDocument || e : 0).documentElement;
                return !!t && "HTML" !== t.nodeName
            },
            encode: function (e) {
                if (!this.isXML(e))
                    return !1;
                try {
                    return (new XMLSerializer).serializeToString(e)
                } catch (t) {
                    try {
                        return e.xml
                    } catch (e) { }
                }
                return !1
            },
            decode: function (e) {
                var t, n = "DOMParser" in window && (new DOMParser).parseFromString || window.ActiveXObject && function (e) {
                    var t = new ActiveXObject("Microsoft.XMLDOM");
                    return t.async = "false",
                        t.loadXML(e),
                        t
                }
                    ;
                return !!n && (t = n.call("DOMParser" in window && new DOMParser || window, e, "text/xml"),
                    !!this.isXML(t) && t)
            }
        };
        v.jStorage = {
            version: m,
            set: function (e, t, n) {
                if (u(e),
                    n = n || {},
                    void 0 === t)
                    return this.deleteKey(e),
                        t;
                if (D.isXML(t))
                    t = {
                        _is_xml: !0,
                        xml: D.encode(t)
                    };
                else {
                    if ("function" == typeof t)
                        return;
                    t && "object" == typeof t && (t = y.parse(y.stringify(t)))
                }
                return x[e] = t,
                    x.__jstorage_meta.CRC32[e] = "2." + g(y.stringify(t), 2538058380),
                    this.setTTL(e, n.TTL || 0),
                    o(e, "updated"),
                    t
            },
            get: function (e, t) {
                return u(e),
                    e in x ? x[e] && "object" == typeof x[e] && x[e]._is_xml ? D.decode(x[e].xml) : x[e] : void 0 === t ? null : t
            },
            deleteKey: function (e) {
                return u(e),
                    e in x && (delete x[e],
                        "object" == typeof x.__jstorage_meta.TTL && e in x.__jstorage_meta.TTL && delete x.__jstorage_meta.TTL[e],
                        delete x.__jstorage_meta.CRC32[e],
                        l(),
                        a(),
                        o(e, "deleted"),
                        !0)
            },
            setTTL: function (e, t) {
                var n = +new Date;
                return u(e),
                    t = Number(t) || 0,
                    e in x && (x.__jstorage_meta.TTL || (x.__jstorage_meta.TTL = {}),
                        t > 0 ? x.__jstorage_meta.TTL[e] = n + t : delete x.__jstorage_meta.TTL[e],
                        l(),
                        c(),
                        a(),
                        !0)
            },
            getTTL: function (e) {
                var t = +new Date;
                return u(e),
                    e in x && x.__jstorage_meta.TTL && x.__jstorage_meta.TTL[e] && x.__jstorage_meta.TTL[e] - t || 0
            },
            flush: function () {
                return x = {
                    __jstorage_meta: {
                        CRC32: {}
                    }
                },
                    l(),
                    a(),
                    o(null, "flushed"),
                    !0
            },
            storageObj: function () {
                function e() { }
                return e.prototype = x,
                    new e
            },
            index: function () {
                var e, t = [];
                for (e in x)
                    x.hasOwnProperty(e) && "__jstorage_meta" != e && t.push(e);
                return t
            },
            storageSize: function () {
                return S
            },
            currentBackend: function () {
                return C
            },
            storageAvailable: function () {
                return !!C
            },
            listenKeyChange: function (e, t) {
                u(e),
                    j[e] || (j[e] = []),
                    j[e].push(t)
            },
            stopListening: function (e, t) {
                if (u(e),
                    j[e])
                    if (t)
                        for (var n = j[e].length - 1; n >= 0; n--)
                            j[e][n] == t && j[e].splice(n, 1);
                    else
                        delete j[e]
            },
            subscribe: function (e, t) {
                if (!(e = (e || "").toString()))
                    throw new TypeError("Channel not defined");
                _[e] || (_[e] = []),
                    _[e].push(t)
            },
            publish: function (e, t) {
                if (!(e = (e || "").toString()))
                    throw new TypeError("Channel not defined");
                h(e, t)
            },
            reInit: function () {
                t()
            },
            noConflict: function (e) {
                return delete window.$.jStorage,
                    e && (window.jStorage = this),
                    this
            }
        },
            e()
    }(),
    function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : e(window.jQuery || window.$)
    }((function (e) {
        var t, n = {
            className: "autosizejs",
            append: "",
            callback: !1,
            resizeDelay: 10
        }, r = ["fontFamily", "fontSize", "fontWeight", "fontStyle", "letterSpacing", "textTransform", "wordSpacing", "textIndent"], i = e('<textarea tabindex="-1" style="position:absolute; top:-999px; left:0; right:auto; bottom:auto; border:0; padding: 0; -moz-box-sizing:content-box; -webkit-box-sizing:content-box; box-sizing:content-box; word-wrap:break-word; height:0 !important; min-height:0 !important; overflow:hidden; transition:none; -webkit-transition:none; -moz-transition:none;"/>').data("autosize", !0)[0];
        i.style.lineHeight = "99px",
            "99px" === e(i).css("lineHeight") && r.push("lineHeight"),
            i.style.lineHeight = "",
            e.fn.autosize = function (o) {
                return o = e.extend({}, n, o || {}),
                    i.parentNode !== document.body && e(document.body).append(i),
                    this.each((function () {
                        function n() {
                            var t, n;
                            "getComputedStyle" in window ? (t = window.getComputedStyle(d),
                                n = d.getBoundingClientRect().width,
                                e.each(["paddingLeft", "paddingRight", "borderLeftWidth", "borderRightWidth"], (function (e, r) {
                                    n -= parseInt(t[r], 10)
                                }
                                )),
                                i.style.width = n + "px") : i.style.width = Math.max(p.width(), 0) + "px"
                        }
                        function a() {
                            var a = {};
                            if (t = d,
                                i.className = o.className,
                                u = parseInt(p.css("maxHeight"), 10),
                                e.each(r, (function (e, t) {
                                    a[t] = p.css(t)
                                }
                                )),
                                e(i).css(a),
                                n(),
                                window.chrome && "setSelectionRange" in d) {
                                var s = d.selectionStart;
                                d.value += " ",
                                    d.value = d.value.slice(0, -1),
                                    d.setSelectionRange(s, s)
                            }
                        }
                        function s() {
                            var e, r;
                            t !== d ? a() : n(),
                                i.value = d.value + o.append,
                                i.style.overflowY = d.style.overflowY,
                                r = parseInt(d.style.height, 10),
                                i.scrollTop = 0,
                                i.scrollTop = 9e4,
                                e = i.scrollTop,
                                u && e > u ? (d.style.overflowY = "scroll",
                                    e = u) : (d.style.overflowY = "hidden",
                                        e < c && (e = c)),
                                r !== (e += h) && (d.style.height = e + "px",
                                    g && o.callback.call(d, d))
                        }
                        function l() {
                            clearTimeout(f),
                                f = setTimeout((function () {
                                    var e = p.width();
                                    e !== v && (v = e,
                                        s())
                                }
                                ), parseInt(o.resizeDelay, 10))
                        }
                        var u, c, f, d = this, p = e(d), h = 0, g = e.isFunction(o.callback), m = {
                            height: d.style.height,
                            overflow: d.style.overflow,
                            overflowY: d.style.overflowY,
                            wordWrap: d.style.wordWrap,
                            resize: d.style.resize
                        }, v = p.width();
                        p.data("autosize") || (p.data("autosize", !0),
                            "border-box" !== p.css("box-sizing") && "border-box" !== p.css("-moz-box-sizing") && "border-box" !== p.css("-webkit-box-sizing") || (h = p.outerHeight() - p.height()),
                            c = Math.max(parseInt(p.css("minHeight"), 10) - h || 0, p.height()),
                            p.css({
                                overflow: "hidden",
                                overflowY: "hidden",
                                wordWrap: "break-word",
                                resize: "none" === p.css("resize") || "vertical" === p.css("resize") ? "none" : "horizontal"
                            }),
                            "onpropertychange" in d ? "oninput" in d ? p.on("input.autosize keyup.autosize", s) : p.on("propertychange.autosize", (function () {
                                "value" === event.propertyName && s()
                            }
                            )) : p.on("input.autosize", s),
                            !1 !== o.resizeDelay && e(window).on("resize.autosize", l),
                            p.on("autosize.resize", s),
                            p.on("autosize.resizeIncludeStyle", (function () {
                                t = null,
                                    s()
                            }
                            )),
                            p.on("autosize.destroy", (function () {
                                t = null,
                                    clearTimeout(f),
                                    e(window).off("resize", l),
                                    p.off("autosize").off(".autosize").css(m).removeData("autosize")
                            }
                            )),
                            s())
                    }
                    ))
            }
    }
    )),
    function (e) {
        "function" == typeof define && define.amd ? define(["jquery"], e) : "object" == typeof module && "object" == typeof module.exports ? e(require("jquery")) : e(jQuery)
    }((function (e) {
        function t() {
            var t = o.settings;
            if (t.autoDispose && !e.contains(document.documentElement, this))
                return e(this).timeago("dispose"),
                    this;
            var a = n(this);
            return isNaN(a.datetime) || (0 === t.cutoff || Math.abs(i(a.datetime)) < t.cutoff ? e(this).text(r(a.datetime)) : e(this).attr("title").length > 0 && e(this).text(e(this).attr("title"))),
                this
        }
        function n(t) {
            if (!(t = e(t)).data("timeago")) {
                t.data("timeago", {
                    datetime: o.datetime(t)
                });
                var n = e.trim(t.text());
                o.settings.localeTitle ? t.attr("title", t.data("timeago").datetime.toLocaleString()) : !(n.length > 0) || o.isTime(t) && t.attr("title") || t.attr("title", n)
            }
            return t.data("timeago")
        }
        function r(e) {
            return o.inWords(i(e))
        }
        function i(e) {
            return (new Date).getTime() - e.getTime()
        }
        e.timeago = function (t) {
            return t instanceof Date ? r(t) : r("string" == typeof t ? e.timeago.parse(t) : "number" == typeof t ? new Date(t) : e.timeago.datetime(t))
        }
            ;
        var o = e.timeago;
        e.extend(e.timeago, {
            settings: {
                refreshMillis: 6e4,
                allowPast: !0,
                allowFuture: !1,
                localeTitle: !1,
                cutoff: 0,
                autoDispose: !0,
                strings: {
                    prefixAgo: null,
                    prefixFromNow: null,
                    suffixAgo: "ago",
                    suffixFromNow: "from now",
                    inPast: "any moment now",
                    seconds: "less than a minute",
                    minute: "about a minute",
                    minutes: "%d minutes",
                    hour: "about an hour",
                    hours: "about %d hours",
                    day: "a day",
                    days: "%d days",
                    month: "about a month",
                    months: "%d months",
                    year: "about a year",
                    years: "%d years",
                    wordSeparator: " ",
                    numbers: []
                }
            },
            inWords: function (t) {
                function n(n, i) {
                    var o = e.isFunction(n) ? n(i, t) : n
                        , a = r.numbers && r.numbers[i] || i;
                    return o.replace(/%d/i, a)
                }
                if (!this.settings.allowPast && !this.settings.allowFuture)
                    throw "timeago allowPast and allowFuture settings can not both be set to false.";
                var r = this.settings.strings
                    , i = r.prefixAgo
                    , o = r.suffixAgo;
                if (this.settings.allowFuture && t < 0 && (i = r.prefixFromNow,
                    o = r.suffixFromNow),
                    !this.settings.allowPast && t >= 0)
                    return this.settings.strings.inPast;
                var a = Math.abs(t) / 1e3
                    , s = a / 60
                    , l = s / 60
                    , u = l / 24
                    , c = u / 365
                    , f = a < 45 && n(r.seconds, Math.round(a)) || a < 90 && n(r.minute, 1) || s < 45 && n(r.minutes, Math.round(s)) || s < 90 && n(r.hour, 1) || l < 24 && n(r.hours, Math.round(l)) || l < 42 && n(r.day, 1) || u < 30 && n(r.days, Math.round(u)) || u < 45 && n(r.month, 1) || u < 365 && n(r.months, Math.round(u / 30)) || c < 1.5 && n(r.year, 1) || n(r.years, Math.round(c))
                    , d = r.wordSeparator || "";
                return void 0 === r.wordSeparator && (d = " "),
                    e.trim([i, f, o].join(d))
            },
            parse: function (t) {
                var n = e.trim(t);
                return n = (n = (n = (n = (n = n.replace(/\.\d+/, "")).replace(/-/, "/").replace(/-/, "/")).replace(/T/, " ").replace(/Z/, " UTC")).replace(/([\+\-]\d\d)\:?(\d\d)/, " $1$2")).replace(/([\+\-]\d\d)$/, " $100"),
                    new Date(n)
            },
            datetime: function (t) {
                var n = o.isTime(t) ? e(t).attr("datetime") : e(t).attr("title");
                return o.parse(n)
            },
            isTime: function (t) {
                return "time" === e(t).get(0).tagName.toLowerCase()
            }
        });
        var a = {
            init: function () {
                a.dispose.call(this);
                var n = e.proxy(t, this);
                n();
                var r = o.settings;
                r.refreshMillis > 0 && (this._timeagoInterval = setInterval(n, r.refreshMillis))
            },
            update: function (n) {
                var r = n instanceof Date ? n : o.parse(n);
                e(this).data("timeago", {
                    datetime: r
                }),
                    o.settings.localeTitle && e(this).attr("title", r.toLocaleString()),
                    t.apply(this)
            },
            updateFromDOM: function () {
                e(this).data("timeago", {
                    datetime: o.parse(o.isTime(this) ? e(this).attr("datetime") : e(this).attr("title"))
                }),
                    t.apply(this)
            },
            dispose: function () {
                this._timeagoInterval && (window.clearInterval(this._timeagoInterval),
                    this._timeagoInterval = null)
            }
        };
        e.fn.timeago = function (e, t) {
            var n = e ? a[e] : a.init;
            if (!n)
                throw new Error("Unknown function name '" + e + "' for timeago");
            return this.each((function () {
                n.call(this, t)
            }
            )),
                this
        }
            ,
            document.createElement("abbr"),
            document.createElement("time")
    }
    )),
    function (e) {
        "function" == typeof define && define.amd && define.amd.jQuery ? define(["jquery"], e) : "undefined" != typeof module && module.exports ? e(require("jquery")) : e(jQuery)
    }((function (e) {
        "use strict";
        function t(t) {
            return !t || void 0 !== t.allowPageScroll || void 0 === t.swipe && void 0 === t.swipeStatus || (t.allowPageScroll = c),
                void 0 !== t.click && void 0 === t.tap && (t.tap = t.click),
                t || (t = {}),
                t = e.extend({}, e.fn.swipe.defaults, t),
                this.each((function () {
                    var r = e(this)
                        , i = r.data(_);
                    i || (i = new n(this, t),
                        r.data(_, i))
                }
                ))
        }
        function n(t, n) {
            function r(t) {
                if (!(ue() || e(t.target).closest(n.excludedElements, Xe).length > 0)) {
                    var r = t.originalEvent ? t.originalEvent : t;
                    if (!r.pointerType || "mouse" != r.pointerType || 0 != n.fallbackToMouseEvents) {
                        var i, o = r.touches, a = o ? o[0] : r;
                        return Ue = w,
                            o ? Je = o.length : !1 !== n.preventDefaultEvents && t.preventDefault(),
                            qe = 0,
                            Oe = null,
                            Pe = null,
                            ze = null,
                            Fe = 0,
                            Re = 0,
                            Ie = 0,
                            We = 1,
                            Be = 0,
                            $e = me(),
                            se(),
                            fe(0, a),
                            !o || Je === n.fingers || n.fingers === b || z() ? (Qe = je(),
                                2 == Je && (fe(1, o[1]),
                                    Re = Ie = be(Ye[0].start, Ye[1].start)),
                                (n.swipeStatus || n.pinchStatus) && (i = q(r, Ue))) : i = !1,
                            !1 === i ? (q(r, Ue = C),
                                i) : (n.hold && (tt = setTimeout(e.proxy((function () {
                                    Xe.trigger("hold", [r.target]),
                                        n.hold && (i = n.hold.call(Xe, r, r.target))
                                }
                                ), this), n.longTapThreshold)),
                                    ce(!0),
                                    null)
                    }
                }
            }
            function N(e) {
                var t = e.originalEvent ? e.originalEvent : e;
                if (Ue !== S && Ue !== C && !le()) {
                    var r, i = t.touches, o = de(i ? i[0] : t);
                    if (Ve = je(),
                        i && (Je = i.length),
                        n.hold && clearTimeout(tt),
                        Ue = T,
                        2 == Je && (0 == Re ? (fe(1, i[1]),
                            Re = Ie = be(Ye[0].start, Ye[1].start)) : (de(i[1]),
                                Ie = be(Ye[0].end, Ye[1].end),
                                ze = we(Ye[0].end, Ye[1].end)),
                            We = xe(Re, Ie),
                            Be = Math.abs(Re - Ie)),
                        Je === n.fingers || n.fingers === b || !i || z()) {
                        if (Oe = Ce(o.start, o.end),
                            W(e, Pe = Ce(o.last, o.end)),
                            qe = Te(o.start, o.end),
                            Fe = ye(),
                            he(Oe, qe),
                            r = q(t, Ue),
                            !n.triggerOnTouchEnd || n.triggerOnTouchLeave) {
                            var a = !0;
                            if (n.triggerOnTouchLeave) {
                                var s = Ee(this);
                                a = ke(o.end, s)
                            }
                            !n.triggerOnTouchEnd && a ? Ue = H(T) : n.triggerOnTouchLeave && !a && (Ue = H(S)),
                                Ue != C && Ue != S || q(t, Ue)
                        }
                    } else
                        q(t, Ue = C);
                    !1 === r && q(t, Ue = C)
                }
            }
            function D(e) {
                var t = e.originalEvent ? e.originalEvent : e
                    , r = t.touches;
                if (r) {
                    if (r.length && !le())
                        return ae(t),
                            !0;
                    if (r.length && le())
                        return !0
                }
                return le() && (Je = Ge),
                    Ve = je(),
                    Fe = ye(),
                    F() || !P() ? q(t, Ue = C) : n.triggerOnTouchEnd || !1 === n.triggerOnTouchEnd && Ue === T ? (!1 !== n.preventDefaultEvents && e.preventDefault(),
                        q(t, Ue = S)) : !n.triggerOnTouchEnd && V() ? O(t, Ue = S, h) : Ue === T && q(t, Ue = C),
                    ce(!1),
                    null
            }
            function L() {
                Je = 0,
                    Ve = 0,
                    Qe = 0,
                    Re = 0,
                    Ie = 0,
                    We = 1,
                    se(),
                    ce(!1)
            }
            function A(e) {
                var t = e.originalEvent ? e.originalEvent : e;
                n.triggerOnTouchLeave && q(t, Ue = H(S))
            }
            function M() {
                Xe.unbind(De, r),
                    Xe.unbind(He, L),
                    Xe.unbind(Le, N),
                    Xe.unbind(Ae, D),
                    Me && Xe.unbind(Me, A),
                    ce(!1)
            }
            function H(e) {
                var t = e
                    , r = I()
                    , i = P()
                    , o = F();
                return !r || o ? t = C : !i || e != T || n.triggerOnTouchEnd && !n.triggerOnTouchLeave ? !i && e == S && n.triggerOnTouchLeave && (t = C) : t = S,
                    t
            }
            function q(e, t) {
                var n, r = e.touches;
                return (J() || U()) && (n = O(e, t, d)),
                    ($() || z()) && !1 !== n && (n = O(e, t, p)),
                    ie() && !1 !== n ? n = O(e, t, g) : oe() && !1 !== n ? n = O(e, t, m) : re() && !1 !== n && (n = O(e, t, h)),
                    t === C && L(e),
                    t === S && (r && r.length || L(e)),
                    n
            }
            function O(t, r, c) {
                var f;
                if (c == d) {
                    if (Xe.trigger("swipeStatus", [r, Oe || null, qe || 0, Fe || 0, Je, Ye, Pe]),
                        n.swipeStatus && !1 === (f = n.swipeStatus.call(Xe, t, r, Oe || null, qe || 0, Fe || 0, Je, Ye, Pe)))
                        return !1;
                    if (r == S && X()) {
                        if (clearTimeout(et),
                            clearTimeout(tt),
                            Xe.trigger("swipe", [Oe, qe, Fe, Je, Ye, Pe]),
                            n.swipe && !1 === (f = n.swipe.call(Xe, t, Oe, qe, Fe, Je, Ye, Pe)))
                            return !1;
                        switch (Oe) {
                            case i:
                                Xe.trigger("swipeLeft", [Oe, qe, Fe, Je, Ye, Pe]),
                                    n.swipeLeft && (f = n.swipeLeft.call(Xe, t, Oe, qe, Fe, Je, Ye, Pe));
                                break;
                            case o:
                                Xe.trigger("swipeRight", [Oe, qe, Fe, Je, Ye, Pe]),
                                    n.swipeRight && (f = n.swipeRight.call(Xe, t, Oe, qe, Fe, Je, Ye, Pe));
                                break;
                            case a:
                                Xe.trigger("swipeUp", [Oe, qe, Fe, Je, Ye, Pe]),
                                    n.swipeUp && (f = n.swipeUp.call(Xe, t, Oe, qe, Fe, Je, Ye, Pe));
                                break;
                            case s:
                                Xe.trigger("swipeDown", [Oe, qe, Fe, Je, Ye, Pe]),
                                    n.swipeDown && (f = n.swipeDown.call(Xe, t, Oe, qe, Fe, Je, Ye, Pe))
                        }
                    }
                }
                if (c == p) {
                    if (Xe.trigger("pinchStatus", [r, ze || null, Be || 0, Fe || 0, Je, We, Ye]),
                        n.pinchStatus && !1 === (f = n.pinchStatus.call(Xe, t, r, ze || null, Be || 0, Fe || 0, Je, We, Ye)))
                        return !1;
                    if (r == S && B())
                        switch (ze) {
                            case l:
                                Xe.trigger("pinchIn", [ze || null, Be || 0, Fe || 0, Je, We, Ye]),
                                    n.pinchIn && (f = n.pinchIn.call(Xe, t, ze || null, Be || 0, Fe || 0, Je, We, Ye));
                                break;
                            case u:
                                Xe.trigger("pinchOut", [ze || null, Be || 0, Fe || 0, Je, We, Ye]),
                                    n.pinchOut && (f = n.pinchOut.call(Xe, t, ze || null, Be || 0, Fe || 0, Je, We, Ye))
                        }
                }
                return c == h ? r !== C && r !== S || (clearTimeout(et),
                    clearTimeout(tt),
                    K() && !ee() ? (Ze = je(),
                        et = setTimeout(e.proxy((function () {
                            Ze = null,
                                Xe.trigger("tap", [t.target]),
                                n.tap && (f = n.tap.call(Xe, t, t.target))
                        }
                        ), this), n.doubleTapThreshold)) : (Ze = null,
                            Xe.trigger("tap", [t.target]),
                            n.tap && (f = n.tap.call(Xe, t, t.target)))) : c == g ? r !== C && r !== S || (clearTimeout(et),
                                clearTimeout(tt),
                                Ze = null,
                                Xe.trigger("doubletap", [t.target]),
                                n.doubleTap && (f = n.doubleTap.call(Xe, t, t.target))) : c == m && (r !== C && r !== S || (clearTimeout(et),
                                    Ze = null,
                                    Xe.trigger("longtap", [t.target]),
                                    n.longTap && (f = n.longTap.call(Xe, t, t.target)))),
                    f
            }
            function P() {
                var e = !0;
                return null !== n.threshold && (e = qe >= n.threshold),
                    e
            }
            function F() {
                var e = !1;
                return null !== n.cancelThreshold && null !== Oe && (e = ge(Oe) - qe >= n.cancelThreshold),
                    e
            }
            function R() {
                return null === n.pinchThreshold || Be >= n.pinchThreshold
            }
            function I() {
                return !n.maxTimeThreshold || !(Fe >= n.maxTimeThreshold)
            }
            function W(e, t) {
                if (!1 !== n.preventDefaultEvents)
                    if (n.allowPageScroll === c)
                        e.preventDefault();
                    else {
                        var r = n.allowPageScroll === f;
                        switch (t) {
                            case i:
                                (n.swipeLeft && r || !r && n.allowPageScroll != v) && e.preventDefault();
                                break;
                            case o:
                                (n.swipeRight && r || !r && n.allowPageScroll != v) && e.preventDefault();
                                break;
                            case a:
                                (n.swipeUp && r || !r && n.allowPageScroll != y) && e.preventDefault();
                                break;
                            case s:
                                (n.swipeDown && r || !r && n.allowPageScroll != y) && e.preventDefault()
                        }
                    }
            }
            function B() {
                var e = Y()
                    , t = Q()
                    , n = R();
                return e && t && n
            }
            function z() {
                return !!(n.pinchStatus || n.pinchIn || n.pinchOut)
            }
            function $() {
                return !(!B() || !z())
            }
            function X() {
                var e = I()
                    , t = P()
                    , n = Y()
                    , r = Q();
                return !F() && r && n && t && e
            }
            function U() {
                return !!(n.swipe || n.swipeStatus || n.swipeLeft || n.swipeRight || n.swipeUp || n.swipeDown)
            }
            function J() {
                return !(!X() || !U())
            }
            function Y() {
                return Je === n.fingers || n.fingers === b || !j
            }
            function Q() {
                return 0 !== Ye[0].end.x
            }
            function V() {
                return !!n.tap
            }
            function K() {
                return !!n.doubleTap
            }
            function G() {
                return !!n.longTap
            }
            function Z() {
                if (null == Ze)
                    return !1;
                var e = je();
                return K() && e - Ze <= n.doubleTapThreshold
            }
            function ee() {
                return Z()
            }
            function te() {
                return (1 === Je || !j) && (isNaN(qe) || qe < n.threshold)
            }
            function ne() {
                return Fe > n.longTapThreshold && qe < x
            }
            function re() {
                return !(!te() || !V())
            }
            function ie() {
                return !(!Z() || !K())
            }
            function oe() {
                return !(!ne() || !G())
            }
            function ae(e) {
                Ke = je(),
                    Ge = e.touches.length + 1
            }
            function se() {
                Ke = 0,
                    Ge = 0
            }
            function le() {
                var e = !1;
                Ke && (je() - Ke <= n.fingerReleaseThreshold && (e = !0));
                return e
            }
            function ue() {
                return !(!0 !== Xe.data(_ + "_intouch"))
            }
            function ce(e) {
                Xe && (!0 === e ? (Xe.bind(Le, N),
                    Xe.bind(Ae, D),
                    Me && Xe.bind(Me, A)) : (Xe.unbind(Le, N, !1),
                        Xe.unbind(Ae, D, !1),
                        Me && Xe.unbind(Me, A, !1)),
                    Xe.data(_ + "_intouch", !0 === e))
            }
            function fe(e, t) {
                var n = {
                    start: {
                        x: 0,
                        y: 0
                    },
                    last: {
                        x: 0,
                        y: 0
                    },
                    end: {
                        x: 0,
                        y: 0
                    }
                };
                return n.start.x = n.last.x = n.end.x = t.pageX || t.clientX,
                    n.start.y = n.last.y = n.end.y = t.pageY || t.clientY,
                    Ye[e] = n,
                    n
            }
            function de(e) {
                var t = void 0 !== e.identifier ? e.identifier : 0
                    , n = pe(t);
                return null === n && (n = fe(t, e)),
                    n.last.x = n.end.x,
                    n.last.y = n.end.y,
                    n.end.x = e.pageX || e.clientX,
                    n.end.y = e.pageY || e.clientY,
                    n
            }
            function pe(e) {
                return Ye[e] || null
            }
            function he(e, t) {
                e != c && (t = Math.max(t, ge(e)),
                    $e[e].distance = t)
            }
            function ge(e) {
                if ($e[e])
                    return $e[e].distance
            }
            function me() {
                var e = {};
                return e[i] = ve(i),
                    e[o] = ve(o),
                    e[a] = ve(a),
                    e[s] = ve(s),
                    e
            }
            function ve(e) {
                return {
                    direction: e,
                    distance: 0
                }
            }
            function ye() {
                return Ve - Qe
            }
            function be(e, t) {
                var n = Math.abs(e.x - t.x)
                    , r = Math.abs(e.y - t.y);
                return Math.round(Math.sqrt(n * n + r * r))
            }
            function xe(e, t) {
                return (t / e * 1).toFixed(2)
            }
            function we() {
                return We < 1 ? u : l
            }
            function Te(e, t) {
                return Math.round(Math.sqrt(Math.pow(t.x - e.x, 2) + Math.pow(t.y - e.y, 2)))
            }
            function Se(e, t) {
                var n = e.x - t.x
                    , r = t.y - e.y
                    , i = Math.atan2(r, n)
                    , o = Math.round(180 * i / Math.PI);
                return o < 0 && (o = 360 - Math.abs(o)),
                    o
            }
            function Ce(e, t) {
                if (_e(e, t))
                    return c;
                var n = Se(e, t);
                return n <= 45 && n >= 0 || n <= 360 && n >= 315 ? i : n >= 135 && n <= 225 ? o : n > 45 && n < 135 ? s : a
            }
            function je() {
                return (new Date).getTime()
            }
            function Ee(t) {
                var n = (t = e(t)).offset();
                return {
                    left: n.left,
                    right: n.left + t.outerWidth(),
                    top: n.top,
                    bottom: n.top + t.outerHeight()
                }
            }
            function ke(e, t) {
                return e.x > t.left && e.x < t.right && e.y > t.top && e.y < t.bottom
            }
            function _e(e, t) {
                return e.x == t.x && e.y == t.y
            }
            n = e.extend({}, n);
            var Ne = j || k || !n.fallbackToMouseEvents
                , De = Ne ? k ? E ? "MSPointerDown" : "pointerdown" : "touchstart" : "mousedown"
                , Le = Ne ? k ? E ? "MSPointerMove" : "pointermove" : "touchmove" : "mousemove"
                , Ae = Ne ? k ? E ? "MSPointerUp" : "pointerup" : "touchend" : "mouseup"
                , Me = Ne ? k ? "mouseleave" : null : "mouseleave"
                , He = k ? E ? "MSPointerCancel" : "pointercancel" : "touchcancel"
                , qe = 0
                , Oe = null
                , Pe = null
                , Fe = 0
                , Re = 0
                , Ie = 0
                , We = 1
                , Be = 0
                , ze = 0
                , $e = null
                , Xe = e(t)
                , Ue = "start"
                , Je = 0
                , Ye = {}
                , Qe = 0
                , Ve = 0
                , Ke = 0
                , Ge = 0
                , Ze = 0
                , et = null
                , tt = null;
            try {
                Xe.bind(De, r),
                    Xe.bind(He, L)
            } catch (t) {
                e.error("events not supported " + De + "," + He + " on jQuery.swipe")
            }
            this.enable = function () {
                return this.disable(),
                    Xe.bind(De, r),
                    Xe.bind(He, L),
                    Xe
            }
                ,
                this.disable = function () {
                    return M(),
                        Xe
                }
                ,
                this.destroy = function () {
                    M(),
                        Xe.data(_, null),
                        Xe = null
                }
                ,
                this.option = function (t, r) {
                    if ("object" == typeof t)
                        n = e.extend(n, t);
                    else if (void 0 !== n[t]) {
                        if (void 0 === r)
                            return n[t];
                        n[t] = r
                    } else {
                        if (!t)
                            return n;
                        e.error("Option " + t + " does not exist on jQuery.swipe.options")
                    }
                    return null
                }
        }
        var r = "1.6.18"
            , i = "left"
            , o = "right"
            , a = "up"
            , s = "down"
            , l = "in"
            , u = "out"
            , c = "none"
            , f = "auto"
            , d = "swipe"
            , p = "pinch"
            , h = "tap"
            , g = "doubletap"
            , m = "longtap"
            , v = "horizontal"
            , y = "vertical"
            , b = "all"
            , x = 10
            , w = "start"
            , T = "move"
            , S = "end"
            , C = "cancel"
            , j = "ontouchstart" in window
            , E = window.navigator.msPointerEnabled && !window.navigator.pointerEnabled && !j
            , k = (window.navigator.pointerEnabled || window.navigator.msPointerEnabled) && !j
            , _ = "TouchSwipe"
            , N = {
                fingers: 1,
                threshold: 75,
                cancelThreshold: null,
                pinchThreshold: 20,
                maxTimeThreshold: null,
                fingerReleaseThreshold: 250,
                longTapThreshold: 500,
                doubleTapThreshold: 200,
                swipe: null,
                swipeLeft: null,
                swipeRight: null,
                swipeUp: null,
                swipeDown: null,
                swipeStatus: null,
                pinchIn: null,
                pinchOut: null,
                pinchStatus: null,
                click: null,
                tap: null,
                doubleTap: null,
                longTap: null,
                hold: null,
                triggerOnTouchEnd: !0,
                triggerOnTouchLeave: !1,
                allowPageScroll: "auto",
                fallbackToMouseEvents: !0,
                excludedElements: ".noSwipe",
                preventDefaultEvents: !0
            };
        e.fn.swipe = function (n) {
            var r = e(this)
                , i = r.data(_);
            if (i && "string" == typeof n) {
                if (i[n])
                    return i[n].apply(i, Array.prototype.slice.call(arguments, 1));
                e.error("Method " + n + " does not exist on jQuery.swipe")
            } else if (i && "object" == typeof n)
                i.option.apply(i, arguments);
            else if (!(i || "object" != typeof n && n))
                return t.apply(this, arguments);
            return r
        }
            ,
            e.fn.swipe.version = r,
            e.fn.swipe.defaults = N,
            e.fn.swipe.phases = {
                PHASE_START: w,
                PHASE_MOVE: T,
                PHASE_END: S,
                PHASE_CANCEL: C
            },
            e.fn.swipe.directions = {
                LEFT: i,
                RIGHT: o,
                UP: a,
                DOWN: s,
                IN: l,
                OUT: u
            },
            e.fn.swipe.pageScroll = {
                NONE: c,
                HORIZONTAL: v,
                VERTICAL: y,
                AUTO: f
            },
            e.fn.swipe.fingers = {
                ONE: 1,
                TWO: 2,
                THREE: 3,
                FOUR: 4,
                FIVE: 5,
                ALL: b
            }
    }
    ));
const observers = {}
    , keyboardManager = {
        handleKeyPress: e => {
            (observers[e.key] || []).forEach((e => {
                e()
            }
            ))
        }
        ,
        addShortcut: (e, t) => {
            observers[e] = observers[e] || [],
                observers[e].push(t)
        }
        ,
        removeShortcut: (e, t) => {
            const n = observers[e] || []
                , r = n.indexOf(t);
            r > -1 && n.splice(r, 1)
        }
    };
document.addEventListener("keydown", keyboardManager.handleKeyPress),
    window.WaniKaniKeyboardManager = window.WaniKaniKeyboardManager || keyboardManager;
