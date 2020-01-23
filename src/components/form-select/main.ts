import {Model, Watch, Ref, Vue, Prop} from 'vue-property-decorator'
import Component from 'vue-class-component'
import _ from 'lodash'
import Popper from 'popper.js'

import {CIcon} from "../icon"
import {CChip} from "../chip"
import {mappedOption, mappedOptionArray, rawOption, rawOptionArray} from "../../../types/select"
import OptionService from "./OptionService"
import OptionListService from "./OptionListService"

const MODEL_EVENT: string = 'change';

@Component({
    components: {
        CChip,
        CIcon
    }
})
export default class CSelect extends Vue {
    @Model(MODEL_EVENT, {
        type: [String, Number, Array, Object]
    }) value!: string | string[] | number | number[] | object;

    @Ref('input') readonly refInput!: HTMLInputElement;
    @Ref('field') readonly refField!: HTMLDivElement;
    @Ref('list') readonly refList!: HTMLDivElement;

    @Prop({
        type: Array,
        default: () => ([]),
        required: true
    }) options!: rawOptionArray;

    @Prop({
        type: String,
        default: 'id'
    }) trackBy!: string;

    @Prop({
        type: String,
        default: 'name'
    }) optionText!: string;

    @Prop({
        type: String,
        default: ''
    }) groupValues!: string;

    @Prop({
        type: String,
        default: ''
    }) groupText!: string;

    @Prop({
        type: [String, Number],
        default: 0
    }) max!: string | number;

    @Prop({
        type: Boolean,
        default: false
    }) multiple!: boolean;

    @Prop({
        type: Boolean,
        default: false
    }) toggleable!: boolean;

    @Prop({
        type: Boolean,
        default: false
    }) searchable!: boolean;

    @Prop({
        type: String,
        default: 'Список пуст'
    }) emptyPlaceholder!: string;

    @Prop({
        type: String,
        default: 'Выбрано максимальное количество элементов'
    }) maxPlaceholder!: string;

    @Prop({
        type: String,
        default: ''
    }) id!: string;

    @Prop({
        type: Boolean,
        default: false
    }) disabled!: boolean;

    @Prop({
        type: Boolean,
        default: false
    }) readonly!: boolean;

    @Prop({
        type: String,
        default: ''
    }) state!: string;

    @Prop({
        type: String,
        default: ''
    }) placeholder!: string;

    // State
    private focused: boolean = false;
    private loading: boolean = false;
    private query: string = '';
    private parsedOptions: mappedOptionArray = [];
    private popperInstance: Popper | null = null;

    // Getters
    get inputId(): string | boolean {
        return this.id !== '' ? this.id : false
    }

    get iconClassName(): string {
        if (this.loading) return 'loading c-select-spin';
        return this.focused ? 'menu-up' : 'menu-down';
    }

    get fieldClassName(): object {
        return [
            this.state !== '' && this.state,
            {
                'is-focused': this.focused,
                'is-disabled': this.disabled,
                'is-readonly': this.readonly,
            }
        ]
    }

    get inputPlaceholder() {
        if (this.hasSelected) {
            return this.multiple ? this.placeholder : ''
        } else {
            return this.placeholder
        }
    }

    get selected(): rawOptionArray {
        let selected = this.value;

        if (Array.isArray(selected)) {
            return _.size(selected) > 0 ? selected : []
        }

        if (_.isNumber(selected)) {
            return [selected]
        }

        if (_.isObjectLike(selected) || _.isString(selected)) {
            return _.isEmpty(selected) ? [] : [selected]
        }

        return []
    }

    get selectedCount(): number {
        return _.size(this.selected)
    }

    get parsedOptionsCount(): number {
        return _.size(this.parsedOptions)
    }

    get hasSelected(): boolean {
        return this.selectedCount > 0
    }

    get hasOptions(): boolean {
        return _.isArray(this.parsedOptions) && this.parsedOptionsCount > 0
    }

    get hasMax(): boolean {
        const max = parseInt(<string>this.max);

        if (max > 0) {
            return this.selectedCount >= max
        }

        return false
    }

    // Watch
    @Watch('options')
    onOptionsChange() {
        this.parseOptions();
    }

    @Watch('value')
    onValueChange() {
        this.parseOptions();
    }

    @Watch('parsedOptions')
    onParsedOptionsChange() {
        if (this.focused) {
            this.$nextTick(() => this.updatePopper())
        }
    }

    // Methods
    emitChange(value: rawOptionArray|rawOption): void {
        if (this.disabled || this.readonly) return;
        this.$emit(MODEL_EVENT, value)
    }

    // An option data handlers
    getOptionText(option: rawOption | mappedOption): string | number {
        return OptionService.getText(option, this.optionText)
    }

    getOptionId(option: rawOption | mappedOption): string | number {
        return OptionService.getId(option, this.trackBy)
    }

    getOptionClassName(option: mappedOption, index: number): object {
        const {
            selected = false,
            group = false
        } = option;

        return {
            'is-selected': selected,
            'is-group': group
        }
    }

    parseOptions(): void {
        this.parsedOptions = OptionListService.map(this.options, {
            query: this.query,
            trackBy: this.trackBy,
            optionText: this.optionText,
            groupValues: this.groupValues,
            groupText: this.groupText,
            selectedList: this.selected,
        })
    }

    removeOption(option: rawOption): void {
        const selected = OptionListService.removeOptionFromList(this.selected, option, this.trackBy);
        this.emitChange(selected)
    }

    // The list view methods
    showList(): void {
        if (this.focused || this.disabled) return;
        this.refInput.focus()
    }

    hideList(): void {
        if (!this.focused) return;
        this.refInput.blur()
    }

    // The Input event listeners
    filterByQuery = _.debounce(function () {
        // @ts-ignore
        this.parseOptions();
        // @ts-ignore
        this.loading = false;
    }, 400);

    onSelect(option: mappedOption): void {
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

    onSearch(event: InputEvent) {
        this.loading = true;
        this.query = _.get(event.target, 'value', '');
        this.filterByQuery()
    }

    onFocus(event: FocusEvent) {
        this.focused = true;
        this.$emit('focus', event);
    }

    onBlur(event: FocusEvent) {
        this.focused = false;
        this.$emit('blur', event);
    }

    // The List transition event listeners
    onAfterListShow() {
        this.$nextTick(() => {
            if(this.popperInstance instanceof Popper) {
                this.enablePopperEventListeners();
                this.updatePopper();
            }
        })
    }

    onAfterListHide() {
        this.$nextTick(() => {
            if(this.popperInstance instanceof Popper) {
                this.disablePopperEventListeners();
            }
        })
    }

    // Popper.js methods
    initPopper() {
        this.popperInstance = new Popper(this.refField, this.refList, {
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
        })
    }

    destroyPopper() {
        if (this.popperInstance instanceof Popper) {
            this.popperInstance.destroy()
        }
    }

    updatePopper() {
        if (this.popperInstance instanceof Popper) {
            this.popperInstance.scheduleUpdate()
        }
    }

    enablePopperEventListeners() {
        if (this.popperInstance instanceof Popper) {
            this.popperInstance.enableEventListeners()
        }
    }

    disablePopperEventListeners() {
        if (this.popperInstance instanceof Popper) {
            this.popperInstance.disableEventListeners()
        }
    }

    // Hooks
    mounted() {
        this.parseOptions();
        this.$nextTick(() => this.initPopper())
    }

    beforeDestroy() {
        this.destroyPopper()
    }
}