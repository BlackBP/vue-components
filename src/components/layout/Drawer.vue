<template>
    <div class="app-nav">

        <div class="app-nav__header nav-user">

            <div class="nav-user__left">

                <div class="nav-user__photo c-image c-image--circle">
                    <img src="../../assets/images/avatars/user.png"
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
</template>

<script>
    import {routes} from '../../router/routes';
    import CChip from "../base/Chip";

    export default {
        name: "layout-drawer",
        components: {CChip},
        computed: {
            routes() {
                return _.map(routes, route => {
                    return {
                        path: route.path,
                        name: route.name
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
