<template>
    <c-form-input content-class="c-select"
                  tabindex="0"
                  :disabled="disabled"
                  :readonly="readonly"
                  :helper="helper"
                  :errors="errors"
                  :count="count"
                  :focused="focused"
                  @click.native="onFocus"
                  @focus.native="onFocus"
                  @blur.native="onBlur">

        <div class="c-select__field">
            <div class="c-select__field-selected">
                {{ value[optionText] }}
            </div>

            <c-icon class="c-select__field-icon"
                    :name="focused ? 'menu-up' : 'menu-down'"/>
        </div>

        <transition name="c-select">
            <div v-show="focused"
                 class="c-select__list">

                <div class="c-select__list-search">
                    <input type="text"
                           class="c-select__search" @focus="onFocus" @blur="onBlur">
                </div>

                <div v-if="hasOptions"
                     class="c-select__list-options">
                    <template v-for="option in parsedOptions" >
                        <div class="c-select__option"
                             :class="{'is-selected': option.selected}"
                             :key="option.id"
                             @click="onSelect(option.value)">
                            {{ option }}
                        </div>
                    </template>
                </div>

                <div v-else
                     class="c-select__list-info">
                    {{ emptyPlaceholder }}
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
        isNumber
    } from '../../utils/helpers';
    import {createProp} from '../../utils/component';
    import {CFormInput} from '../form-input';
    import {CIcon} from "../icon";
    import mixinFormInput from '../../mixins/form-input';
    import mixinFormField from '../../mixins/form-field';
    import CTextInput from "../form-text-input/TextInput";

    const MODEL = {
        prop: 'value',
        event: 'change'
    };

    export default {
        name: "c-select",
        model: MODEL,
        mixins: [mixinFormInput, mixinFormField],
        components: {CTextInput, CIcon, CFormInput},
        props: {
            options: createProp([Array, Object], () => ([])),
            trackBy: createProp(String, 'id'),
            optionText: createProp(String, 'name'),
            emptyPlaceholder: createProp(String, 'Список пуст')
        },
        data() {
            return {}
        },
        computed: {
            count() {
                return 0
            },
            hasOptions() {
                return isArray(this.options) && size(this.options) > 0
            },
            hasSelected() {
                return size(this.value) > 0
            },
            parsedOptions() {
                let options = this.options;
                const noop = [];

                if (!this.hasOptions) return noop;

                return reduce(options, (total, option) => {
                    let id = '';
                    let text = '';
                    let value = '';
                    let selected = false;
                    let disabled = false;

                    if (isString(option)) {
                        id = option;
                        text = option;
                        value = option;
                    }

                    if (isObjectLike(option)) {
                        text = get(option, this.optionText);
                        id = get(option, this.trackBy);
                        value = {...option};
                        disabled = get(option, 'disabled', '');
                    }

                    // Has selected item(-s)
                    if(this.hasSelected) {
                        let selectedValue = this.value;

                        if(!isArray(selectedValue)) {
                            selectedValue = [selectedValue]
                        }

                        selected = some(selectedValue, selectedItem => {
                            if(isObjectLike(selectedItem) && !isArray(selectedItem)) {
                                selectedItem = get(selectedItem, this.trackBy);
                            }

                            return selectedItem == id
                        })
                    }

                    total.push({
                        id,
                        text,
                        value,
                        selected,
                        disabled
                    });

                    return total
                }, []);
            }
        },
        methods: {
            onFocus(event) {
                this.focused = true;
                this.$emit('focus', event)
            },
            onBlur(event) {
                this.focused = false;
                this.$emit('blur', event)
            },
            onSelect(option) {
                this.$emit(MODEL.event, option)
            }
        }
    }
</script>