<template>
    <header class="app-header c-elevate-3">
        <c-icon-btn :icon="drawerIsOpen ? 'menu-open' : 'menu'"
                    :transparent="true"
                    @click="toggleDrawer"/>
        <div class="app-header__title">Панель управления</div>
    </header>
</template>

<script>
    import CIconBtn from "../../../components/IconButton";

    export default {
        name: "app-header",
        components: {
            CIconBtn
        },
        computed: {
            drawerIsOpen() {
                return this.$store.getters[this.$storeMeta.getter.drawerIsOpen]
            }
        },
        methods: {
            toggleDrawer() {
                this.$store.commit(this.$storeMeta.mutation.toggleDrawer)
            }
        }
    }
</script>
