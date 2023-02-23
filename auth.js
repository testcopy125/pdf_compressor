!function(e, o) {
    var n = {
        exports: {}
    };
    e.ApiZon = n.exports,
    o()
}(this, (function() {
    var e = "object" === typeof window && window.window === window ? window : "object" === typeof self && self.self === self ? self : "object" === typeof global && global.global === global ? global : void 0;
    var o = 31536e6;
    var n = "_z_token";
    var t = "_z_id";
    var i = "_z_device_id";
    var r = S("_z_id");
    var s = S("_z_token");
    var a = S("_z_device_id");
    var u = "/";
    var c = "/";
    var d = {
        token: "/",
        refresh: "/",
        files: "/",
        uses: "/",
        fileUser: "/"
    };
    var f = !1;
    function p(e) {
        try {
            if (e) {
                var o = d[e.requestType];
                if (o) {
                    var n = new XMLHttpRequest;
                    n.addEventListener("progress", e.onprogress),
                    n.addEventListener("load", (function(o) {
                        const n = o.target;
                        e.onSuccess && (n && 4 === n.readyState && n.response ? e.onSuccess(JSON.parse(n.response)) : e.onSuccess({
                            is_response_failed: !1
                        }))
                    }
                    )),
                    n.addEventListener("error", e.onError),
                    n.addEventListener("abort", e.onError),
                    n.addEventListener("timeout", e.onError),
                    n.open("POST", (e.is_auth ? u : c) + o, !0),
                    e.timeout && (n.timeout = timeout),
                    n.setRequestHeader("Content-Type", "application/json"),
                    n.setRequestHeader("uid", r),
                    n.setRequestHeader("authorization", s),
                    a && n.setRequestHeader("device", a),
                    e.method === undefined || "POST" === e.method ? n.send(JSON.stringify(e.data)) : n.send(null)
                } else
                    e.onError && e.onError()
            } else
                e.onError && e.onError()
        } catch (t) {
            e.onError && e.onError()
        }
    }
    function l() {
        p({
            is_auth: !0,
            requestType: !0 === m(a) ? "token" : "refresh",
            onSuccess: function(e) {
                f = !0,
                200 === e.status && (e.z_id && (r = e.z_id,
                g(t, e.z_id, {
                    isSecure: !0,
                    Expire: o,
                    domain: ".sarkariresullt.in"
                })),
                e._z_device_id && (a = e._z_device_id,
                g(i, a, {
                    isSecure: !0,
                    Expire: o,
                    domain: ".sarkariresullt.in"
                })),
                e.z_token && (s = e.z_token,
                g(n, e.z_token, {
                    isSecure: !0,
                    Expire: {
                        Date: e.time
                    },
                    domain: ".sarkariresullt.in"
                })))
            },
            onError: function(e) {
                f = !0
            }
        })
    }
    function E(e) {
        e && p({
            requestType: "uses",
            data: {
                page_url: page_url
            },
            onSuccess: function(o) {
                200 === o.status && !0 === o.is_success ? e(!0) : 429 === o.status && "SERVICE_EXCEED" === o.type ? e(!1) : e(!0)
            },
            onError: function(o) {
                navigator.onLine ? e(!0) : e(!1)
            }
        })
    }
    function _(e) {
        e && p({
            requestType: "fileUser",
            data: {
                page_url: page_url
            },
            onSuccess: function(o) {
                200 === o.status ? e(o) : e()
            },
            onError: function(o) {
                e()
            }
        })
    }
    function v(e, o) {
        try {} catch (n) {}
    }
    function m(e) {
        if ("string" !== typeof e || !e || !e.trim().length)
            return !0;
        return !1
    }
    function S(e) {
        var o, n = new RegExp("(^|;)[ ]*" + e + "=([^;]*)").exec(document.cookie);
        return n ? decodeURIComponent(n[2]) : ""
    }
    function g(e, o, n) {
        var t;
        return n.Expire && (n.Expire.Date ? t = new Date(n.Expire.Date) : (t = new Date).setTime(t.getTime() + n.Expire)),
        n.sameSite || (n.sameSite = "Lax"),
        document.cookie = e + "=" + encodeURIComponent(o) + (n.Expire || n.Expire ? ";expires=" + t.toUTCString() : "") + ";path=" + (n.path || "/") + (n.domain ? ";domain=" + n.domain : "") + (n.isSecure ? ";secure" : "") + ";SameSite=" + n.sameSite,
        !(!n.Expire && S(e) !== String(o))
    }
    function k() {
        if (configCookiesDisabled)
            return "0";
        if (!isDefined(window.showModalDialog) && isDefined(window.cookieEnabled))
            return window.cookieEnabled ? "1" : "0";
        var e = configCookieNamePrefix + "testcookie";
        g(e, "1", undefined, configCookiePath, configCookieDomain, configCookieIsSecure, configCookieSameSite);
        var o = "1" === S(e) ? "1" : "0";
        return h(e),
        o
    }
    function h(e) {
        g(e, "", {
            Expire: -1296e5
        })
    }
    !1 !== m(r) || !1 !== m(s) ? l() : f = !0,
    e.ApiZon = {
        HttpRequest: p,
        ServiceRemain: E,
        UserCanProcess: _,
        ServiceAnalyst: v,
        GetCookies: S,
        SetCookies: g,
        HasCookies: k
    }
}
));
