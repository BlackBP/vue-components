<template>

    <button :type="type"
            :class="className"
            :disabled="disabled"
            @click="handleClick">

        <c-icon v-if="hasLeftIcon && iconLeft"
                class="c-btn__icon"
                :name="iconLeft"/>

        <span class="c-btn__text">
            <slot></slot>
        </span>

        <c-icon v-if="hasRightIcon && iconRight"
                class="c-btn__icon"
                :name="iconRight"/>

    </button>

</template>

<script>
    import CIcon from "./Icon";


    function isValidString(value) {
        if (typeof value === 'string') {
            return value !== ''
        }
        return false
    }

    export default {
        name: "c-btn",
        components: {CIcon},
        props: {
            type: {
                type: String,
                default: 'button',

            },
            iconLeft: {
                type: String,
                default: ''
            },
            iconRight: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: ''
            },
            elevated: {
                type: Boolean,
                default: false
            },
            transparent: {
                type: Boolean,
                default: false
            },
            block: {
                type: Boolean,
                default: false
            },
            disabled: {
                type: Boolean,
                default: false
            }
        },
        computed: {
            hasLeftIcon() {
                return isValidString(this.iconLeft);
            },
            hasRightIcon() {
                return isValidString(this.iconRight);
            },
            className() {
                let baseClass = 'c-btn';
                let hasColor = isValidString(this.color);
                let color = hasColor ? this.color : '';

                let modElevated = `${baseClass}--elevated`,
                    modTransparent = `${baseClass}--transparent`,
                    modBlock = `${baseClass}--block`,
                    modColor = `${baseClass}--${color}`;

                let baseMods = {
                    [modColor]: hasColor,
                    [modBlock]: this.block
                };

                let className = [baseClass, baseMods];

                if (this.transparent) {
                    className.push(modTransparent);
                    return className;
                }

                if (this.elevated) {
                    className.push(modElevated);
                    return className;
                }

                return className;
            }
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
