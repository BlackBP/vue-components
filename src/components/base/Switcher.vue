<template>

    <div class="c-switch">

        <input v-model="checked"
               :type="type"
               :id="id"
               :value="val"
               @change="handleChange">

        <label ref="label"
               tabindex="0"
               :for="id">

            <span class="c-switch__content">
                <slot></slot>
            </span>

        </label>

    </div>

</template>

<script>
    export default {
        name: "c-switch",
        props: {
            checkbox: {
                type: Boolean,
                default: true,
                required: false
            },
            value: {
                type: null,
                default: '',
                required: false
            },
            val: {
                type: null,
                default: '',
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
                return this.$uuId('switcher-');
            },
            type() {
                return this.checkbox ? 'checkbox' : 'radio';
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
