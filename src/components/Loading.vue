<template functional>
    <div v-on="listeners"
         v-bind="data.attrs"
         :class="[data.staticClass]"
         :style="data.staticStyle"
         class="c-loading">
        <div class="c-loading__spinner"></div>

        <div v-if="props.text"
             class="c-loading__text">
            {{ props.text }}
        </div>
    </div>
</template>

<script>
    export default {
        name: "c-loading",
        props: {
            text: {
                type: [String, Boolean],
                default: 'Загрузка...',
                required: false
            },
            visible: {
                type: Boolean,
                default: true,
                required: true
            }
        }
    }
</script>
