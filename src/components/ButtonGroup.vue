<template functional>
    <div v-bind="data.attrs"
         v-on="listeners"
         class="c-btn-group"
         :style="data.staticStyle"
         :class="[data.staticClass]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "c-btn-group"
    }
</script>
