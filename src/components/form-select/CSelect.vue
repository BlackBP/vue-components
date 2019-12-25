<template>
    <div class="c-select">

        <div ref="field"
             class="c-select__field"
             :class="fieldClassName"
             @click.self="showList">

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

            <input ref="input"
                   type="text"
                   class="c-select__input"
                   :id="inputId"
                   :placeholder="placeholder"
                   :disabled="disabled"
                   :readonly="!searchable || readonly"
                   :value="query"
                   @keydown="onKeyDown"
                   @focus="onFocus"
                   @blur="onBlur"
                   @input="onSearch">

            <c-icon class="c-select__toggle"
                    :name="iconClassName"
                    @click="showList"/>
        </div>

        <transition name="c-select"
                    @after-enter="onAfterListShow"
                    @after-leave="onAfterListHide">

            <div v-show="focused"
                 ref="list"
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
                     ref="listOptions"
                     class="c-select__list-options"
                     @mousedown.prevent>
                    <template v-for="(option, optionIndex) in parsedOptions">
                        <div class="c-select__option"
                             :class="getOptionClassName(option, optionIndex)"
                             :key="option.id"
                             @click="onSelect(option)">
                            {{ option.text }}
                        </div>
                    </template>
                </div>
            </div>
        </transition>
    </div>
</template>

