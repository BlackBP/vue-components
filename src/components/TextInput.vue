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

        <c-icon v-if="leading"
                class="c-text-input__leading"
                :title="title"
                :name="leading"/>

        <input v-model="model"
               ref="field"
               class="c-text-input__field"
               autocomplete="off"
               :type="type"
               :placeholder="placeholder"
               :disabled="disabled"
               :readonly="readonly"
               :min="type === 'number' ? 0 : false"
               @change="handleChange"
               @keypress="handleKeyPress"
               @focus="focused = true"
               @blur="focused = false">

        <c-icon v-if="trailing"
                class="c-text-input__trailing"
                :name="trailing"/>

    </FormField>
</template>

<script>
    import Inputmask from "inputmask";
    import FormField from "./FormField";
    import CIcon from "./Icon";

    export default {
        name: "c-text-input",
        components: {
            CIcon,
            FormField
        },
        props: {
            type: {
                type: String,
                default: 'text',
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
                default: ''
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
            },
            leading: {
                type: String,
                default: '',
                require: false
            },
            trailing: {
                type: String,
                default: '',
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
            hasErrors() {
                if (_.isArray(this.errors)) {
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
            hasMask() {
                return _.isObjectLike(this.mask)
            },
            fieldRef() {
                return this.$refs.field;
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
        },
        mounted() {
            if(this.hasMask) {
                new Inputmask(this.mask).mask(this.$refs.field);
            }
        },
        beforeDestroy() {
            if(this.hasMask) {
                let field = this.$refs.field;

                if (field.inputmask) {
                    field.inputmask.remove()
                }
            }
        }
    }
</script>
