import { createPopper as E } from "@popperjs/core";
import { defineComponent as $, openBlock as x, createElementBlock as S, normalizeClass as O, createElementVNode as h, renderSlot as y, createTextVNode as N, toDisplayString as A, h as L, render as j } from "vue";
const B = $({
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
    this.popperInstance = E(this.target, this.$el, Object.assign({
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
}), C = {
  mixins: [
    B
  ]
};
const P = (n, s) => {
  const p = n.__vccOpts || n;
  for (const [l, a] of s)
    p[l] = a;
  return p;
}, I = {
  ref: "arrow",
  class: "tooltip-arrow"
}, R = {
  ref: "inner",
  class: "tooltip-inner"
};
function k(n, s, p, l, a, f) {
  return x(), S("div", {
    class: O(["tooltip", n.tooltipClasses]),
    role: "tooltip"
  }, [
    h("div", I, null, 512),
    h("div", R, [
      y(n.$slots, "default", {}, () => [
        N(A(n.title), 1)
      ])
    ], 512)
  ], 2);
}
const F = /* @__PURE__ */ P(C, [["render", k]]);
function V(n, s = {}) {
  s = Object.assign({
    delay: void 0,
    prefix: "data-tooltip",
    triggers: {
      open: ["mouseover:750", "focus"],
      close: ["mouseout:1000", "blur"]
    }
  }, s);
  const l = s.prefix.replace(/[-]+$/, ""), a = new RegExp(`^${l}-`);
  function f(t) {
    return Array.from(t.attributes).map((e) => [e.name, e.value]).filter(([e]) => e === "title" || e.match(a)).map(([e, o]) => [e.replace(new RegExp(a), ""), o]).reduce((e, o) => Object.assign(e, { [o[0]]: o[1] }), {});
  }
  function g(t, e = {}) {
    const o = document.createElement("template"), u = L(F, Object.assign({
      target: t,
      show: !0
    }, e));
    j(u, o);
    const [r] = [...o.children];
    return document.body.append(r), () => {
      var c;
      (c = u.component) == null || c.ctx.close(), setTimeout(() => r.remove(), 150);
    };
  }
  function m(t, e = {}) {
    const o = Object.assign({
      title: t.getAttribute(l)
    }, e, f(t));
    if (!o.title || t.hasAttribute(`${l}-id`))
      return;
    const u = Math.random().toString(36).slice(2, 7);
    let r, c;
    t.setAttribute(`${l}-id`, u), t.removeAttribute("title");
    function _(i = 0) {
      clearTimeout(c), r || (c = setTimeout(() => {
        r = g(t, o);
      }, i));
    }
    function b(i = 0) {
      clearTimeout(c), r && (c = setTimeout(() => {
        r && r(), r = null;
      }, i));
    }
    function d(i, T) {
      const [v, w] = i.split(":");
      t.addEventListener(v, () => T(Number(w || 0)));
    }
    s.triggers.open.map((i) => d(i, _)), s.triggers.close.map((i) => d(i, b));
  }
  n.mixin({
    mounted() {
      let t = this.$el;
      this.$el instanceof Text && (t = this.$el.parentNode), t instanceof HTMLElement && m(t);
      const e = document.createTreeWalker(
        t,
        NodeFilter.SHOW_ALL,
        (o) => o instanceof Element ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT
      );
      for (; e.nextNode(); )
        e.currentNode instanceof Element && m(e.currentNode);
    }
  }), n.directive("tooltip", (t, e) => m(
    t,
    Object.assign({}, e.modifiers, e.value)
  ));
}
export {
  F as Tooltip,
  V as TooltipPlugin
};
//# sourceMappingURL=tooltip.mjs.map
