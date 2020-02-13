<template>
    <div class="c-checkbox"
         :class="className">

        <label ref="label"
               class="c-checkbox__label"
               tabindex="0">

            <input type="checkbox"
                   :checked="checked"
                   :value="value"
                   :disabled="disabled"
                   @change="onChange">

            <span class="c-checkbox__toggle">
                <span class="c-checkbox__toggle-mark"></span>
                <span class="c-checkbox__toggle-box"></span>
                <span class="c-checkbox__toggle-shadow"></span>
            </span>

            <span v-if="$slots.default"
                  class="c-checkbox__content">
                <slot></slot>
            </span>

        </label>

    </div>
</template>

<script>
import _ from '../../utils/helpers'
import MixinFormSwitches from '../../mixins/form-switches'

const MODEL = {
  prop: 'model',
  event: 'change'
}

export default {
  name: 'c-checkbox',
  mixins: [MixinFormSwitches],
  model: MODEL,
  computed: {
    checked () {
      if (_.isArray(this.model)) {
        return this.model.includes(this.value)
      } else if (_.isBoolean(this.model)) {
        return this.model
      } else {
        return this.model == this.value
      }
    }
  },
  methods: {
    onChange (event) {
      const isChecked = event.target.checked
      const value = this.value
      let newValue = value

      if (_.isArray(this.model)) {
        newValue = [...this.model]

        if (isChecked) {
          newValue.push(value)
        } else {
          newValue.splice(newValue.indexOf(value), 1)
        }

        this.$emit(MODEL.event, newValue)
      } else if (_.isBoolean(this.model)) {
        this.$emit(MODEL.event, isChecked)
      } else {
        this.$emit(MODEL.event, value)
      }
    },
    focus () {
      this.$refs.label.focus()
    }
  }
}
</script>
