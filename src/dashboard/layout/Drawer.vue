<template>
    <aside class="app-drawer c-elevate-6"
           :class="isOpen ? 'is-open' : ''"
           @mouseenter="openDrawer"
           @mouseleave="closeDrawer">

        <div class="app-drawer__header">
        </div>

        <div class="app-drawer__body">
            <nav class="drawer-menu">

                <router-link v-for="(item, itemKey) in menu"
                             class="drawer-menu-item"
                             :to="item.path"
                             :exact="!!item.exact"
                             :key="`menu-item-${itemKey}`">

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
                    components: createMenuItem(this.$appRoute.buttons),
                    notifications: createMenuItem(this.$appRoute.notifications),
                    contextPopup: createMenuItem(this.$appRoute.contextPopup),
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
