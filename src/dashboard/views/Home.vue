<template>
    <c-card>

        <c-table :headers="tableHeaders"
                 :data="tableData">

            <template slot="colgroup">
                <col width="50px" />
            </template>

            <template slot="col-id"
                      slot-scope="col">
                <c-chip color="primary"
                        @click="alert">
                    {{ col.value }}
                </c-chip>
            </template>

        </c-table>

    </c-card>
</template>

<script>
    import CCard from "../../components/Card";
    import CTable from "../../components/Table";
    import CChip from "../../components/Chip";

    export default {
        name: "view-home",
        components: {
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
                return [...Array(300)].map((val, index) => {
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
