<template>
    <div class="c-badge">
        <div class="c-badge__slot">
            <slot></slot>
        </div>

        <div v-if="$slots.badge || icon !== ''"
             class="c-badge__badge">

            <template v-if="icon !== ''">
                <c-icon :name="icon" />
            </template>

            <template v-else>
                <slot name="badge"></slot>
            </template>
        </div>
    </div>
</template>

<script>
    import CIcon from "./Icon.vue";
    export default {
        name: "c-badge",
        components: {CIcon},
        props: {
            icon: {
                type: String,
                default: ''
            },
            color: {
                type: String,
                default: ''
            }
        }
    }
</script>