<template>
    <aside class="app-drawer c-elevate-3"
           :class="isOpen ? 'is-open' : ''">

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
    import {mapState} from 'vuex';

    import CIcon from "../../../components/Icon";
    import CChip from "../../../components/Chip";

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
        components: {
            CChip,
            CIcon
        },
        computed: {
            ...mapState({
                isOpen: state => state.drawer.isOpen
            }),
            menu() {
                return {
                    home: createMenuItem(this.$appRoute.home,  {
                        exact: true
                    })
                }
            }
        }
    }
</script>
