import { createPopper } from '@popperjs/core';

export default {

    props: {
        offset: Array,

        popper: Object,

        show: Boolean,

        target: {
            type: HTMLElement,
            required: true
        },

        title: String,

        placement: String,

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

    methods: {

        open() {
            this.currentShow = true;
        },

        close() {
            this.currentShow = false;
        }

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

    beforeDestroy() {
        this.popperInstance && this.popperInstance.destroy();
    }

};