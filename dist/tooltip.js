import { defineComponent as $, openBlock as S, createElementBlock as N, normalizeClass as O, createElementVNode as _, renderSlot as L, createTextVNode as j, toDisplayString as B, h as C, render as P } from "vue";
import { createPopper as F } from "@popperjs/core";
const I = $({
  props: {
    offset: {
      type: Array,
      default: void 0
    },
    popper: {
      type: Object,
      default: void 0
    },
    placement: {
      type: String,
      default: void 0
    },
    target: {
      type: Element,
      required: !0
    },
    title: {
      type: String,
      default: void 0
    },
    show: Boolean,
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
    this.popperInstance = F(this.target, this.$el, Object.assign({
      placement: this.computedPlacement,
      modifiers: [
        {
          name: "offset",
          options: {
            offset: [0, 6]
          }
        },
        {
          name: "arrow",
          options: {
            element: this.$refs.arrow
          }
        }
      ]
    }, this.popper)), this.$nextTick(() => {
      this.currentShow = this.show;
    });
  },
  beforeUnmount() {
    this.popperInstance && this.popperInstance.destroy();
  },
  methods: {
    open() {
      this.currentShow = !0;
    },
    close() {
      this.currentShow = !1;
    }
  }
}), R = $({
  mixins: [
    I
  ]
});
const k = (l, d) => {
  const c = l.__vccOpts || l;
  for (const [u, i] of d)
    c[u] = i;
  return c;
}, M = {
  ref: "arrow",
  class: "tooltip-arrow"
}, q = {
  ref: "inner",
  class: "tooltip-inner"
};
function H(l, d, c, u, i, m) {
  return S(), N("div", {
    class: O(["tooltip", l.tooltipClasses]),
    role: "tooltip"
  }, [
    _("div", M, null, 512),
    _("div", q, [
      L(l.$slots, "default", {}, () => [
        j(B(l.title), 1)
      ])
    ], 512)
  ], 2);
}
const U = /* @__PURE__ */ k(R, [["render", H]]);
function z(l, d = {}) {
  const c = /* @__PURE__ */ new Map(), u = Object.assign({
    delay: void 0,
    prefix: "data-tooltip",
    progressiveEnhancement: !0,
    triggers: {
      open: ["mouseover:350"],
      close: ["mouseout:100"]
    }
  }, d), i = u.prefix.replace(/[-]+$/, ""), m = new RegExp(`^${i}-`);
  function E(e) {
    return Array.from(e.attributes).map((t) => [t.name, t.value]).filter(([t]) => t === "title" || t.match(m)).map(([t, o]) => [t.replace(new RegExp(m), ""), o]).reduce((t, o) => Object.assign(t, { [o[0]]: o[1] }), {});
  }
  function w(e, t = {}, o) {
    const s = document.createElement("template"), n = C(U, Object.assign({
      target: e,
      show: !0
    }, t));
    P(n, s);
    const [r] = [...s.children];
    return document.body.append(r), () => {
      var a;
      c.delete(o), (a = n.component) == null || a.ctx.close(), setTimeout(() => r.remove(), 150);
    };
  }
  function T(e) {
    const t = e.getAttribute(`${i}-id`);
    if (t) {
      const o = c.get(t);
      o == null || o();
    }
  }
  function h(e, t = {}) {
    var b, v;
    const o = Object.assign({
      title: e.getAttribute(i) || e.getAttribute("title")
    }, t, E(e));
    if (!o.title || e.hasAttribute(`${i}-id`))
      return;
    const s = Math.random().toString(36).slice(2, 7);
    let n, r;
    e.setAttribute(`${i}-id`, s), e.removeAttribute("title");
    function a(p = 0) {
      clearTimeout(r), n || (r = setTimeout(() => {
        document.contains(e) && (n = w(e, o, s), c.set(s, n));
      }, p));
    }
    function g(p = 0) {
      clearTimeout(r), n && (r = setTimeout(() => {
        n && n(), n = null;
      }, p));
    }
    function f(p, y) {
      const [x, A] = p.split(":");
      e.addEventListener(x, () => y(Number(A || 0)));
    }
    (((b = e.getAttribute(`${i}-trigger-open`)) == null ? void 0 : b.split(",")) || u.triggers.open).map((p) => f(p, a)), (((v = e.getAttribute(`${i}-trigger-close`)) == null ? void 0 : v.split(",")) || u.triggers.close).map((p) => f(p, g));
  }
  l.mixin({
    mounted() {
      if (!u.progressiveEnhancement)
        return;
      let e = this.$el;
      this.$el instanceof Text && (e = this.$el.parentNode), e instanceof HTMLElement && h(e);
      const t = document.createTreeWalker(
        e,
        NodeFilter.SHOW_ALL,
        (s) => s instanceof Element ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
      );
      for (; t.nextNode(); )
        t.currentNode instanceof Element && h(t.currentNode);
      new MutationObserver((s) => {
        let n = !1;
        for (const { removedNodes: r } of s)
          for (const a of r)
            if (a instanceof Element)
              for (const g of a.querySelectorAll(`[${i}-id]`)) {
                const f = c.get(
                  g.getAttribute(`${i}-id`)
                );
                f && (n = !0, f());
              }
        if (!n)
          for (const r of c.values())
            r();
      }).observe(e, { childList: !0 });
    }
  }), l.directive("tooltip", {
    beforeMount(e, t) {
      h(e, Object.assign({}, t.modifiers, t.value));
    },
    beforeUnmount(e) {
      T(e);
    }
  });
}
export {
  U as Tooltip,
  z as TooltipPlugin
};
//# sourceMappingURL=tooltip.js.map
