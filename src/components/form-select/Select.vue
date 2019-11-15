<template>
    <c-form-input content-class="c-select"
                  :disabled="disabled"
                  :readonly="readonly"
                  :helper="helper"
                  :errors="errors"
                  :count="selectedCount"
                  :count-max="max"
                  :show-counter="max > 0"
                  :focused="focused">

        <template v-if="hasSelected">
            <template v-for="selectedItem in selected">
                <template v-if="multiple">
                    <c-chip trailing="close"
                            class="c-select__selected"
                            :key="getOptionId(selectedItem)"
                            @mousedown.prevent
                            @click="removeOption(selectedItem)">
                        {{ getOptionText(selectedItem) }}
                    </c-chip>
                </template>

                <template v-else>
                    <c-chip class="c-select__selected">
                        {{ getOptionText(selectedItem) }}
                    </c-chip>
                </template>
            </template>
        </template>

        <input ref="field"
               type="text"
               class="c-select__field"
               :id="inputId"
               :placeholder="placeholder"
               :disabled="disabled"
               :readonly="!searchable || readonly"
               :value="query"
               @focus="onFocus"
               @blur="onBlur"
               @input="onSearch">

        <c-icon class="c-select__toggle"
                :name="iconClassName"
                @click="showList"/>

        <transition name="c-select">
            <div v-show="focused"
                 class="c-select__list">

                <div v-if="hasMax || !hasOptions"
                     class="c-select__list-info">
                    <template v-if="hasMax">
                        <c-chip color="info"
                                leading="information">
                            {{ maxPlaceholder }} ({{ selectedCount }}/{{ max }})
                        </c-chip>
                    </template>
                    <template v-if="!hasOptions">
                        {{ emptyPlaceholder }}
                    </template>
                </div>

                <div v-if="hasOptions"
                     class="c-select__list-options"
                     @mousedown.prevent>
                    <template v-for="option in parsedOptions">
                        <div class="c-select__option"
                             :class="[option.selected && 'is-selected', option.group && 'is-group']"
                             :key="option.id"
                             @click="onSelect(option)">
                            {{ option.text }}
                        </div>
                    </template>
                </div>

            </div>
        </transition>

    </c-form-input>
</template>

