<template>

    <div>
        <c-card v-for="(panel, index) in panels"
                class="c-elevate-3"
                style="margin-bottom: 15px;"
                :key="panel.id">

            <div class="u-flex u-flex-row u-flex-items-center u-flex-content-start"
                 style="cursor: pointer"
                 @click="panel.visible ? hidePanels() : togglePanels(panel.id)">
                <b>{{ panel.name }}</b>
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

    export default {
        name: "view-home",
        components: {
            CDivider,
            CIcon,
            CBtn,
            CCollapse,
            CChip,
            CCard
        },
        data() {
            return {
                visible: false,
                panels: [...Array(10)].map((val, index) => {
                    return {
                        id: index + 1,
                        name: `Panel #${index + 1}`,
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
