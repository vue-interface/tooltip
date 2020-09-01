import Tooltip from './Tooltip';
import Popper from './Popper';

const defaultTriggers = {
    open: ['mouseenter', 'focus'],
    close: ['mouseleave', 'blur']
};

const defaultOptions = {
    
};

export default function(Vue, options = {}) {
    Vue.component('tooltip', Tooltip);
    Vue.directive('tooltip', {
        bind(el, binding) {
            Object.entries(Object.assign(defaultTriggers, options.triggers))
                .forEach(([method, events]) => {
                    events.forEach(event => {
                        el.addEventListener(event, e => {
                            binding.$tooltip[method]();
                        });
                    });
                });
        },

        inserted(el, binding, vnode) {
            const title = () => {
                const attr = el.getAttribute('title');
                
                if(attr) {
                    el.setAttribute('data-title', attr);
                    el.setAttribute('data-title-replaced', 1);
                    el.removeAttribute('title');
                }

                return option('title');
            };

            const option = (key, defaultValue) => {
                const dataKey = `data-${key}`;

                return (
                    binding.value && binding.value[key]
                    || vnode.data && vnode.data.attrs && vnode.data.attrs[dataKey]
                    || el.getAttribute(dataKey) === ''
                    || el.getAttribute(dataKey)
                    || defaultValue
                );
            };

            const props = Object.keys(Popper.props || [])
                .reduce((carry, prop) => {
                    return Object.assign({
                        [prop]: option(prop)
                    }, carry);
                }, {
                    target: el
                });

            const Wrapper = Vue.extend({
                render(h) {
                    return h(Vue.extend(Tooltip), {
                        props,
                        ref: 'tooltip',
                    }, title());
                }
            });

            binding.$tooltip = new Wrapper({
                el: el.parentNode.insertBefore(
                    el.ownerDocument.createElement('div'), el
                ),
                methods: {
                    open() {
                        this.$refs.tooltip.open();
                    },
                    close() {
                        this.$refs.tooltip.close();
                    }
                }
            });
        }
    });
}