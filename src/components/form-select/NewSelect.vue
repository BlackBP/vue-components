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

        <div class="c-select__field">
            <div class="c-select__field-selected">
                <template v-if="multiple">
                    <c-chip v-for="selectedItem in selected"
                            trailing="close"
                            class="c-select__chip"
                            :key="getOptionId(selectedItem)"
                            @mousedown.prevent
                            @click="removeOption(selectedItem)">
                        {{ getOptionText(selectedItem) }}
                    </c-chip>
                </template>

                <template v-else>
                    {{ selected }}
                </template>
            </div>

            <input ref="field"
                   type="text"
                   class="c-select__field-input"
                   :id="inputId"
                   :placeholder="placeholder"
                   :disabled="disabled"
                   :readonly="readonly"
                   :value="query"
                   @focus="onFocus"
                   @blur="onBlur"
                   @input="onSearch">

            <c-icon class="c-select__field-icon"
                    :name="iconClassName"/>
        </div>

        <transition name="c-select">
            <div v-show="focused"
                 class="c-select__list">

                <div v-if="hasMax || !hasOptions"
                     class="c-select__list-info">
                    <template v-if="hasMax">
                        <c-chip color="info"
                                leading="information">
                            {{ maxPlaceholder }}
                        </c-chip>
                    </template>
                    <template v-if="!hasOptions">
                        <c-chip color="info">
                            {{ emptyPlaceholder }}
                        </c-chip>
                    </template>
                </div>

                <div v-if="hasOptions"
                     class="c-select__list-options"
                     @mousedown.prevent>
                    <template v-for="option in parsedOptions" >
                        <div class="c-select__option"
                             :class="{'is-selected': option.selected}"
                             :key="option.id"
                             @click="onSelect(option)">
                            {{ option }}
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
        map, debounce, toLower
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

    /**
     *
     * @param id
     * @param text
     * @param value
     * @param selected
     * @param disabled
     * @return {{disabled: *, id: *, text: *, value: *, selected: *}}
     */
    const createOption = (id, text, value, selected = false, disabled = false) => {
        return {
            id,
            text,
            value,
            selected,
            disabled
        }
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
            max: createProp([String, Number], 0),
            multiple: createProp(Boolean, false),
            toggleable: createProp(Boolean, false),
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

                if(!isArray(selected)) {
                    selected = [selected]
                }

                return selected
            },
            selectedCount() {
                return size(this.selected)
            },
            hasSelected() {
                return this.selectedCount > 0
            },
            hasOptions() {
                return isArray(this.options) && size(this.options) > 0
            },
            hasMax() {
                let max = parseInt(this.max);

                if(max > 0) {
                    return this.selectedCount >= max
                }

                return false
            },
            iconClassName() {
                if(this.loading) return 'loading c-select-spin';
                return this.focused ? 'menu-up' : 'menu-down';
            }
        },
        methods: {
            showList() {
                if(this.focused || this.disabled) return;
                this.$refs.input.focus()
            },
            hideList() {
                if (!this.focused) return;
                this.$refs.input.blur()
            },
            getOptionText(option) {
                if(isObjectLike(option)) {
                    return get(option, this.optionText, '')
                }

                return option
            },
            getOptionId(option) {
                if(isObjectLike(option)) {
                    return get(option, this.trackBy, '')
                }

                return option
            },
            mapOption(option) {
                let id = this.getOptionId(option);
                let text = this.getOptionText(option);
                let value = '';
                let isSelected = false;
                let isDisabled = get(option, 'disabled', false);

                if (isObjectLike(option)) {
                    value = {...option};
                } else {
                    value = option;
                }

                return createOption(id, text, value, isSelected, isDisabled)
            },
            parseOptions() {
                if (!this.hasOptions) return [];

                //TODO: Добавить группы

                let options = reduce(this.options, (total, option) => {
                    option = this.mapOption(option);

                    if(this.hasSelected) {
                        option.selected = some(this.selected, selectedItem => {
                            return this.getOptionId(selectedItem) == option.id
                        })
                    }

                    total.push(option);

                    return total
                }, []);

                if(this.query !== '') {
                    options = options.filter(option => {
                        return toLower(option.text).match(this.query)
                    });
                }

                this.parsedOptions = options
            },
            removeOption(option) {
                let selected = this.selected.filter(selectedOption => {
                    return this.getOptionId(selectedOption) != this.getOptionId(option)
                });

                this.emitChange(selected)
            },
            filterByQuery: debounce(function () {
                this.parseOptions();
                this.loading = false;
            }, 400),
            onFocus(event) {
                this.focused = true;
                this.$emit('focus', event)
            },
            onBlur(event) {
                this.focused = false;
                this.$emit('blur', event)
            },
            onSearch(event) {
                this.loading = true;
                this.query = toString(event.target.value);
                this.filterByQuery()
            },
            onSelect(option = {}) {
                const {
                    id: optionId,
                    value: optionValue,
                    selected: isSelected
                } = option;

                if(this.multiple) {
                    let selected = [...this.selected];

                    if(isSelected) {
                        selected = selected.filter(selectedOption => {
                            return this.getOptionId(selectedOption) != optionId
                        });
                    } else {
                        if(!this.hasMax) {
                            selected.push(optionValue);
                        }
                    }

                    this.showList();
                    this.emitChange(selected);
                } else {
                    if(isSelected) {
                        if(this.toggleable) {
                            this.emitChange(null)
                        }
                    } else {
                        this.emitChange(optionValue)
                    }

                    this.hideList();
                }
            },
            emitChange(value = null) {
                if(this.disabled || this.readonly) return;

                this.$emit(MODEL.event, value)
            }
        },
        mounted() {
            this.parseOptions()
        }
    }
</script>