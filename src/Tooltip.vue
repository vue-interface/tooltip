<template>
    <div class="tooltip" :class="tooltipClasses" role="tooltip">
        <div ref="arrow" class="tooltip-arrow" />
        <div ref="inner" class="tooltip-inner">
            <slot />
        </div>
    </div>
</template>

<script>
import Popper from './Popper';

export default {
    mixins: [
        Popper
    ]
};
</script>

<style>
.tooltip:not(.show) {
    z-index: -1;
}
</style>