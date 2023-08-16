import { defineComponent as B, ref as b, computed as x, onMounted as L, nextTick as O, onBeforeUnmount as S, openBlock as j, createElementBlock as k, normalizeClass as C, createElementVNode as w, renderSlot as F, createTextVNode as M, toDisplayString as R, h as P, render as I } from "vue";
import { createPopper as H } from "@popperjs/core";
const U = {
  ref: "inner",
  class: "tooltip-inner"
}, V = /* @__PURE__ */ B({
  __name: "Tooltip",
  props: {
    offset: {},
    popper: {},
    placement: {},
    target: {},
    title: {},
    show: { type: Boolean },
    top: { type: Boolean },
    bottom: { type: Boolean },
    left: { type: Boolean },
    right: { type: Boolean }
  },
  setup(v, { expose: h }) {
    const n = v, u = b(), i = b(), a = b(!1), f = b(), g = x(() => n.placement ? n.placement : n.bottom ? "bottom" : n.left ? "left" : n.right ? "right" : "top"), T = x(() => ({
      show: a,
      [`bs-tooltip-${g.value}`]: !0
    }));
    function m() {
      a.value = !0;
    }
    function e() {
      a.value = !1;
    }
    return h({
      open: m,
      close: e
    }), L(() => {
      var t, o;
      u.value && (f.value = H(n.target, u.value, Object.assign({
        placement: g.value,
        modifiers: [
          {
            name: "offset",
            options: {
              offset: [((t = n.offset) == null ? void 0 : t.x) ?? 0, ((o = n.offset) == null ? void 0 : o.y) ?? 6]
            }
          },
          {
            name: "arrow",
            options: {
              element: i.value
            }
          }
        ]
      }, n.popper)), O(() => {
        a.value = n.show;
      }));
    }), S(() => {
      f.value && f.value.destroy();
    }), (t, o) => (j(), k("div", {
      ref_key: "el",
      ref: u,
      class: C(["tooltip", T.value]),
      role: "tooltip"
    }, [
      w("div", {
        ref_key: "arrow",
        ref: i,
        class: "tooltip-arrow"
      }, null, 512),
      w("div", U, [
        F(t.$slots, "default", {}, () => [
          M(R(t.title), 1)
        ])
      ], 512)
    ], 2));
  }
});
function z(v, h = {}) {
  const n = /* @__PURE__ */ new Map(), u = Object.assign({
    delay: void 0,
    prefix: "data-tooltip",
    progressiveEnhancement: !0,
    triggers: {
      open: ["mouseover:350"],
      close: ["mouseout:100"]
    }
  }, h), i = u.prefix.replace(/[-]+$/, ""), a = new RegExp(`^${i}-`);
  function f(e) {
    return Array.from(e.attributes).map((t) => [t.name, t.value]).filter(([t]) => t === "title" || t.match(a)).map(([t, o]) => [t.replace(new RegExp(a), ""), o]).reduce((t, o) => Object.assign(t, { [o[0]]: o[1] }), {});
  }
  function g(e, t = {}, o) {
    const l = document.createElement("template"), r = P(V, Object.assign({
      target: e,
      show: !0
    }, t));
    I(r, l);
    const [s] = [...l.children];
    return document.body.append(s), () => {
      var p;
      n.delete(o), (p = r.component) == null || p.ctx.close(), setTimeout(() => s.remove(), 150);
    };
  }
  function T(e) {
    const t = e.getAttribute(`${i}-id`);
    if (t) {
      const o = n.get(t);
      o == null || o();
    }
  }
  function m(e, t = {}) {
    var _, y;
    const o = Object.assign({
      title: e.getAttribute(i) || e.getAttribute("title")
    }, t, f(e));
    if (!o.title || e.hasAttribute(`${i}-id`))
      return;
    const l = Math.random().toString(36).slice(2, 7);
    let r, s;
    e.setAttribute(`${i}-id`, l), e.removeAttribute("title");
    function p(c = 0) {
      clearTimeout(s), r || (s = setTimeout(() => {
        document.contains(e) && (r = g(e, o, l), n.set(l, r));
      }, c));
    }
    function E(c = 0) {
      clearTimeout(s), r && (s = setTimeout(() => {
        r && r(), r = null;
      }, c));
    }
    function d(c, A) {
      const [$, N] = c.split(":");
      e.addEventListener($, () => A(Number(N || 0)));
    }
    (((_ = e.getAttribute(`${i}-trigger-open`)) == null ? void 0 : _.split(",")) || u.triggers.open).map((c) => d(c, p)), (((y = e.getAttribute(`${i}-trigger-close`)) == null ? void 0 : y.split(",")) || u.triggers.close).map((c) => d(c, E));
  }
  v.mixin({
    mounted() {
      if (!u.progressiveEnhancement)
        return;
      let e = this.$el;
      this.$el instanceof Text && (e = this.$el.parentNode), e instanceof HTMLElement && m(e);
      const t = document.createTreeWalker(
        e,
        NodeFilter.SHOW_ALL,
        (l) => l instanceof Element ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
      );
      for (; t.nextNode(); )
        t.currentNode instanceof Element && m(t.currentNode);
      new MutationObserver((l) => {
        let r = !1;
        for (const { removedNodes: s } of l)
          for (const p of s)
            if (p instanceof Element)
              for (const E of p.querySelectorAll(`[${i}-id]`)) {
                const d = n.get(
                  E.getAttribute(`${i}-id`)
                );
                d && (r = !0, d());
              }
        if (!r)
          for (const s of n.values())
            s();
      }).observe(e, { childList: !0 });
    }
  }), v.directive("tooltip", {
    beforeMount(e, t) {
      m(e, Object.assign({}, t.modifiers, t.value));
    },
    beforeUnmount(e) {
      T(e);
    }
  });
}
export {
  V as Tooltip,
  z as TooltipPlugin
};
//# sourceMappingURL=tooltip.js.map
