<template functional>
    <div v-bind="data.attrs"
         v-on="listeners"
         class="c-list-item"
         :class="[data.staticClass, data.class]"
         :style="data.staticStyle">

        <div v-if="$slots.start"
             class="c-list-item__start">
            <slot name="start"></slot>
        </div>
        <div class="c-list-item__body">
            <slot></slot>
        </div>
        <div v-if="$slots.end"
             class="c-list-item__end">
            <slot name="end"></slot>
        </div>

    </div>
</template>

<script>
    export default {
        name: "c-list-item"
    }
</script>
