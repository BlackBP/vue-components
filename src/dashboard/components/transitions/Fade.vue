<script>
    export default {
        name: "transition-fade",
        functional: true,
        render(createElement, context) {

        }
    }
</script>

<style scoped>
    .v-enter-active,
    .v-leave-active {
        transition: opacity 0.3s ease-in-out;
    }

    .v-enter,
    .v-leave-to {
        height: 0;
    }
</style>
