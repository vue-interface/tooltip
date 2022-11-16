import { openBlock as gt, createElementBlock as yt, normalizeClass as bt, createElementVNode as Fe, renderSlot as wt, h as xt, render as Ot } from "vue";
var j = "top", C = "bottom", N = "right", B = "left", we = "auto", ce = [j, C, N, B], Z = "start", pe = "end", Et = "clippingParents", rt = "viewport", ae = "popper", At = "reference", Xe = /* @__PURE__ */ ce.reduce(function(t, e) {
  return t.concat([e + "-" + Z, e + "-" + pe]);
}, []), nt = /* @__PURE__ */ [].concat(ce, [we]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Z, e + "-" + pe]);
}, []), Pt = "beforeRead", Dt = "read", St = "afterRead", Rt = "beforeMain", Tt = "main", jt = "afterMain", Bt = "beforeWrite", $t = "write", kt = "afterWrite", De = [Pt, Dt, St, Rt, Tt, jt, Bt, $t, kt];
function W(t) {
  return t ? (t.nodeName || "").toLowerCase() : null;
}
function L(t) {
  if (t == null)
    return window;
  if (t.toString() !== "[object Window]") {
    var e = t.ownerDocument;
    return e && e.defaultView || window;
  }
  return t;
}
function K(t) {
  var e = L(t).Element;
  return t instanceof e || t instanceof Element;
}
function k(t) {
  var e = L(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Te(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = L(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Ct(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(r) {
    var n = e.styles[r] || {}, o = e.attributes[r] || {}, a = e.elements[r];
    !k(a) || !W(a) || (Object.assign(a.style, n), Object.keys(o).forEach(function(f) {
      var s = o[f];
      s === !1 ? a.removeAttribute(f) : a.setAttribute(f, s === !0 ? "" : s);
    }));
  });
}
function Nt(t) {
  var e = t.state, r = {
    popper: {
      position: e.options.strategy,
      left: "0",
      top: "0",
      margin: "0"
    },
    arrow: {
      position: "absolute"
    },
    reference: {}
  };
  return Object.assign(e.elements.popper.style, r.popper), e.styles = r, e.elements.arrow && Object.assign(e.elements.arrow.style, r.arrow), function() {
    Object.keys(e.elements).forEach(function(n) {
      var o = e.elements[n], a = e.attributes[n] || {}, f = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : r[n]), s = f.reduce(function(i, c) {
        return i[c] = "", i;
      }, {});
      !k(o) || !W(o) || (Object.assign(o.style, s), Object.keys(a).forEach(function(i) {
        o.removeAttribute(i);
      }));
    });
  };
}
const Lt = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Ct,
  effect: Nt,
  requires: ["computeStyles"]
};
function I(t) {
  return t.split("-")[0];
}
var J = Math.max, be = Math.min, ee = Math.round;
function Se() {
  var t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function ot() {
  return !/^((?!chrome|android).)*safari/i.test(Se());
}
function te(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var n = t.getBoundingClientRect(), o = 1, a = 1;
  e && k(t) && (o = t.offsetWidth > 0 && ee(n.width) / t.offsetWidth || 1, a = t.offsetHeight > 0 && ee(n.height) / t.offsetHeight || 1);
  var f = K(t) ? L(t) : window, s = f.visualViewport, i = !ot() && r, c = (n.left + (i && s ? s.offsetLeft : 0)) / o, p = (n.top + (i && s ? s.offsetTop : 0)) / a, h = n.width / o, b = n.height / a;
  return {
    width: h,
    height: b,
    top: p,
    right: c + h,
    bottom: p + b,
    left: c,
    x: c,
    y: p
  };
}
function je(t) {
  var e = te(t), r = t.offsetWidth, n = t.offsetHeight;
  return Math.abs(e.width - r) <= 1 && (r = e.width), Math.abs(e.height - n) <= 1 && (n = e.height), {
    x: t.offsetLeft,
    y: t.offsetTop,
    width: r,
    height: n
  };
}
function at(t, e) {
  var r = e.getRootNode && e.getRootNode();
  if (t.contains(e))
    return !0;
  if (r && Te(r)) {
    var n = e;
    do {
      if (n && t.isSameNode(n))
        return !0;
      n = n.parentNode || n.host;
    } while (n);
  }
  return !1;
}
function V(t) {
  return L(t).getComputedStyle(t);
}
function Mt(t) {
  return ["table", "td", "th"].indexOf(W(t)) >= 0;
}
function _(t) {
  return ((K(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function xe(t) {
  return W(t) === "html" ? t : t.assignedSlot || t.parentNode || (Te(t) ? t.host : null) || _(t);
}
function Ye(t) {
  return !k(t) || V(t).position === "fixed" ? null : t.offsetParent;
}
function It(t) {
  var e = /firefox/i.test(Se()), r = /Trident/i.test(Se());
  if (r && k(t)) {
    var n = V(t);
    if (n.position === "fixed")
      return null;
  }
  var o = xe(t);
  for (Te(o) && (o = o.host); k(o) && ["html", "body"].indexOf(W(o)) < 0; ) {
    var a = V(o);
    if (a.transform !== "none" || a.perspective !== "none" || a.contain === "paint" || ["transform", "perspective"].indexOf(a.willChange) !== -1 || e && a.willChange === "filter" || e && a.filter && a.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function le(t) {
  for (var e = L(t), r = Ye(t); r && Mt(r) && V(r).position === "static"; )
    r = Ye(r);
  return r && (W(r) === "html" || W(r) === "body" && V(r).position === "static") ? e : r || It(t) || e;
}
function Be(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function ie(t, e, r) {
  return J(t, be(e, r));
}
function Vt(t, e, r) {
  var n = ie(t, e, r);
  return n > r ? r : n;
}
function it() {
  return {
    top: 0,
    right: 0,
    bottom: 0,
    left: 0
  };
}
function st(t) {
  return Object.assign({}, it(), t);
}
function pt(t, e) {
  return e.reduce(function(r, n) {
    return r[n] = t, r;
  }, {});
}
var Wt = function(e, r) {
  return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
    placement: r.placement
  })) : e, st(typeof e != "number" ? e : pt(e, ce));
};
function qt(t) {
  var e, r = t.state, n = t.name, o = t.options, a = r.elements.arrow, f = r.modifiersData.popperOffsets, s = I(r.placement), i = Be(s), c = [B, N].indexOf(s) >= 0, p = c ? "height" : "width";
  if (!(!a || !f)) {
    var h = Wt(o.padding, r), b = je(a), l = i === "y" ? j : B, x = i === "y" ? C : N, m = r.rects.reference[p] + r.rects.reference[i] - f[i] - r.rects.popper[p], d = f[i] - r.rects.reference[i], w = le(a), A = w ? i === "y" ? w.clientHeight || 0 : w.clientWidth || 0 : 0, E = m / 2 - d / 2, u = h[l], g = A - b[p] - h[x], v = A / 2 - b[p] / 2 + E, O = ie(u, v, g), P = i;
    r.modifiersData[n] = (e = {}, e[P] = O, e.centerOffset = O - v, e);
  }
}
function Ht(t) {
  var e = t.state, r = t.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  if (o != null && !(typeof o == "string" && (o = e.elements.popper.querySelector(o), !o))) {
    if (process.env.NODE_ENV !== "production" && (k(o) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))), !at(e.elements.popper, o)) {
      process.env.NODE_ENV !== "production" && console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      return;
    }
    e.elements.arrow = o;
  }
}
const _t = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: qt,
  effect: Ht,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function re(t) {
  return t.split("-")[1];
}
var Ft = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function Xt(t) {
  var e = t.x, r = t.y, n = window, o = n.devicePixelRatio || 1;
  return {
    x: ee(e * o) / o || 0,
    y: ee(r * o) / o || 0
  };
}
function ze(t) {
  var e, r = t.popper, n = t.popperRect, o = t.placement, a = t.variation, f = t.offsets, s = t.position, i = t.gpuAcceleration, c = t.adaptive, p = t.roundOffsets, h = t.isFixed, b = f.x, l = b === void 0 ? 0 : b, x = f.y, m = x === void 0 ? 0 : x, d = typeof p == "function" ? p({
    x: l,
    y: m
  }) : {
    x: l,
    y: m
  };
  l = d.x, m = d.y;
  var w = f.hasOwnProperty("x"), A = f.hasOwnProperty("y"), E = B, u = j, g = window;
  if (c) {
    var v = le(r), O = "clientHeight", P = "clientWidth";
    if (v === L(r) && (v = _(r), V(v).position !== "static" && s === "absolute" && (O = "scrollHeight", P = "scrollWidth")), v = v, o === j || (o === B || o === N) && a === pe) {
      u = C;
      var D = h && v === g && g.visualViewport ? g.visualViewport.height : v[O];
      m -= D - n.height, m *= i ? 1 : -1;
    }
    if (o === B || (o === j || o === C) && a === pe) {
      E = N;
      var S = h && v === g && g.visualViewport ? g.visualViewport.width : v[P];
      l -= S - n.width, l *= i ? 1 : -1;
    }
  }
  var y = Object.assign({
    position: s
  }, c && Ft), R = p === !0 ? Xt({
    x: l,
    y: m
  }) : {
    x: l,
    y: m
  };
  if (l = R.x, m = R.y, i) {
    var T;
    return Object.assign({}, y, (T = {}, T[u] = A ? "0" : "", T[E] = w ? "0" : "", T.transform = (g.devicePixelRatio || 1) <= 1 ? "translate(" + l + "px, " + m + "px)" : "translate3d(" + l + "px, " + m + "px, 0)", T));
  }
  return Object.assign({}, y, (e = {}, e[u] = A ? m + "px" : "", e[E] = w ? l + "px" : "", e.transform = "", e));
}
function Yt(t) {
  var e = t.state, r = t.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, a = r.adaptive, f = a === void 0 ? !0 : a, s = r.roundOffsets, i = s === void 0 ? !0 : s;
  if (process.env.NODE_ENV !== "production") {
    var c = V(e.elements.popper).transitionProperty || "";
    f && ["transform", "top", "right", "bottom", "left"].some(function(h) {
      return c.indexOf(h) >= 0;
    }) && console.warn(["Popper: Detected CSS transitions on at least one of the following", 'CSS properties: "transform", "top", "right", "bottom", "left".', `

`, 'Disable the "computeStyles" modifier\'s `adaptive` option to allow', "for smooth transitions, or remove these properties from the CSS", "transition declaration on the popper element if only transitioning", "opacity or background-color for example.", `

`, "We recommend using the popper element as a wrapper around an inner", "element that can have any CSS property transitioned for animations."].join(" "));
  }
  var p = {
    placement: I(e.placement),
    variation: re(e.placement),
    popper: e.elements.popper,
    popperRect: e.rects.popper,
    gpuAcceleration: o,
    isFixed: e.options.strategy === "fixed"
  };
  e.modifiersData.popperOffsets != null && (e.styles.popper = Object.assign({}, e.styles.popper, ze(Object.assign({}, p, {
    offsets: e.modifiersData.popperOffsets,
    position: e.options.strategy,
    adaptive: f,
    roundOffsets: i
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, ze(Object.assign({}, p, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: i
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const zt = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Yt,
  data: {}
};
var ge = {
  passive: !0
};
function Ut(t) {
  var e = t.state, r = t.instance, n = t.options, o = n.scroll, a = o === void 0 ? !0 : o, f = n.resize, s = f === void 0 ? !0 : f, i = L(e.elements.popper), c = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return a && c.forEach(function(p) {
    p.addEventListener("scroll", r.update, ge);
  }), s && i.addEventListener("resize", r.update, ge), function() {
    a && c.forEach(function(p) {
      p.removeEventListener("scroll", r.update, ge);
    }), s && i.removeEventListener("resize", r.update, ge);
  };
}
const Gt = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Ut,
  data: {}
};
var Jt = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function ye(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Jt[e];
  });
}
var Kt = {
  start: "end",
  end: "start"
};
function Ue(t) {
  return t.replace(/start|end/g, function(e) {
    return Kt[e];
  });
}
function $e(t) {
  var e = L(t), r = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function ke(t) {
  return te(_(t)).left + $e(t).scrollLeft;
}
function Qt(t, e) {
  var r = L(t), n = _(t), o = r.visualViewport, a = n.clientWidth, f = n.clientHeight, s = 0, i = 0;
  if (o) {
    a = o.width, f = o.height;
    var c = ot();
    (c || !c && e === "fixed") && (s = o.offsetLeft, i = o.offsetTop);
  }
  return {
    width: a,
    height: f,
    x: s + ke(t),
    y: i
  };
}
function Zt(t) {
  var e, r = _(t), n = $e(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, a = J(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), f = J(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), s = -n.scrollLeft + ke(t), i = -n.scrollTop;
  return V(o || r).direction === "rtl" && (s += J(r.clientWidth, o ? o.clientWidth : 0) - a), {
    width: a,
    height: f,
    x: s,
    y: i
  };
}
function Ce(t) {
  var e = V(t), r = e.overflow, n = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function ft(t) {
  return ["html", "body", "#document"].indexOf(W(t)) >= 0 ? t.ownerDocument.body : k(t) && Ce(t) ? t : ft(xe(t));
}
function se(t, e) {
  var r;
  e === void 0 && (e = []);
  var n = ft(t), o = n === ((r = t.ownerDocument) == null ? void 0 : r.body), a = L(n), f = o ? [a].concat(a.visualViewport || [], Ce(n) ? n : []) : n, s = e.concat(f);
  return o ? s : s.concat(se(xe(f)));
}
function Re(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function er(t, e) {
  var r = te(t, !1, e === "fixed");
  return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r;
}
function Ge(t, e, r) {
  return e === rt ? Re(Qt(t, r)) : K(e) ? er(e, r) : Re(Zt(_(t)));
}
function tr(t) {
  var e = se(xe(t)), r = ["absolute", "fixed"].indexOf(V(t).position) >= 0, n = r && k(t) ? le(t) : t;
  return K(n) ? e.filter(function(o) {
    return K(o) && at(o, n) && W(o) !== "body";
  }) : [];
}
function rr(t, e, r, n) {
  var o = e === "clippingParents" ? tr(t) : [].concat(e), a = [].concat(o, [r]), f = a[0], s = a.reduce(function(i, c) {
    var p = Ge(t, c, n);
    return i.top = J(p.top, i.top), i.right = be(p.right, i.right), i.bottom = be(p.bottom, i.bottom), i.left = J(p.left, i.left), i;
  }, Ge(t, f, n));
  return s.width = s.right - s.left, s.height = s.bottom - s.top, s.x = s.left, s.y = s.top, s;
}
function ct(t) {
  var e = t.reference, r = t.element, n = t.placement, o = n ? I(n) : null, a = n ? re(n) : null, f = e.x + e.width / 2 - r.width / 2, s = e.y + e.height / 2 - r.height / 2, i;
  switch (o) {
    case j:
      i = {
        x: f,
        y: e.y - r.height
      };
      break;
    case C:
      i = {
        x: f,
        y: e.y + e.height
      };
      break;
    case N:
      i = {
        x: e.x + e.width,
        y: s
      };
      break;
    case B:
      i = {
        x: e.x - r.width,
        y: s
      };
      break;
    default:
      i = {
        x: e.x,
        y: e.y
      };
  }
  var c = o ? Be(o) : null;
  if (c != null) {
    var p = c === "y" ? "height" : "width";
    switch (a) {
      case Z:
        i[c] = i[c] - (e[p] / 2 - r[p] / 2);
        break;
      case pe:
        i[c] = i[c] + (e[p] / 2 - r[p] / 2);
        break;
    }
  }
  return i;
}
function fe(t, e) {
  e === void 0 && (e = {});
  var r = e, n = r.placement, o = n === void 0 ? t.placement : n, a = r.strategy, f = a === void 0 ? t.strategy : a, s = r.boundary, i = s === void 0 ? Et : s, c = r.rootBoundary, p = c === void 0 ? rt : c, h = r.elementContext, b = h === void 0 ? ae : h, l = r.altBoundary, x = l === void 0 ? !1 : l, m = r.padding, d = m === void 0 ? 0 : m, w = st(typeof d != "number" ? d : pt(d, ce)), A = b === ae ? At : ae, E = t.rects.popper, u = t.elements[x ? A : b], g = rr(K(u) ? u : u.contextElement || _(t.elements.popper), i, p, f), v = te(t.elements.reference), O = ct({
    reference: v,
    element: E,
    strategy: "absolute",
    placement: o
  }), P = Re(Object.assign({}, E, O)), D = b === ae ? P : v, S = {
    top: g.top - D.top + w.top,
    bottom: D.bottom - g.bottom + w.bottom,
    left: g.left - D.left + w.left,
    right: D.right - g.right + w.right
  }, y = t.modifiersData.offset;
  if (b === ae && y) {
    var R = y[o];
    Object.keys(S).forEach(function(T) {
      var F = [N, C].indexOf(T) >= 0 ? 1 : -1, X = [j, C].indexOf(T) >= 0 ? "y" : "x";
      S[T] += R[X] * F;
    });
  }
  return S;
}
function nr(t, e) {
  e === void 0 && (e = {});
  var r = e, n = r.placement, o = r.boundary, a = r.rootBoundary, f = r.padding, s = r.flipVariations, i = r.allowedAutoPlacements, c = i === void 0 ? nt : i, p = re(n), h = p ? s ? Xe : Xe.filter(function(x) {
    return re(x) === p;
  }) : ce, b = h.filter(function(x) {
    return c.indexOf(x) >= 0;
  });
  b.length === 0 && (b = h, process.env.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var l = b.reduce(function(x, m) {
    return x[m] = fe(t, {
      placement: m,
      boundary: o,
      rootBoundary: a,
      padding: f
    })[I(m)], x;
  }, {});
  return Object.keys(l).sort(function(x, m) {
    return l[x] - l[m];
  });
}
function or(t) {
  if (I(t) === we)
    return [];
  var e = ye(t);
  return [Ue(t), e, Ue(e)];
}
function ar(t) {
  var e = t.state, r = t.options, n = t.name;
  if (!e.modifiersData[n]._skip) {
    for (var o = r.mainAxis, a = o === void 0 ? !0 : o, f = r.altAxis, s = f === void 0 ? !0 : f, i = r.fallbackPlacements, c = r.padding, p = r.boundary, h = r.rootBoundary, b = r.altBoundary, l = r.flipVariations, x = l === void 0 ? !0 : l, m = r.allowedAutoPlacements, d = e.options.placement, w = I(d), A = w === d, E = i || (A || !x ? [ye(d)] : or(d)), u = [d].concat(E).reduce(function(Q, q) {
      return Q.concat(I(q) === we ? nr(e, {
        placement: q,
        boundary: p,
        rootBoundary: h,
        padding: c,
        flipVariations: x,
        allowedAutoPlacements: m
      }) : q);
    }, []), g = e.rects.reference, v = e.rects.popper, O = /* @__PURE__ */ new Map(), P = !0, D = u[0], S = 0; S < u.length; S++) {
      var y = u[S], R = I(y), T = re(y) === Z, F = [j, C].indexOf(R) >= 0, X = F ? "width" : "height", $ = fe(e, {
        placement: y,
        boundary: p,
        rootBoundary: h,
        altBoundary: b,
        padding: c
      }), M = F ? T ? N : B : T ? C : j;
      g[X] > v[X] && (M = ye(M));
      var ue = ye(M), Y = [];
      if (a && Y.push($[R] <= 0), s && Y.push($[M] <= 0, $[ue] <= 0), Y.every(function(Q) {
        return Q;
      })) {
        D = y, P = !1;
        break;
      }
      O.set(y, Y);
    }
    if (P)
      for (var ve = x ? 3 : 1, Oe = function(q) {
        var oe = u.find(function(he) {
          var z = O.get(he);
          if (z)
            return z.slice(0, q).every(function(Ee) {
              return Ee;
            });
        });
        if (oe)
          return D = oe, "break";
      }, ne = ve; ne > 0; ne--) {
        var de = Oe(ne);
        if (de === "break")
          break;
      }
    e.placement !== D && (e.modifiersData[n]._skip = !0, e.placement = D, e.reset = !0);
  }
}
const ir = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: ar,
  requiresIfExists: ["offset"],
  data: {
    _skip: !1
  }
};
function Je(t, e, r) {
  return r === void 0 && (r = {
    x: 0,
    y: 0
  }), {
    top: t.top - e.height - r.y,
    right: t.right - e.width + r.x,
    bottom: t.bottom - e.height + r.y,
    left: t.left - e.width - r.x
  };
}
function Ke(t) {
  return [j, N, C, B].some(function(e) {
    return t[e] >= 0;
  });
}
function sr(t) {
  var e = t.state, r = t.name, n = e.rects.reference, o = e.rects.popper, a = e.modifiersData.preventOverflow, f = fe(e, {
    elementContext: "reference"
  }), s = fe(e, {
    altBoundary: !0
  }), i = Je(f, n), c = Je(s, o, a), p = Ke(i), h = Ke(c);
  e.modifiersData[r] = {
    referenceClippingOffsets: i,
    popperEscapeOffsets: c,
    isReferenceHidden: p,
    hasPopperEscaped: h
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": p,
    "data-popper-escaped": h
  });
}
const pr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: sr
};
function fr(t, e, r) {
  var n = I(t), o = [B, j].indexOf(n) >= 0 ? -1 : 1, a = typeof r == "function" ? r(Object.assign({}, e, {
    placement: t
  })) : r, f = a[0], s = a[1];
  return f = f || 0, s = (s || 0) * o, [B, N].indexOf(n) >= 0 ? {
    x: s,
    y: f
  } : {
    x: f,
    y: s
  };
}
function cr(t) {
  var e = t.state, r = t.options, n = t.name, o = r.offset, a = o === void 0 ? [0, 0] : o, f = nt.reduce(function(p, h) {
    return p[h] = fr(h, e.rects, a), p;
  }, {}), s = f[e.placement], i = s.x, c = s.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += i, e.modifiersData.popperOffsets.y += c), e.modifiersData[n] = f;
}
const lr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: cr
};
function ur(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = ct({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const vr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: ur,
  data: {}
};
function dr(t) {
  return t === "x" ? "y" : "x";
}
function hr(t) {
  var e = t.state, r = t.options, n = t.name, o = r.mainAxis, a = o === void 0 ? !0 : o, f = r.altAxis, s = f === void 0 ? !1 : f, i = r.boundary, c = r.rootBoundary, p = r.altBoundary, h = r.padding, b = r.tether, l = b === void 0 ? !0 : b, x = r.tetherOffset, m = x === void 0 ? 0 : x, d = fe(e, {
    boundary: i,
    rootBoundary: c,
    padding: h,
    altBoundary: p
  }), w = I(e.placement), A = re(e.placement), E = !A, u = Be(w), g = dr(u), v = e.modifiersData.popperOffsets, O = e.rects.reference, P = e.rects.popper, D = typeof m == "function" ? m(Object.assign({}, e.rects, {
    placement: e.placement
  })) : m, S = typeof D == "number" ? {
    mainAxis: D,
    altAxis: D
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, D), y = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, R = {
    x: 0,
    y: 0
  };
  if (!!v) {
    if (a) {
      var T, F = u === "y" ? j : B, X = u === "y" ? C : N, $ = u === "y" ? "height" : "width", M = v[u], ue = M + d[F], Y = M - d[X], ve = l ? -P[$] / 2 : 0, Oe = A === Z ? O[$] : P[$], ne = A === Z ? -P[$] : -O[$], de = e.elements.arrow, Q = l && de ? je(de) : {
        width: 0,
        height: 0
      }, q = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : it(), oe = q[F], he = q[X], z = ie(0, O[$], Q[$]), Ee = E ? O[$] / 2 - ve - z - oe - S.mainAxis : Oe - z - oe - S.mainAxis, lt = E ? -O[$] / 2 + ve + z + he + S.mainAxis : ne + z + he + S.mainAxis, Ae = e.elements.arrow && le(e.elements.arrow), ut = Ae ? u === "y" ? Ae.clientTop || 0 : Ae.clientLeft || 0 : 0, Ne = (T = y == null ? void 0 : y[u]) != null ? T : 0, vt = M + Ee - Ne - ut, dt = M + lt - Ne, Le = ie(l ? be(ue, vt) : ue, M, l ? J(Y, dt) : Y);
      v[u] = Le, R[u] = Le - M;
    }
    if (s) {
      var Me, ht = u === "x" ? j : B, mt = u === "x" ? C : N, U = v[g], me = g === "y" ? "height" : "width", Ie = U + d[ht], Ve = U - d[mt], Pe = [j, B].indexOf(w) !== -1, We = (Me = y == null ? void 0 : y[g]) != null ? Me : 0, qe = Pe ? Ie : U - O[me] - P[me] - We + S.altAxis, He = Pe ? U + O[me] + P[me] - We - S.altAxis : Ve, _e = l && Pe ? Vt(qe, U, He) : ie(l ? qe : Ie, U, l ? He : Ve);
      v[g] = _e, R[g] = _e - U;
    }
    e.modifiersData[n] = R;
  }
}
const mr = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: hr,
  requiresIfExists: ["offset"]
};
function gr(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function yr(t) {
  return t === L(t) || !k(t) ? $e(t) : gr(t);
}
function br(t) {
  var e = t.getBoundingClientRect(), r = ee(e.width) / t.offsetWidth || 1, n = ee(e.height) / t.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function wr(t, e, r) {
  r === void 0 && (r = !1);
  var n = k(e), o = k(e) && br(e), a = _(e), f = te(t, o, r), s = {
    scrollLeft: 0,
    scrollTop: 0
  }, i = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((W(e) !== "body" || Ce(a)) && (s = yr(e)), k(e) ? (i = te(e, !0), i.x += e.clientLeft, i.y += e.clientTop) : a && (i.x = ke(a))), {
    x: f.left + s.scrollLeft - i.x,
    y: f.top + s.scrollTop - i.y,
    width: f.width,
    height: f.height
  };
}
function xr(t) {
  var e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), n = [];
  t.forEach(function(a) {
    e.set(a.name, a);
  });
  function o(a) {
    r.add(a.name);
    var f = [].concat(a.requires || [], a.requiresIfExists || []);
    f.forEach(function(s) {
      if (!r.has(s)) {
        var i = e.get(s);
        i && o(i);
      }
    }), n.push(a);
  }
  return t.forEach(function(a) {
    r.has(a.name) || o(a);
  }), n;
}
function Or(t) {
  var e = xr(t);
  return De.reduce(function(r, n) {
    return r.concat(e.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function Er(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(r) {
      Promise.resolve().then(function() {
        e = void 0, r(t());
      });
    })), e;
  };
}
function H(t) {
  for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
    r[n - 1] = arguments[n];
  return [].concat(r).reduce(function(o, a) {
    return o.replace(/%s/, a);
  }, t);
}
var G = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s', Ar = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available', Qe = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function Pr(t) {
  t.forEach(function(e) {
    [].concat(Object.keys(e), Qe).filter(function(r, n, o) {
      return o.indexOf(r) === n;
    }).forEach(function(r) {
      switch (r) {
        case "name":
          typeof e.name != "string" && console.error(H(G, String(e.name), '"name"', '"string"', '"' + String(e.name) + '"'));
          break;
        case "enabled":
          typeof e.enabled != "boolean" && console.error(H(G, e.name, '"enabled"', '"boolean"', '"' + String(e.enabled) + '"'));
          break;
        case "phase":
          De.indexOf(e.phase) < 0 && console.error(H(G, e.name, '"phase"', "either " + De.join(", "), '"' + String(e.phase) + '"'));
          break;
        case "fn":
          typeof e.fn != "function" && console.error(H(G, e.name, '"fn"', '"function"', '"' + String(e.fn) + '"'));
          break;
        case "effect":
          e.effect != null && typeof e.effect != "function" && console.error(H(G, e.name, '"effect"', '"function"', '"' + String(e.fn) + '"'));
          break;
        case "requires":
          e.requires != null && !Array.isArray(e.requires) && console.error(H(G, e.name, '"requires"', '"array"', '"' + String(e.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(e.requiresIfExists) || console.error(H(G, e.name, '"requiresIfExists"', '"array"', '"' + String(e.requiresIfExists) + '"'));
          break;
        case "options":
        case "data":
          break;
        default:
          console.error('PopperJS: an invalid property has been provided to the "' + e.name + '" modifier, valid properties are ' + Qe.map(function(n) {
            return '"' + n + '"';
          }).join(", ") + '; but "' + r + '" was provided.');
      }
      e.requires && e.requires.forEach(function(n) {
        t.find(function(o) {
          return o.name === n;
        }) == null && console.error(H(Ar, String(e.name), n, n));
      });
    });
  });
}
function Dr(t, e) {
  var r = /* @__PURE__ */ new Set();
  return t.filter(function(n) {
    var o = e(n);
    if (!r.has(o))
      return r.add(o), !0;
  });
}
function Sr(t) {
  var e = t.reduce(function(r, n) {
    var o = r[n.name];
    return r[n.name] = o ? Object.assign({}, o, n, {
      options: Object.assign({}, o.options, n.options),
      data: Object.assign({}, o.data, n.data)
    }) : n, r;
  }, {});
  return Object.keys(e).map(function(r) {
    return e[r];
  });
}
var Ze = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.", Rr = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.", et = {
  placement: "bottom",
  modifiers: [],
  strategy: "absolute"
};
function tt() {
  for (var t = arguments.length, e = new Array(t), r = 0; r < t; r++)
    e[r] = arguments[r];
  return !e.some(function(n) {
    return !(n && typeof n.getBoundingClientRect == "function");
  });
}
function Tr(t) {
  t === void 0 && (t = {});
  var e = t, r = e.defaultModifiers, n = r === void 0 ? [] : r, o = e.defaultOptions, a = o === void 0 ? et : o;
  return function(s, i, c) {
    c === void 0 && (c = a);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, et, a),
      modifiersData: {},
      elements: {
        reference: s,
        popper: i
      },
      attributes: {},
      styles: {}
    }, h = [], b = !1, l = {
      state: p,
      setOptions: function(w) {
        var A = typeof w == "function" ? w(p.options) : w;
        m(), p.options = Object.assign({}, a, p.options, A), p.scrollParents = {
          reference: K(s) ? se(s) : s.contextElement ? se(s.contextElement) : [],
          popper: se(i)
        };
        var E = Or(Sr([].concat(n, p.options.modifiers)));
        if (p.orderedModifiers = E.filter(function(y) {
          return y.enabled;
        }), process.env.NODE_ENV !== "production") {
          var u = Dr([].concat(E, p.options.modifiers), function(y) {
            var R = y.name;
            return R;
          });
          if (Pr(u), I(p.options.placement) === we) {
            var g = p.orderedModifiers.find(function(y) {
              var R = y.name;
              return R === "flip";
            });
            g || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var v = V(i), O = v.marginTop, P = v.marginRight, D = v.marginBottom, S = v.marginLeft;
          [O, P, D, S].some(function(y) {
            return parseFloat(y);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return x(), l.update();
      },
      forceUpdate: function() {
        if (!b) {
          var w = p.elements, A = w.reference, E = w.popper;
          if (!tt(A, E)) {
            process.env.NODE_ENV !== "production" && console.error(Ze);
            return;
          }
          p.rects = {
            reference: wr(A, le(E), p.options.strategy === "fixed"),
            popper: je(E)
          }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(y) {
            return p.modifiersData[y.name] = Object.assign({}, y.data);
          });
          for (var u = 0, g = 0; g < p.orderedModifiers.length; g++) {
            if (process.env.NODE_ENV !== "production" && (u += 1, u > 100)) {
              console.error(Rr);
              break;
            }
            if (p.reset === !0) {
              p.reset = !1, g = -1;
              continue;
            }
            var v = p.orderedModifiers[g], O = v.fn, P = v.options, D = P === void 0 ? {} : P, S = v.name;
            typeof O == "function" && (p = O({
              state: p,
              options: D,
              name: S,
              instance: l
            }) || p);
          }
        }
      },
      update: Er(function() {
        return new Promise(function(d) {
          l.forceUpdate(), d(p);
        });
      }),
      destroy: function() {
        m(), b = !0;
      }
    };
    if (!tt(s, i))
      return process.env.NODE_ENV !== "production" && console.error(Ze), l;
    l.setOptions(c).then(function(d) {
      !b && c.onFirstUpdate && c.onFirstUpdate(d);
    });
    function x() {
      p.orderedModifiers.forEach(function(d) {
        var w = d.name, A = d.options, E = A === void 0 ? {} : A, u = d.effect;
        if (typeof u == "function") {
          var g = u({
            state: p,
            name: w,
            instance: l,
            options: E
          }), v = function() {
          };
          h.push(g || v);
        }
      });
    }
    function m() {
      h.forEach(function(d) {
        return d();
      }), h = [];
    }
    return l;
  };
}
var jr = [Gt, vr, zt, Lt, lr, ir, mr, _t, pr], Br = /* @__PURE__ */ Tr({
  defaultModifiers: jr
});
const $r = {
  props: {
    offset: Array,
    popper: Object,
    show: Boolean,
    target: {
      type: HTMLElement,
      required: !0
    },
    top: Boolean,
    bottom: Boolean,
    left: Boolean,
    right: Boolean
  },
  data() {
    return {
      currentShow: !1,
      popperInstance: null
    };
  },
  methods: {
    open() {
      this.currentShow = !0;
    },
    close() {
      this.currentShow = !1;
    }
  },
  computed: {
    placement() {
      return this.bottom ? "bottom" : this.left ? "left" : this.right ? "right" : "top";
    },
    tooltipClasses() {
      return {
        show: this.currentShow,
        [`bs-tooltip-${this.placement}`]: !0
      };
    }
  },
  mounted() {
    this.popperInstance = Br(this.target, this.$el, Object.assign({
      placement: this.placement,
      modifiers: [{
        name: "offset",
        options: {
          offset: [0, 6]
        }
      }, {
        name: "arrow",
        options: {
          element: this.$refs.arrow
        }
      }]
    }, this.popper)), this.$nextTick(() => {
      this.currentShow = this.show;
    });
  },
  beforeDestroy() {
    this.popperInstance && this.popperInstance.destroy();
  }
}, kr = {
  mixins: [
    $r
  ]
};
const Cr = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, o] of e)
    r[n] = o;
  return r;
}, Nr = {
  ref: "arrow",
  class: "tooltip-arrow"
}, Lr = {
  ref: "inner",
  class: "tooltip-inner"
};
function Mr(t, e, r, n, o, a) {
  return gt(), yt("div", {
    class: bt(["tooltip", t.tooltipClasses]),
    role: "tooltip"
  }, [
    Fe("div", Nr, null, 512),
    Fe("div", Lr, [
      wt(t.$slots, "default")
    ], 512)
  ], 2);
}
const Ir = /* @__PURE__ */ Cr(kr, [["render", Mr]]);
function Wr(t, e = {}) {
  function r(n, o = {}) {
    const a = document.createElement("template"), f = n.getAttribute("data-tooltip") || "", s = xt(Ir, Object.assign({
      target: n,
      show: !0
    }, o), () => f);
    Ot(s, a);
    const [i] = [...a.children];
    return document.body.append(i), {
      el: i,
      vnode: s,
      close() {
        var c;
        (c = s.component) == null || c.ctx.close(), setTimeout(() => i.remove(), 150);
      }
    };
  }
  t.mixin({
    created() {
      console.log("created");
    }
  }), t.directive("tooltip", (n, o) => {
    n.getAttribute("data-tooltip") || n.setAttribute("data-tooltip", n.getAttribute("title")), n.removeAttribute("title"), n.addEventListener("mouseover", (a) => {
      clearTimeout(n.timer), n.tooltip || (n.timer = setTimeout(() => {
        n.tooltip = r(n, {
          top: o.modifiers.top,
          bottom: o.modifiers.bottom,
          left: o.modifiers.left,
          right: o.modifiers.right
        });
      }, 1e3));
    }), n.addEventListener("mouseout", (a) => {
      clearTimeout(n.timer), n.tooltip && (n.timer = setTimeout(() => {
        n.tooltip && n.tooltip.close(), n.tooltip = null;
      }, 1e3));
    });
  });
}
export {
  Ir as Tooltip,
  Wr as TooltipPlugin
};
