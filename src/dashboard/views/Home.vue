<template>

    <div>
        <c-card v-for="(panel, index) in panels"
                class="c-elevate-3"
                style="margin-bottom: 15px;"
                :key="panel.id">

            <div class="u-flex u-flex-row u-flex-items-center u-flex-content-start"
                 style="cursor: pointer"
                 @click="panel.visible ? hidePanels() : togglePanels(panel.id)">
                <c-chip color="success">
                    <b>{{ panel.name }}</b> #{{ panel.id }}
                </c-chip>
                <c-icon :name="panel.visible ? 'menu-up' : 'menu-down'"
                        size="1.5rem"
                        style="margin-left: 1rem;"/>
            </div>

            <c-collapse :visible="panel.visible">
                <c-divider/>

                <p v-for="(item, index) in Array(5)"
                   :key="index">
                    Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deserunt doloremque magni minus nam,
                    recusandae vitae? Aliquid beatae blanditiis consectetur deserunt eum, magnam minima, natus omnis
                    sunt suscipit, ullam voluptate.
                </p>

                <p>
                    <c-switch v-model="transparent">
                        Transparent buttons
                    </c-switch>

                    <c-switch v-model="elevated">
                        Elevated buttons
                    </c-switch>

                    <c-switch v-model="bordered">
                        Bordered buttons
                    </c-switch>
                </p>

                <div style="margin: 40px 20px;">
                    <div class="c-btn-group">
                        <c-btn v-for="color in ['', 'primary', 'secondary', 'success', 'error', 'warn', 'info', 'light', 'dark']"
                               icon-left="send"
                               :key="color"
                               :elevated="elevated"
                               :bordered="bordered"
                               :transparent="transparent"
                               :color="color">
                            Click me!
                        </c-btn>
                    </div>

                    <div class="c-btn-group">
                        <c-icon-btn
                                v-for="color in ['', 'primary', 'secondary', 'success', 'error', 'warn', 'info', 'light', 'dark']"
                                icon="plus"
                                :key="color"
                                :elevated="elevated"
                                :transparent="transparent"
                                :color="color"/>
                    </div>

                    <div class="c-btn-group">
                        <c-icon-btn
                                v-for="color in ['', 'primary', 'secondary', 'success', 'error', 'warn', 'info', 'light', 'dark']"
                                icon="plus"
                                :key="color"
                                :dense="true"
                                :elevated="elevated"
                                :transparent="transparent"
                                :color="color"/>
                    </div>
                </div>
            </c-collapse>
        </c-card>
    </div>

</template>

<script>
    import CCard from "../../components/Card";
    import CChip from "../../components/Chip";
    import CCollapse from "../../components/Collapse";
    import CBtn from "../../components/Button";
    import CIcon from "../../components/Icon";
    import CDivider from "../../components/Divider";
    import CSwitch from "../../components/Switch";
    import CIconBtn from "../../components/IconButton";

    export default {
        name: "view-home",
        components: {
            CIconBtn,
            CSwitch,
            CDivider,
            CIcon,
            CBtn,
            CCollapse,
            CChip,
            CCard
        },
        data() {
            return {
                bordered: false,
                elevated: false,
                transparent: false,
                panels: [...Array(10)].map((val, index) => {
                    return {
                        id: index + 1,
                        name: `Panel`,
                        visible: false
                    }
                })
            }
        },
        methods: {
            togglePanels(activeId) {
                this.panels = this.panels.map((panel) => {
                    panel.visible = panel.id === activeId;
                    return panel
                });
            },
            hidePanels() {
                this.panels = this.panels.map((panel) => {
                    panel.visible = false;
                    return panel
                });
            }
        }
    }
</script>

<style lang="scss" scoped>
    .c-btn-group {
        justify-content: flex-start;
        margin-bottom: 15px;
        padding: 15px;
        background-color: #4CAF50;

        &:last-child {
            margin-bottom: 0;
        }
    }
</style>
