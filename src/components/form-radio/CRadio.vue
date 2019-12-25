<template>
    <div class="c-radio"
         :class="className">

        <label ref="label"
               class="c-radio__label"
               tabindex="0">

            <input type="radio"
                   :name="name"
                   :checked="checked"
                   :value="value"
                   :disabled="disabled"
                   @change="onChange">

            <span class="c-radio__toggle">
                <span class="c-radio__toggle-box"></span>
                <span class="c-radio__toggle-shadow"></span>
            </span>

            <span v-if="$slots.default"
                  class="c-radio__content">
                <slot></slot>
            </span>

        </label>

    </div>
</template>

<script>
    import MixinFormSwitches from "../../mixins/form-switches"

    const MODEL = {
        prop: 'model',
        event: 'change'
    };

    export default {
        name: "c-radio",
        mixins: [MixinFormSwitches],
        model: MODEL,
        computed: {
            checked() {
                return this.model == this.value;
            },
        },
        methods: {
            onChange() {
                this.$emit(MODEL.event, this.value)
            },
            focus() {
                this.$refs.label.focus();
            }
        }
    }
</script>
