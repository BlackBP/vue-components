<template functional>

    <i v-bind="data.attrs"
       v-on="listeners"
       class="c-icon"
       :class="[data.staticClass, data.class, `${props.vendorPrefix}${props.name}`]"
       :style="[data.staticStyle, !!props.size && {fontSize: props.size}]">
    </i>

</template>

<script>
    export default {
        name: "c-icon",
        props: {
            name: {
                type: String,
                default: 'dots-horizontal',
                required: true
            },
            size: {
                type: String,
                default: '',
                required: false
            },
            vendorPrefix: {
                type: String,
                default: 'mdi mdi-',
                required: false
            }
        }
    }
</script>
