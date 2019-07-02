<template>
    <div class="app-layout">

        <app-header />

        <app-drawer />

        <app-content>
            <transition name="trans-fade-in-zoom"
                        mode="out-in">
                <router-view></router-view>
            </transition>
        </app-content>

    </div>
</template>

<script>
    import AppHeader from "./layout/Header";
    import AppDrawer from "./layout/Drawer";
    import AppContent from "./layout/Content";

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
    @import "../styles/app";
</style>
