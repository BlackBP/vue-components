<template functional>
    <i v-bind="data.attrs"
       v-on="listeners"
       class="c-marker"
       :style="data.staticStyle"
       :class="[data.staticClass, {
            'c-marker--ripple' : props.ripple
       }]"></i>
</template>

<script>
    export default {
        name: "c-marker",
        props: {
            ripple: {
                type: Boolean,
                default: false,
            }
        }
    }
</script>
