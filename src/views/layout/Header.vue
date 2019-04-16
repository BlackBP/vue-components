<template>
    <header class="app-header c-elevate-3">
        <c-icon-btn :icon="drawerIsOpen ? 'menu-open' : 'menu'"
                    :transparent="true"
                    @click="toggleDrawer" />
        <div class="app-header__title">Панель управления</div>
    </header>
</template>

<script>
    import {mapMutations, mapState} from 'vuex';

    import CIconBtn from "../../components/base/IconButton";

    export default {
        name: "app-header",
        components: {CIconBtn},
        computed: {
            ...mapState({
                drawerIsOpen: state => state.drawer.isOpen
            })
        },
        methods: {
            ...mapMutations([
                'toggleDrawer'
            ])
        }
    }
</script>
