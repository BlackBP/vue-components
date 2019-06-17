<template>

    <div :class="className">

        <label ref="label"
               class="c-radio__label"
               tabindex="0">

            <input type="radio"
                   :name="name"
                   :checked="checked"
                   :value="value"
                   :disabled="disabled"
                   @change="handleChange">

            <c-icon class="c-radio__icon"
                    :name="checked ? 'radiobox-marked' : 'radiobox-blank'" />

            <span class="c-radio__content">
                <slot></slot>
            </span>

        </label>

    </div>

</template>

<script>
    import CIcon from "./Icon";
    export default {
        name: "c-radio",
        components: {CIcon},
        model: {
            prop: 'model',
            event: 'change'
        },
        props: {
            model: null,
            value: null,
            name: String,
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            checked() {
                return this.model == this.value;
            },
            className() {
                let base = 'c-radio';
                let mods = {
                    'is-active': this.checked,
                    'is-disabled': this.disabled
                };

                return [base, mods]
            }
        },
        methods: {
            handleChange(event) {
                    this.$emit('change', this.value)
            },
            focus() {
                this.$refs.label.focus();
            }
        }
    }
</script>
