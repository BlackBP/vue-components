<template>
    <c-card>
        <c-table :headers="tableHeaders"
                 :data="tableData">
            <template slot="colgroup">
                <col width="50px" />
            </template>
        </c-table>
    </c-card>
</template>

<script>
    import CCard from "../../components/Card";
    import CTable from "../../components/Table";

    export default {
        name: "view-home",
        components: {
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
                return [...Array(300)].map((val, index) => {
                    return {
                        id: index + 1,
                        name: `item ${index + 1}`
                    }
                })
            }
        }
    }
</script>
