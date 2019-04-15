<template functional>

    <div v-bind="data.attrs"
         v-on="listeners"
         class="c-card-sect"
         :class="[data.staticClass]"
         :style="data.staticStyle">

        <slot></slot>

    </div>

</template>

<script>
    export default {
        name: "c-card-section"
    }
</script>
