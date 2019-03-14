<template>
    <FormField ref="" class="c-text-area"
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
                required: false
            },
            icon: {
                type: String,
                default: '',
                required: false
            },
            iconTitle: {
                type: String,
                default: '',
                required: false
            },
            label: {
                type: String,
                default: '',
                required: false
            },
            helper: {
                type: String,
                default: '',
                required: false
            },
            title: {
                type: String,
                default: '',
                required: false
            },
            placeholder: {
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
            rows: {
                type: Number,
                default: 10,
                required: false
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
