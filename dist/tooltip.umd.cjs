(function(c,o){typeof exports=="object"&&typeof module<"u"?o(exports,require("vue"),require("@popperjs/core")):typeof define=="function"&&define.amd?define(["exports","vue","@popperjs/core"],o):(c=typeof globalThis<"u"?globalThis:c||self,o(c.Tooltip={},c.Vue,c.PopperjsCore))})(this,function(c,o,$){"use strict";const w=o.defineComponent({props:{offset:{type:Array,default:void 0},popper:{type:Object,default:void 0},placement:{type:String,default:void 0},target:{type:Element,required:!0},title:{type:String,default:void 0},show:Boolean,top:Boolean,bottom:Boolean,left:Boolean,right:Boolean},data(){return{currentShow:!1,popperInstance:null}},computed:{computedPlacement(){return this.placement?this.placement:this.bottom?"bottom":this.left?"left":this.right?"right":"top"},tooltipClasses(){return{show:this.currentShow,[`bs-tooltip-${this.computedPlacement}`]:!0}}},mounted(){this.popperInstance=$.createPopper(this.target,this.$el,Object.assign({placement:this.computedPlacement,modifiers:[{name:"offset",options:{offset:[0,6]}},{name:"arrow",options:{element:this.$refs.arrow}}]},this.popper)),this.$nextTick(()=>{this.currentShow=this.show})},beforeUnmount(){this.popperInstance&&this.popperInstance.destroy()},methods:{open(){this.currentShow=!0},close(){this.currentShow=!1}}}),y=o.defineComponent({mixins:[w]}),F="",x=(p,h)=>{const u=p.__vccOpts||p;for(const[f,r]of h)u[f]=r;return u},A={ref:"arrow",class:"tooltip-arrow"},S={ref:"inner",class:"tooltip-inner"};function j(p,h,u,f,r,g){return o.openBlock(),o.createElementBlock("div",{class:o.normalizeClass(["tooltip",p.tooltipClasses]),role:"tooltip"},[o.createElementVNode("div",A,null,512),o.createElementVNode("div",S,[o.renderSlot(p.$slots,"default",{},()=>[o.createTextVNode(o.toDisplayString(p.title),1)])],512)],2)}const v=x(y,[["render",j]]);function N(p,h={}){const u=new Map,f=Object.assign({delay:void 0,prefix:"data-tooltip",progressiveEnhancement:!0,triggers:{open:["mouseover:350"],close:["mouseout:100"]}},h),r=f.prefix.replace(/[-]+$/,""),g=new RegExp(`^${r}-`);function O(e){return Array.from(e.attributes).map(t=>[t.name,t.value]).filter(([t])=>t==="title"||t.match(g)).map(([t,n])=>[t.replace(new RegExp(g),""),n]).reduce((t,n)=>Object.assign(t,{[n[0]]:n[1]}),{})}function P(e,t={},n){const l=document.createElement("template"),i=o.h(v,Object.assign({target:e,show:!0},t));o.render(i,l);const[s]=[...l.children];return document.body.append(s),()=>{var d;u.delete(n),(d=i.component)==null||d.ctx.close(),setTimeout(()=>s.remove(),150)}}function C(e){const t=e.getAttribute(`${r}-id`);if(t){const n=u.get(t);n==null||n()}}function b(e,t={}){var _,E;const n=Object.assign({title:e.getAttribute(r)||e.getAttribute("title")},t,O(e));if(!n.title||e.hasAttribute(`${r}-id`))return;const l=Math.random().toString(36).slice(2,7);let i,s;e.setAttribute(`${r}-id`,l),e.removeAttribute("title");function d(a=0){clearTimeout(s),i||(s=setTimeout(()=>{document.contains(e)&&(i=P(e,n,l),u.set(l,i))},a))}function T(a=0){clearTimeout(s),i&&(s=setTimeout(()=>{i&&i(),i=null},a))}function m(a,L){const[B,M]=a.split(":");e.addEventListener(B,()=>L(Number(M||0)))}(((_=e.getAttribute(`${r}-trigger-open`))==null?void 0:_.split(","))||f.triggers.open).map(a=>m(a,d)),(((E=e.getAttribute(`${r}-trigger-close`))==null?void 0:E.split(","))||f.triggers.close).map(a=>m(a,T))}p.mixin({mounted(){if(!f.progressiveEnhancement)return;let e=this.$el;this.$el instanceof Text&&(e=this.$el.parentNode),e instanceof HTMLElement&&b(e);const t=document.createTreeWalker(e,NodeFilter.SHOW_ALL,l=>l instanceof Element?NodeFilter.FILTER_ACCEPT:NodeFilter.FILTER_REJECT);for(;t.nextNode();)t.currentNode instanceof Element&&b(t.currentNode);new MutationObserver(l=>{let i=!1;for(const{removedNodes:s}of l)for(const d of s)if(d instanceof Element)for(const T of d.querySelectorAll(`[${r}-id]`)){const m=u.get(T.getAttribute(`${r}-id`));m&&(i=!0,m())}if(!i)for(const s of u.values())s()}).observe(e,{childList:!0})}}),p.directive("tooltip",{beforeMount(e,t){b(e,Object.assign({},t.modifiers,t.value))},beforeUnmount(e){C(e)}})}c.Tooltip=v,c.TooltipPlugin=N,Object.defineProperties(c,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
//# sourceMappingURL=tooltip.umd.cjs.map
