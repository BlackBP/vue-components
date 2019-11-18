<template>
    <transition>
        <aside v-show="isOpen"
               class="app-drawer elevate-6">

            <div class="app-drawer__header">
            </div>

            <div class="app-drawer__body">
                <nav class="drawer-menu">

                    <router-link v-for="(item, itemKey) in menu"
                                 class="drawer-menu-item"
                                 :to="item.path"
                                 :exact="!!item.exact"
                                 :key="`menu-item-${itemKey}`"
                                 @click.native="closeDrawer">

                        <div class="drawer-menu-item__icon">
                            <c-icon :name="item.icon"/>
                        </div>

                        <div class="drawer-menu-item__title show-when-drawer-open">
                            <div>{{ item.title }}</div>
                        </div>

                    </router-link>

                </nav>
            </div>

            <div class="app-drawer__footer">
            </div>

        </aside>
    </transition>
</template>

<script>

    /**
     *
     * @param path
     * @param title
     * @param icon
     * @param metaRest
     * @param rest
     * @return {{}&{path: string, icon: string, title: string}}
     */
    function createMenuItem({path = '/', title = '', icon = ''} = {}, rest = {}) {
        return {
            path,
            icon,
            title,
            ...rest
        }
    }

    export default {
        name: "app-drawer",
        computed: {
            isOpen() {
                return this.$store.getters[this.$storeMeta.getter.drawerIsOpen]
            },
            menu() {
                return {
                    home: createMenuItem(this.$appRoute.home,  {
                        exact: true
                    }),
                    buttons: createMenuItem(this.$appRoute.buttons),
                    formFields: createMenuItem(this.$appRoute.formFields),
                    collapse: createMenuItem(this.$appRoute.collapse),
                    notifications: createMenuItem(this.$appRoute.notifications),
                    contextPopup: createMenuItem(this.$appRoute.contextPopup),
                    icons: createMenuItem(this.$appRoute.icons),
                }
            }
        },
        methods: {
            closeDrawer() {
                this.$store.commit(this.$storeMeta.mutation.closeDrawer)
            },
            openDrawer() {
                this.$store.commit(this.$storeMeta.mutation.openDrawer)
            },
        }
    }
</script>

<style lang="scss"
       scoped>
    $transition: 0.2s ease;

    .v-enter-active,
    .v-leave-active {
        transition: transform $transition, opacity $transition;
    }

    .v-enter,
    .v-leave-to {
        transform: translate(-40%, 0);
        opacity: 0;
    }

    .v-enter-to,
    .v-leave {
        transform: translate(0, 0);
    }
</style>