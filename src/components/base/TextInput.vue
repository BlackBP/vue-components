<template>
    <FormField class="c-text-input"
               content-class="c-text-input__wrap"
               :focused="focused"
               :has-error="hasErrors"
               :helper-text="helperText"
               :disabled="disabled"
               :readonly="readonly"
               :count="valueLength"
               :count-max="maxLength"
               :show-counter="showCounter"
               :show-helper="true">

        <input v-model="model"
               ref="field"
               class="c-text-input__field"
               autocomplete="off"
               :id="id"
               :type="type"
               :placeholder="placeholder"
               :disabled="disabled"
               :readonly="readonly"
               :min="type === 'number' ? 0 : false"
               @change="handleChange"
               @keypress="handleKeyPress"
               @focus="focused = true"
               @blur="focused = false">

    </FormField>
</template>

<script>
    import FormField from "./FormField";

    export default {
        name: "c-text-input",
        components: {
            FormField
        },
        props: {
            type: {
                type: String,
                default: 'text',
                required: false
            },
            label: {
                type: String,
                default: '',
                required: false
            },
            placeholder: {
                type: String,
                default: '',
                required: false
            },
            helper: {
                type: String,
                default: '',
                required: false
            },
            value: {
                type: null,
                default: '',
                required: false
            },
            mask: {
                type: [String, Boolean, Object],
                default: false,
                required: false
            },
            title: {
                type: String,
                default: '',
                required: false
            },
            readonly: {
                type: Boolean,
                default: false,
                required: false
            },
            disabled: {
                type: Boolean,
                default: false,
                required: false
            },
            showCounter: {
                type: Boolean,
                default: false,
                required: false
            },
            errors: {
                type: Array,
                default: () => [],
                required: false
            },
            maxLength: {
                type: Number,
                default: 100,
                require: false
            }
        },
        data() {
            return {
                focused: false,
                valueLength: 0
            }
        },
        computed: {
            model: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.valueLength = _.toString(value).length;
                    this.$emit('input', value);
                }
            },
            id() {
                return this.$uuId('text-input-')
            },
            hasErrors() {
                if(_.isArray(this.errors)) {
                    return !_.isEmpty(this.errors)
                }

                return false;
            },
            helperText() {
                let text = this.helper;

                if (this.hasErrors) {
                    text = this.errors.join(', ');
                }

                return text;
            },
            inputMask() {
                if (_.isBoolean(this.mask)) {
                    return false;
                }

                if(_.isObjectLike(this.mask)) {
                    return this.mask
                }

                return {
                    alias: this.mask
                }
            }
        },
        methods: {
            focus() {
                this.$refs.field.focus();
            },
            handleKeyPress(event) {
                this.$emit('keypress', event)
            },
            handleChange(event) {
                this.$emit('change', event)
            }
        }
    }
</script>
