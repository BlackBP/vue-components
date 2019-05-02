<template>
    <div class="c-card">

        <template v-if="loading">
            <c-loading style="margin: auto;"/>
        </template>

        <template v-else>
            <slot></slot>
        </template>

    </div>
</template>

<script>
    import CLoading from "./Loading";

    export default {
        name: "c-card",
        components: {
            CLoading
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
