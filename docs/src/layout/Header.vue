<template>
    <header class="app-header elevate-6">
        <c-stack-group style="height: 100%;">
            <c-stack-item>
                <c-icon-btn :icon="drawerIsOpen ? 'menu-open' : 'menu'"
                            :transparent="true"
                            @click="toggleDrawer"/>
            </c-stack-item>
            <c-stack-item style="margin-left: 0;"
                          :flex="true">
                <div class="app-header__title">
                    @blackbp/vue-components
                </div>
            </c-stack-item>
            <c-stack-item>
                <c-icon-btn icon="github-circle"
                            tag="a"
                            href="https://github.com/BlackBP/vue-components"
                            target="_blank"
                            :transparent="true" />
            </c-stack-item>
        </c-stack-group>
    </header>
</template>

<script>
    import {CIconBtn} from "../../../src/components/icon-button";
    import {CStackGroup} from "../../../src/components/stack-group";
    import {CStackItem} from "../../../src/components/stack-group";

    export default {
        name: "app-header",
        components: {
            CStackItem,
            CStackGroup,
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
