<template>
    <c-card>

    </c-card>
</template>

<script>
    import CCard from "../../components/Card";
    import CTable from "../../components/Table";
    import CChip from "../../components/Chip";
    import CGridContainer from "../../components/GridContainer";
    import CGridRow from "../../components/GridRow";
    import CGridCol from "../../components/GridCol";

    export default {
        name: "view-home",
        components: {
            CGridCol,
            CGridRow,
            CGridContainer,
            CChip,
            CTable,
            CCard
        },
        computed: {
            tableHeaders() {
                return {
                    id: '#',
                    name: 'Name'
                }
            },
            tableData() {
                return [...Array(100)].map((val, index) => {
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
