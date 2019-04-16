<template>

    <div class="c-checkbox"
         :class="checked ? 'is-active' : ''">

        <label ref="label"
               class="c-checkbox__label"
               tabindex="0">

            <input type="checkbox"
                   :checked="checked"
                   :value="value"
                   :disabled="disabled"
                   @change="handleChange">

            <c-icon class="c-checkbox__icon"
                    :name="checked ? 'checkbox-marked' : 'checkbox-blank-outline'"/>

            <span v-if="$slots.default"
                  class="c-checkbox__content">
                <slot></slot>
            </span>

        </label>

    </div>

</template>

<script>
    import CIcon from "./Icon";

    export default {
        name: "c-checkbox",
        components: {CIcon},
        model: {
            prop: 'model',
            event: 'change'
        },
        props: {
            model: {
                type: null
            },
            value: {
                type: null
            },
            name: {
                type: String,
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            checked() {
                if (this.model instanceof Array) {
                    return this.model.includes(this.value);
                } else if (typeof this.model === 'boolean') {
                    return this.model;
                } else {
                    return this.model == this.value;
                }
            }
        },
        methods: {
            handleChange({target: {checked}}) {
                let isChecked = checked;
                let value = this.value;
                let newValue = value;

                if (this.model instanceof Array) {
                    newValue = [...this.model];

                    if (isChecked) {
                        newValue.push(value);
                    } else {
                        newValue.splice(newValue.indexOf(value), 1);
                    }

                    this.$emit('change', newValue);
                } else if (typeof this.model === 'boolean') {
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
