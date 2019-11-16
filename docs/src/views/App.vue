<template>
    <div class="app-layout">

        <app-header/>

        <app-drawer/>

        <app-content>
            <transition name="router"
                        mode="out-in">
                <router-view></router-view>
            </transition>
        </app-content>

    </div>
</template>

<script>
    import AppHeader from "../layout/Header.vue";
    import AppDrawer from "../layout/Drawer.vue";
    import AppContent from "../layout/Content.vue";

    export default {
        name: "App",
        components: {
            AppContent,
            AppDrawer,
            AppHeader
        }
    }
</script>

<style lang="scss">
    @import "../app";

    $transition: .4s ease;

    .router {
        $offset: 300px;

        &-enter-active,
        &-leave-active {
            transition: opacity $transition, transform $transition;
        }

        &-enter,
        &-leave-to {
            opacity: 0;
        }

        &-enter {
            //transform: translate(0, -$offset) scale(0.95);
            transform: scale(0.95);
        }

        &-leave-to {
            opacity: 0;
            //transform: translate(0, $offset) scale(0.95);
            transform: scale(0.95);
        }

        &-enter-to {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
    }
</style>
