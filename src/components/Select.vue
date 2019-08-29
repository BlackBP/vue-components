<template>

    <c-form-field class="c-select"
                  content-class="c-select__wrap"
                  tabindex="0"
                  :focused="focused"
                  :has-error="hasErrors"
                  :helper-text="helperText"
                  :disabled="disabled"
                  :count="itemsCount"
                  :count-max="maxItems"
                  :show-counter="maxItems > 0"
                  :show-helper="true"
                  @focus="handleShow('root.focus')"
                  @blur="searchable ? false : handleHide('root.blur')"
                  @keyup.esc="handleHide('root.keyup.esc')">

        <div class="c-select__field">

            <div v-show="labelVisibility"
                 class="c-select__label">

                <template v-if="multiple">
                    <c-chip v-for="option in selected"
                            trailing="close"
                            color="primary"
                            class="c-select__chip"
                            :key="`selected-option-${option[trackBy]}`"
                            @mousedown.prevent
                            @click.stop="labelClick(option)">
                        {{ option[optionLabel] }}
                    </c-chip>
                </template>

                <template v-else>
                    <slot v-bind="{value: selected}"
                          name="selected-single">
                        {{ selected[optionLabel] }}
                    </slot>
                </template>

            </div>

            <input v-show="searchVisibility"
                   ref="search"
                   type="text"
                   class="c-select__field-input"
                   :disabled="disabled"
                   :readonly="!searchable"
                   :placeholder="focused ? searchable ? focusPlaceholder : placeholder : placeholder"
                   :value="query"
                   @focus.prevent="handleShow('search.focus')"
                   @blur.prevent="handleHide('search.blur')"
                   @keyup.esc="handleHide('search.keyup.esc')"
                   @keyup.delete="() => {query === '' ? removeLastItem() : false}"
                   @input="handleQuery">

            <c-icon class="c-select__field-icon"
                    :class="loading ? 'mdi-spin' : ''"
                    :name="iconClassName"/>

        </div>

        <transition name="c-select-trans">
            <div v-show="focused"
                 tabindex="-1"
                 class="c-select__list"
                 @mousedown.prevent
                 @focus="showList">

                <div v-show="!hasOptions || hasMaxItems"
                     class="c-select__list-info">

                    <template v-if="!hasOptions">
                        {{ emptyPlaceholder }}
                    </template>

                    <template v-if="hasMaxItems">
                        {{ maxItemsMessage }} ({{ itemsCount }}/{{ maxItems }})
                    </template>

                </div>

                <div v-show="!hasMaxItems && hasOptions"
                     class="c-select__list-options">

                    <div v-for="option in list"
                         tabindex="-1"
                         class="c-select__option"
                         :class="{
                            'is-selected': option.isSelected,
                            'is-group': option.isGroup
                         }"
                         :key="`option-item-${option[trackBy]}`"
                         @keypress.stop.enter.space="optionClick(option)"
                         @click.stop="optionClick(option)">
                        <slot v-bind="option"
                              name="option">
                            {{ option[optionLabel] }}
                        </slot>
                    </div>

                </div>

            </div>
        </transition>

    </c-form-field>

</template>

