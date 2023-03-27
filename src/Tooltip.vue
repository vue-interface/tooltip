<script lang="ts">
import { defineComponent } from 'vue';
import Popper from './Popper';

export default defineComponent({
    mixins: [
        Popper
    ]
});
</script>

<template>
    <div
        class="tooltip"
        :class="tooltipClasses"
        role="tooltip">
        <div
            ref="arrow"
            class="tooltip-arrow" />
        <div
            ref="inner"
            class="tooltip-inner">
            <slot>{{ title }}</slot>
        </div>
    </div>
</template>

<style>
.tooltip:not(.show) {
    z-index: -1;
}
</style>