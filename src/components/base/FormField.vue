<template>

    <div class="c-form-field"
         :class="className"
         @keypress="handleKeyPress"
         @focus="handleFocus"
         @blur="handleBlur"
         @click="handleClick">

        <div class="c-form-field__content"
             :class="contentClass">
            <slot></slot>
        </div>

        <div v-show="showCounter || showHelper"
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
    export default {
        name: "FormField",
        props: {
            contentClass: {
                type: String,
                default: '',
                required: false
            },
            count: {
                type: [Number, String],
                default: '',
                require: false
            },
            countMax: {
                type: [Number, String],
                default: '',
                require: false
            },
            helperText: {
                type: String,
                default: '',
                required: false
            },
            showHelper: {
                type: Boolean,
                default: true,
                require: false
            },
            showCounter: {
                type: Boolean,
                default: false,
                require: false
            },
            hasError: {
                type: Boolean,
                default: false,
                require: false
            },
            disabled: {
                type: Boolean,
                default: false,
                require: false
            },
            readonly: {
                type: Boolean,
                default: false,
                require: false
            },
            focused: {
                type: Boolean,
                default: false,
                required: false
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
