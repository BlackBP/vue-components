<template functional>

    <i v-bind="data.attrs"
       :class="[data.staticClass, `${props.vendorClassName}${props.name}`]"
       :style="data.staticStyle"
       v-on="listeners">
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
            vendorClassName: {
                type: String,
                default: 'mdi mdi-',
                required: false
            }
        }
    }
</script>
