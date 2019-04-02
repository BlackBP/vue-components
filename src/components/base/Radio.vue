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

            <c-icon v-if="!checked"
                    class="c-radio__icon"
                    name="radiobox-blank" />

            <c-icon v-else
                    class="c-radio__icon"
                    name="radiobox-marked" />

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
            model: {
                type: null
            },
            value: {
                type: null
            },
            name: {
                type: String,
                default: null
            },
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
