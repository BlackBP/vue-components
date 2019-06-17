<template>

    <div :class="className"
         @click="handleClick">

        <c-icon v-if="hasLeading"
                class="c-chip__leading"
                :name="leading"/>

        <div class="c-chip__text">
            <slot></slot>
        </div>

        <c-icon v-if="hasTrailing"
                class="c-chip__trailing"
                :name="trailing"/>

    </div>

</template>

<script>
    import CIcon from "./Icon";

    export default {
        name: "c-chip",
        components: {CIcon},
        props: {
            leading: {
                type: String,
                default: '',
            },
            trailing: {
                type: String,
                default: '',
            },
            color: {
                type: String,
                default: '',
            }
        },
        computed: {
            hasLeading() {
                return typeof this.leading === 'string' && this.leading !== ''
            },
            hasTrailing() {
                return typeof this.trailing === 'string' && this.trailing !== ''
            },
            className() {
                let baseClass = 'c-chip';
                let className = [baseClass];

                if (typeof this.color === 'string' && this.color !== '') {
                    className.push(`${baseClass}--${this.color}`);
                }

                return className;
            }
        },
        methods: {
            handleClick(event) {
                this.$emit('click', event);
            }
        }
    }
</script>
