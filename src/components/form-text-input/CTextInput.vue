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
    import _ from '../../utils/helpers'
    import {getConfig} from '../../config'
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
        computed: {
            hasMask() {
                return _.isObjectLike(this.mask) || _.isString(this.mask)
            },
        },
        mounted() {
            const config = getConfig(this, 'textInput');

            if (_.isFunction(config.mounted)) {
                config.mounted(this, this.mask, this.hasMask, this.$el)
            }

            this.$emit('mounted', this.$el, this.mask);
        },
        beforeDestroy() {
            const config = getConfig(this, 'textInput');

            if (_.isFunction(config.beforeDestroy)) {
                config.beforeDestroy(this, this.mask, this.hasMask, this.$el);
            }

            this.$emit('before-destroy', this.$el, this.mask);
        }
    }
</script>
