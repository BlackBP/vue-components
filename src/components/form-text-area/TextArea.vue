<template>
    <c-form-field class="c-text-area"
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

    </c-form-field>
</template>

<script>
    import _ from '../../utils';
    import {CFormField} from '../form-field';

    export default {
        name: "c-text-area",
        components: {CFormField},
        props: {
            value: {
                type: null,
                default: '',
            },
            helper: {
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
