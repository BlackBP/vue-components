<template functional>

    <i v-bind="data.attrs"
       v-on="listeners"
       :class="[data.staticClass, `${props.vendorPrefix}${props.name}`]"
       :style="data.staticStyle">
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
            vendorPrefix: {
                type: String,
                default: 'mdi mdi-',
                required: false
            }
        }
    }
</script>
