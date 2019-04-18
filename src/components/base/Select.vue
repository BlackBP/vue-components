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
                  :show-counter="showCounter"
                  :show-helper="true"
                  @focus="handleShow('root.focus')"
                  @blur="searchable ? false : handleHide('root.blur')"
                  @keyup.esc="handleHide('root.keyup.esc')">

        <div class="c-select__field">

            <div v-show="labelVisibility"
                 class="c-select__label">

                <template v-if="multiple">
                    <c-chip v-for="option in value"
                            trailing="close"
                            color="primary"
                            class="c-select__chip"
                            :key="`selected-option-${option[trackBy]}`"
                            @click.stop="labelClick(option)">
                        {{ option[optionLabel] }}
                    </c-chip>
                </template>

                <template v-else>
                    {{ value[optionLabel] }}
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
                   @input="handleQuery">

            <c-icon class="c-select__field-icon"
                    :class="loading ? 'mdi-spin' : ''"
                    :name="iconClassName"/>

        </div>

        <transition name="c-select-trans">
            <div v-show="focused"
                 tabindex="1"
                 class="c-select__list"
                 @focus="showList">

                <div v-show="!hasOptions"
                     class="c-select__list-placeholder">
                    {{ emptyPlaceholder }}
                </div>

                <div class="c-select__list-options">

                    <div v-for="option in list"
                         tabindex="0"
                         class="c-select__option"
                         :class="{
                        'is-selected': checkIsActive(option),
                        'is-group': checkIsGroup(option)
                     }"
                         :key="`option-item-${option[trackBy]}`"
                         @keypress.stop.enter.space="optionClick(option)"
                         @click.stop="optionClick(option)">
                        {{ option[optionLabel] }}
                    </div>

                </div>

            </div>
        </transition>

    </c-form-field>

</template>

