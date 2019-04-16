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

                    <div v-if="item.tail"
                         class="drawer-menu-item__tail show-when-drawer-open">
                        <c-chip color="info">
                            {{ item.tail }}
                        </c-chip>
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
    import {META} from '../../router/routes';

    import CIcon from "../../components/base/Icon";
    import CChip from "../../components/base/Chip";

    /**
     *
     * @param path
     * @param icon
     * @param title
     * @param rest
     * @return {{}&{path: string, icon: string, title: string}}
     */
    function createMenuItem(path = '/',icon = '', title = '', rest = {}) {
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
                    home: createMenuItem(META.home.path, 'home', 'Главная', {
                        exact: true
                    }),
                    orders: createMenuItem(META.orders.path, 'clipboard-check', 'Заказы', {
                        tail: 15
                    }),
                    products: createMenuItem(META.products.path, 'cart', 'Товары'),
                    reports: createMenuItem(META.reports.path, 'chart-bar', 'Отчёты'),
                    logs: createMenuItem(META.logs.path, 'library-books', 'Журналы'),
                }
            }
        }
    }
</script>
