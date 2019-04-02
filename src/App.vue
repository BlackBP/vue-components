<template>
    <div id="app"
         class="app-container">

        <layout-header />

        <layout-drawer />

        <router-view class="app-router-view"/>

    </div>
</template>

<script>
    import LayoutDrawer from "./components/layout/Drawer";
    import LayoutHeader from "./components/layout/Header";

    export default {
        name: 'App',
        components: {
            LayoutHeader,
            LayoutDrawer
        }
    }
</script>

<style lang="scss">
    @import "styles/app";
</style>
