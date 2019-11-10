<template>
    <c-form-input :readonly="readonly"
                  :disabled="disabled"
                  :focused="focused"
                  :helper="helper"
                  :errors="errors"
                  :show-counter="showCounter"
                  :count-max="maxLength"
                  :count="count"
                  :content-class="className">

        <template v-if="multiline">
            <textarea ref="field"
                      class="c-text-input__field"
                      :id="inputId"
                      :rows="rows"
                      :maxlength="maxLength"
                      :disabled="disabled"
                      :readonly="readonly"
                      :placeholder="placeholder"
                      :value="value"
                      @input="onInput"
                      @focus="onFocus"
                      @blur="onBlur"></textarea>
        </template>

        <template v-else>
            <div v-if="$slots.leading || leading"
                 class="c-text-input__leading">
                <template v-if="$slots.leading">
                    <slot name="leading"/>
                </template>
                <template v-else>
                    <c-icon v-if="leading"
                            class="c-text-input__icon"
                            :name="leading"/>
                </template>
            </div>

            <input ref="field"
                   class="c-text-input__field"
                   :id="inputId"
                   :type="type"
                   :placeholder="placeholder"
                   :disabled="disabled"
                   :readonly="readonly"
                   :value="value"
                   :maxlength="maxLength"
                   @input="onInput"
                   @focus="onFocus"
                   @blur="onBlur">

            <div v-if="$slots.trailing || trailing"
                 class="c-text-input__trailing">
                <template v-if="$slots.trailing">
                    <slot name="trailing"/>
                </template>
                <template v-else>
                    <c-icon v-if="trailing"
                            class="c-text-input__icon"
                            :name="trailing"/>
                </template>
            </div>
        </template>
    </c-form-input>
</template>

<script>
    import {
        isObjectLike,
        isString,
        isFunction, size
    } from '../../utils/helpers';
    import {createProp} from '../../utils/component';
    import {getConfig} from '../../config';
    import {CIcon} from '../icon';
    import {CFormInput} from '../form-input';
    import mixinFormInput from '../../mixins/form-input';
    import mixinFormField from '../../mixins/form-field';

    const MODEL = {
        prop: 'value',
        event: 'input'
    };

    export default {
        name: "c-text-input",
        model: MODEL,
        mixins: [mixinFormInput, mixinFormField],
        components: {
            CFormInput,
            CIcon
        },
        props: {
            type: createProp(String, 'text'),
            multiline: createProp(Boolean, false),
            mask: createProp([String, Boolean, Object], false),
            leading: createProp(String, ''),
            trailing: createProp(String, ''),
            maxLength: createProp([Number, String], 500),
            rows: createProp([Number, String], 5)
        },
        computed: {
            count() {
                return size(this.value)
            },
            hasMask() {
                return isObjectLike(this.mask) || isString(this.mask)
            },
            className() {
                return [
                    'c-text-input',
                    {
                        'is-multiline': this.multiline
                    }
                ]
            }
        },
        methods: {
            focus() {
                this.$refs.field.focus();
            },
            onInput(event) {
                this.$emit(MODEL.event, event.target.value)
            },
            onFocus(event) {
                this.focused = true;
                this.$emit('focus', event)
            },
            onBlur(event) {
                this.focused = false;
                this.$emit('blur', event)
            },
        },
        mounted() {
            const config = getConfig(this, 'textInput');
            const onMount = isFunction(config.mounted) ? config.mounted : () => {
            };

            onMount(this, this.mask, this.hasMask, this.$refs.field);
        },
        beforeDestroy() {
            const config = getConfig(this, 'textInput');
            const onBeforeDestroy = isFunction(config.beforeDestroy) ? config.beforeDestroy : () => {
            };

            onBeforeDestroy(this, this.mask, this.hasMask, this.$refs.field);
        }
    }
</script>