<script>
    import Popper from 'popper.js'
    import _ from '../../utils/helpers'
    import MixinFormInput from "../../mixins/form-input"

    import {CIcon} from "../icon"
    import {CChip} from "../chip"

    import OptionService from "./OptionService"
    import OptionListService from "./OptionListService"

    const MODEL = {
        prop: 'value',
        event: 'change'
    };

    let ListPopper = null;

    export default {
        name: "c-select",
        model: MODEL,
        mixins: [
            MixinFormInput
        ],
        components: {
            CChip,
            CIcon
        },
        props: {
            options: {
                type: [Array, Object],
                default: () => ([]),
                required: true
            },
            trackBy: {
                type: String,
                default: 'id'
            },
            optionText: {
                type: String,
                default: 'name'
            },
            groupValues: {
                type: String,
                default: ''
            },
            groupText: {
                type: String,
                default: ''
            },
            max: {
                type: [String, Number],
                default: 0
            },
            multiple: {
                type: Boolean,
                default: false
            },
            toggleable: {
                type: Boolean,
                default: false
            },
            searchable: {
                type: Boolean,
                default: false
            },
            emptyPlaceholder: {
                type: String,
                default: 'Список пуст'
            },
            maxPlaceholder: {
                type: String,
                default: 'Выбрано максимальное количество элементов'
            },
        },
        data() {
            return {
                focused: false,
                loading: false,
                query: '',
                parsedOptions: [],
                focusedOption: null
            }
        },
        watch: {
            options() {
                this.parseOptions();

                if (this.focused) {
                    ListPopper.scheduleUpdate();
                }
            },
            value() {
                this.parseOptions();

                if (this.focused) {
                    ListPopper.scheduleUpdate();
                }
            }
        },
        computed: {
            iconClassName() {
                if (this.loading) return 'loading c-select-spin';
                return this.focused ? 'menu-up' : 'menu-down';
            },
            fieldClassName() {
                return [
                    this.state !== '' && this.state,
                    {
                        'is-focused': this.focused,
                        'is-disabled': this.disabled,
                        'is-readonly': this.readonly,
                    }
                ]
            },
            selected() {
                let selected = this.value;

                if (_.isArray(selected)) {
                    return _.size(selected) > 0 ? selected : []
                }

                if (_.isNumber(selected)) {
                    return [selected]
                }

                if (_.isObjectLike(selected) || _.isString(selected)) {
                    return _.isEmpty(selected) ? [] : [selected]
                }

                return []
            },
            selectedCount() {
                return _.size(this.selected)
            },
            parsedOptionsCount() {
                return _.size(this.parsedOptions)
            },
            hasSelected() {
                return this.selectedCount > 0
            },
            hasOptions() {
                return _.isArray(this.parsedOptions) && this.parsedOptionsCount > 0
            },
            hasMax() {
                let max = parseInt(this.max);

                if (max > 0) {
                    return this.selectedCount >= max
                }

                return false
            },
        },
        methods: {
            // The model event handler
            emitChange(value = null) {
                if (this.disabled || this.readonly) return;
                this.$emit(MODEL.event, value)
            },

            // An option data handlers
            getOptionText(option) {
                return OptionService.getText(option, this.optionText)
            },
            getOptionId(option) {
                return OptionService.getId(option, this.trackBy)
            },
            getOptionClassName(option = {}, index) {
                const {
                    selected = false,
                    group = false
                } = option;

                return {
                    'is-focused': index === this.focusedOption,
                    'is-selected': selected,
                    'is-group': group
                }
            },
            parseOptions() {
                this.parsedOptions = OptionListService.map(this.options, {
                    query: this.query,
                    trackBy: this.trackBy,
                    optionText: this.optionText,
                    groupValues: this.groupValues,
                    groupText: this.groupText,
                    selectedList: this.selected,
                })
            },
            removeOption(option) {
                const selected = OptionListService.removeOptionFromList(this.selected, option, this.trackBy);
                this.emitChange(selected)
            },

            // The list view methods
            showList() {
                if (this.focused || this.disabled) return;
                this.$refs.input.focus()
            },
            hideList() {
                if (!this.focused) return;
                this.$refs.input.blur()
            },
            focusOption() {
                const focused = this.$refs.listOptions.querySelector('.is-focused');

                if (focused) {
                    if(focused.scrollIntoView) {
                        focused.scrollIntoView({
                            block: 'center'
                        })
                    }
                }
            },

            // The Input event listeners
            filterByQuery: _.debounce(function () {
                this.parseOptions();
                this.loading = false;
            }, 400),
            onSelect(option = {}) {
                const {
                    value: optionValue,
                    group: isGroup,
                    selected: isSelected
                } = option;

                // TODO: создать возможность выбора группы
                if (isGroup) return;

                if (this.multiple) {
                    let selected = [...this.selected];

                    if (isSelected) {
                        selected = OptionListService.removeOptionFromList(selected, option, this.trackBy)
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
            onSearch(event) {
                this.loading = true;
                this.query = event.target.value;
                this.filterByQuery()
            },
            onKeyDown(event) {
                if (this.hasOptions) {
                    switch (event.code) {
                        case 'ArrowUp':
                            if (this.focusedOption === null) {
                                this.focusedOption = 0;
                            } else if (this.focusedOption > 0) {
                                this.focusedOption--;
                            }
                            this.focusOption();
                            break;

                        case 'ArrowDown':
                            if (this.focusedOption === null) {
                                this.focusedOption = 0;
                            } else if (this.focusedOption < this.parsedOptionsCount - 1) {
                                this.focusedOption++;
                            }
                            this.focusOption();
                            break;

                        case 'Enter':
                            if (_.isNumber(this.focusedOption) && this.focusedOption >= 0) {
                                this.onSelect(this.parsedOptions[this.focusedOption])
                            }
                            break;
                    }
                }
            },
            onFocus(event) {
                this.focused = true;
                this.$emit('focus', event);
            },
            onBlur(event) {
                this.focused = false;
                this.$emit('blur', event);
            },

            // The List transition event listeners
            onAfterListShow() {
                this.$nextTick(() => {
                    ListPopper.enableEventListeners();
                    ListPopper.scheduleUpdate();
                })
            },
            onAfterListHide() {
                this.$nextTick(() => {
                    this.focusedOption = null;
                    ListPopper.disableEventListeners();
                })
            }
        },
        mounted() {
            // Parse list options
            this.parseOptions();

            // Popper.js initialization
            this.$nextTick(() => {
                ListPopper = new Popper(this.$refs.field, this.$refs.list, {
                    modifiers: {
                        arrow: {
                            enabled: false
                        },
                        inner: {
                            enabled: false
                        },
                        flip: {
                            behavior: ['bottom', 'top']
                        },
                    },
                    placement: 'bottom-start'
                });
            })
        },
        beforeDestroy() {
            if (ListPopper !== null) {
                if (ListPopper.destroy) {
                    ListPopper.destroy()
                }
            }
        }
    }
</script>