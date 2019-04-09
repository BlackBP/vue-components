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
                  @focus="showList"
                  @blur="hideList">

        <div class="c-select__field">

            <div v-show="labelVisible"
                 class="c-select__field-label c-select__label--single">
                {{ model[optionLabel] }}
            </div>

            <div v-show="placeholderVisible"
                 class="c-select__field-placeholder">
                {{ placeholder }}
            </div>

            <input v-show="searchFieldVisible"
                   ref="search"
                   type="text"
                   class="c-select__field-input"
                   :disabled="disabled"
                   :readonly="!searchable"
                   :placeholder="focused ? focusPlaceholder : placeholder"
                   :value="query"
                   @focus.prevent="showList"
                   @blur.prevent="hideList"
                   @keyup.esc="hideList"
                   @keypress="handleKeyPress"
                   @input="handleQuery">

            <c-icon class="c-select__field-icon"
                    :name="iconClassName"/>

        </div>

        <div v-show="focused"
             tabindex="-1"
             class="c-select__list">

            <div v-show="!hasOptions"
                 class="c-select__list-placeholder">
                {{ emptyPlaceholder }}
            </div>

            <div class="c-select__list-options"
                 @mousedown.prevent>

                <div v-for="option in list"
                     tabindex="0"
                     class="c-select__option"
                     :class="model === option ? 'is-selected' : ''"
                     :key="`option-item-${option[trackBy]}`"
                     @keypress.esc="hideList"
                     @keypress.prevent.stop.enter.space="() => {optionClick(option)}"
                     @click.prevent.stop="() => {optionClick(option)}">
                    {{ option[optionLabel] }}
                </div>

            </div>

        </div>

    </c-form-field>

</template>

<script>
    import CFormField from "./FormField";
    import CIcon from "./Icon";

    export default {
        name: "c-select",
        components: {
            CIcon,
            CFormField
        },
        props: {
            options: {
                type: Array,
                default: () => [],
                required: true
            },
            trackBy: {
                type: String,
                default: "id",
                required: true
            },
            optionLabel: {
                type: String,
                default: "label",
                required: true
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
                default: '',
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
            iconTitle: {
                type: String,
                default: '',
                required: false
            },
            label: {
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
                default: () => [],
                required: false
            },
            value: {
                type: null,
                default: ""
            }
        },
        data() {
            return {
                focused: false,
                loading: false,
                query: '',
                list: this.options,
                proxy: this.value
            };
        },
        watch: {
            options(after) {
                this.list = _.clone(after);
            }
        },
        computed: {
            model: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.proxy = value;
                }
            },
            hasSelected() {
                return !_.isEmpty(this.model);
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

                if (_.isArray(this.model)) {
                    count = this.model.length;
                }
                if (_.isObjectLike(this.model)) {
                    count = 1;
                }

                return count;
            },
            searchFieldVisible() {
                let value = false;

                if (this.searchable) {
                    value = this.focused;
                }

                return value;
            },
            labelVisible() {
                let value = false;

                value = this.hasSelected;
                value = !this.searchFieldVisible;

                return value;
            },
            placeholderVisible() {
                let value = true;

                if (this.searchFieldVisible) {
                    value = false;
                }

                if (this.hasSelected) {
                    value = false;
                }

                return value;
            },
            iconClassName() {
                if (this.loading) {
                    return 'mdi mdi-spin mdi-loading'
                }

                return this.focused ? 'mdi mdi-menu-up' : 'mdi mdi-menu-down'
            }
        },
        methods: {
            hideSpinner() {
                this.loading = false;
            },
            showSpinner() {
                this.loading = true;
            },
            focus() {
                this.$el.focus();
            },
            focusSearch() {
                this.$refs.search.focus();
            },
            optionClick(option) {
                if (this.multiple) {

                } else {
                    this.model = option;
                    this.hideList();

                    if (this.toggleable) {
                        let current = _.get(this.model, this.trackBy, 1);
                        let selected = _.get(option, this.trackBy, 0);

                        if (current === selected) {
                            this.model = '';
                        }
                    }
                }

                if (this.searchable) {
                    this.query = _.get(option, this.optionLabel, '');
                }

                this.$emit("input", this.proxy);
            },
            clearQuery() {
                this.query = '';
            },
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
                    let result = _.filter(this.options, (item) => {
                        let label = _.lowerCase(_.get(item, this.optionLabel, ''));

                        if (label !== '') {
                            return label.match(_.lowerCase(query))
                        }

                        return true;
                    });

                    this.setList(result);
                    this.hideSpinner();
                }
            }, 300),
            setList(newList = []) {
                newList = _.isArray(newList) ? newList : [];
                this.list = newList;
            },
            hideList() {
                if (!this.focused) return;

                this.focused = false;
                this.resetList();

                if (this.searchable) {
                    this.$refs.search.blur();
                    this.clearQuery();
                } else {
                    this.$el.blur();
                }
            },
            showList() {
                if (this.focused || this.disabled) return;

                this.focused = true;

                if (this.searchable) {
                    this.$nextTick(() => {
                        this.$refs.search.focus();
                    });
                } else {
                    this.$el.focus();
                }
            },
            toggleList() {
                if (this.focused) {
                    this.hideList();
                    this.resetList();
                } else {
                    this.showList();
                }
            },
            resetList() {
                this.setList(_.map(this.options, item => item));
            },
            handleQuery(event) {
                this.query = event.target.value;
                this.$nextTick(() => {
                    this.handleSearch()
                })
            },
            handleSearch(event) {
                if (this.searchable) {
                    this.showSpinner();
                    this.filterByQuery(this.query);
                }
            },
            handleKeyPress(event) {
                if (event.keyCode === 13) {
                    this.hideList();
                }

                this.$emit('keypress', event);
            }
        }
    };
</script>
