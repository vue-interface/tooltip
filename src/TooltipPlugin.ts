import type { App, VNode } from 'vue';
import { h, render } from 'vue';
import Tooltip from './Tooltip.vue';

export default function(app: App, options = {}) {
  
    function createTooltip(target: HTMLElement, args: Record<string,any> = {}): {el: Element, vnode: VNode, close: Function} {
        const container = document.createElement('template');
        const title = target.getAttribute('data-tooltip') || '';
                
        const vnode = h(Tooltip, Object.assign({
            target,
            show: true
        }, args), () => title);

        render(vnode, container);

        const [el] = [...container.children];

        document.body.append(el);

        return {
            el,
            vnode,
            close() {
                // @ts-ignore
                vnode.component?.ctx.close();

                setTimeout(() => el.remove(), 150);
            }
        };
    }
    
    app.mixin({
        created() {
            console.log('created');
        }
    });

    app.directive('tooltip', (target, binding) => {
        if(!target.getAttribute('data-tooltip')) {
            target.setAttribute('data-tooltip', target.getAttribute('title'));
        }
        
        target.removeAttribute('title');

        target.addEventListener('mouseover', (e: Event) => {
            clearTimeout(target.timer);

            if(!target.tooltip) {
                target.timer = setTimeout(() => {
                    target.tooltip = createTooltip(target, {
                        top: binding.modifiers.top,
                        bottom: binding.modifiers.bottom,
                        left: binding.modifiers.left,
                        right: binding.modifiers.right,
                    });
                }, 1000);
            }
        });

        target.addEventListener('mouseout', (e: Event) => {
            clearTimeout(target.timer);

            if(target.tooltip) {
                target.timer = setTimeout(() => {
                    target.tooltip && target.tooltip.close();
                    target.tooltip = null;
                }, 1000);
            }       
        });
    });
}