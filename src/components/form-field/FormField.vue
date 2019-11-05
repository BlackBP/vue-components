<template>

    <div class="c-form-field"
         :class="className"
         @keypress="handleKeyPress"
         @focus.self="handleFocus"
         @blur.self="handleBlur"
         @click="handleClick">

        <div class="c-form-field__content"
             :class="contentClass">
            <slot></slot>
        </div>

        <div v-show="showCounter || showHelper && hasHelper"
             class="c-form-field__footer">

            <div v-if="showHelper"
                 class="c-form-field__helper">
                {{ helperText }}
            </div>

            <div v-if="showCounter"
                 class="c-form-field__counter"
                 title="Максимальное количество символов">
                {{ count }} / {{ countMax }}
            </div>

        </div>

    </div>

</template>

<script>
    import {isString} from '../../utils/helpers';

    export default {
        name: "c-form-field",
        props: {
            disabled: {
                type: Boolean,
                default: false,
            },
            readonly: {
                type: Boolean,
                default: false,
            },
            contentClass: {
                type: String,
                default: '',
            },
            count: {
                type: [Number, String],
                default: ''
            },
            countMax: {
                type: [Number, String],
                default: ''
            },
            helperText: {
                type: String,
                default: '',
            },
            showHelper: {
                type: Boolean,
                default: true
            },
            showCounter: {
                type: Boolean,
                default: false
            },
            hasError: {
                type: Boolean,
                default: false,
            },
            focused: {
                type: Boolean,
                default: false,
            }
        },
        computed: {
            className() {
                return {
                    'has-error': this.hasError,
                    'is-focused': this.focused,
                    'is-disabled': this.disabled,
                    'is-readonly': this.readonly,
                };
            },
            hasHelper() {
                return isString(this.helperText) && this.helperText !== ''
            }
        },
        methods: {
            handleClick(event) {
                this.$emit('click', event);
            },
            handleFocus(event) {
                this.$emit('focus', event);
            },
            handleBlur(event) {
                this.$emit('blur', event);
            },
            handleKeyPress(event) {
                this.$emit('keypress', event);
            },
        }
    }
</script>
