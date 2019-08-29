<template>
    <div class="c-context-popup-item">
        <c-icon v-if="leading"
                class="c-context-popup-item__leading"
                :name="leading" />

        <span class="c-context-popup-item__text">{{ text }}</span>

        <c-icon v-if="trailing"
                class="c-context-popup-item__trailing"
                :name="trailing" />
    </div>
</template>

<script>
    export default {
        name: "c-context-popup-item",
        props: {
            leading: {
                type: String
            },
            text: {
                type: String,
            },
            trailing: {
                type: String
            },
        }
    }
</script>