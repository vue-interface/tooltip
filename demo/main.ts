import { createRouter, createWebHistory } from 'vue-router';
import { createApp, h } from 'vue/dist/vue.esm-bundler.js';
import TooltipPlugin from '../src/TooltipPlugin';
import App from './App.vue';
import Test from './components/Test.vue';
import Tooltip from './components/Tooltip.vue';

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: '/', component: Tooltip },
        { path: '/test', component: Test },
    ],
});

const app = createApp(App)
    .use(router)
    .use(TooltipPlugin)
    .component('ViaPlugin', {
        render() {
            return h('div', {
                class: 'flex gap-2'
            }, [
                h('a', {
                    href: '#',
                    title: 'Top',
                    'data-tooltip-trigger-open': 'mouseover:500',
                    'data-tooltip-trigger-close': 'mouseout:500,blur',
                    'data-tooltip-placement': 'top',
                    class: 'p-2 rounded bg-slate-800 text-white outline-none focus:ring'
                }, 'Top'),

                h('a', {
                    href: '#',
                    title: 'Bottom',
                    'data-tooltip-placement': 'bottom',
                    class: 'p-2 rounded bg-slate-800 text-white outline-none focus:ring'
                }, 'Bottom'),

                h('a', {
                    href: '#',
                    title: 'Left',
                    'data-tooltip-placement': 'left',
                    class: 'p-2 rounded bg-slate-800 text-white outline-none focus:ring'
                }, 'Left'),

                h('a', {
                    href: '#',
                    title: 'Right',
                    'data-tooltip-placement': 'right',
                    class: 'p-2 rounded bg-slate-800 text-white outline-none focus:ring'
                }, 'Right'),

                h('a', {
                    href: '#',
                    title: 'Right',
                    'data-tooltip-placement': 'right',
                    class: 'p-2 rounded bg-slate-800 text-white outline-none focus:ring',
                    onClick() {
                        visible.value = false;
                    }
                }, 'Trigger Unmount')
            ]);
        }
    })
    .mount('#app'); 