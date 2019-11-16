<template>
    <div class="c-data-table">

        <table class="c-data-table__table c-table">
            <colgroup>
                <slot name="colgroup"/>
            </colgroup>

            <thead v-if="hasHeaders">
            <tr>
                <th v-for="(header, key) in headers"
                    :class="getHeaderClassName(header, key)"
                    :key="`table-header-${key}`">
                    <slot v-bind="{key: key, value: header}"
                          :name="`header-${key}`">
                        {{ header }}
                    </slot>
                </th>
            </tr>
            </thead>
            <tbody>

            <template v-if="hasData">
                <tr v-for="(row, rowIndex) in data"
                    :key="getRowKey(row, rowIndex)"
                    :class="getRowClassName(row, rowIndex)"
                    @click="(event) => onRowClick(event, row, rowIndex)"
                    @contextmenu="(event) => onRowContextMenu(event, row, rowIndex)">

                    <template v-for="(header, headerKey) in headers">
                        <td v-if="headerKey in row"
                            :key="`table-col-${rowIndex}-${headerKey}`">
                            <slot v-bind="{rowData: row, rowIndex: rowIndex, value: row[headerKey]}"
                                  :name="`col-${headerKey}`">
                                {{ row[headerKey] }}
                            </slot>
                        </td>
                    </template>
                </tr>
            </template>

            <template v-else>
                <tr>
                    <td :colspan="columnsCount">
                        <slot name="is-empty">
                            <div class="text-center">
                                Нет данных.
                            </div>
                        </slot>
                    </td>
                </tr>
            </template>

            </tbody>
            <tfoot>
            <slot v-bind="{colspan: columnsCount}"
                  name="tfoot"/>
            </tfoot>
        </table>

    </div>
</template>

<script>
    import {createProp} from "../../utils/component";
    import {
        isFunction,
        get,
        isArray,
        size,
        isObjectLike
    } from "../../utils/helpers";

    /**
     *
     * @param {Array|Object|String|Function} handler
     * @param {*} row
     * @param {*} index
     * @return {Array|Object|String}
     */
    const getClassName = (handler = '', row, index) => {
        if (isFunction(handler)) {
            return handler(row, index)
        }

        return handler
    };

    export default {
        name: "CDataTable",
        props: {
            data: createProp(Array, () => ([]), true),
            headers: createProp(Object, () => ({}), true),
            rowClass: createProp([Array, Object, String, Function], ''),
            headerClass: createProp([Array, Object, String, Function], ''),
            trackBy: createProp(String, ''),
        },
        computed: {
            // Data
            hasData() {
                return isArray(this.data) && size(this.data) > 0
            },

            // Headers
            hasHeaders() {
                return isObjectLike(this.headers) && !isArray(this.headers) && size(this.headers) > 0
            },

            // Columns
            columnsCount() {
                if (isArray(this.headers)) return 0;
                return size(this.headers);
            }
        },
        methods: {
            // Rows
            getRowKey(row, rowIndex) {
                if (this.trackBy) {
                    return get(row, this.trackBy)
                }

                return `table-row-${rowIndex}`
            },

            getRowClassName(row, rowIndex) {
                return getClassName(this.rowClass, row, rowIndex)
            },

            // Header
            getHeaderClassName(headerText, headerKey) {
                return getClassName(this.headerClass, headerText, headerKey)
            },

            // Listeners
            onRowClick(event, row, rowIndex) {
                this.$emit('row-click', event, row, rowIndex)
            },
            onRowContextMenu(event, row, rowIndex) {
                this.$emit('row-contextmenu', event, row, rowIndex)
            }
        }
    }
</script>