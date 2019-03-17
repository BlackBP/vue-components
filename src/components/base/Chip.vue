<template>

    <div :class="className">

        <c-icon v-if="hasLeading"
                class="c-chip__leading"
                :name="leading" />

        <div class="c-chip__text">
            {{ text }}
        </div>

        <c-icon v-if="hasTrailing"
                class="c-chip__trailing"
                :name="trailing" />

    </div>

</template>

<script>
    import CIcon from "./Icon";

    export default {
        name: "Chip",
        components: {CIcon},
        props: {
            text: {
                type: String,
                default: '',
                required: true
            },
            leading: {
                type: String,
                default: '',
                required: false
            },
            trailing: {
                type: String,
                default: '',
                required: false
            },
            color: {
                type: String,
                default: '',
                required: false
            }
        },
        computed: {
            hasLeading() {
                return this.leading !== ''
            },
            hasTrailing() {
                return this.trailing !== ''
            },
            className() {
                let baseClass = 'c-chip';
                let className = [];

                if(typeof this.color === 'string' && this.color !== '') {
                    className.push(`${baseClass}--${this.color}`);
                }

                return className;
            }
        }
    }
</script>