<script>
    import CFormField from "./FormField";
    import CIcon from "./Icon";
    import CChip from "./Chip";

    function LOG(...rest) {
        console.log('[c-select]', ...rest);
    }

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
                required: false
            },
            groupLabel: {
                type: String,
                default: '',
                required: false
            },
            multiple: {
                type: Boolean,
                default: false,
                required: false
            },
            searchable: {
                type: Boolean,
                default: false,
                required: false
            },
            toggleable: {
                type: Boolean,
                default: false,
                required: false
            },
            customSearch: {
                type: Boolean,
                default: false,
                required: false
            },
            customSearchCallback: {
                type: Function,
                default() {
                },
                required: false
            },
            disabled: {
                type: Boolean,
                default: false,
                required: false
            },
            maxItems: {
                type: [Number, String],
                default: 0,
                require: false
            },
            showCounter: {
                type: Boolean,
                default: false,
                required: false
            },
            icon: {
                type: String,
                default: '',
                required: false
            },
            helper: {
                type: String,
                default: '',
                required: false
            },
            title: {
                type: String,
                default: '',
                required: false
            },
            placeholder: {
                type: String,
                default: '',
                required: false
            },
            emptyPlaceholder: {
                type: String,
                default: 'Список пуст',
                required: false
            },
            focusPlaceholder: {
                type: String,
                default: 'Найти в списке...',
                required: false
            },
            errors: {
                type: Array,
                default: () => ([]),
                required: false
            },
            value: {
                type: null,
                default: ''
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
        computed: {
            hasSelected() {
                return !_.isEmpty(this.value);
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
                let count = 0;

                if (_.isArray(this.value)) {
                    count = this.value.length;
                }
                if (_.isObjectLike(this.value)) {
                    count = 1;
                }

                return count;
            },
            iconClassName() {
                if(this.loading) return 'loading';

                return this.focused ? 'menu-up' : 'menu-down'
            },
            labelVisibility() {
                if(this.multiple) {
                    return this.hasSelected
                }

                if(this.searchable) {
                    if(this.focused) {
                        return false
                    } else {
                        return this.hasSelected
                    }
                } else {
                    return this.hasSelected
                }
            },
            searchVisibility() {
                if(this.multiple) {
                    return true
                }

                if(this.searchable) {
                    if(this.focused) {
                        return true
                    } else {
                        return !this.hasSelected
                    }
                } else {
                    return !this.hasSelected
                }
            },
            parsedOptions() {
                let options = _.isArray(this.options) ? this.options : [];

                if (this.groupValues !== '') {
                    return _.reduce(options, (total, group) => {
                        total.push(group);
                        total = _.concat(total, _.get(group, this.groupValues, []));
                        return total
                    }, [])
                } else {
                    return _.map(options, option => option);
                }
            },
        },
        methods: {
            // Option interactions
            /**
             * Handles a click event of the option
             *
             * @param option
             */
            optionClick(option = {}) {
                let isGroup = this.checkIsGroup(option);

                if (isGroup) return;

                let hasSelected = this.checkIsActive(option);

                if (this.multiple) {
                    let selected = _.isArray(this.value) ? this.value : [];

                    if (hasSelected) {
                        selected = this.removeItem(option, selected);
                    } else {
                        selected.push(option)
                    }

                    option = _.uniqBy(selected, this.trackBy);
                } else {
                    if(this.toggleable) {
                        option = hasSelected ? {} : option
                    }
                }

                this.handleHide('option.click');
                this.handleChange(option);
            },

            /**
             *
             * @param option
             */
            checkIsActive(option = {}) {
                let trackBy = this.trackBy;

                if (this.multiple) {
                    return _.some(this.value, {[trackBy]: option[trackBy]})
                }

                return this.value[trackBy] === option[trackBy]
            },

            /**
             * @param option
             */
            checkIsGroup(option = {}) {
                let values = _.get(option, this.groupValues, []);

                return values.length > 0
            },

            // List interactions

            /**
             * Filters the list by query string
             *
             * @param query
             */
            filterByQuery: _.debounce(function (query) {
                if (this.customSearch) {
                    this.customSearchCallback(query)
                        .then(result => {
                            this.hideSpinner();
                            this.setList(result)
                        })
                        .catch(() => {
                            this.hideSpinner();
                            this.setList([]);
                        })
                } else {
                    let result = _.filter(this.parsedOptions, item => {
                        let label = _.lowerCase(_.get(item, this.optionLabel, ''));

                        if (label !== '') {
                            return label.match(_.lowerCase(query))
                        }

                        return true;
                    });

                    this.hideSpinner();
                    this.setList(result);
                }
            }, 300),

            /**
             * Removes a option from the list
             *
             * @param option
             * @param list
             */
            removeItem(option = {}, list = []) {
                list = _.isArray(list) ? list : [];

                if (_.isEmpty(list)) return;

                let optionId = _.get(option, this.trackBy, null);

                return _.filter(list, item => {
                    return optionId !== _.get(item, this.trackBy, null)
                })
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
                this.setList(this.parsedOptions)
            },

            /**
             * Hides the list
             */
            hideList() {
                if (!this.focused) return;

                this.focused = false;
                this.clearQuery();

                if (this.searchable) {
                    this.$refs.search.blur();
                } else {
                    this.$el.blur();
                }
            },

            /**
             * Shows the list
             */
            showList() {
                if (this.focused || this.disabled) return;

                this.focused = true;
                this.resetList();

                if (this.searchable) {
                    this.$nextTick(() => {
                        this.$refs.search.focus();
                    });
                } else {
                    this.$el.focus();
                }
            },

            // Label interactions

            /**
             *
             * @param option
             */
            labelClick(option) {
                this.handleChange(this.removeItem(option, this.value));
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
            focus() {
                this.$el.focus();
            },

            /**
             * Clears the query string
             */
            clearQuery() {
                this.query = '';
            },
        },
        mounted() {
            this.list = this.parsedOptions
        }
    };
</script>
