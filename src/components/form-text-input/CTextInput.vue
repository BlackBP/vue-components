<template>
    <input class="c-text-input"
           :id="inputId"
           :class="className"
           :type="type"
           :placeholder="placeholder"
           :disabled="disabled"
           :readonly="readonly"
           :value="value"
           :maxlength="attrMaxLength"
           @input="onInput"
           @keyup="onKeyUp"
           @keydown="onKeyDown"
           @focus="onFocus"
           @blur="onBlur">
</template>

<script>
    import MixinFormTextInput from "../../mixins/form-text-input"
    import MixinFormInput from "../../mixins/form-input"

    export default {
        name: "c-text-input",
        mixins: [
            MixinFormTextInput,
            MixinFormInput
        ],
        props: {
            type: {
                type: String,
                default: 'text'
            },
            mask: {
                type: [String, Boolean, Object],
                default: false
            },
        },
        mounted() {
            this.$emit('mounted', this.$el, this.mask);
        },
        beforeDestroy() {
            this.$emit('before-destroy', this.$el, this.mask);
        }
    }
</script>
