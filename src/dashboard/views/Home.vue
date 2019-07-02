<template>
    <c-card class="c-elevate-3">
        <c-btn @click="collapseVisible = !collapseVisible">
            Collapse
        </c-btn>
        <c-collapse :visible="collapseVisible">
            <p v-for="(item, index) in tableData"
               :key="item.id">
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. At deserunt doloremque magni minus nam,
                recusandae vitae? Aliquid beatae blanditiis consectetur deserunt eum, magnam minima, natus omnis
                sunt suscipit, ullam voluptate.
            </p>
        </c-collapse>
    </c-card>
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

    export default {
        name: "view-home",
        components: {
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
                collapseVisible: true
            }
        },
        computed: {
            tableHeaders() {
                return {
                    id: '#',
                    name: 'Name'
                }
            },
            tableData() {
                return [...Array(10)].map((val, index) => {
                    return {
                        id: index + 1,
                        name: `item ${index + 1}`
                    }
                })
            }
        },
        methods: {
            alert() {
                window.alert('!!!');
            }
        }
    }
</script>
