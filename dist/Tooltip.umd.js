(function(H,C){typeof exports=="object"&&typeof module<"u"?C(exports,require("vue")):typeof define=="function"&&define.amd?define(["exports","vue"],C):(H=typeof globalThis<"u"?globalThis:H||self,C(H.Tooltip={},H.Vue))})(this,function(H,C){"use strict";var j="top",N="bottom",L="right",B="left",ve="auto",ae=[j,N,L,B],ee="start",ie="end",dt="clippingParents",Me="viewport",se="popper",vt="reference",Ve=ae.reduce(function(t,e){return t.concat([e+"-"+ee,e+"-"+ie])},[]),Ie=[].concat(ae,[ve]).reduce(function(t,e){return t.concat([e,e+"-"+ee,e+"-"+ie])},[]),ht="beforeRead",mt="read",gt="afterRead",yt="beforeMain",bt="main",wt="afterMain",xt="beforeWrite",Ot="write",Et="afterWrite",Ae=[ht,mt,gt,yt,bt,wt,xt,Ot,Et];function W(t){return t?(t.nodeName||"").toLowerCase():null}function M(t){if(t==null)return window;if(t.toString()!=="[object Window]"){var e=t.ownerDocument;return e&&e.defaultView||window}return t}function Y(t){var e=M(t).Element;return t instanceof e||t instanceof Element}function $(t){var e=M(t).HTMLElement;return t instanceof e||t instanceof HTMLElement}function Pe(t){if(typeof ShadowRoot>"u")return!1;var e=M(t).ShadowRoot;return t instanceof e||t instanceof ShadowRoot}function At(t){var e=t.state;Object.keys(e.elements).forEach(function(r){var n=e.styles[r]||{},o=e.attributes[r]||{},a=e.elements[r];!$(a)||!W(a)||(Object.assign(a.style,n),Object.keys(o).forEach(function(f){var s=o[f];s===!1?a.removeAttribute(f):a.setAttribute(f,s===!0?"":s)}))})}function Pt(t){var e=t.state,r={popper:{position:e.options.strategy,left:"0",top:"0",margin:"0"},arrow:{position:"absolute"},reference:{}};return Object.assign(e.elements.popper.style,r.popper),e.styles=r,e.elements.arrow&&Object.assign(e.elements.arrow.style,r.arrow),function(){Object.keys(e.elements).forEach(function(n){var o=e.elements[n],a=e.attributes[n]||{},f=Object.keys(e.styles.hasOwnProperty(n)?e.styles[n]:r[n]),s=f.reduce(function(i,c){return i[c]="",i},{});!$(o)||!W(o)||(Object.assign(o.style,s),Object.keys(a).forEach(function(i){o.removeAttribute(i)}))})}}const Dt={name:"applyStyles",enabled:!0,phase:"write",fn:At,effect:Pt,requires:["computeStyles"]};function V(t){return t.split("-")[0]}var z=Math.max,he=Math.min,te=Math.round;function De(){var t=navigator.userAgentData;return t!=null&&t.brands?t.brands.map(function(e){return e.brand+"/"+e.version}).join(" "):navigator.userAgent}function qe(){return!/^((?!chrome|android).)*safari/i.test(De())}function re(t,e,r){e===void 0&&(e=!1),r===void 0&&(r=!1);var n=t.getBoundingClientRect(),o=1,a=1;e&&$(t)&&(o=t.offsetWidth>0&&te(n.width)/t.offsetWidth||1,a=t.offsetHeight>0&&te(n.height)/t.offsetHeight||1);var f=Y(t)?M(t):window,s=f.visualViewport,i=!qe()&&r,c=(n.left+(i&&s?s.offsetLeft:0))/o,p=(n.top+(i&&s?s.offsetTop:0))/a,h=n.width/o,b=n.height/a;return{width:h,height:b,top:p,right:c+h,bottom:p+b,left:c,x:c,y:p}}function Se(t){var e=re(t),r=t.offsetWidth,n=t.offsetHeight;return Math.abs(e.width-r)<=1&&(r=e.width),Math.abs(e.height-n)<=1&&(n=e.height),{x:t.offsetLeft,y:t.offsetTop,width:r,height:n}}function We(t,e){var r=e.getRootNode&&e.getRootNode();if(t.contains(e))return!0;if(r&&Pe(r)){var n=e;do{if(n&&t.isSameNode(n))return!0;n=n.parentNode||n.host}while(n)}return!1}function I(t){return M(t).getComputedStyle(t)}function St(t){return["table","td","th"].indexOf(W(t))>=0}function _(t){return((Y(t)?t.ownerDocument:t.document)||window.document).documentElement}function me(t){return W(t)==="html"?t:t.assignedSlot||t.parentNode||(Pe(t)?t.host:null)||_(t)}function He(t){return!$(t)||I(t).position==="fixed"?null:t.offsetParent}function Tt(t){var e=/firefox/i.test(De()),r=/Trident/i.test(De());if(r&&$(t)){var n=I(t);if(n.position==="fixed")return null}var o=me(t);for(Pe(o)&&(o=o.host);$(o)&&["html","body"].indexOf(W(o))<0;){var a=I(o);if(a.transform!=="none"||a.perspective!=="none"||a.contain==="paint"||["transform","perspective"].indexOf(a.willChange)!==-1||e&&a.willChange==="filter"||e&&a.filter&&a.filter!=="none")return o;o=o.parentNode}return null}function pe(t){for(var e=M(t),r=He(t);r&&St(r)&&I(r).position==="static";)r=He(r);return r&&(W(r)==="html"||W(r)==="body"&&I(r).position==="static")?e:r||Tt(t)||e}function Te(t){return["top","bottom"].indexOf(t)>=0?"x":"y"}function fe(t,e,r){return z(t,he(e,r))}function Rt(t,e,r){var n=fe(t,e,r);return n>r?r:n}function _e(){return{top:0,right:0,bottom:0,left:0}}function Fe(t){return Object.assign({},_e(),t)}function Xe(t,e){return e.reduce(function(r,n){return r[n]=t,r},{})}var jt=function(e,r){return e=typeof e=="function"?e(Object.assign({},r.rects,{placement:r.placement})):e,Fe(typeof e!="number"?e:Xe(e,ae))};function Bt(t){var e,r=t.state,n=t.name,o=t.options,a=r.elements.arrow,f=r.modifiersData.popperOffsets,s=V(r.placement),i=Te(s),c=[B,L].indexOf(s)>=0,p=c?"height":"width";if(!(!a||!f)){var h=jt(o.padding,r),b=Se(a),l=i==="y"?j:B,x=i==="y"?N:L,m=r.rects.reference[p]+r.rects.reference[i]-f[i]-r.rects.popper[p],v=f[i]-r.rects.reference[i],w=pe(a),A=w?i==="y"?w.clientHeight||0:w.clientWidth||0:0,E=m/2-v/2,u=h[l],g=A-b[p]-h[x],d=A/2-b[p]/2+E,O=fe(u,d,g),P=i;r.modifiersData[n]=(e={},e[P]=O,e.centerOffset=O-d,e)}}function $t(t){var e=t.state,r=t.options,n=r.element,o=n===void 0?"[data-popper-arrow]":n;if(o!=null&&!(typeof o=="string"&&(o=e.elements.popper.querySelector(o),!o))){if(process.env.NODE_ENV!=="production"&&($(o)||console.error(['Popper: "arrow" element must be an HTMLElement (not an SVGElement).',"To use an SVG arrow, wrap it in an HTMLElement that will be used as","the arrow."].join(" "))),!We(e.elements.popper,o)){process.env.NODE_ENV!=="production"&&console.error(['Popper: "arrow" modifier\'s `element` must be a child of the popper',"element."].join(" "));return}e.elements.arrow=o}}const kt={name:"arrow",enabled:!0,phase:"main",fn:Bt,effect:$t,requires:["popperOffsets"],requiresIfExists:["preventOverflow"]};function ne(t){return t.split("-")[1]}var Ct={top:"auto",right:"auto",bottom:"auto",left:"auto"};function Nt(t){var e=t.x,r=t.y,n=window,o=n.devicePixelRatio||1;return{x:te(e*o)/o||0,y:te(r*o)/o||0}}function Ye(t){var e,r=t.popper,n=t.popperRect,o=t.placement,a=t.variation,f=t.offsets,s=t.position,i=t.gpuAcceleration,c=t.adaptive,p=t.roundOffsets,h=t.isFixed,b=f.x,l=b===void 0?0:b,x=f.y,m=x===void 0?0:x,v=typeof p=="function"?p({x:l,y:m}):{x:l,y:m};l=v.x,m=v.y;var w=f.hasOwnProperty("x"),A=f.hasOwnProperty("y"),E=B,u=j,g=window;if(c){var d=pe(r),O="clientHeight",P="clientWidth";if(d===M(r)&&(d=_(r),I(d).position!=="static"&&s==="absolute"&&(O="scrollHeight",P="scrollWidth")),d=d,o===j||(o===B||o===L)&&a===ie){u=N;var D=h&&d===g&&g.visualViewport?g.visualViewport.height:d[O];m-=D-n.height,m*=i?1:-1}if(o===B||(o===j||o===N)&&a===ie){E=L;var S=h&&d===g&&g.visualViewport?g.visualViewport.width:d[P];l-=S-n.width,l*=i?1:-1}}var y=Object.assign({position:s},c&&Ct),T=p===!0?Nt({x:l,y:m}):{x:l,y:m};if(l=T.x,m=T.y,i){var R;return Object.assign({},y,(R={},R[u]=A?"0":"",R[E]=w?"0":"",R.transform=(g.devicePixelRatio||1)<=1?"translate("+l+"px, "+m+"px)":"translate3d("+l+"px, "+m+"px, 0)",R))}return Object.assign({},y,(e={},e[u]=A?m+"px":"",e[E]=w?l+"px":"",e.transform="",e))}function Lt(t){var e=t.state,r=t.options,n=r.gpuAcceleration,o=n===void 0?!0:n,a=r.adaptive,f=a===void 0?!0:a,s=r.roundOffsets,i=s===void 0?!0:s;if(process.env.NODE_ENV!=="production"){var c=I(e.elements.popper).transitionProperty||"";f&&["transform","top","right","bottom","left"].some(function(h){return c.indexOf(h)>=0})&&console.warn(["Popper: Detected CSS transitions on at least one of the following",'CSS properties: "transform", "top", "right", "bottom", "left".',`

`,'Disable the "computeStyles" modifier\'s `adaptive` option to allow',"for smooth transitions, or remove these properties from the CSS","transition declaration on the popper element if only transitioning","opacity or background-color for example.",`

`,"We recommend using the popper element as a wrapper around an inner","element that can have any CSS property transitioned for animations."].join(" "))}var p={placement:V(e.placement),variation:ne(e.placement),popper:e.elements.popper,popperRect:e.rects.popper,gpuAcceleration:o,isFixed:e.options.strategy==="fixed"};e.modifiersData.popperOffsets!=null&&(e.styles.popper=Object.assign({},e.styles.popper,Ye(Object.assign({},p,{offsets:e.modifiersData.popperOffsets,position:e.options.strategy,adaptive:f,roundOffsets:i})))),e.modifiersData.arrow!=null&&(e.styles.arrow=Object.assign({},e.styles.arrow,Ye(Object.assign({},p,{offsets:e.modifiersData.arrow,position:"absolute",adaptive:!1,roundOffsets:i})))),e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-placement":e.placement})}const Mt={name:"computeStyles",enabled:!0,phase:"beforeWrite",fn:Lt,data:{}};var ge={passive:!0};function Vt(t){var e=t.state,r=t.instance,n=t.options,o=n.scroll,a=o===void 0?!0:o,f=n.resize,s=f===void 0?!0:f,i=M(e.elements.popper),c=[].concat(e.scrollParents.reference,e.scrollParents.popper);return a&&c.forEach(function(p){p.addEventListener("scroll",r.update,ge)}),s&&i.addEventListener("resize",r.update,ge),function(){a&&c.forEach(function(p){p.removeEventListener("scroll",r.update,ge)}),s&&i.removeEventListener("resize",r.update,ge)}}const It={name:"eventListeners",enabled:!0,phase:"write",fn:function(){},effect:Vt,data:{}};var qt={left:"right",right:"left",bottom:"top",top:"bottom"};function ye(t){return t.replace(/left|right|bottom|top/g,function(e){return qt[e]})}var Wt={start:"end",end:"start"};function ze(t){return t.replace(/start|end/g,function(e){return Wt[e]})}function Re(t){var e=M(t),r=e.pageXOffset,n=e.pageYOffset;return{scrollLeft:r,scrollTop:n}}function je(t){return re(_(t)).left+Re(t).scrollLeft}function Ht(t,e){var r=M(t),n=_(t),o=r.visualViewport,a=n.clientWidth,f=n.clientHeight,s=0,i=0;if(o){a=o.width,f=o.height;var c=qe();(c||!c&&e==="fixed")&&(s=o.offsetLeft,i=o.offsetTop)}return{width:a,height:f,x:s+je(t),y:i}}function _t(t){var e,r=_(t),n=Re(t),o=(e=t.ownerDocument)==null?void 0:e.body,a=z(r.scrollWidth,r.clientWidth,o?o.scrollWidth:0,o?o.clientWidth:0),f=z(r.scrollHeight,r.clientHeight,o?o.scrollHeight:0,o?o.clientHeight:0),s=-n.scrollLeft+je(t),i=-n.scrollTop;return I(o||r).direction==="rtl"&&(s+=z(r.clientWidth,o?o.clientWidth:0)-a),{width:a,height:f,x:s,y:i}}function Be(t){var e=I(t),r=e.overflow,n=e.overflowX,o=e.overflowY;return/auto|scroll|overlay|hidden/.test(r+o+n)}function Ue(t){return["html","body","#document"].indexOf(W(t))>=0?t.ownerDocument.body:$(t)&&Be(t)?t:Ue(me(t))}function ce(t,e){var r;e===void 0&&(e=[]);var n=Ue(t),o=n===((r=t.ownerDocument)==null?void 0:r.body),a=M(n),f=o?[a].concat(a.visualViewport||[],Be(n)?n:[]):n,s=e.concat(f);return o?s:s.concat(ce(me(f)))}function $e(t){return Object.assign({},t,{left:t.x,top:t.y,right:t.x+t.width,bottom:t.y+t.height})}function Ft(t,e){var r=re(t,!1,e==="fixed");return r.top=r.top+t.clientTop,r.left=r.left+t.clientLeft,r.bottom=r.top+t.clientHeight,r.right=r.left+t.clientWidth,r.width=t.clientWidth,r.height=t.clientHeight,r.x=r.left,r.y=r.top,r}function Ge(t,e,r){return e===Me?$e(Ht(t,r)):Y(e)?Ft(e,r):$e(_t(_(t)))}function Xt(t){var e=ce(me(t)),r=["absolute","fixed"].indexOf(I(t).position)>=0,n=r&&$(t)?pe(t):t;return Y(n)?e.filter(function(o){return Y(o)&&We(o,n)&&W(o)!=="body"}):[]}function Yt(t,e,r,n){var o=e==="clippingParents"?Xt(t):[].concat(e),a=[].concat(o,[r]),f=a[0],s=a.reduce(function(i,c){var p=Ge(t,c,n);return i.top=z(p.top,i.top),i.right=he(p.right,i.right),i.bottom=he(p.bottom,i.bottom),i.left=z(p.left,i.left),i},Ge(t,f,n));return s.width=s.right-s.left,s.height=s.bottom-s.top,s.x=s.left,s.y=s.top,s}function Je(t){var e=t.reference,r=t.element,n=t.placement,o=n?V(n):null,a=n?ne(n):null,f=e.x+e.width/2-r.width/2,s=e.y+e.height/2-r.height/2,i;switch(o){case j:i={x:f,y:e.y-r.height};break;case N:i={x:f,y:e.y+e.height};break;case L:i={x:e.x+e.width,y:s};break;case B:i={x:e.x-r.width,y:s};break;default:i={x:e.x,y:e.y}}var c=o?Te(o):null;if(c!=null){var p=c==="y"?"height":"width";switch(a){case ee:i[c]=i[c]-(e[p]/2-r[p]/2);break;case ie:i[c]=i[c]+(e[p]/2-r[p]/2);break}}return i}function le(t,e){e===void 0&&(e={});var r=e,n=r.placement,o=n===void 0?t.placement:n,a=r.strategy,f=a===void 0?t.strategy:a,s=r.boundary,i=s===void 0?dt:s,c=r.rootBoundary,p=c===void 0?Me:c,h=r.elementContext,b=h===void 0?se:h,l=r.altBoundary,x=l===void 0?!1:l,m=r.padding,v=m===void 0?0:m,w=Fe(typeof v!="number"?v:Xe(v,ae)),A=b===se?vt:se,E=t.rects.popper,u=t.elements[x?A:b],g=Yt(Y(u)?u:u.contextElement||_(t.elements.popper),i,p,f),d=re(t.elements.reference),O=Je({reference:d,element:E,strategy:"absolute",placement:o}),P=$e(Object.assign({},E,O)),D=b===se?P:d,S={top:g.top-D.top+w.top,bottom:D.bottom-g.bottom+w.bottom,left:g.left-D.left+w.left,right:D.right-g.right+w.right},y=t.modifiersData.offset;if(b===se&&y){var T=y[o];Object.keys(S).forEach(function(R){var G=[L,N].indexOf(R)>=0?1:-1,J=[j,N].indexOf(R)>=0?"y":"x";S[R]+=T[J]*G})}return S}function zt(t,e){e===void 0&&(e={});var r=e,n=r.placement,o=r.boundary,a=r.rootBoundary,f=r.padding,s=r.flipVariations,i=r.allowedAutoPlacements,c=i===void 0?Ie:i,p=ne(n),h=p?s?Ve:Ve.filter(function(x){return ne(x)===p}):ae,b=h.filter(function(x){return c.indexOf(x)>=0});b.length===0&&(b=h,process.env.NODE_ENV!=="production"&&console.error(["Popper: The `allowedAutoPlacements` option did not allow any","placements. Ensure the `placement` option matches the variation","of the allowed placements.",'For example, "auto" cannot be used to allow "bottom-start".','Use "auto-start" instead.'].join(" ")));var l=b.reduce(function(x,m){return x[m]=le(t,{placement:m,boundary:o,rootBoundary:a,padding:f})[V(m)],x},{});return Object.keys(l).sort(function(x,m){return l[x]-l[m]})}function Ut(t){if(V(t)===ve)return[];var e=ye(t);return[ze(t),e,ze(e)]}function Gt(t){var e=t.state,r=t.options,n=t.name;if(!e.modifiersData[n]._skip){for(var o=r.mainAxis,a=o===void 0?!0:o,f=r.altAxis,s=f===void 0?!0:f,i=r.fallbackPlacements,c=r.padding,p=r.boundary,h=r.rootBoundary,b=r.altBoundary,l=r.flipVariations,x=l===void 0?!0:l,m=r.allowedAutoPlacements,v=e.options.placement,w=V(v),A=w===v,E=i||(A||!x?[ye(v)]:Ut(v)),u=[v].concat(E).reduce(function(oe,X){return oe.concat(V(X)===ve?zt(e,{placement:X,boundary:p,rootBoundary:h,padding:c,flipVariations:x,allowedAutoPlacements:m}):X)},[]),g=e.rects.reference,d=e.rects.popper,O=new Map,P=!0,D=u[0],S=0;S<u.length;S++){var y=u[S],T=V(y),R=ne(y)===ee,G=[j,N].indexOf(T)>=0,J=G?"width":"height",k=le(e,{placement:y,boundary:p,rootBoundary:h,altBoundary:b,padding:c}),q=G?R?L:B:R?N:j;g[J]>d[J]&&(q=ye(q));var be=ye(q),K=[];if(a&&K.push(k[T]<=0),s&&K.push(k[q]<=0,k[be]<=0),K.every(function(oe){return oe})){D=y,P=!1;break}O.set(y,K)}if(P)for(var we=x?3:1,ke=function(X){var de=u.find(function(Oe){var Q=O.get(Oe);if(Q)return Q.slice(0,X).every(function(Ce){return Ce})});if(de)return D=de,"break"},ue=we;ue>0;ue--){var xe=ke(ue);if(xe==="break")break}e.placement!==D&&(e.modifiersData[n]._skip=!0,e.placement=D,e.reset=!0)}}const Jt={name:"flip",enabled:!0,phase:"main",fn:Gt,requiresIfExists:["offset"],data:{_skip:!1}};function Ke(t,e,r){return r===void 0&&(r={x:0,y:0}),{top:t.top-e.height-r.y,right:t.right-e.width+r.x,bottom:t.bottom-e.height+r.y,left:t.left-e.width-r.x}}function Qe(t){return[j,L,N,B].some(function(e){return t[e]>=0})}function Kt(t){var e=t.state,r=t.name,n=e.rects.reference,o=e.rects.popper,a=e.modifiersData.preventOverflow,f=le(e,{elementContext:"reference"}),s=le(e,{altBoundary:!0}),i=Ke(f,n),c=Ke(s,o,a),p=Qe(i),h=Qe(c);e.modifiersData[r]={referenceClippingOffsets:i,popperEscapeOffsets:c,isReferenceHidden:p,hasPopperEscaped:h},e.attributes.popper=Object.assign({},e.attributes.popper,{"data-popper-reference-hidden":p,"data-popper-escaped":h})}const Qt={name:"hide",enabled:!0,phase:"main",requiresIfExists:["preventOverflow"],fn:Kt};function Zt(t,e,r){var n=V(t),o=[B,j].indexOf(n)>=0?-1:1,a=typeof r=="function"?r(Object.assign({},e,{placement:t})):r,f=a[0],s=a[1];return f=f||0,s=(s||0)*o,[B,L].indexOf(n)>=0?{x:s,y:f}:{x:f,y:s}}function er(t){var e=t.state,r=t.options,n=t.name,o=r.offset,a=o===void 0?[0,0]:o,f=Ie.reduce(function(p,h){return p[h]=Zt(h,e.rects,a),p},{}),s=f[e.placement],i=s.x,c=s.y;e.modifiersData.popperOffsets!=null&&(e.modifiersData.popperOffsets.x+=i,e.modifiersData.popperOffsets.y+=c),e.modifiersData[n]=f}const tr={name:"offset",enabled:!0,phase:"main",requires:["popperOffsets"],fn:er};function rr(t){var e=t.state,r=t.name;e.modifiersData[r]=Je({reference:e.rects.reference,element:e.rects.popper,strategy:"absolute",placement:e.placement})}const nr={name:"popperOffsets",enabled:!0,phase:"read",fn:rr,data:{}};function or(t){return t==="x"?"y":"x"}function ar(t){var e=t.state,r=t.options,n=t.name,o=r.mainAxis,a=o===void 0?!0:o,f=r.altAxis,s=f===void 0?!1:f,i=r.boundary,c=r.rootBoundary,p=r.altBoundary,h=r.padding,b=r.tether,l=b===void 0?!0:b,x=r.tetherOffset,m=x===void 0?0:x,v=le(e,{boundary:i,rootBoundary:c,padding:h,altBoundary:p}),w=V(e.placement),A=ne(e.placement),E=!A,u=Te(w),g=or(u),d=e.modifiersData.popperOffsets,O=e.rects.reference,P=e.rects.popper,D=typeof m=="function"?m(Object.assign({},e.rects,{placement:e.placement})):m,S=typeof D=="number"?{mainAxis:D,altAxis:D}:Object.assign({mainAxis:0,altAxis:0},D),y=e.modifiersData.offset?e.modifiersData.offset[e.placement]:null,T={x:0,y:0};if(!!d){if(a){var R,G=u==="y"?j:B,J=u==="y"?N:L,k=u==="y"?"height":"width",q=d[u],be=q+v[G],K=q-v[J],we=l?-P[k]/2:0,ke=A===ee?O[k]:P[k],ue=A===ee?-P[k]:-O[k],xe=e.elements.arrow,oe=l&&xe?Se(xe):{width:0,height:0},X=e.modifiersData["arrow#persistent"]?e.modifiersData["arrow#persistent"].padding:_e(),de=X[G],Oe=X[J],Q=fe(0,O[k],oe[k]),Ce=E?O[k]/2-we-Q-de-S.mainAxis:ke-Q-de-S.mainAxis,Tr=E?-O[k]/2+we+Q+Oe+S.mainAxis:ue+Q+Oe+S.mainAxis,Ne=e.elements.arrow&&pe(e.elements.arrow),Rr=Ne?u==="y"?Ne.clientTop||0:Ne.clientLeft||0:0,ot=(R=y==null?void 0:y[u])!=null?R:0,jr=q+Ce-ot-Rr,Br=q+Tr-ot,at=fe(l?he(be,jr):be,q,l?z(K,Br):K);d[u]=at,T[u]=at-q}if(s){var it,$r=u==="x"?j:B,kr=u==="x"?N:L,Z=d[g],Ee=g==="y"?"height":"width",st=Z+v[$r],pt=Z-v[kr],Le=[j,B].indexOf(w)!==-1,ft=(it=y==null?void 0:y[g])!=null?it:0,ct=Le?st:Z-O[Ee]-P[Ee]-ft+S.altAxis,lt=Le?Z+O[Ee]+P[Ee]-ft-S.altAxis:pt,ut=l&&Le?Rt(ct,Z,lt):fe(l?ct:st,Z,l?lt:pt);d[g]=ut,T[g]=ut-Z}e.modifiersData[n]=T}}const ir={name:"preventOverflow",enabled:!0,phase:"main",fn:ar,requiresIfExists:["offset"]};function sr(t){return{scrollLeft:t.scrollLeft,scrollTop:t.scrollTop}}function pr(t){return t===M(t)||!$(t)?Re(t):sr(t)}function fr(t){var e=t.getBoundingClientRect(),r=te(e.width)/t.offsetWidth||1,n=te(e.height)/t.offsetHeight||1;return r!==1||n!==1}function cr(t,e,r){r===void 0&&(r=!1);var n=$(e),o=$(e)&&fr(e),a=_(e),f=re(t,o,r),s={scrollLeft:0,scrollTop:0},i={x:0,y:0};return(n||!n&&!r)&&((W(e)!=="body"||Be(a))&&(s=pr(e)),$(e)?(i=re(e,!0),i.x+=e.clientLeft,i.y+=e.clientTop):a&&(i.x=je(a))),{x:f.left+s.scrollLeft-i.x,y:f.top+s.scrollTop-i.y,width:f.width,height:f.height}}function lr(t){var e=new Map,r=new Set,n=[];t.forEach(function(a){e.set(a.name,a)});function o(a){r.add(a.name);var f=[].concat(a.requires||[],a.requiresIfExists||[]);f.forEach(function(s){if(!r.has(s)){var i=e.get(s);i&&o(i)}}),n.push(a)}return t.forEach(function(a){r.has(a.name)||o(a)}),n}function ur(t){var e=lr(t);return Ae.reduce(function(r,n){return r.concat(e.filter(function(o){return o.phase===n}))},[])}function dr(t){var e;return function(){return e||(e=new Promise(function(r){Promise.resolve().then(function(){e=void 0,r(t())})})),e}}function F(t){for(var e=arguments.length,r=new Array(e>1?e-1:0),n=1;n<e;n++)r[n-1]=arguments[n];return[].concat(r).reduce(function(o,a){return o.replace(/%s/,a)},t)}var U='Popper: modifier "%s" provided an invalid %s property, expected %s but got %s',vr='Popper: modifier "%s" requires "%s", but "%s" modifier is not available',Ze=["name","enabled","phase","fn","effect","requires","options"];function hr(t){t.forEach(function(e){[].concat(Object.keys(e),Ze).filter(function(r,n,o){return o.indexOf(r)===n}).forEach(function(r){switch(r){case"name":typeof e.name!="string"&&console.error(F(U,String(e.name),'"name"','"string"','"'+String(e.name)+'"'));break;case"enabled":typeof e.enabled!="boolean"&&console.error(F(U,e.name,'"enabled"','"boolean"','"'+String(e.enabled)+'"'));break;case"phase":Ae.indexOf(e.phase)<0&&console.error(F(U,e.name,'"phase"',"either "+Ae.join(", "),'"'+String(e.phase)+'"'));break;case"fn":typeof e.fn!="function"&&console.error(F(U,e.name,'"fn"','"function"','"'+String(e.fn)+'"'));break;case"effect":e.effect!=null&&typeof e.effect!="function"&&console.error(F(U,e.name,'"effect"','"function"','"'+String(e.fn)+'"'));break;case"requires":e.requires!=null&&!Array.isArray(e.requires)&&console.error(F(U,e.name,'"requires"','"array"','"'+String(e.requires)+'"'));break;case"requiresIfExists":Array.isArray(e.requiresIfExists)||console.error(F(U,e.name,'"requiresIfExists"','"array"','"'+String(e.requiresIfExists)+'"'));break;case"options":case"data":break;default:console.error('PopperJS: an invalid property has been provided to the "'+e.name+'" modifier, valid properties are '+Ze.map(function(n){return'"'+n+'"'}).join(", ")+'; but "'+r+'" was provided.')}e.requires&&e.requires.forEach(function(n){t.find(function(o){return o.name===n})==null&&console.error(F(vr,String(e.name),n,n))})})})}function mr(t,e){var r=new Set;return t.filter(function(n){var o=e(n);if(!r.has(o))return r.add(o),!0})}function gr(t){var e=t.reduce(function(r,n){var o=r[n.name];return r[n.name]=o?Object.assign({},o,n,{options:Object.assign({},o.options,n.options),data:Object.assign({},o.data,n.data)}):n,r},{});return Object.keys(e).map(function(r){return e[r]})}var et="Popper: Invalid reference or popper argument provided. They must be either a DOM element or virtual element.",yr="Popper: An infinite loop in the modifiers cycle has been detected! The cycle has been interrupted to prevent a browser crash.",tt={placement:"bottom",modifiers:[],strategy:"absolute"};function rt(){for(var t=arguments.length,e=new Array(t),r=0;r<t;r++)e[r]=arguments[r];return!e.some(function(n){return!(n&&typeof n.getBoundingClientRect=="function")})}function br(t){t===void 0&&(t={});var e=t,r=e.defaultModifiers,n=r===void 0?[]:r,o=e.defaultOptions,a=o===void 0?tt:o;return function(s,i,c){c===void 0&&(c=a);var p={placement:"bottom",orderedModifiers:[],options:Object.assign({},tt,a),modifiersData:{},elements:{reference:s,popper:i},attributes:{},styles:{}},h=[],b=!1,l={state:p,setOptions:function(w){var A=typeof w=="function"?w(p.options):w;m(),p.options=Object.assign({},a,p.options,A),p.scrollParents={reference:Y(s)?ce(s):s.contextElement?ce(s.contextElement):[],popper:ce(i)};var E=ur(gr([].concat(n,p.options.modifiers)));if(p.orderedModifiers=E.filter(function(y){return y.enabled}),process.env.NODE_ENV!=="production"){var u=mr([].concat(E,p.options.modifiers),function(y){var T=y.name;return T});if(hr(u),V(p.options.placement)===ve){var g=p.orderedModifiers.find(function(y){var T=y.name;return T==="flip"});g||console.error(['Popper: "auto" placements require the "flip" modifier be',"present and enabled to work."].join(" "))}var d=I(i),O=d.marginTop,P=d.marginRight,D=d.marginBottom,S=d.marginLeft;[O,P,D,S].some(function(y){return parseFloat(y)})&&console.warn(['Popper: CSS "margin" styles cannot be used to apply padding',"between the popper and its reference element or boundary.","To replicate margin, use the `offset` modifier, as well as","the `padding` option in the `preventOverflow` and `flip`","modifiers."].join(" "))}return x(),l.update()},forceUpdate:function(){if(!b){var w=p.elements,A=w.reference,E=w.popper;if(!rt(A,E)){process.env.NODE_ENV!=="production"&&console.error(et);return}p.rects={reference:cr(A,pe(E),p.options.strategy==="fixed"),popper:Se(E)},p.reset=!1,p.placement=p.options.placement,p.orderedModifiers.forEach(function(y){return p.modifiersData[y.name]=Object.assign({},y.data)});for(var u=0,g=0;g<p.orderedModifiers.length;g++){if(process.env.NODE_ENV!=="production"&&(u+=1,u>100)){console.error(yr);break}if(p.reset===!0){p.reset=!1,g=-1;continue}var d=p.orderedModifiers[g],O=d.fn,P=d.options,D=P===void 0?{}:P,S=d.name;typeof O=="function"&&(p=O({state:p,options:D,name:S,instance:l})||p)}}},update:dr(function(){return new Promise(function(v){l.forceUpdate(),v(p)})}),destroy:function(){m(),b=!0}};if(!rt(s,i))return process.env.NODE_ENV!=="production"&&console.error(et),l;l.setOptions(c).then(function(v){!b&&c.onFirstUpdate&&c.onFirstUpdate(v)});function x(){p.orderedModifiers.forEach(function(v){var w=v.name,A=v.options,E=A===void 0?{}:A,u=v.effect;if(typeof u=="function"){var g=u({state:p,name:w,instance:l,options:E}),d=function(){};h.push(g||d)}})}function m(){h.forEach(function(v){return v()}),h=[]}return l}}var wr=[It,nr,Mt,Dt,tr,Jt,ir,kt,Qt],xr=br({defaultModifiers:wr});const Or={mixins:[{props:{offset:Array,popper:Object,show:Boolean,target:{type:HTMLElement,required:!0},top:Boolean,bottom:Boolean,left:Boolean,right:Boolean},data(){return{currentShow:!1,popperInstance:null}},methods:{open(){this.currentShow=!0},close(){this.currentShow=!1}},computed:{placement(){return this.bottom?"bottom":this.left?"left":this.right?"right":"top"},tooltipClasses(){return{show:this.currentShow,[`bs-tooltip-${this.placement}`]:!0}}},mounted(){this.popperInstance=xr(this.target,this.$el,Object.assign({placement:this.placement,modifiers:[{name:"offset",options:{offset:[0,6]}},{name:"arrow",options:{element:this.$refs.arrow}}]},this.popper)),this.$nextTick(()=>{this.currentShow=this.show})},beforeDestroy(){this.popperInstance&&this.popperInstance.destroy()}}]},Nr="",Er=(t,e)=>{const r=t.__vccOpts||t;for(const[n,o]of e)r[n]=o;return r},Ar={ref:"arrow",class:"tooltip-arrow"},Pr={ref:"inner",class:"tooltip-inner"};function Dr(t,e,r,n,o,a){return C.openBlock(),C.createElementBlock("div",{class:C.normalizeClass(["tooltip",t.tooltipClasses]),role:"tooltip"},[C.createElementVNode("div",Ar,null,512),C.createElementVNode("div",Pr,[C.renderSlot(t.$slots,"default")],512)],2)}const nt=Er(Or,[["render",Dr]]);function Sr(t,e={}){function r(n,o={}){const a=document.createElement("template"),f=n.getAttribute("data-tooltip")||"",s=C.h(nt,Object.assign({target:n,show:!0},o),()=>f);C.render(s,a);const[i]=[...a.children];return document.body.append(i),{el:i,vnode:s,close(){var c;(c=s.component)==null||c.ctx.close(),setTimeout(()=>i.remove(),150)}}}t.mixin({created(){console.log("created")}}),t.directive("tooltip",(n,o)=>{n.getAttribute("data-tooltip")||n.setAttribute("data-tooltip",n.getAttribute("title")),n.removeAttribute("title"),n.addEventListener("mouseover",a=>{clearTimeout(n.timer),n.tooltip||(n.timer=setTimeout(()=>{n.tooltip=r(n,{top:o.modifiers.top,bottom:o.modifiers.bottom,left:o.modifiers.left,right:o.modifiers.right})},1e3))}),n.addEventListener("mouseout",a=>{clearTimeout(n.timer),n.tooltip&&(n.timer=setTimeout(()=>{n.tooltip&&n.tooltip.close(),n.tooltip=null},1e3))})})}H.Tooltip=nt,H.TooltipPlugin=Sr,Object.defineProperties(H,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}})});
