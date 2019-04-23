<template>
    <div class="c-table">

        <div v-if="$slots['header']"
             class="c-table__header">
            <slot name="header"></slot>
        </div>

        <c-scroll-view ref="scrollView"
                       class="c-table__wrap"
                       @change="handleLoading"
                       :infinite-scroll="infiniteScroll">
            <table class="c-table__table">

                <colgroup>
                    <col v-if="selectable"
                         width="70">
                    <col v-if="draggable"
                         width="70">
                    <slot name="colgroup"></slot>
                </colgroup>

                <thead>
                <tr>
                    <th v-if="selectable"
                        class="u-text-center">
                        <c-icon-btn :icon="selectIcon"
                                    :transparent="true"
                                    @click="selectAll"/>
                    </th>

                    <th v-if="draggable"
                        class="u-text-center"></th>

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
                        :class="rowClass">

                        <td v-if="selectable"
                            class="u-text-center">
                            <c-checkbox v-model="selected"
                                        :value="row"/>
                        </td>

                        <td v-if="draggable"
                            class="u-text-center">
                            <c-icon-btn icon="drag"
                                        :transparent="true"/>
                        </td>

                        <template v-for="(header, headerKey) in headers">
                            <td v-if="headerKey in row"
                                :key="`table-col-${rowIndex}-${headerKey}`">
                                <slot v-bind="{rowData: row, value: row[headerKey]}"
                                      :name="`col-${headerKey}`">
                                    {{ row[headerKey] }}
                                </slot>
                            </td>
                        </template>

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

        <div v-if="$slots['footer']"
             class="c-table__footer">
            <slot name="footer"></slot>
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
    import Draggable from 'vuedraggable';

    import CLoading from "./Loading";
    import CChip from "./Chip";
    import CScrollView from "./ScrollView";
    import CIcon from "./Icon";
    import CCheckbox from "./Checkbox";
    import CIconBtn from "./IconButton";

    export default {
        name: "c-table",
        components: {
            CIconBtn,
            CCheckbox,
            CIcon,
            CScrollView,
            CChip,
            CLoading,
            Draggable
        },
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
            },
            selectable: {
                type: Boolean,
                default: false,
                required: false
            },
            draggable: {
                type: Boolean,
                default: false,
                required: false
            },
            infiniteScroll: {
                type: Boolean,
                default: false,
                required: false
            }
        },
        data() {
            return {
                selected: [],
                allSelected: false
            }
        },
        watch: {
            data() {
                this.resetSelected();
            },
            selected(selected) {
                this.allSelected = this.data.length === this.selected.length;
                this.$emit('select', selected);
            }
        },
        computed: {
            hasData() {
                return this.data instanceof Array && this.data.length > 0;
            },
            selectIcon() {
                let icon = 'checkbox-blank-outline';

                if (this.allSelected) {
                    icon = 'checkbox-marked';
                } else {
                    icon = 'checkbox-blank-outline';
                }

                if (this.selected.length > 0 && this.selected.length < this.data.length) {
                    icon = 'minus-box';
                }

                return icon;
            }
        },
        methods: {
            selectAll() {
                if (this.allSelected) {
                    this.resetSelected();
                    return;
                }

                this.selected = _.map(this.data, item => item)
            },
            resetSelected() {
                this.selected = [];
            },
            scrollTo(x = 0, y = 0) {
                this.$refs.scrollView.scrollTo(x, y);
            },
            resetScroll() {
                this.$refs.scrollView.scrollTo(0, 0)
            },
            handleLoading($state) {
                this.$emit('loading', $state);
            }
        }
    }
</script>
