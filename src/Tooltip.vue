<script lang="ts">
// @ts-ignore
import Popper from './Popper';

export default {
    mixins: [
        Popper
    ]
};
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