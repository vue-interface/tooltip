import { createPopper } from '@popperjs/core';
import { prefix } from '@vue-interface/utils';

export default {

    props: {
        offset: Array,

        placement: {
            type: String,
            default: 'top',
            validate: value => {
                return [
                    'bs-tooltip-auto',
                    'bs-tooltip-top',
                    'bs-tooltip-bottom',
                    'bs-tooltip-left',
                    'bs-tooltip-right',
                ].indexOf(prefix(value, 'bs-tooltip')) > -1;
            }
        },

        popper: Object,

        show: Boolean,

        target: {
            type: HTMLElement,
            required: true
        }
    },
    
    data() {
        return {
            currentShow: this.show,
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
        tooltipClasses() {
            return {
                show: this.currentShow,
                [prefix(this.placement, 'bs-tooltip')]: true
            };
        }
    },

    mounted() {
        this.popperInstance = createPopper(this.target, this.$el, Object.assign({
            placement: this.placement.replace('bs-tooltip-', ''),
            modifiers: [
                {
                    name: 'offset',
                    options: {
                        offset: this.offset
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
    },

    beforeDestroy() {
        this.popperInstance && this.popperInstance.destroy();
    },

};