<template>

    <div>
        <c-card v-for="(panel, index) in panels"
                class="c-elevate-3"
                style="margin-bottom: 15px;"
                :key="panel.id">
            <div class="u-flex u-flex-row u-flex-items-center u-flex-content-start"
                 style="cursor: pointer"
                 @click="!panel.visible && togglePanels(panel.id)">
                <b>{{ panel.name }}</b>
                <c-icon :name="panel.visible ? 'menu-up' : 'menu-down'"
                        size="1.5rem"
                        style="margin-left: 1rem;"/>
            </div>

            <c-collapse :visible="panel.visible">
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
    import CTable from "../../components/Table";
    import CChip from "../../components/Chip";
    import CGridContainer from "../../components/GridContainer";
    import CGridRow from "../../components/GridRow";
    import CGridCol from "../../components/GridCol";
    import CCollapse from "../components/Collapse";
    import CBtn from "../../components/Button";
    import CCardSection from "../../components/CardSection";
    import CIconBtn from "../../components/IconButton";
    import CIcon from "../../components/Icon";

    export default {
        name: "view-home",
        components: {
            CIcon,
            CIconBtn,
            CCardSection,
            CBtn,
            CCollapse,
            CGridCol,
            CGridRow,
            CGridContainer,
            CChip,
            CTable,
            CCard
        },
        data() {
            return {
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
            alert() {
                window.alert('!!!');
            },
            togglePanels(activeId) {
                this.panels = this.panels.map((panel) => {
                    panel.visible = panel.id === activeId;
                    return panel
                });
            }
        }
    }
</script>
