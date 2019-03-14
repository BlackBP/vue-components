<template>

    <div class="c-radio">

        <input v-model="checked"
               type="radio"
               :id="id"
               :value="val"
               :disabled="disabled"
               @change="handleChange">

        <label ref="label"
               tabindex="0"
               :for="id">

            <span class="c-radio__content">
                <slot></slot>
            </span>

        </label>

    </div>

</template>

<script>
    export default {
        name: "c-radio",
        props: {
            value: {
                type: null,
                default: '',
                required: false
            },
            val: {
                type: null,
                default: '',
                required: false
            },
            name: {
                type: String,
                default: '',
                required: false
            },
            disabled: {
                type: Boolean,
                default: false,
                required: false
            }
        },
        data() {
            return {
                proxy: false
            };
        },
        computed: {
            id() {
                return this.$uuId('radio-');
            },
            checked: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.proxy = value;
                }
            }
        },
        methods: {
            handleChange(event) {
                this.$emit('input', this.proxy);
            },
            focus() {
                this.$refs.label.focus();
            }
        }
    }
</script>
