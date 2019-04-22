<template>
    <div id="app"
         class="app-layout">

        <app-header />

        <div class="app-layout__container">
            <app-drawer />

            <app-content>
                <transition name="trans-fade-in-zoom"
                            mode="out-in">
                    <router-view></router-view>
                </transition>
            </app-content>
        </div>

    </div>
</template>

<script>
    import AppHeader from "./layout/Header";
    import AppDrawer from "./layout/Drawer";
    import AppContent from "./layout/Content";
    import CBtn from "../../components/Button";

    export default {
        name: "App",
        components: {
            CBtn,
            AppContent,
            AppDrawer,
            AppHeader
        }
    }
</script>

<style lang="scss">
    @import "../styles/app";
</style>
