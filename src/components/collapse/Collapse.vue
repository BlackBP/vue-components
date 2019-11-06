<template>
    <transition-collapse>
        <div v-show="visible"
             class="c-collapse">
            <slot />
        </div>
    </transition-collapse>
</template>

<script>
    import TransitionCollapse from './Transition.vue';
    import {createProp} from "../../utils/component";

    export default {
        name: "c-collapse",
        components: {
            TransitionCollapse
        },
        props: {
            visible: createProp(Boolean, false)
        }
    }
</script>
