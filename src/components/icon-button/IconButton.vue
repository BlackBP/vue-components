<template>

    <button :class="className"
            :type="type"
            :disabled="disabled"
            @click="handleClick">

        <c-icon class="c-icon-btn__icon"
                :name="icon"/>

    </button>

</template>

<script>
    import CIcon from "./Icon.vue";

    export default {
        name: "c-icon-btn",
        components: {CIcon},
        props: {
            type: {
                type: String,
                default: 'button',
            },
            icon: {
                type: String,
                default: 'dots-horizontal',
                required: true
            },
            color: {
                type: String,
                default: '',
            },
            disabled: {
                type: Boolean,
                default: false,
            },
            transparent: {
                type: Boolean,
                default: false,
            },
            elevated: {
                type: Boolean,
                default: false,
            },
            dense: {
                type: Boolean,
                default: false,
            },
        },
        computed: {
            className() {
                let base = 'c-icon-btn';
                let hasColor = this.color !== '';
                let modColor = hasColor ? `${base}--${this.color}` : '',
                    modTransparent = `${base}--transparent`,
                    modElevated = `${base}--elevated`,
                    modDense = `${base}--dense`;

                let className = [base, modColor, {
                    [modDense]: this.dense
                }];

                if (this.transparent) {
                    className.push(modTransparent);
                    return className;
                }

                if (this.elevated) {
                    className.push(modElevated);
                    return className;
                }

                return className;
            },
        },
        methods: {
            disable() {
                this.disabled = true;
            },
            enable() {
                this.disabled = false;
            },
            handleClick(event) {
                if (this.disabled) return;

                this.$emit('click', event);
            }
        }
    }
</script>
