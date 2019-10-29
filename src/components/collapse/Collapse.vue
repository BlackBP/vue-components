<template>
    <transition-collapse>
        <div v-show="visible"
             class="c-collapse">
            <slot />
        </div>
    </transition-collapse>
</template>

<script>
    import TransitionCollapse from "./Transition.vue";

    export default {
        name: "c-collapse",
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
