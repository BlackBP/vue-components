<template>
    <FormField class="c-text-area"
               content-class="c-text-area__wrap"
               :focused="focused"
               :has-error="hasErrors"
               :helper-text="helperText"
               :disabled="disabled"
               :readonly="readonly"
               :count="valueLength"
               :count-max="maxLength"
               :show-counter="showCounter"
               :show-helper="true">

        <textarea v-model="model"
                  ref="field"
                  cols="30"
                  class="c-text-area__field"
                  :rows="rows"
                  :disabled="disabled"
                  :readonly="readonly"
                  :placeholder="placeholder"
                  @focus="focused = true"
                  @blur="focused = false"></textarea>

    </FormField>
</template>

<script>
    import FormField from "./FormField";

    export default {
        name: "c-textarea",
        components: {FormField},
        props: {
            value: {
                type: null,
                default: '',
            },
            icon: {
                type: String,
                default: '',
            },
            iconTitle: {
                type: String,
                default: '',
            },
            label: {
                type: String,
                default: '',
            },
            helper: {
                type: String,
                default: '',
            },
            title: {
                type: String,
                default: '',
            },
            placeholder: {
                type: String,
                default: '',
            },
            readonly: {
                type: Boolean,
                default: false,
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            showCounter: {
                type: Boolean,
                default: false,
            },
            errors: {
                type: Array,
                default: () => [],
            },
            maxLength: {
                type: Number,
                default: 100,
                require: false
            },
            rows: {
                type: Number,
                default: 10,
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
                return !_.isEmpty(this.errors)
            },
            helperText() {
                let text = this.helper;

                if (this.hasErrors) {
                    text = this.errors.join(', ');
                }

                return text;
            }
        },
        methods: {
            focus() {
                this.$refs.field.focus();
            }
        }
    }
</script>
