<template>

    <button :type="type"
            :class="className"
            :disabled="disabled"
            @click="handleClick">

        <c-icon v-if="hasLeftIcon"
                class="c-btn__icon"
                :name="iconLeft"/>

        <span class="c-btn__text">
            <slot></slot>
        </span>

        <c-icon v-if="hasRightIcon"
                class="c-btn__icon"
                :name="iconRight"/>

    </button>

</template>

<script>
    import CIcon from "./Icon.vue";

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
            bordered: {
                type: Boolean,
                default: false
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
                return _.isString(this.iconLeft) && this.iconLeft !== '';
            },
            hasRightIcon() {
                return _.isString(this.iconRight) && this.iconRight !== '';
            },
            className() {
                let baseClass = 'c-btn';
                let hasColor = _.isString(this.color) && this.color !== '';
                let color = hasColor ? this.color : '';

                let modElevated = `${baseClass}--elevated`,
                    modTransparent = `${baseClass}--transparent`,
                    modBordered = `${baseClass}--bordered`,
                    modBlock = `${baseClass}--block`,
                    modColor = `${baseClass}--${color}`;

                let baseMods = {
                    [modColor]: hasColor,
                    [modBlock]: this.block
                };

                let className = [baseClass, baseMods];

                if(this.bordered) {
                    className.push(modBordered);
                    return className;
                }

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
