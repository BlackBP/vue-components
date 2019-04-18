<template>
    <div class="c-loading-overlay">

        <transition name="trans-fade-in">
            <div v-show="loading"
                 class="c-loading-overlay__loading">
                <c-loading :elevated="true" />
            </div>
        </transition>

        <slot></slot>

    </div>
</template>

<script>
    import CLoading from "./Loading";

    export default {
        name: "c-loading-overlay",
        components: {
            CLoading
        },
        props: {
            loading: {
                type: Boolean,
                default: false,
                required: true
            }
        },
    }
</script>
