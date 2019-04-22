<template functional>
    <div v-bind="data.attrs"
         v-on="listeners"
         class="c-form-row"
         :class="[data.staticClass, data.class]"
         :style="[data.staticStyle]">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "c-form-row"
    }
</script>
