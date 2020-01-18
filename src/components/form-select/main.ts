import {Model, Watch, Ref, Mixins} from 'vue-property-decorator'
import Component from 'vue-class-component'
import Popper from 'popper.js'

// @ts-ignore
import _ from '../../utils/helpers'
import MixinGetters from "./mixin-getters"
import MixinState from "./mixin-state"
import MixinProps from "./mixin-props"

// @ts-ignore
import {CIcon} from "../icon"
// @ts-ignore
import {CChip} from "../chip"

import OptionService from "./OptionService"
// @ts-ignore
import OptionListService from "./OptionListService"

const MODEL_EVENT: string = 'change';

@Component({
    name: "c-select",
    components: {
        CChip,
        CIcon
    }
})
export default class CSelect extends Mixins(MixinGetters, MixinState, MixinProps) {
    @Model(MODEL_EVENT, {
        type: [String, Number, Array, Object]
    }) value!: string | string[] | number | number[] | object;

    @Ref('input') readonly refInput!: HTMLInputElement;
    @Ref('field') readonly refField!: HTMLDivElement;
    @Ref('list') readonly refList!: HTMLDivElement;

    //
    private popperInstance: Popper|null = null;

    // Watch
    @Watch('options')
    onOptionsChange() {
        this.parseOptions();

        if (this.focused) {
            this.updateListPosition();
        }
    }

    @Watch('value')
    onValueChange() {
        this.parseOptions();

        if (this.focused) {
            this.updateListPosition();
        }
    }

    // Methods
    // The model event handler
    emitChange(value = null): void {
        if (this.disabled || this.readonly) return;
        this.$emit(MODEL_EVENT, value)
    }

    // An option data handlers
    getOptionText(option): void {
        return OptionService.getText(option, this.optionText)
    }

    getOptionId(option): void {
        return OptionService.getId(option, this.trackBy)
    }

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
    }

    parseOptions() {
        this.parsedOptions = OptionListService.map(this.options, {
            query: this.query,
            trackBy: this.trackBy,
            optionText: this.optionText,
            groupValues: this.groupValues,
            groupText: this.groupText,
            selectedList: this.selected,
        })
    }

    removeOption(option) {
        const selected = OptionListService.removeOptionFromList(this.selected, option, this.trackBy);
        this.emitChange(selected)
    }

    // The list view methods
    showList() {
        if (this.focused || this.disabled) return;
        this.$refInput.focus()
    }

    hideList() {
        if (!this.focused) return;
        this.$refInput.blur()
    }

    // The Input event listeners
    filterByQuery: _.debounce
(

    function() {
        this.parseOptions();
        this.loading = false;
    }

,
    400
)

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
    }

    onSearch(event) {
        this.loading = true;
        this.query = event.target.value;
        this.filterByQuery()
    }

    onFocus(event) {
        this.focused = true;
        this.$emit('focus', event);
    }

    onBlur(event) {
        this.focused = false;
        this.$emit('blur', event);
    }

    // The List transition event listeners
    updateListPosition() {
        if (ListPopper) {
            ListPopper.scheduleUpdate();
        }
    }

    onAfterListShow() {
        this.$nextTick(() => {
            ListPopper.enableEventListeners();
            this.updateListPosition();
        })
    }

    onAfterListHide() {
        this.$nextTick(() => {
            this.focusedOption = null;
            ListPopper.disableEventListeners();
        })
    }

    // Hooks
    mounted() {
        // Popper.js initialization
        this.popperInstance = this.$nextTick(() => {
            ListPopper = new Popper(this.$refField, this.$refList, {
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
    }

    beforeDestroy() {
        if (ListPopper !== null) {
            if (ListPopper.destroy) {
                ListPopper.destroy()
            }
        }
    }
}