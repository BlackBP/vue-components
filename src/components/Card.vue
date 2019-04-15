<template>
    <div class="c-card">

        <div v-if="hasHeader && !loading"
             class="c-card__header">
            <slot name="header"></slot>
        </div>

        <div class="c-card__body">
            <template v-if="loading">
                <c-loading :visible="true" />
            </template>
            <template v-else>
                <slot></slot>
            </template>
        </div>

        <div v-if="hasFooter && !loading"
             class="c-card__footer">
            <slot name="footer"></slot>
        </div>

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
        },
        computed: {
            hasHeader() {
                return !!this.$slots.header;
            },
            hasFooter() {
                return !!this.$slots.footer;
            }
        }
    }
</script>
