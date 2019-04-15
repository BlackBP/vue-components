<template>
    <div class="c-scroll-view">
        <vue-scroll>
            <slot></slot>
        </vue-scroll>
    </div>
</template>

<script>
    export default {
        name: "c-scroll-view"
    }
</script>

<style lang="scss">
    .c-scroll-view {
        position: relative;
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
    }
</style>
