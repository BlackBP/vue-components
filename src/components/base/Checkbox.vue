<template>

    <div class="c-checkbox"
         :class="checked ? 'is-active' : ''">

        <label ref="label"
               class="c-checkbox__label"
               tabindex="0"
               :for="id">

            <input type="checkbox"
                   :id="id"
                   :checked="checked"
                   :value="value"
                   :disabled="disabled"
                   @change="handleChange">

            <c-icon v-if="!checked"
                    class="c-checkbox__icon"
                    name="checkbox-blank-outline"/>

            <c-icon v-else
                    class="c-checkbox__icon"
                    name="checkbox-marked"/>

            <span class="c-checkbox__content">
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
            id: {
                type: String,
                default: function () {
                    return this.$uuId('c-checkbox-')
                }
            },
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
