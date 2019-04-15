<template functional>
    <div v-bind="data.attrs"
         v-on="listeners"
         class="c-card"
         :class="[data.staticClass]"
         :style="data.staticStyle">

        <template v-if="props.loading">
            <c-loading style="margin: auto;"/>
        </template>
        <template v-else>
            <slot></slot>
        </template>

    </div>
</template>

<script>
    import CIcon from "./Icon";
    import CLoading from "./Loading";

    export default {
        name: "c-card",
        components: {
            CLoading,
            CIcon
        },
        props: {
            loading: {
                type: Boolean,
                default: false,
                required: false,
            }
        }
    }
</script>
