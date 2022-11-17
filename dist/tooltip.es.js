import { openBlock as gt, createElementBlock as bt, normalizeClass as yt, createElementVNode as Fe, renderSlot as wt, createTextVNode as xt, toDisplayString as Ot, h as Et, render as At } from "vue";
var j = "top", C = "bottom", k = "right", $ = "left", we = "auto", fe = [j, C, k, $], Z = "start", pe = "end", Pt = "clippingParents", rt = "viewport", ae = "popper", St = "reference", Xe = /* @__PURE__ */ fe.reduce(function(t, e) {
  return t.concat([e + "-" + Z, e + "-" + pe]);
}, []), nt = /* @__PURE__ */ [].concat(fe, [we]).reduce(function(t, e) {
  return t.concat([e, e + "-" + Z, e + "-" + pe]);
}, []), Dt = "beforeRead", Rt = "read", Tt = "afterRead", jt = "beforeMain", $t = "main", Nt = "afterMain", Bt = "beforeWrite", Ct = "write", kt = "afterWrite", Se = [Dt, Rt, Tt, jt, $t, Nt, Bt, Ct, kt];
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
function B(t) {
  var e = L(t).HTMLElement;
  return t instanceof e || t instanceof HTMLElement;
}
function Te(t) {
  if (typeof ShadowRoot > "u")
    return !1;
  var e = L(t).ShadowRoot;
  return t instanceof e || t instanceof ShadowRoot;
}
function Lt(t) {
  var e = t.state;
  Object.keys(e.elements).forEach(function(r) {
    var n = e.styles[r] || {}, o = e.attributes[r] || {}, s = e.elements[r];
    !B(s) || !W(s) || (Object.assign(s.style, n), Object.keys(o).forEach(function(c) {
      var i = o[c];
      i === !1 ? s.removeAttribute(c) : s.setAttribute(c, i === !0 ? "" : i);
    }));
  });
}
function Mt(t) {
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
      var o = e.elements[n], s = e.attributes[n] || {}, c = Object.keys(e.styles.hasOwnProperty(n) ? e.styles[n] : r[n]), i = c.reduce(function(a, f) {
        return a[f] = "", a;
      }, {});
      !B(o) || !W(o) || (Object.assign(o.style, i), Object.keys(s).forEach(function(a) {
        o.removeAttribute(a);
      }));
    });
  };
}
const It = {
  name: "applyStyles",
  enabled: !0,
  phase: "write",
  fn: Lt,
  effect: Mt,
  requires: ["computeStyles"]
};
function I(t) {
  return t.split("-")[0];
}
var J = Math.max, ye = Math.min, ee = Math.round;
function De() {
  var t = navigator.userAgentData;
  return t != null && t.brands ? t.brands.map(function(e) {
    return e.brand + "/" + e.version;
  }).join(" ") : navigator.userAgent;
}
function ot() {
  return !/^((?!chrome|android).)*safari/i.test(De());
}
function te(t, e, r) {
  e === void 0 && (e = !1), r === void 0 && (r = !1);
  var n = t.getBoundingClientRect(), o = 1, s = 1;
  e && B(t) && (o = t.offsetWidth > 0 && ee(n.width) / t.offsetWidth || 1, s = t.offsetHeight > 0 && ee(n.height) / t.offsetHeight || 1);
  var c = K(t) ? L(t) : window, i = c.visualViewport, a = !ot() && r, f = (n.left + (a && i ? i.offsetLeft : 0)) / o, p = (n.top + (a && i ? i.offsetTop : 0)) / s, u = n.width / o, v = n.height / s;
  return {
    width: u,
    height: v,
    top: p,
    right: f + u,
    bottom: p + v,
    left: f,
    x: f,
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
function Vt(t) {
  return ["table", "td", "th"].indexOf(W(t)) >= 0;
}
function _(t) {
  return ((K(t) ? t.ownerDocument : t.document) || window.document).documentElement;
}
function xe(t) {
  return W(t) === "html" ? t : t.assignedSlot || t.parentNode || (Te(t) ? t.host : null) || _(t);
}
function Ye(t) {
  return !B(t) || V(t).position === "fixed" ? null : t.offsetParent;
}
function Wt(t) {
  var e = /firefox/i.test(De()), r = /Trident/i.test(De());
  if (r && B(t)) {
    var n = V(t);
    if (n.position === "fixed")
      return null;
  }
  var o = xe(t);
  for (Te(o) && (o = o.host); B(o) && ["html", "body"].indexOf(W(o)) < 0; ) {
    var s = V(o);
    if (s.transform !== "none" || s.perspective !== "none" || s.contain === "paint" || ["transform", "perspective"].indexOf(s.willChange) !== -1 || e && s.willChange === "filter" || e && s.filter && s.filter !== "none")
      return o;
    o = o.parentNode;
  }
  return null;
}
function le(t) {
  for (var e = L(t), r = Ye(t); r && Vt(r) && V(r).position === "static"; )
    r = Ye(r);
  return r && (W(r) === "html" || W(r) === "body" && V(r).position === "static") ? e : r || Wt(t) || e;
}
function $e(t) {
  return ["top", "bottom"].indexOf(t) >= 0 ? "x" : "y";
}
function ie(t, e, r) {
  return J(t, ye(e, r));
}
function Ht(t, e, r) {
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
var qt = function(e, r) {
  return e = typeof e == "function" ? e(Object.assign({}, r.rects, {
    placement: r.placement
  })) : e, st(typeof e != "number" ? e : pt(e, fe));
};
function _t(t) {
  var e, r = t.state, n = t.name, o = t.options, s = r.elements.arrow, c = r.modifiersData.popperOffsets, i = I(r.placement), a = $e(i), f = [$, k].indexOf(i) >= 0, p = f ? "height" : "width";
  if (!(!s || !c)) {
    var u = qt(o.padding, r), v = je(s), d = a === "y" ? j : $, x = a === "y" ? C : k, h = r.rects.reference[p] + r.rects.reference[a] - c[a] - r.rects.popper[p], l = c[a] - r.rects.reference[a], y = le(s), A = y ? a === "y" ? y.clientHeight || 0 : y.clientWidth || 0 : 0, O = h / 2 - l / 2, m = u[d], b = A - v[p] - u[x], g = A / 2 - v[p] / 2 + O, E = ie(m, g, b), P = a;
    r.modifiersData[n] = (e = {}, e[P] = E, e.centerOffset = E - g, e);
  }
}
function Ft(t) {
  var e = t.state, r = t.options, n = r.element, o = n === void 0 ? "[data-popper-arrow]" : n;
  if (o != null && !(typeof o == "string" && (o = e.elements.popper.querySelector(o), !o))) {
    if (process.env.NODE_ENV !== "production" && (B(o) || console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).', "To use an SVG arrow, wrap it in an HTMLElement that will be used as", "the arrow."].join(" "))), !at(e.elements.popper, o)) {
      process.env.NODE_ENV !== "production" && console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper', "element."].join(" "));
      return;
    }
    e.elements.arrow = o;
  }
}
const Xt = {
  name: "arrow",
  enabled: !0,
  phase: "main",
  fn: _t,
  effect: Ft,
  requires: ["popperOffsets"],
  requiresIfExists: ["preventOverflow"]
};
function re(t) {
  return t.split("-")[1];
}
var Yt = {
  top: "auto",
  right: "auto",
  bottom: "auto",
  left: "auto"
};
function zt(t) {
  var e = t.x, r = t.y, n = window, o = n.devicePixelRatio || 1;
  return {
    x: ee(e * o) / o || 0,
    y: ee(r * o) / o || 0
  };
}
function ze(t) {
  var e, r = t.popper, n = t.popperRect, o = t.placement, s = t.variation, c = t.offsets, i = t.position, a = t.gpuAcceleration, f = t.adaptive, p = t.roundOffsets, u = t.isFixed, v = c.x, d = v === void 0 ? 0 : v, x = c.y, h = x === void 0 ? 0 : x, l = typeof p == "function" ? p({
    x: d,
    y: h
  }) : {
    x: d,
    y: h
  };
  d = l.x, h = l.y;
  var y = c.hasOwnProperty("x"), A = c.hasOwnProperty("y"), O = $, m = j, b = window;
  if (f) {
    var g = le(r), E = "clientHeight", P = "clientWidth";
    if (g === L(r) && (g = _(r), V(g).position !== "static" && i === "absolute" && (E = "scrollHeight", P = "scrollWidth")), g = g, o === j || (o === $ || o === k) && s === pe) {
      m = C;
      var S = u && g === b && b.visualViewport ? b.visualViewport.height : g[E];
      h -= S - n.height, h *= a ? 1 : -1;
    }
    if (o === $ || (o === j || o === C) && s === pe) {
      O = k;
      var D = u && g === b && b.visualViewport ? b.visualViewport.width : g[P];
      d -= D - n.width, d *= a ? 1 : -1;
    }
  }
  var w = Object.assign({
    position: i
  }, f && Yt), R = p === !0 ? zt({
    x: d,
    y: h
  }) : {
    x: d,
    y: h
  };
  if (d = R.x, h = R.y, a) {
    var T;
    return Object.assign({}, w, (T = {}, T[m] = A ? "0" : "", T[O] = y ? "0" : "", T.transform = (b.devicePixelRatio || 1) <= 1 ? "translate(" + d + "px, " + h + "px)" : "translate3d(" + d + "px, " + h + "px, 0)", T));
  }
  return Object.assign({}, w, (e = {}, e[m] = A ? h + "px" : "", e[O] = y ? d + "px" : "", e.transform = "", e));
}
function Ut(t) {
  var e = t.state, r = t.options, n = r.gpuAcceleration, o = n === void 0 ? !0 : n, s = r.adaptive, c = s === void 0 ? !0 : s, i = r.roundOffsets, a = i === void 0 ? !0 : i;
  if (process.env.NODE_ENV !== "production") {
    var f = V(e.elements.popper).transitionProperty || "";
    c && ["transform", "top", "right", "bottom", "left"].some(function(u) {
      return f.indexOf(u) >= 0;
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
    adaptive: c,
    roundOffsets: a
  })))), e.modifiersData.arrow != null && (e.styles.arrow = Object.assign({}, e.styles.arrow, ze(Object.assign({}, p, {
    offsets: e.modifiersData.arrow,
    position: "absolute",
    adaptive: !1,
    roundOffsets: a
  })))), e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-placement": e.placement
  });
}
const Gt = {
  name: "computeStyles",
  enabled: !0,
  phase: "beforeWrite",
  fn: Ut,
  data: {}
};
var ge = {
  passive: !0
};
function Jt(t) {
  var e = t.state, r = t.instance, n = t.options, o = n.scroll, s = o === void 0 ? !0 : o, c = n.resize, i = c === void 0 ? !0 : c, a = L(e.elements.popper), f = [].concat(e.scrollParents.reference, e.scrollParents.popper);
  return s && f.forEach(function(p) {
    p.addEventListener("scroll", r.update, ge);
  }), i && a.addEventListener("resize", r.update, ge), function() {
    s && f.forEach(function(p) {
      p.removeEventListener("scroll", r.update, ge);
    }), i && a.removeEventListener("resize", r.update, ge);
  };
}
const Kt = {
  name: "eventListeners",
  enabled: !0,
  phase: "write",
  fn: function() {
  },
  effect: Jt,
  data: {}
};
var Qt = {
  left: "right",
  right: "left",
  bottom: "top",
  top: "bottom"
};
function be(t) {
  return t.replace(/left|right|bottom|top/g, function(e) {
    return Qt[e];
  });
}
var Zt = {
  start: "end",
  end: "start"
};
function Ue(t) {
  return t.replace(/start|end/g, function(e) {
    return Zt[e];
  });
}
function Ne(t) {
  var e = L(t), r = e.pageXOffset, n = e.pageYOffset;
  return {
    scrollLeft: r,
    scrollTop: n
  };
}
function Be(t) {
  return te(_(t)).left + Ne(t).scrollLeft;
}
function er(t, e) {
  var r = L(t), n = _(t), o = r.visualViewport, s = n.clientWidth, c = n.clientHeight, i = 0, a = 0;
  if (o) {
    s = o.width, c = o.height;
    var f = ot();
    (f || !f && e === "fixed") && (i = o.offsetLeft, a = o.offsetTop);
  }
  return {
    width: s,
    height: c,
    x: i + Be(t),
    y: a
  };
}
function tr(t) {
  var e, r = _(t), n = Ne(t), o = (e = t.ownerDocument) == null ? void 0 : e.body, s = J(r.scrollWidth, r.clientWidth, o ? o.scrollWidth : 0, o ? o.clientWidth : 0), c = J(r.scrollHeight, r.clientHeight, o ? o.scrollHeight : 0, o ? o.clientHeight : 0), i = -n.scrollLeft + Be(t), a = -n.scrollTop;
  return V(o || r).direction === "rtl" && (i += J(r.clientWidth, o ? o.clientWidth : 0) - s), {
    width: s,
    height: c,
    x: i,
    y: a
  };
}
function Ce(t) {
  var e = V(t), r = e.overflow, n = e.overflowX, o = e.overflowY;
  return /auto|scroll|overlay|hidden/.test(r + o + n);
}
function ct(t) {
  return ["html", "body", "#document"].indexOf(W(t)) >= 0 ? t.ownerDocument.body : B(t) && Ce(t) ? t : ct(xe(t));
}
function se(t, e) {
  var r;
  e === void 0 && (e = []);
  var n = ct(t), o = n === ((r = t.ownerDocument) == null ? void 0 : r.body), s = L(n), c = o ? [s].concat(s.visualViewport || [], Ce(n) ? n : []) : n, i = e.concat(c);
  return o ? i : i.concat(se(xe(c)));
}
function Re(t) {
  return Object.assign({}, t, {
    left: t.x,
    top: t.y,
    right: t.x + t.width,
    bottom: t.y + t.height
  });
}
function rr(t, e) {
  var r = te(t, !1, e === "fixed");
  return r.top = r.top + t.clientTop, r.left = r.left + t.clientLeft, r.bottom = r.top + t.clientHeight, r.right = r.left + t.clientWidth, r.width = t.clientWidth, r.height = t.clientHeight, r.x = r.left, r.y = r.top, r;
}
function Ge(t, e, r) {
  return e === rt ? Re(er(t, r)) : K(e) ? rr(e, r) : Re(tr(_(t)));
}
function nr(t) {
  var e = se(xe(t)), r = ["absolute", "fixed"].indexOf(V(t).position) >= 0, n = r && B(t) ? le(t) : t;
  return K(n) ? e.filter(function(o) {
    return K(o) && at(o, n) && W(o) !== "body";
  }) : [];
}
function or(t, e, r, n) {
  var o = e === "clippingParents" ? nr(t) : [].concat(e), s = [].concat(o, [r]), c = s[0], i = s.reduce(function(a, f) {
    var p = Ge(t, f, n);
    return a.top = J(p.top, a.top), a.right = ye(p.right, a.right), a.bottom = ye(p.bottom, a.bottom), a.left = J(p.left, a.left), a;
  }, Ge(t, c, n));
  return i.width = i.right - i.left, i.height = i.bottom - i.top, i.x = i.left, i.y = i.top, i;
}
function ft(t) {
  var e = t.reference, r = t.element, n = t.placement, o = n ? I(n) : null, s = n ? re(n) : null, c = e.x + e.width / 2 - r.width / 2, i = e.y + e.height / 2 - r.height / 2, a;
  switch (o) {
    case j:
      a = {
        x: c,
        y: e.y - r.height
      };
      break;
    case C:
      a = {
        x: c,
        y: e.y + e.height
      };
      break;
    case k:
      a = {
        x: e.x + e.width,
        y: i
      };
      break;
    case $:
      a = {
        x: e.x - r.width,
        y: i
      };
      break;
    default:
      a = {
        x: e.x,
        y: e.y
      };
  }
  var f = o ? $e(o) : null;
  if (f != null) {
    var p = f === "y" ? "height" : "width";
    switch (s) {
      case Z:
        a[f] = a[f] - (e[p] / 2 - r[p] / 2);
        break;
      case pe:
        a[f] = a[f] + (e[p] / 2 - r[p] / 2);
        break;
    }
  }
  return a;
}
function ce(t, e) {
  e === void 0 && (e = {});
  var r = e, n = r.placement, o = n === void 0 ? t.placement : n, s = r.strategy, c = s === void 0 ? t.strategy : s, i = r.boundary, a = i === void 0 ? Pt : i, f = r.rootBoundary, p = f === void 0 ? rt : f, u = r.elementContext, v = u === void 0 ? ae : u, d = r.altBoundary, x = d === void 0 ? !1 : d, h = r.padding, l = h === void 0 ? 0 : h, y = st(typeof l != "number" ? l : pt(l, fe)), A = v === ae ? St : ae, O = t.rects.popper, m = t.elements[x ? A : v], b = or(K(m) ? m : m.contextElement || _(t.elements.popper), a, p, c), g = te(t.elements.reference), E = ft({
    reference: g,
    element: O,
    strategy: "absolute",
    placement: o
  }), P = Re(Object.assign({}, O, E)), S = v === ae ? P : g, D = {
    top: b.top - S.top + y.top,
    bottom: S.bottom - b.bottom + y.bottom,
    left: b.left - S.left + y.left,
    right: S.right - b.right + y.right
  }, w = t.modifiersData.offset;
  if (v === ae && w) {
    var R = w[o];
    Object.keys(D).forEach(function(T) {
      var F = [k, C].indexOf(T) >= 0 ? 1 : -1, X = [j, C].indexOf(T) >= 0 ? "y" : "x";
      D[T] += R[X] * F;
    });
  }
  return D;
}
function ar(t, e) {
  e === void 0 && (e = {});
  var r = e, n = r.placement, o = r.boundary, s = r.rootBoundary, c = r.padding, i = r.flipVariations, a = r.allowedAutoPlacements, f = a === void 0 ? nt : a, p = re(n), u = p ? i ? Xe : Xe.filter(function(x) {
    return re(x) === p;
  }) : fe, v = u.filter(function(x) {
    return f.indexOf(x) >= 0;
  });
  v.length === 0 && (v = u, process.env.NODE_ENV !== "production" && console.error(["Popper: The `allowedAutoPlacements` option did not allow any", "placements. Ensure the `placement` option matches the variation", "of the allowed placements.", 'For example, "auto" cannot be used to allow "bottom-start".', 'Use "auto-start" instead.'].join(" ")));
  var d = v.reduce(function(x, h) {
    return x[h] = ce(t, {
      placement: h,
      boundary: o,
      rootBoundary: s,
      padding: c
    })[I(h)], x;
  }, {});
  return Object.keys(d).sort(function(x, h) {
    return d[x] - d[h];
  });
}
function ir(t) {
  if (I(t) === we)
    return [];
  var e = be(t);
  return [Ue(t), e, Ue(e)];
}
function sr(t) {
  var e = t.state, r = t.options, n = t.name;
  if (!e.modifiersData[n]._skip) {
    for (var o = r.mainAxis, s = o === void 0 ? !0 : o, c = r.altAxis, i = c === void 0 ? !0 : c, a = r.fallbackPlacements, f = r.padding, p = r.boundary, u = r.rootBoundary, v = r.altBoundary, d = r.flipVariations, x = d === void 0 ? !0 : d, h = r.allowedAutoPlacements, l = e.options.placement, y = I(l), A = y === l, O = a || (A || !x ? [be(l)] : ir(l)), m = [l].concat(O).reduce(function(Q, H) {
      return Q.concat(I(H) === we ? ar(e, {
        placement: H,
        boundary: p,
        rootBoundary: u,
        padding: f,
        flipVariations: x,
        allowedAutoPlacements: h
      }) : H);
    }, []), b = e.rects.reference, g = e.rects.popper, E = /* @__PURE__ */ new Map(), P = !0, S = m[0], D = 0; D < m.length; D++) {
      var w = m[D], R = I(w), T = re(w) === Z, F = [j, C].indexOf(R) >= 0, X = F ? "width" : "height", N = ce(e, {
        placement: w,
        boundary: p,
        rootBoundary: u,
        altBoundary: v,
        padding: f
      }), M = F ? T ? k : $ : T ? C : j;
      b[X] > g[X] && (M = be(M));
      var ue = be(M), Y = [];
      if (s && Y.push(N[R] <= 0), i && Y.push(N[M] <= 0, N[ue] <= 0), Y.every(function(Q) {
        return Q;
      })) {
        S = w, P = !1;
        break;
      }
      E.set(w, Y);
    }
    if (P)
      for (var de = x ? 3 : 1, Oe = function(H) {
        var oe = m.find(function(he) {
          var z = E.get(he);
          if (z)
            return z.slice(0, H).every(function(Ee) {
              return Ee;
            });
        });
        if (oe)
          return S = oe, "break";
      }, ne = de; ne > 0; ne--) {
        var ve = Oe(ne);
        if (ve === "break")
          break;
      }
    e.placement !== S && (e.modifiersData[n]._skip = !0, e.placement = S, e.reset = !0);
  }
}
const pr = {
  name: "flip",
  enabled: !0,
  phase: "main",
  fn: sr,
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
  return [j, k, C, $].some(function(e) {
    return t[e] >= 0;
  });
}
function cr(t) {
  var e = t.state, r = t.name, n = e.rects.reference, o = e.rects.popper, s = e.modifiersData.preventOverflow, c = ce(e, {
    elementContext: "reference"
  }), i = ce(e, {
    altBoundary: !0
  }), a = Je(c, n), f = Je(i, o, s), p = Ke(a), u = Ke(f);
  e.modifiersData[r] = {
    referenceClippingOffsets: a,
    popperEscapeOffsets: f,
    isReferenceHidden: p,
    hasPopperEscaped: u
  }, e.attributes.popper = Object.assign({}, e.attributes.popper, {
    "data-popper-reference-hidden": p,
    "data-popper-escaped": u
  });
}
const fr = {
  name: "hide",
  enabled: !0,
  phase: "main",
  requiresIfExists: ["preventOverflow"],
  fn: cr
};
function lr(t, e, r) {
  var n = I(t), o = [$, j].indexOf(n) >= 0 ? -1 : 1, s = typeof r == "function" ? r(Object.assign({}, e, {
    placement: t
  })) : r, c = s[0], i = s[1];
  return c = c || 0, i = (i || 0) * o, [$, k].indexOf(n) >= 0 ? {
    x: i,
    y: c
  } : {
    x: c,
    y: i
  };
}
function ur(t) {
  var e = t.state, r = t.options, n = t.name, o = r.offset, s = o === void 0 ? [0, 0] : o, c = nt.reduce(function(p, u) {
    return p[u] = lr(u, e.rects, s), p;
  }, {}), i = c[e.placement], a = i.x, f = i.y;
  e.modifiersData.popperOffsets != null && (e.modifiersData.popperOffsets.x += a, e.modifiersData.popperOffsets.y += f), e.modifiersData[n] = c;
}
const dr = {
  name: "offset",
  enabled: !0,
  phase: "main",
  requires: ["popperOffsets"],
  fn: ur
};
function vr(t) {
  var e = t.state, r = t.name;
  e.modifiersData[r] = ft({
    reference: e.rects.reference,
    element: e.rects.popper,
    strategy: "absolute",
    placement: e.placement
  });
}
const hr = {
  name: "popperOffsets",
  enabled: !0,
  phase: "read",
  fn: vr,
  data: {}
};
function mr(t) {
  return t === "x" ? "y" : "x";
}
function gr(t) {
  var e = t.state, r = t.options, n = t.name, o = r.mainAxis, s = o === void 0 ? !0 : o, c = r.altAxis, i = c === void 0 ? !1 : c, a = r.boundary, f = r.rootBoundary, p = r.altBoundary, u = r.padding, v = r.tether, d = v === void 0 ? !0 : v, x = r.tetherOffset, h = x === void 0 ? 0 : x, l = ce(e, {
    boundary: a,
    rootBoundary: f,
    padding: u,
    altBoundary: p
  }), y = I(e.placement), A = re(e.placement), O = !A, m = $e(y), b = mr(m), g = e.modifiersData.popperOffsets, E = e.rects.reference, P = e.rects.popper, S = typeof h == "function" ? h(Object.assign({}, e.rects, {
    placement: e.placement
  })) : h, D = typeof S == "number" ? {
    mainAxis: S,
    altAxis: S
  } : Object.assign({
    mainAxis: 0,
    altAxis: 0
  }, S), w = e.modifiersData.offset ? e.modifiersData.offset[e.placement] : null, R = {
    x: 0,
    y: 0
  };
  if (!!g) {
    if (s) {
      var T, F = m === "y" ? j : $, X = m === "y" ? C : k, N = m === "y" ? "height" : "width", M = g[m], ue = M + l[F], Y = M - l[X], de = d ? -P[N] / 2 : 0, Oe = A === Z ? E[N] : P[N], ne = A === Z ? -P[N] : -E[N], ve = e.elements.arrow, Q = d && ve ? je(ve) : {
        width: 0,
        height: 0
      }, H = e.modifiersData["arrow#persistent"] ? e.modifiersData["arrow#persistent"].padding : it(), oe = H[F], he = H[X], z = ie(0, E[N], Q[N]), Ee = O ? E[N] / 2 - de - z - oe - D.mainAxis : Oe - z - oe - D.mainAxis, lt = O ? -E[N] / 2 + de + z + he + D.mainAxis : ne + z + he + D.mainAxis, Ae = e.elements.arrow && le(e.elements.arrow), ut = Ae ? m === "y" ? Ae.clientTop || 0 : Ae.clientLeft || 0 : 0, ke = (T = w == null ? void 0 : w[m]) != null ? T : 0, dt = M + Ee - ke - ut, vt = M + lt - ke, Le = ie(d ? ye(ue, dt) : ue, M, d ? J(Y, vt) : Y);
      g[m] = Le, R[m] = Le - M;
    }
    if (i) {
      var Me, ht = m === "x" ? j : $, mt = m === "x" ? C : k, U = g[b], me = b === "y" ? "height" : "width", Ie = U + l[ht], Ve = U - l[mt], Pe = [j, $].indexOf(y) !== -1, We = (Me = w == null ? void 0 : w[b]) != null ? Me : 0, He = Pe ? Ie : U - E[me] - P[me] - We + D.altAxis, qe = Pe ? U + E[me] + P[me] - We - D.altAxis : Ve, _e = d && Pe ? Ht(He, U, qe) : ie(d ? He : Ie, U, d ? qe : Ve);
      g[b] = _e, R[b] = _e - U;
    }
    e.modifiersData[n] = R;
  }
}
const br = {
  name: "preventOverflow",
  enabled: !0,
  phase: "main",
  fn: gr,
  requiresIfExists: ["offset"]
};
function yr(t) {
  return {
    scrollLeft: t.scrollLeft,
    scrollTop: t.scrollTop
  };
}
function wr(t) {
  return t === L(t) || !B(t) ? Ne(t) : yr(t);
}
function xr(t) {
  var e = t.getBoundingClientRect(), r = ee(e.width) / t.offsetWidth || 1, n = ee(e.height) / t.offsetHeight || 1;
  return r !== 1 || n !== 1;
}
function Or(t, e, r) {
  r === void 0 && (r = !1);
  var n = B(e), o = B(e) && xr(e), s = _(e), c = te(t, o, r), i = {
    scrollLeft: 0,
    scrollTop: 0
  }, a = {
    x: 0,
    y: 0
  };
  return (n || !n && !r) && ((W(e) !== "body" || Ce(s)) && (i = wr(e)), B(e) ? (a = te(e, !0), a.x += e.clientLeft, a.y += e.clientTop) : s && (a.x = Be(s))), {
    x: c.left + i.scrollLeft - a.x,
    y: c.top + i.scrollTop - a.y,
    width: c.width,
    height: c.height
  };
}
function Er(t) {
  var e = /* @__PURE__ */ new Map(), r = /* @__PURE__ */ new Set(), n = [];
  t.forEach(function(s) {
    e.set(s.name, s);
  });
  function o(s) {
    r.add(s.name);
    var c = [].concat(s.requires || [], s.requiresIfExists || []);
    c.forEach(function(i) {
      if (!r.has(i)) {
        var a = e.get(i);
        a && o(a);
      }
    }), n.push(s);
  }
  return t.forEach(function(s) {
    r.has(s.name) || o(s);
  }), n;
}
function Ar(t) {
  var e = Er(t);
  return Se.reduce(function(r, n) {
    return r.concat(e.filter(function(o) {
      return o.phase === n;
    }));
  }, []);
}
function Pr(t) {
  var e;
  return function() {
    return e || (e = new Promise(function(r) {
      Promise.resolve().then(function() {
        e = void 0, r(t());
      });
    })), e;
  };
}
function q(t) {
  for (var e = arguments.length, r = new Array(e > 1 ? e - 1 : 0), n = 1; n < e; n++)
    r[n - 1] = arguments[n];
  return [].concat(r).reduce(function(o, s) {
    return o.replace(/%s/, s);
  }, t);
}
var G = 'Popper: modifier "%s" provided an invalid %s property, expected %s but got %s', Sr = 'Popper: modifier "%s" requires "%s", but "%s" modifier is not available', Qe = ["name", "enabled", "phase", "fn", "effect", "requires", "options"];
function Dr(t) {
  t.forEach(function(e) {
    [].concat(Object.keys(e), Qe).filter(function(r, n, o) {
      return o.indexOf(r) === n;
    }).forEach(function(r) {
      switch (r) {
        case "name":
          typeof e.name != "string" && console.error(q(G, String(e.name), '"name"', '"string"', '"' + String(e.name) + '"'));
          break;
        case "enabled":
          typeof e.enabled != "boolean" && console.error(q(G, e.name, '"enabled"', '"boolean"', '"' + String(e.enabled) + '"'));
          break;
        case "phase":
          Se.indexOf(e.phase) < 0 && console.error(q(G, e.name, '"phase"', "either " + Se.join(", "), '"' + String(e.phase) + '"'));
          break;
        case "fn":
          typeof e.fn != "function" && console.error(q(G, e.name, '"fn"', '"function"', '"' + String(e.fn) + '"'));
          break;
        case "effect":
          e.effect != null && typeof e.effect != "function" && console.error(q(G, e.name, '"effect"', '"function"', '"' + String(e.fn) + '"'));
          break;
        case "requires":
          e.requires != null && !Array.isArray(e.requires) && console.error(q(G, e.name, '"requires"', '"array"', '"' + String(e.requires) + '"'));
          break;
        case "requiresIfExists":
          Array.isArray(e.requiresIfExists) || console.error(q(G, e.name, '"requiresIfExists"', '"array"', '"' + String(e.requiresIfExists) + '"'));
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
        }) == null && console.error(q(Sr, String(e.name), n, n));
      });
    });
  });
}
function Rr(t, e) {
  var r = /* @__PURE__ */ new Set();
  return t.filter(function(n) {
    var o = e(n);
    if (!r.has(o))
      return r.add(o), !0;
  });
}
function Tr(t) {
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
var Ze = "Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.", jr = "Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.", et = {
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
function $r(t) {
  t === void 0 && (t = {});
  var e = t, r = e.defaultModifiers, n = r === void 0 ? [] : r, o = e.defaultOptions, s = o === void 0 ? et : o;
  return function(i, a, f) {
    f === void 0 && (f = s);
    var p = {
      placement: "bottom",
      orderedModifiers: [],
      options: Object.assign({}, et, s),
      modifiersData: {},
      elements: {
        reference: i,
        popper: a
      },
      attributes: {},
      styles: {}
    }, u = [], v = !1, d = {
      state: p,
      setOptions: function(y) {
        var A = typeof y == "function" ? y(p.options) : y;
        h(), p.options = Object.assign({}, s, p.options, A), p.scrollParents = {
          reference: K(i) ? se(i) : i.contextElement ? se(i.contextElement) : [],
          popper: se(a)
        };
        var O = Ar(Tr([].concat(n, p.options.modifiers)));
        if (p.orderedModifiers = O.filter(function(w) {
          return w.enabled;
        }), process.env.NODE_ENV !== "production") {
          var m = Rr([].concat(O, p.options.modifiers), function(w) {
            var R = w.name;
            return R;
          });
          if (Dr(m), I(p.options.placement) === we) {
            var b = p.orderedModifiers.find(function(w) {
              var R = w.name;
              return R === "flip";
            });
            b || console.error(['Popper: "auto" placements require the "flip" modifier be', "present and enabled to work."].join(" "));
          }
          var g = V(a), E = g.marginTop, P = g.marginRight, S = g.marginBottom, D = g.marginLeft;
          [E, P, S, D].some(function(w) {
            return parseFloat(w);
          }) && console.warn(['Popper: CSS "margin" styles cannot be used to apply padding', "between the popper and its reference element or boundary.", "To replicate margin, use the `offset` modifier, as well as", "the `padding` option in the `preventOverflow` and `flip`", "modifiers."].join(" "));
        }
        return x(), d.update();
      },
      forceUpdate: function() {
        if (!v) {
          var y = p.elements, A = y.reference, O = y.popper;
          if (!tt(A, O)) {
            process.env.NODE_ENV !== "production" && console.error(Ze);
            return;
          }
          p.rects = {
            reference: Or(A, le(O), p.options.strategy === "fixed"),
            popper: je(O)
          }, p.reset = !1, p.placement = p.options.placement, p.orderedModifiers.forEach(function(w) {
            return p.modifiersData[w.name] = Object.assign({}, w.data);
          });
          for (var m = 0, b = 0; b < p.orderedModifiers.length; b++) {
            if (process.env.NODE_ENV !== "production" && (m += 1, m > 100)) {
              console.error(jr);
              break;
            }
            if (p.reset === !0) {
              p.reset = !1, b = -1;
              continue;
            }
            var g = p.orderedModifiers[b], E = g.fn, P = g.options, S = P === void 0 ? {} : P, D = g.name;
            typeof E == "function" && (p = E({
              state: p,
              options: S,
              name: D,
              instance: d
            }) || p);
          }
        }
      },
      update: Pr(function() {
        return new Promise(function(l) {
          d.forceUpdate(), l(p);
        });
      }),
      destroy: function() {
        h(), v = !0;
      }
    };
    if (!tt(i, a))
      return process.env.NODE_ENV !== "production" && console.error(Ze), d;
    d.setOptions(f).then(function(l) {
      !v && f.onFirstUpdate && f.onFirstUpdate(l);
    });
    function x() {
      p.orderedModifiers.forEach(function(l) {
        var y = l.name, A = l.options, O = A === void 0 ? {} : A, m = l.effect;
        if (typeof m == "function") {
          var b = m({
            state: p,
            name: y,
            instance: d,
            options: O
          }), g = function() {
          };
          u.push(b || g);
        }
      });
    }
    function h() {
      u.forEach(function(l) {
        return l();
      }), u = [];
    }
    return d;
  };
}
var Nr = [Kt, hr, Gt, It, dr, pr, br, Xt, fr], Br = /* @__PURE__ */ $r({
  defaultModifiers: Nr
});
const Cr = {
  props: {
    offset: Array,
    popper: Object,
    show: Boolean,
    target: {
      type: HTMLElement,
      required: !0
    },
    title: String,
    placement: String,
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
    computedPlacement() {
      return this.placement ? this.placement : this.bottom ? "bottom" : this.left ? "left" : this.right ? "right" : "top";
    },
    tooltipClasses() {
      return {
        show: this.currentShow,
        [`bs-tooltip-${this.computedPlacement}`]: !0
      };
    }
  },
  mounted() {
    this.popperInstance = Br(this.target, this.$el, Object.assign({
      placement: this.computedPlacement,
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
    Cr
  ]
};
const Lr = (t, e) => {
  const r = t.__vccOpts || t;
  for (const [n, o] of e)
    r[n] = o;
  return r;
}, Mr = {
  ref: "arrow",
  class: "tooltip-arrow"
}, Ir = {
  ref: "inner",
  class: "tooltip-inner"
};
function Vr(t, e, r, n, o, s) {
  return gt(), bt("div", {
    class: yt(["tooltip", t.tooltipClasses]),
    role: "tooltip"
  }, [
    Fe("div", Mr, null, 512),
    Fe("div", Ir, [
      wt(t.$slots, "default", {}, () => [
        xt(Ot(t.title), 1)
      ])
    ], 512)
  ], 2);
}
const Wr = /* @__PURE__ */ Lr(kr, [["render", Vr]]);
function qr(t, e = {
  delay: void 0,
  prefix: "data-tooltip",
  triggers: {
    open: ["mouseover:750", "focus"],
    close: ["mouseout:1000", "blur"]
  }
}) {
  const r = e.prefix.replace(/[-]+$/, ""), n = new RegExp(`^${r}-`);
  function o(i) {
    return Array.from(i.attributes).map((a) => [a.name, a.value]).filter(([a]) => a === "title" || a.match(n)).map(([a, f]) => [a.replace(new RegExp(n), ""), f]).reduce((a, f) => Object.assign(a, { [f[0]]: f[1] }), {});
  }
  function s(i, a = {}) {
    const f = document.createElement("template"), p = Et(Wr, Object.assign({
      target: i,
      show: !0
    }, a));
    At(p, f);
    const [u] = [...f.children];
    return document.body.append(u), () => {
      var v;
      (v = p.component) == null || v.ctx.close(), setTimeout(() => u.remove(), 150);
    };
  }
  function c(i, a = {}) {
    const f = Object.assign({
      title: i.getAttribute(r)
    }, a, o(i));
    if (!f.title || i.hasAttribute(`${r}-id`))
      return;
    const p = Math.random().toString(36).slice(2, 7);
    let u, v;
    i.setAttribute(`${r}-id`, p), i.removeAttribute("title");
    function d(l = 0) {
      clearTimeout(v), u || (v = setTimeout(() => {
        u = s(i, f);
      }, l));
    }
    function x(l = 0) {
      clearTimeout(v), u && (v = setTimeout(() => {
        u && u(), u = null;
      }, l));
    }
    function h(l, y) {
      const [A, O] = l.split(":");
      i.addEventListener(A, () => y(Number(O || 0)));
    }
    e.triggers.open.map((l) => h(l, d)), e.triggers.close.map((l) => h(l, x));
  }
  t.mixin({
    mounted() {
      let i = this.$el;
      this.$el instanceof Text && (i = this.$el.parentNode), i instanceof HTMLElement && c(i);
      const a = document.createTreeWalker(
        i,
        NodeFilter.SHOW_ALL,
        (f) => f instanceof Element ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
      );
      for (; a.nextNode(); )
        a.currentNode instanceof Element && c(a.currentNode);
    }
  }), t.directive("tooltip", (i, a) => c(
    i,
    Object.assign({}, a.modifiers, a.value)
  ));
}
export {
  Wr as Tooltip,
  qr as TooltipPlugin
};
