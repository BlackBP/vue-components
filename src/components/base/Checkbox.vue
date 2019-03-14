<template>

    <div class="c-checkbox">

        <input v-model="checked"
               type="checkbox"
               :id="id"
               :value="val"
               @change="handleChange">

        <label ref="label"
               tabindex="0"
               :for="id">

            <span class="c-checkbox__content">
                <slot></slot>
            </span>

        </label>

    </div>

</template>

<script>
    export default {
        name: "c-checkbox",
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
            }
        },
        data() {
            return {
                proxy: false
            };
        },
        computed: {
            id() {
                return this.$uuId('checkbox-');
            },
            checked: {
                get() {
                    return this.value;
                },
                set(value) {
                    this.proxy = value;
                }
            },
            hasContent() {
                return !_.isEmpty(this.$slots.default);
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
