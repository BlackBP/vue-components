<template>
    <table class="c-table">
        <colgroup>
            <slot name="colgroup"/>
        </colgroup>

        <thead>
        <tr>
            <th v-for="(header, key) in headers"
                :key="`table-header-${key}`">
                <slot :name="`header-${key}`">
                    {{ header }}
                </slot>
            </th>
        </tr>
        </thead>
        <tbody>

        <template v-if="hasData">
            <tr v-for="(row, rowIndex) in data"
                :key="`table-row-${rowIndex}`"
                :class="rowClass"
                @click="$emit('row-click', row)">

                <template v-for="(header, headerKey) in headers">
                    <td v-if="headerKey in row"
                        :key="`table-col-${rowIndex}-${headerKey}`">
                        <slot v-bind="{data: row, value: row[headerKey]}"
                              :name="`col-${headerKey}`">
                            {{ row[headerKey] }}
                        </slot>
                    </td>
                </template>

            </tr>
        </template>

        <template v-else>
            <tr>
                <td class="u-text-center"
                    :colspan="columnsCount">
                    <slot name="is-empty">
                        Нет данных.
                    </slot>
                </td>
            </tr>
        </template>

        </tbody>

        <tfoot v-if="$slots['tfoot']">
        <slot name="tfoot"/>
        </tfoot>
    </table>
</template>

<script>
    export default {
        name: "c-table",
        props: {
            data: {
                type: Array,
                default: () => ([]),
                required: true
            },
            headers: {
                type: Object,
                default: () => ({}),
                required: true
            },
            rowClass: {
                type: String,
                default: ''
            }
        },
        computed: {
            hasData() {
                if (!_.isArray(this.data)) return false;
                return _.size(this.data) > 0
            },
            columnsCount() {
                if (!_.isObjectLike(this.headers)) return 0;
                if (_.isArray(this.headers)) return 0;

                return _.size(Object.keys(this.headers));
            }
        }

    }
</script>
