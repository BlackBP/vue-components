<template>
    <div class="c-table-wrap">
        <table class="c-table">
            <colgroup>
                <slot name="colgroup"/>
            </colgroup>

            <thead v-if="showHeaders">
            <tr>
                <th v-for="(header, key) in headers"
                    :key="`table-header-${key}`">
                    <slot v-bind="{key, value: header}"
                          :name="`header-${key}`">
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
                    @click="$emit('row-click', row, rowIndex)"
                    @contextmenu="$emit('row-contextmenu', $event, row, rowIndex)">

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
    </div>
</template>

<script>
    import {
        isArray,
        isObjectLike,
        size
    } from '../../utils/helpers';

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
            showHeaders: {
                type: Boolean,
                default: true
            },
            rowClass: {
                type: String,
                default: ''
            }
        },
        computed: {
            hasData() {
                if (!isArray(this.data)) return false;
                return size(this.data) > 0
            },
            columnsCount() {
                if (!isObjectLike(this.headers)) return 0;
                if (isArray(this.headers)) return 0;

                return size(Object.keys(this.headers));
            }
        }

    }
</script>
