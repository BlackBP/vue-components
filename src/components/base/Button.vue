<template>

    <button :type="type"
            :class="className"
            :disabled="disabled"
            @click="handleClick">

        <c-icon v-if="hasIcon && iconLeft"
                class="c-btn__icon"
                :name="icon"/>

        <span v-if="hasText"
              class="c-btn__text">
            {{ text }}
        </span>

        <c-icon v-if="hasIcon && iconRight"
                class="c-btn__icon"
                :name="icon"/>

    </button>

</template>

<script>
    import CIcon from "./Icon";

    export default {
        name: "c-btn",
        components: {CIcon},
        props: {
            type: {
                type: String,
                default: 'button',
                required: false
            },
            text: {
                type: String,
                default: ''
            },
            icon: {
                type: String,
                default: ''
            },
            iconLeft: {
                type: Boolean,
                default: false
            },
            iconRight: {
                type: Boolean,
                default: false
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
            hasIcon() {
                let icon = this.icon;

                if (typeof icon === 'string') {
                    return icon !== '';
                }

                return false;
            },
            hasText() {
                let text = this.text;

                if (typeof text === 'string') {
                    return text !== '';
                }

                return false;
            },
            className() {
                let baseClass = 'c-btn';
                let hasColor = typeof this.color === "string" && this.color !== '';
                let color = hasColor ? this.color : '';

                let modElevated = `${baseClass}--elevated`,
                    modTransparent = `${baseClass}--transparent`,
                    modBlock = `${baseClass}--block`,
                    modIconLeft = `${baseClass}--icon-left`,
                    modIconRight = `${baseClass}--icon-right`,
                    modColor = `${baseClass}--${color}`;

                let baseMods = {
                    [modIconLeft]: this.iconLeft,
                    [modIconRight]: this.iconRight,
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
