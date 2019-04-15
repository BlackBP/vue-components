<template>
    <div class="c-table">

        <div v-if="hasHeader"
             class="c-table__header">
            <slot name="table-header"></slot>
        </div>

        <c-scroll-view class="c-table__wrap">
            <table class="c-table__table">

                <thead>
                <tr>
                    <th v-for="(header, key) in headers">
                        <slot :name="`header-${key}`">
                            {{ header }}
                        </slot>
                    </th>
                </tr>
                </thead>

                <tbody>
                <template v-if="hasData">
                    <tr v-for="(tableRow, index) in data"
                        :class="rowClass"
                        :key="`table-row-${index}`">
                        <td v-for="(rowCol, key) in tableRow"
                            :key="`table-row-col-${key}`">
                            <slot v-bind="{rowData: tableRow, value: rowCol}"
                                  :name="`col-${key}`">
                                {{ rowCol }}
                            </slot>
                        </td>
                    </tr>
                </template>
                <template v-else>
                    <tr>
                        <td :colspan="Object.keys(headers).length"
                            class="u-text-center">
                            <c-chip color="warn"
                                    leading="information">
                                Нет данных.
                            </c-chip>
                        </td>
                    </tr>
                </template>
                </tbody>

            </table>
        </c-scroll-view>

        <div v-if="hasFooter"
             class="c-table__footer">
            <slot name="table-footer"></slot>
        </div>

        <transition name="trans-fade-in">
            <div v-show="loading"
                 class="c-table__loading">
                <c-loading :elevated="true"/>
            </div>
        </transition>
    </div>

</template>

<script>
    import CLoading from "./Loading";
    import CChip from "./Chip";
    import CScrollView from "./ScrollView";

    export default {
        name: "c-table",
        components: {CScrollView, CChip, CLoading},
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
                default: '',
                required: false
            },
            loading: {
                type: Boolean,
                default: false,
                required: false
            }
        },
        computed: {
            hasData() {
                return this.data instanceof Array && this.data.length > 0;
            },
            hasHeader() {
                return !!this.$slots['table-header'];
            },
            hasFooter() {
                return !!this.$slots['table-footer'];
            }
        }
    }
</script>
