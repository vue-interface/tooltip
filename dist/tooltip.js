import { defineComponent as $, openBlock as A, createElementBlock as S, normalizeClass as N, createElementVNode as _, renderSlot as O, createTextVNode as L, toDisplayString as j, h as B, render as C } from "vue";
import { createPopper as P } from "@popperjs/core";
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
    this.popperInstance = P(this.target, this.$el, Object.assign({
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
const k = (s, d) => {
  const p = s.__vccOpts || s;
  for (const [a, n] of d)
    p[a] = n;
  return p;
}, F = {
  ref: "arrow",
  class: "tooltip-arrow"
}, M = {
  ref: "inner",
  class: "tooltip-inner"
};
function U(s, d, p, a, n, m) {
  return A(), S("div", {
    class: N(["tooltip", s.tooltipClasses]),
    role: "tooltip"
  }, [
    _("div", F, null, 512),
    _("div", M, [
      O(s.$slots, "default", {}, () => [
        L(j(s.title), 1)
      ])
    ], 512)
  ], 2);
}
const q = /* @__PURE__ */ k(R, [["render", U]]);
function W(s, d = {}) {
  const p = /* @__PURE__ */ new Map(), a = Object.assign({
    delay: void 0,
    prefix: "data-tooltip",
    triggers: {
      open: ["mouseover:350"],
      close: ["mouseout:100"]
    }
  }, d), n = a.prefix.replace(/[-]+$/, ""), m = new RegExp(`^${n}-`);
  function w(e) {
    return Array.from(e.attributes).map((t) => [t.name, t.value]).filter(([t]) => t === "title" || t.match(m)).map(([t, o]) => [t.replace(new RegExp(m), ""), o]).reduce((t, o) => Object.assign(t, { [o[0]]: o[1] }), {});
  }
  function T(e, t = {}, o) {
    const i = document.createElement("template"), r = B(q, Object.assign({
      target: e,
      show: !0
    }, t));
    C(r, i);
    const [l] = [...i.children];
    return document.body.append(l), () => {
      var u;
      p.delete(o), (u = r.component) == null || u.ctx.close(), setTimeout(() => l.remove(), 150);
    };
  }
  function h(e, t = {}) {
    var b, v;
    const o = Object.assign({
      title: e.getAttribute(n)
    }, t, w(e));
    if (!o.title || e.hasAttribute(`${n}-id`))
      return;
    const i = Math.random().toString(36).slice(2, 7);
    let r, l;
    e.setAttribute(`${n}-id`, i), e.removeAttribute("title");
    function u(c = 0) {
      clearTimeout(l), r || (l = setTimeout(() => {
        document.contains(e) && (r = T(e, o, i), p.set(i, r));
      }, c));
    }
    function f(c = 0) {
      clearTimeout(l), r && (l = setTimeout(() => {
        r && r(), r = null;
      }, c));
    }
    function g(c, E) {
      const [x, y] = c.split(":");
      e.addEventListener(x, () => E(Number(y || 0)));
    }
    (((b = e.getAttribute(`${n}-trigger-open`)) == null ? void 0 : b.split(",")) || a.triggers.open).map((c) => g(c, u)), (((v = e.getAttribute(`${n}-trigger-close`)) == null ? void 0 : v.split(",")) || a.triggers.close).map((c) => g(c, f));
  }
  s.mixin({
    mounted() {
      let e = this.$el;
      this.$el instanceof Text && (e = this.$el.parentNode), e instanceof HTMLElement && h(e);
      const t = document.createTreeWalker(
        e,
        NodeFilter.SHOW_ALL,
        (i) => i instanceof Element ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
      );
      for (; t.nextNode(); )
        t.currentNode instanceof Element && h(t.currentNode);
      new MutationObserver((i) => {
        for (const { removedNodes: r } of i)
          for (const l of r)
            for (const u of l.querySelectorAll(`[${n}-id]`)) {
              const f = p.get(
                u.getAttribute(`${n}-id`)
              );
              f && f();
            }
      }).observe(e, { childList: !0 });
    }
  }), s.directive("tooltip", {
    created(e, t) {
      h(e, Object.assign({}, t.modifiers, t.value));
    },
    beforeUnmount(e) {
      const t = e.getAttribute(`${n}-id`), o = p.get(t);
      console.log("beforeUnmount"), o && o();
    }
  });
}
export {
  q as Tooltip,
  W as TooltipPlugin
};
//# sourceMappingURL=tooltip.js.map
