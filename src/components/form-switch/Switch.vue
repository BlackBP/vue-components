<template>

    <div class="c-switch"
         :class="checked ? 'is-active' : ''">

        <label ref="label"
               tabindex="0"
               class="c-switch__label">

            <input :type="type"
                   :checked="checked"
                   :value="value"
                   :disabled="disabled"
                   @change="handleChange">

            <span class="c-switch__toggle"></span>

            <span class="c-switch__content">
                <slot></slot>
            </span>

        </label>

    </div>

</template>

<script>
    import {
        isArray,
        isBoolean
    } from '../../utils/helpers';

    export default {
        name: "c-switch",
        model: {
            prop: 'model',
            event: 'change'
        },
        props: {
            model: null,
            value: null,
            name: String,
            type: {
                type: String,
                default: 'checkbox',
                validator(value) {
                    return ['checkbox', 'radio'].includes(value);
                }
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            checked() {
                if (this.type === 'radio') {
                    return this.model == this.value;
                }

                // For checkbox
                if (isArray(this.model)) {
                    return this.model.includes(this.value);
                } else if (isBoolean(this.model)) {
                    return this.model;
                } else {
                    return this.model == this.value;
                }
            }
        },
        methods: {
            handleChange({target: {checked}}) {
                if (this.type === 'radio') {
                    this.$emit('change', this.value);
                    return
                }

                // For checkbox
                let isChecked = checked;
                let value = this.value;
                let newValue = value;

                if (isArray(this.model)) {
                    newValue = [...this.model];

                    if (isChecked) {
                        newValue.push(value);
                    } else {
                        newValue.splice(newValue.indexOf(value), 1);
                    }

                    this.$emit('change', newValue);
                } else if (isBoolean(this.model)) {
                    this.$emit('change', isChecked);
                } else {
                    this.$emit('change', value);
                }
            },
            focus() {
                this.$refs.label.focus();
            }
        }
    }
</script>
