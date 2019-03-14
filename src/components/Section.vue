<template functional>

    <div class="section">

        <div class="section__title">
            {{ props.title }}
        </div>

        <div class="section__content">
            <slot></slot>
        </div>

    </div>

</template>

<script>
    export default {
        name: "c-section",
        props: {
            title: {
                type: String,
                default: ''
            },
            last: {
                type: Boolean,
                default: false
            }
        }
    }
</script>

<style lang="scss">
    .section {
        display: block;
        width: 100%;

        & + & {
            margin-top: 15px;
        }

        &__title {
            font-size: 125%;
            font-weight: bold;
            margin-bottom: 5px;
        }

        &__content {
            padding: 0 0 0 15px;
        }
    }
</style>
