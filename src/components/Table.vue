<template>
    <div class="c-table">

        <div v-if="$slots['header']"
             class="c-table__header">
            <slot name="header"></slot>
        </div>

        <c-scroll-view ref="scrollView"
                       class="c-table__wrap"
                       :infinite-scroll="infiniteScroll"
                       @change="handleInfiniteScroll">
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
                        <c-icon-btn :color="hasSelected ? 'primary' : ''"
                                    :icon="selectIcon"
                                    :transparent="!hasSelected"
                                    @click="selectAll"/>
                    </th>

                    <th v-if="draggable"
                        class="u-text-center">
                        <c-icon-btn icon="swap-vertical"
                                    :color="draggableEnabled ? 'primary' : ''"
                                    :transparent="!draggableEnabled"
                                    @click="toggleDraggable" />
                    </th>

                    <th v-for="(header, key) in headers"
                        :key="`table-header-${key}`">
                        <slot :name="`header-${key}`">
                            {{ header }}
                        </slot>
                    </th>

                </tr>
                </thead>

                <draggable v-model="list"
                           tag="tbody"
                           draggable=".drag-item"
                           handle=".drag-handle"
                           :disabled="!draggableEnabled"
                           @start="onDragStart"
                           @end="onDragEnd">

                <template v-if="hasData">

                    <tr v-for="(row, rowIndex) in list"
                        class="drag-item"
                        :key="`table-row-${rowIndex}`"
                        :class="rowClass"
                        @mouseup="$emit('rowclick', row)">

                        <td v-if="selectable"
                            class="u-text-center">
                            <c-checkbox v-model="selected"
                                        :value="row"/>
                        </td>

                        <td v-if="draggable"
                            class="u-text-center">
                            <c-icon-btn v-show="draggableEnabled"
                                        icon="drag"
                                        class="drag-handle"
                                        :disabled="!draggableEnabled"
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
                        <td class="u-text-center"
                            :colspan="colsCount">
                            <c-chip color="warn"
                                    leading="information">
                                Нет данных.
                            </c-chip>
                        </td>
                    </tr>
                </template>

                </draggable>

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
                list: [],
                selected: [],
                draggableEnabled: false
            }
        },
        watch: {
            data(value) {
                this.list = [...value];
                this.resetSelected();
            },
            selected(selected) {
                this.$emit('select', selected);
            }
        },
        computed: {
            hasData() {
                return this.list instanceof Array && this.list.length > 0;
            },
            allSelected() {
                return this.list.length === this.selected.length
            },
            hasSelected() {
                return this.selected.length > 0
            },
            selectIcon() {
                let icon = 'checkbox-blank-outline';

                if (this.allSelected) {
                    icon = 'checkbox-marked';
                } else {
                    icon = 'checkbox-blank-outline';
                }

                if (this.selected.length > 0 && this.selected.length < this.list.length) {
                    icon = 'minus-box';
                }

                return icon;
            },
            colsCount() {
                let count = Object.keys(this.headers).length;

                if(this.selectable) {
                    count++;
                }
                if(this.draggable) {
                    count++;
                }

                return count;
            }
        },
        methods: {
            selectAll() {
                if (this.allSelected) {
                    this.resetSelected();
                    return;
                }

                this.selected = _.map(this.list, item => item)
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
            handleInfiniteScroll($state) {
                this.$emit('infinite', $state);
            },
            resetInfiniteScroll() {
                this.$refs.scrollView.resetInfiniteScroll();
            },
            toggleDraggable() {
                this.draggableEnabled = !this.draggableEnabled
            },

            // Draggable methods
            /**
             * @param event
             */
            onDragStart(event) {
                let itemIndex = event.oldIndex;
                let item = this.list[itemIndex];

                this.$emit('dragstart', event, {
                    item
                });
            },

            /**
             * @param event
             */
            onDragEnd(event) {
                let newIndex = event.newIndex;
                let nextItemIndex = newIndex + 1;
                let prevItemIndex = newIndex - 1;

                prevItemIndex = prevItemIndex <= 0 ? 0 : prevItemIndex;

                let item = this.list[newIndex];
                let nextItem = this.list[nextItemIndex];
                let prevItem = this.list[prevItemIndex];

                this.$emit('dragend', event, {
                    item,
                    nextItem,
                    prevItem
                });
            }
        }
    }
</script>
