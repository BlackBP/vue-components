<template>
    <transition-collapse>
        <div v-show="visible"
             class="c-collapse">
            <slot />
        </div>
    </transition-collapse>
</template>

<script>
    import TransitionCollapse from "./transitions/Collapse.vue";

    export default {
        name: "CCollapse",
        components: {
            TransitionCollapse
        },
        props: {
            visible: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style scoped>
    .c-collapse {
        display: block;
        width: 100%;
        overflow: hidden;
    }
</style>
