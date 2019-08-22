<template>
    <c-card>
        <h1>Components</h1>

        <div class="sticky-header">
            <table>
                <thead>
                <tr>
                    <th>
                        <b>ID</b>
                    </th>
                    <th>
                        <b>Name</b>
                    </th>
                    <th>
                        <b>Age</b>
                    </th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="item in data"
                    :key="item.id">
                    <td>{{ item.id }}</td>
                    <td>{{ item.name }}</td>
                    <td>{{ item.age }}</td>
                </tr>
                </tbody>
                <tfoot>
                <tr>
                    <td>id</td>
                    <td>name</td>
                    <td>age</td>
                </tr>
                </tfoot>
            </table>
        </div>

    </c-card>
</template>

<script>

    export default {
        name: "Components",
        data() {
            return {
                data: _.mapValues(Array(50), (item, index) => {
                    return {
                        id: index,
                        name: 'Name #' + index,
                        age: index + 2
                    }
                })
            }
        }
    }
</script>

<style lang="scss"
       scoped>
    .sticky-header {
        display: block;
        width: 100%;
        height: 400px;
        overflow: auto;

        table {
            position: relative;
            width: 100%;
            height: 100%;
            text-align: left;
            border-collapse: collapse;
            background: #fff;

            thead,
            tfoot {
                th,
                td {
                    position: sticky;
                    background: #CCC;
                }
            }

            thead {
                th,td {
                    top: 0;
                }
            }

            tfoot {
                th,td {
                    bottom: 0;
                }
            }

            th,
            td {
                border: 1px solid #DDD;
                padding: 6px 12px;
            }
        }
    }
</style>