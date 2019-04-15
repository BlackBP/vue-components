<template>
    <div id="app"
         class="app-layout">

        <app-header />

        <div class="app-layout__container">
            <app-drawer />

            <app-content>
                <transition name="fade-in"
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
    import CBtn from "../components/Button";

    export default {
        name: "App",
        components: {
            CBtn,
            AppContent,
            AppDrawer,
            AppHeader
        },
        computed: {
            logLevels() {
                return {
                    "emergency": "Аварийная",
                    "alert": "Оповещение",
                    "critical": "Критический",
                    "error": "Ошибка",
                    "warning": "Предупреждение",
                    "notice": "Уведомление",
                    "info": "Информация",
                    "debug": "Отладка"
                }
            },
            logList() {
                return {
                    "2019-04-12": {
                        "date": "2019-04-12",
                        "all": 466,
                        "emergency": 0,
                        "alert": 0,
                        "critical": 0,
                        "error": 24,
                        "warning": 0,
                        "notice": 0,
                        "info": 423,
                        "debug": 19
                    },
                    "2019-04-11": {
                        "date": "2019-04-11",
                        "all": 401,
                        "emergency": 0,
                        "alert": 0,
                        "critical": 0,
                        "error": 1,
                        "warning": 0,
                        "notice": 0,
                        "info": 378,
                        "debug": 22
                    },
                    "2019-04-10": {
                        "date": "2019-04-10",
                        "all": 348,
                        "emergency": 0,
                        "alert": 0,
                        "critical": 0,
                        "error": 19,
                        "warning": 0,
                        "notice": 0,
                        "info": 302,
                        "debug": 27
                    },
                    "2019-04-09": {
                        "date": "2019-04-09",
                        "all": 298,
                        "emergency": 0,
                        "alert": 0,
                        "critical": 0,
                        "error": 8,
                        "warning": 0,
                        "notice": 0,
                        "info": 271,
                        "debug": 19
                    },
                    "2019-04-08": {
                        "date": "2019-04-08",
                        "all": 249,
                        "emergency": 0,
                        "alert": 0,
                        "critical": 0,
                        "error": 4,
                        "warning": 0,
                        "notice": 0,
                        "info": 222,
                        "debug": 23
                    },
                    "2019-04-07": {
                        "date": "2019-04-07",
                        "all": 464,
                        "emergency": 0,
                        "alert": 0,
                        "critical": 0,
                        "error": 3,
                        "warning": 0,
                        "notice": 0,
                        "info": 415,
                        "debug": 46
                    },
                    "2019-04-06": {
                        "date": "2019-04-06",
                        "all": 573,
                        "emergency": 0,
                        "alert": 0,
                        "critical": 0,
                        "error": 6,
                        "warning": 0,
                        "notice": 0,
                        "info": 525,
                        "debug": 42
                    }
                }
            }
        }
    }
</script>

<style lang="scss">
    $color-primary: #F44336;
    $g-font-family: 'Roboto', sans-serif;
    @import url('https://fonts.googleapis.com/css?family=Roboto:400,700');
    @import "../styles/bundle";
</style>
