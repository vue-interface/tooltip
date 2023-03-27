import { createPopper } from '@popperjs/core';
import { defineComponent } from 'vue';

export default defineComponent({

    props: {
        offset: {
            type: Array,
            default: undefined
        },

        popper: {
            type: Object,
            default: undefined
        },

        placement: {
            type: String,
            default: undefined
        },

        target: {
            type: Element,
            required: true
        },

        title: {
            type: String,
            default: undefined
        },
        
        show: Boolean,
        
        top: Boolean,

        bottom: Boolean,

        left: Boolean,

        right: Boolean,
    },

    data() {
        return {
            currentShow: false,
            popperInstance: null
        };
    },

    computed: {
        computedPlacement() {
            if(this.placement) {
                return this.placement;
            }

            if(this.bottom) {
                return 'bottom';
            }

            if(this.left) {
                return 'left';
            }

            if(this.right) {
                return 'right';
            }

            return 'top';
        },
        tooltipClasses() {
            return {
                show: this.currentShow,
                [`bs-tooltip-${this.computedPlacement}`]: true
            };
        }
    },

    mounted() {
        this.popperInstance = createPopper(this.target, this.$el, Object.assign({
            placement: this.computedPlacement,
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: [0, 6]
                    },
                },
                {
                    name: 'arrow',
                    options: {
                        element: this.$refs.arrow,
                    },
                },
            ],
        }, this.popper));

        this.$nextTick(() => {
            this.currentShow = this.show;
        });
    },

    beforeUnmount() {
        this.popperInstance && this.popperInstance.destroy();
    },

    methods: {

        open() {
            this.currentShow = true;
        },

        close() {
            this.currentShow = false;
        }

    }

});