import type { App } from 'vue';
import { h, render } from 'vue';
import Tooltip from './Tooltip.vue';

type TooltipPluginOptions = {
    delay?: number,
    prefix: string,
    triggers: {
        open: string[],
        close: string[],
    }
}

export default function (app: App, opts: Partial<TooltipPluginOptions> = {}) {
    const tooltips: Map<string,Function> = new Map;

    const options: TooltipPluginOptions = Object.assign({
        delay: undefined,
        prefix: 'data-tooltip',
        triggers: {
            open: ['mouseover:350'],
            close: ['mouseout:100'],
        }
    }, opts);

    const prefix = options.prefix.replace(/[-]+$/, '');
    const prefixRegExp = new RegExp(`^${prefix}\-`);

    function getAttributes(el: Element): Record<string,any> {
        return Array.from(el.attributes)
            .map(a => [a.name, a.value])
            .filter(([key]) => key === 'title' || key.match(prefixRegExp))
            .map(([key, value]) => [key.replace(new RegExp(prefixRegExp), ''), value])
            .reduce((carry, attr) => Object.assign(carry, { [attr[0]]: attr[1] }), {});
    }

    function createTooltip(target: Element, props: Record<string,any> = {}, hash: string): Function {
        const container = document.createElement('template');
        
        const vnode = h(Tooltip, Object.assign({
            target,
            show: true
        }, props));
    
        render(vnode, container);
    
        const [el] = [...container.children];
    
        document.body.append(el);
    
        return () => {
            tooltips.delete(hash);

            // @ts-ignore
            vnode.component?.ctx.close();
    
            // @todo: Make the animation rate (150) dynamic. Should get value 
            // from the CSS transition duration.
            setTimeout(() => el.remove(), 150);
        };
    }

    function init(target: Element, props = {}) {
        const properties: Record<string,any> = Object.assign({
            title: target.getAttribute(prefix)
        }, props, getAttributes(target));

        // If the properties don't have a title, ignore this target.
        if(!properties.title || target.hasAttribute(`${prefix}-id`)) {
            return;
        }

        // Create a unique "hash" to show the node has been initialized.
        // This prevents double initializing on the same element.
        const hash = Math.random().toString(36).slice(2, 7);
        
        // Create the instance vars.
        let tooltip: Function|null, timer: number;

        //target.setAttribute(prefix, properties.title);
        target.setAttribute(`${prefix}-id`, hash);
        target.removeAttribute('title');

        function open(delay = 0) {
            clearTimeout(timer);

            if(!tooltip) {
                timer = setTimeout(() => {
                    // Do a check before creating the tooltip to ensure the dom
                    // element still exists. Its possible for the element to
                    // be removed after the timeout delay runs.
                    if(document.contains(target)) {
                        tooltip = createTooltip(target, properties, hash);
                        tooltips.set(hash, tooltip);
                    }
                }, delay);
            }
        }

        function close(delay = 0) {
            clearTimeout(timer);

            if(tooltip) {
                timer = setTimeout(() => {
                    tooltip && tooltip();
                    tooltip = null;
                }, delay);
            }       
        }

        function addEventListener(trigger: string, fn: Function) {
            const [ event, delayString ] = trigger.split(':');

            target.addEventListener(event, () => fn(Number(delayString || 0)));
        }

        (target.getAttribute(`${prefix}-trigger-open`)?.split(',') || options.triggers.open).map(trigger => addEventListener(trigger, open));
        (target.getAttribute(`${prefix}-trigger-close`)?.split(',') || options.triggers.close).map(trigger => addEventListener(trigger, close));
    }
  
    app.mixin({
        mounted() {
            let el = this.$el;

            if(this.$el instanceof Text) {
                el = this.$el.parentNode;
            }

            if(el instanceof HTMLElement) {
                init(el);
            }

            // Create the tree walker.
            const walker = document.createTreeWalker(
                el,
                NodeFilter.SHOW_ALL,
                (node: Node) => {
                    if(!(node instanceof Element)) {
                        return NodeFilter.FILTER_REJECT;
                    }
                    
                    return NodeFilter.FILTER_ACCEPT;
                }
            );

            // Step through and alert all child nodes
            while(walker.nextNode()) {
                if(walker.currentNode instanceof Element) {
                    init(<Element> walker.currentNode);
                }
            }

            const observer = new MutationObserver((changes) => {
                for(const { removedNodes } of changes) {
                    for(const node of removedNodes) {
                        for(const el of (node as Element).querySelectorAll(`[${prefix}-id]`)) {
                            const tooltip = tooltips.get(
                                el.getAttribute(`${prefix}-id`) as string
                            );

                            tooltip && tooltip();
                        }
                    } 
                }
            });

            observer.observe(el, { childList: true });
        }
    });

    app.directive('tooltip', {
        created(target, binding) {
            init(target, Object.assign({}, binding.modifiers, binding.value));
        },
        beforeUnmount(target) {
            const id = target.getAttribute(`${prefix}-id`);
            const tooltip = tooltips.get(id);

            console.log('beforeUnmount');

            tooltip && tooltip();
        }
    });
}