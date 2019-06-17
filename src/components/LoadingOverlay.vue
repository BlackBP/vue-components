<template>
    <div class="c-loading-overlay">

        <transition name="trans-fade-in">
            <div v-show="loading"
                 class="c-loading-overlay__loading">
                <c-loading :elevated="true"
                           :text="loadingText"
                           :dense="loadingDense" />
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
            },
            loadingText: {
                type: String,
                default: 'Загрузка...',

            },
            loadingDense: {
                type: Boolean,
                default: false,

            }
        },
    }
</script>