<script>
    import CFormField from "./FormField.vue";
    import CIcon from "./Icon.vue";
    import CChip from "./Chip.vue";

    const OPTION_KEY = {
        isGroup: 'isGroup',
        isSelected: 'isSelected',
        value: 'value'
    };

    export default {
        name: "c-select",
        components: {
            CChip,
            CIcon,
            CFormField
        },
        model: {
            event: 'change'
        },
        props: {
            options: {
                type: Array,
                default: () => ([]),
                required: true
            },
            trackBy: {
                type: String,
                default: 'id',
                required: true
            },
            optionLabel: {
                type: String,
                default: 'label',
                required: true
            },
            groupValues: {
                type: String,
                default: '',
            },
            groupLabel: {
                type: String,
                default: '',
            },
            multiple: {
                type: Boolean,
                default: false,
            },
            searchable: {
                type: Boolean,
                default: false,
            },
            toggleable: {
                type: Boolean,
                default: false,
            },
            customSearch: {
                type: Boolean,
                default: false,
            },
            customSearchCallback: {
                type: Function,
                default() {
                    return []
                },
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            maxItems: {
                type: [Number, String],
                default: 0,
            },
            helper: {
                type: String,
                default: '',
            },
            placeholder: {
                type: String,
                default: '',
            },
            emptyPlaceholder: {
                type: String,
                default: 'Список пуст',
            },
            maxItemsMessage: {
                type: String,
                default: 'Выбрано максимальное количество элементов!',
            },
            focusPlaceholder: {
                type: String,
                default: 'Найти в списке...',
            },
            errors: {
                type: Array,
                default: () => ([]),
            },
            value: {
                type: null,
                default: () => ({})
            }
        },
        data() {
            return {
                focused: false,
                loading: false,
                query: '',
                list: []
            };
        },
        watch: {
            value() {
                this.parseOptions()
            },
            options() {
                this.parseOptions()
            }
        },
        computed: {
            selected() {
                if(this.multiple) {
                    return _.isArray(this.value) ? this.value : []
                } else {
                    return _.isObjectLike(this.value) ? this.value : {}
                }
            },
            hasSelected() {
                return !_.isEmpty(this.selected)
            },
            hasOptions() {
                return !_.isEmpty(this.list);
            },
            hasErrors() {
                return !_.isEmpty(this.errors)
            },
            helperText() {
                let text = this.helper;

                if (this.hasErrors) {
                    text = this.errors.join(', ');
                }

                return text;
            },
            itemsCount() {
                if (this.multiple) {
                    return this.selected.length
                }

                if (this.hasSelected) {
                    return 1;
                }
            },
            hasMaxItems() {
                if (this.maxItems > 0) {
                    return this.itemsCount === this.maxItems
                }

                return false;
            },
            iconClassName() {
                if (this.loading) return 'loading';

                return this.focused ? 'menu-up' : 'menu-down'
            },
            labelVisibility() {
                if (this.multiple) {
                    return this.hasSelected
                }

                if (this.searchable) {
                    if (this.focused) {
                        return false
                    } else {
                        return this.hasSelected
                    }
                } else {
                    return this.hasSelected
                }
            },
            searchVisibility() {
                if (this.multiple) {
                    return true
                }

                if (this.searchable) {
                    if (this.focused) {
                        return true
                    } else {
                        return !this.hasSelected
                    }
                } else {
                    return !this.hasSelected
                }
            }
        },
        methods: {
            // Option interactions
            /**
             * Handles a click event of the option
             *
             * @param option
             */
            optionClick(option = {}) {
                let optionValue = option[OPTION_KEY.value];
                let isGroup = option[OPTION_KEY.isGroup];
                let isSelected = option[OPTION_KEY.isSelected];

                /* The Groups is not selectable. TODO: make the groups selectable */
                if (isGroup) {
                    this.handleShow();
                    return
                }

                if (this.multiple) {
                    let selected = [...this.selected];

                    if (isSelected) {
                        selected = _.filter(selected, item => {
                            return item[this.trackBy] !== optionValue[this.trackBy]
                        });
                    } else {
                        selected.push(optionValue)
                    }

                    optionValue = _.uniqBy(selected, this.trackBy);

                    /* if has maximum items prevent option select */
                    if (this.hasMaxItems) {
                        return;
                    }

                    this.handleChange(optionValue);
                } else {
                    if (this.toggleable) {
                        optionValue = isSelected ? {} : optionValue
                    } else {
                        this.hideList()
                    }

                    /* if has maximum items prevent option select */
                    if (this.hasMaxItems && !_.isEmpty(optionValue)) {
                        return;
                    }

                    this.handleChange(optionValue);
                }
            },

            // List interactions
            /**
             * Filters the list by query string
             *
             * @param {String} query
             */
            filterByQuery: _.debounce(function (query = '') {
                if (this.customSearch) {
                    this.customSearchCallback(query)
                        .then(() => {
                            this.hideSpinner()
                        })
                        .catch(() => {
                            this.hideSpinner();
                            this.setList([]);
                        })
                } else {
                    this.parseOptions();
                    this.hideSpinner();
                }
            }, 300),

            /**
             * Removes a option from the list
             *
             * @param {Object} option
             */
            removeItem(option = {}) {
                if (_.isEmpty(this.selected)) return;

                let optionId = _.get(option, this.trackBy, false);

                let filteredList = _.filter(this.selected, item => {
                    return optionId !== _.get(item, this.trackBy, null)
                });

                this.handleChange(filteredList)
            },

            /**
             * Removes last item in selected list
             */
            removeLastItem() {
                if(_.isArray(this.selected)) {
                    this.removeItem(_.last(this.selected))
                }
            },

            /**
             *
             */
            parseOptions() {
                let selectedOptions = this.selected;
                let options = _.isArray(this.options) ? [...this.options] : [];
                let trackBy = this.trackBy;
                let optionLabel = this.optionLabel;
                let groupValues = this.groupValues;
                let groupLabel = this.groupLabel;
                let queryString = this.query;

                if(_.isEmpty(options)) {
                    this.setList([]);
                    return;
                }

                if (groupValues !== '') {
                    options = _.reduce(options, (total, option) => {
                        let values = _.get(option, groupValues, []);

                        total.push({
                            [trackBy]: _.get(option, trackBy, ''),
                            [optionLabel]: _.get(option, groupLabel, ''),
                            [OPTION_KEY.value]: values,
                            [OPTION_KEY.isGroup]: values.length > 0
                        });

                        return _.concat(total, values);
                    }, []);
                }

                let list = _.map(options, option => {
                    let isGroup = _.get(option, OPTION_KEY.isGroup, false);
                    let itemId = _.get(option, trackBy, '');
                    let isSelected = false;

                    if (this.multiple) {
                        isSelected = _.some(selectedOptions, {[trackBy]: itemId})
                    } else {
                        isSelected = itemId === _.get(selectedOptions, trackBy, null);
                    }

                    if (isGroup) {
                        option[OPTION_KEY.isSelected] = isSelected;
                        return option;
                    }

                    return {
                        [trackBy]: itemId,
                        [optionLabel]: _.get(option, optionLabel, ''),
                        [OPTION_KEY.value]: option,
                        [OPTION_KEY.isGroup]: isGroup,
                        [OPTION_KEY.isSelected]: isSelected
                    }
                });

                if(this.searchable && queryString !== '') {
                    list = _.filter(list, item => {
                        let label = _.toLower(_.get(item, optionLabel, ''));

                        if (label !== '') {
                            return label.match(_.toLower(queryString))
                        }

                        return true;
                    });
                }

                this.setList(list);
            },

            /**
             * Sets the list, with type check
             *
             * @param newList
             */
            setList(newList = []) {
                newList = _.isArray(newList) ? newList : [];
                this.list = newList;
            },

            /**
             * Resets the list
             */
            resetList() {
                this.parseOptions()
            },

            /**
             * Hides the list
             */
            hideList() {
                if (!this.focused) return;

                this.focused = false;
                this.clearQuery();

                if (this.searchable) {
                    this.blurSearch();
                } else {
                    this.blur();
                }
            },

            /**
             * Shows the list
             */
            showList() {
                if (this.focused || this.disabled) return;

                this.clearQuery();
                this.resetList();

                this.$nextTick(() => {
                    this.focused = true;

                    if (this.searchable) {
                        this.$nextTick(() => {
                            this.focusSearch();
                        });
                    } else {
                        this.focus();
                    }
                })
            },

            // Label interactions
            /**
             *
             * @param option
             */
            labelClick(option) {
                this.removeItem(option)
            },

            // Handlers
            /**
             * Handles the query string change
             *
             * @param event
             */
            handleQuery(event) {
                this.query = event.target.value;
                this.$nextTick(() => {
                    if (this.searchable) {
                        this.showSpinner();
                        this.filterByQuery(this.query);
                    }
                })
            },

            /**
             * Emits the change event
             *
             * @param value - payload
             */
            handleChange(value) {
                this.$emit('change', value);
            },

            handleShow(event) {
                this.showList();
            },

            handleHide(event) {
                this.hideList();
            },

            // Spinner interactions
            /**
             * Hides the spinner
             */
            hideSpinner() {
                this.loading = false;
            },

            /**
             * Show the spinner
             */
            showSpinner() {
                this.loading = true;
            },

            // Misc
            focusSearch() {
                this.$refs.search.focus();
            },

            blurSearch() {
                this.$refs.search.blur();
            },

            focus() {
                this.$el.focus();
            },

            blur() {
                this.$el.blur();
            },

            /**
             * Clears the query string
             */
            clearQuery() {
                this.query = '';
            },
        },
        mounted() {
            this.resetList();
        }
    };
</script>
