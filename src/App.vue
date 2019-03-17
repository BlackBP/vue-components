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

                    <div class="nav-user__role c-chip">
                        developer
                    </div>

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

    export default {
        name: 'App',
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
    @import "assets/styles/common";

    html,
    body {
        display: block;
        width: 100%;
        max-width: 100%;
    }

    body {
        background-color: #fff;
    }

    .app-container {
        position: relative;
        display: flex;
        flex-flow: row nowrap;
        justify-content: flex-start;
        align-items: flex-start;
        width: 100%;
        max-width: 100%;
        height: 100vh;
        overflow: hidden;

        @media screen and (max-width: 768px) {
            display: block;
            overflow: auto;
        }
    }

    .app-nav {
        $self: #{&};

        $header: #{$self}__header;
        $footer: #{$self}__footer;

        $menu: #{$self}__menu;
        $menu-item: #{$self}__menu-item;

        $padding: 10px 15px;
        $border: 1px nth($g-border, 2) nth($g-border, 3);

        @at-root {
            #{$self} {
                flex: 0 1 auto;
                display: block;
                width: 100%;
                max-width: 320px;
                height: 100%;
                border-right: $border;
            }

            #{$header},
            #{$footer} {
                display: block;
                width: 100%;
                padding: $padding;
            }

            #{$header} {

            }

            #{$menu} {
                display: block;
                width: 100%;
                padding: 10px 0;
                border-top: $border;
                border-bottom: $border;
            }

            #{$menu-item} {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                width: 100%;
                height: auto;
                padding: $padding;
                line-height: 1;
                text-decoration: none;

                &:hover,
                &:focus {
                    text-decoration: none;
                }

                &.router-link-active {
                    background-color: $color-primary;
                    color: #fff;
                }
            }
        }
    }

    .c-chip {
        display: inline-block;
        padding: 4px 10px;
        background: #DDD;
        border-radius: $g-border-radius + 2;
        font-size: 90%;
        line-height: 1;
    }

    .nav-user {
        $self: #{&};
        $left: #{$self}__left;
        $right: #{$self}__right;
        $photo: #{$self}__photo;
        $name: #{$self}__name;
        $role: #{$self}__role;

        $photo-size: 80px;

        @at-root {
            #{$self} {
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
            }

            #{$left} {
                flex: 0 0 auto;
                display: block;
                margin: auto auto auto 0;
            }

            #{$right} {
                flex: 1 1 auto;
                display: block;
                margin: auto 0 auto 15px;
            }

            #{$photo} {
                display: block;
                width: $photo-size;
                height: $photo-size;
                border-radius: $photo-size / 2;
                overflow: hidden;

                & > img {
                    position: relative;
                    display: block;
                    width: 100%;
                    max-width: 100%;
                    height: auto;
                    top: 50%;
                    left: 50%;
                    transform: translate(-50%, -50%);
                }
            }

            #{$name} {
                display: block;
                line-height: 1;
                font-size: 125%;
                font-weight: bold;
            }

            #{$role} {
                margin-top: 5px;
                background: $color-secondary;
                color: #fff;
            }
        }
    }

    .app-router-view {
        flex: 1 1 auto;
        display: block;
        width: 100%;
        max-width: 100%;
        height: 100%;
        padding: 30px;
        overflow-y: auto;
    }
</style>
