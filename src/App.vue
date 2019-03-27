<template>
    <div id="app"
         class="app-container">

        <div id="nav"
             class="app-nav">

            <div class="app-nav__header nav-user">

                <div class="nav-user__left">

                    <div class="nav-user__photo c-image c-image--circle">
                        <img src="./assets/images/avatars/male-1.jpg"
                             alt="User">
                    </div>

                </div>

                <div class="nav-user__right">

                    <div class="nav-user__name">
                        Konstantin
                    </div>

                    <c-chip class="nav-user__role"
                            text="developer"/>

                </div>

            </div>

            <div class="app-nav__menu">

                <router-link v-for="(route, index) in routes"
                             :key="index"
                             :to="route.path"
                             class="app-nav__menu-item">
                    {{ route.name }}
                </router-link>

            </div>

            <div class="app-nav__footer">

            </div>

        </div>

        <router-view class="app-router-view"/>

    </div>
</template>

<script>
    import {routes} from './router/routes';
    import CMarker from "./components/Marker";
    import CChip from "./components/base/Chip";

    export default {
        name: 'App',
        components: {CChip, CMarker},
        data() {
            return {
                routes: _.map(routes, route => {
                    return {
                        path: route.path,
                        name: route.name
                    }
                })
            }
        }
    }
</script>

<style lang="scss">
    @import "assets/styles/app.scss";
</style>