<script>
    import {
        isArray,
        isObjectLike,
        isString,
        get,
        reduce,
        size,
        some,
        isNumber,
        toString,
        map, debounce, toLower, isEmpty
    } from '../../utils/helpers';
    import {createProp} from '../../utils/component';
    import {CFormInput} from '../form-input';
    import {CIcon} from "../icon";
    import {CChip} from "../chip";
    import mixinFormInput from '../../mixins/form-input';
    import mixinFormField from '../../mixins/form-field';

    const MODEL = {
        prop: 'value',
        event: 'change'
    };

    export default {
        name: "c-select",
        model: MODEL,
        mixins: [mixinFormInput, mixinFormField],
        components: {
            CChip,
            CIcon,
            CFormInput
        },
        props: {
            options: createProp([Array, Object], () => ([])),
            trackBy: createProp(String, 'id'),
            optionText: createProp(String, 'name'),
            groupValues: createProp(String, ''),
            groupText: createProp(String, ''),
            max: createProp([String, Number], 0),
            multiple: createProp(Boolean, false),
            toggleable: createProp(Boolean, false),
            searchable: createProp(Boolean, false),
            emptyPlaceholder: createProp(String, 'Список пуст'),
            maxPlaceholder: createProp(String, 'Выбрано максимальное количество элементов'),
        },
        data() {
            return {
                query: '',
                parsedOptions: [],
                loading: false
            }
        },
        watch: {
            options() {
                this.parseOptions()
            },
            value() {
                this.parseOptions()
            }
        },
        computed: {
            selected() {
                let selected = this.value;

                if (isArray(selected)) {
                    return size(selected) > 0 ? selected : []
                }

                if(isNumber(selected)) {
                    return [selected]
                }

                if(isObjectLike(selected) || isString(selected)) {
                    return isEmpty(selected) ? [] : [selected]
                }

                return  []
            },
            selectedCount() {
                return size(this.selected)
            },
            hasSelected() {
                return this.selectedCount > 0
            },
            hasOptions() {
                return isArray(this.parsedOptions) && size(this.parsedOptions) > 0
            },
            hasMax() {
                let max = parseInt(this.max);

                if (max > 0) {
                    return this.selectedCount >= max
                }

                return false
            },
            iconClassName() {
                if (this.loading) return 'loading c-select-spin';
                return this.focused ? 'menu-up' : 'menu-down';
            }
        },
        methods: {

            /**
             *
             * @param option
             * @return {*}
             */
            getOptionText(option) {
                if (isObjectLike(option)) {
                    return get(option, this.optionText, '')
                }

                return option
            },

            /**
             *
             * @param option
             * @return {*}
             */
            getOptionId(option) {
                if (isObjectLike(option)) {
                    return get(option, this.trackBy, '')
                }

                return option
            },

            /**
             *
             * @param option
             */
            getOptionGroupValues(option) {
                return get(option, this.groupValues, [])
            },

            /**
             *
             * @param option
             */
            getOptionGroupText(option) {
                return get(option, this.groupText, '')
            },

            /**
             *
             * @param {String|Number|Object} option
             * @return {{id: [Number|String], text: [Number|String], value: *, selected: Boolean, group: Boolean}}
             */
            mapOption(option) {
                let groupValues = this.getOptionGroupValues(option);
                let isSelected = false;
                let isGroup = isArray(groupValues) && size(groupValues) > 0;
                let id = this.getOptionId(option);
                let text = isGroup ? this.getOptionGroupText(option) : this.getOptionText(option);
                let value = '';
                // let isDisabled = get(option, 'disabled', false); // TODO: Обдумать вариант отключения опции

                if (isGroup) {
                    value = [...groupValues];
                } else {
                    if (isObjectLike(option)) {
                        value = {...option};
                    } else {
                        value = option;
                    }
                }

                return {
                    id,
                    text,
                    value,
                    selected: isSelected,
                    group: isGroup
                }
            },

            /**
             *
             * @param options
             * @return {Array|*}
             */
            mapOptions(options = []) {
                if (size(options) < 1) return [];

                options = reduce(options, (total, option) => {
                    let groupValues = [];

                    option = this.mapOption(option);

                    // Проверка выбранных опций
                    if (this.hasSelected) {
                        option.selected = some(this.selected, selectedItem => {
                            return this.getOptionId(selectedItem) == option.id
                        })
                    }

                    // Распаковка групп
                    if (option.group) {
                        groupValues = this.mapOptions(option.value)
                    }

                    total.push(option, ...groupValues);

                    return total
                }, []);

                // Проверка на совпадение со строкой поиска
                if (this.query !== '') {
                    options = options.filter(option => {
                        if (option.group) return false;

                        return toLower(option.text).match(this.query)
                    });
                }

                return options
            },

            /**
             *
             */
            parseOptions() {
                this.parsedOptions = this.mapOptions(this.options)
            },

            /**
             *
             * @param option
             */
            removeOption(option) {
                let selected = this.selected.filter(selectedOption => {
                    return this.getOptionId(selectedOption) != this.getOptionId(option)
                });

                this.emitChange(selected)
            },

            //
            /**
             *
             * @param option
             */
            onSelect(option = {}) {
                const {
                    id: optionId,
                    value: optionValue,
                    group: isGroup,
                    selected: isSelected
                } = option;

                // TODO: создать возможность выбора группы
                if (isGroup) return;

                if (this.multiple) {
                    let selected = [...this.selected];

                    if (isSelected) {
                        selected = selected.filter(selectedOption => {
                            return this.getOptionId(selectedOption) != optionId
                        });
                    } else {
                        if (!this.hasMax) {
                            selected.push(optionValue);
                        }
                    }

                    this.showList();
                    this.emitChange(selected);
                } else {
                    if (isSelected) {
                        if (this.toggleable) {
                            this.emitChange(null)
                        }
                    } else {
                        this.emitChange(optionValue)
                    }

                    this.hideList();
                }
            },

            /**
             *
             * @param event
             */
            onFocus(event) {
                this.focused = true;
                this.$emit('focus', event)
            },

            /**
             *
             * @param event
             */
            onBlur(event) {
                this.focused = false;
                this.$emit('blur', event)
            },

            /**
             *
             * @param event
             */
            onSearch(event) {
                this.loading = true;
                this.query = toString(event.target.value);
                this.filterByQuery()
            },

            //
            /**
             *
             */
            showList() {
                if (this.focused || this.disabled) return;
                this.$refs.field.focus()
            },

            /**
             *
             */
            hideList() {
                if (!this.focused) return;
                this.$refs.field.blur()
            },

            //

            /**
             *
             * @param value
             */
            emitChange(value = null) {
                if (this.disabled || this.readonly) return;

                this.$emit(MODEL.event, value)
            },

            /**
             *
             */
            filterByQuery: debounce(function () {
                this.parseOptions();
                this.loading = false;
            }, 400),
        },
        mounted() {
            this.parseOptions()
        }
    }
</script>