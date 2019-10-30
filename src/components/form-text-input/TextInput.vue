<template>
    <c-form-field class="c-text-input"
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

        <template v-if="$slots.leading">
            <div class="c-text-input__leading">
                <slot name="leading"/>
            </div>
        </template>

        <template v-else>
            <c-icon v-if="leading"
                    class="c-text-input__leading"
                    :title="title"
                    :name="leading"/>
        </template>

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

        <template v-if="$slots.trailing">
            <div class="c-text-input__trailing">
                <slot name="trailing"/>
            </div>
        </template>

        <template v-else>
            <c-icon v-if="trailing"
                    class="c-text-input__trailing"
                    :name="trailing"/>
        </template>

    </c-form-field>
</template>

<script>
    import _, {getConfig} from '../../utils'
    import {CFormField} from '../form-field';
    import {CIcon} from '../icon';

    export default {
        name: "c-text-input",
        components: {
            CIcon,
            CFormField
        },
        props: {
            type: {
                type: String,
                default: 'text',
            },
            placeholder: {
                type: String,
                default: '',
            },
            helper: {
                type: String,
                default: '',
            },
            value: {
                type: null,
                default: ''
            },
            mask: {
                type: [String, Boolean, Object],
                default: false,
            },
            title: {
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
            leading: {
                type: String,
                default: '',
            },
            trailing: {
                type: String,
                default: '',
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
                return _.isObjectLike(this.mask) || _.isString(this.mask)
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
            const config = getConfig(this, 'textInput');
            const onMount = _.isFunction(config.mounted) ? config.mounted : () => {
            };

            onMount(this, this.mask, this.hasMask, this.$refs.field);
        },
        beforeDestroy() {
            const config = getConfig(this, 'textInput');
            const onBeforeDestroy = _.isFunction(config.beforeDestroy) ? config.beforeDestroy : () => {
            };

            onBeforeDestroy(this, this.mask, this.hasMask, this.$refs.field);
        }
    }
</script>
