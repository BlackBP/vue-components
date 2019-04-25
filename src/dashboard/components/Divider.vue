<template functional>
    <div v-bind="data.attrs"
         v-on="listeners"
         class="c-divider"
         :class="[data.staticClass, data.class]"
         :style="[data.staticStyle]"></div>
</template>

<script>
    export default {
        name: "c-divider"
    }
</script>
