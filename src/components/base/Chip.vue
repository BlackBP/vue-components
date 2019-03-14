<template>

    <div class="c-chip"
         :class="className">

        <i v-if="hasLeading"
           class="c-chip__leading"
           :class="leading"></i>

        <div class="c-chip__text">
            {{ text }}
        </div>

        <i v-if="hasTrailing"
           class="c-chip__trailing"
           :class="trailing"></i>

    </div>

</template>

<script>
    export default {
        name: "Chip",
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
                return !_.isEmpty(this.leading)
            },
            hasTrailing() {
                return !_.isEmpty(this.trailing)
            },
            className() {
                let baseClass = 'c-chip';
                let className = [];

                if(!_.isEmpty(this.color)) {
                    className.push(`${baseClass}--${this.color}`);
                }

                return className;
            }
        }
    }
</script>