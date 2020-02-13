<template>
    <div class="c-switch"
         :class="className">

        <label ref="label"
               tabindex="0"
               class="c-switch__label">

            <input :type="type"
                   :checked="checked"
                   :value="value"
                   :disabled="disabled"
                   @change="onChange">

            <span class="c-switch__toggle">
                <span class="c-switch__toggle-track"></span>
                <span class="c-switch__toggle-knob">
                    <span class="c-switch__toggle-knob-shadow"></span>
                </span>
            </span>

            <span v-if="$slots.default"
                  class="c-switch__content">
                <slot/>
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
  name: 'c-switch',
  mixins: [MixinFormSwitches],
  model: MODEL,
  props: {
    type: {
      type: String,
      default: 'checkbox',
      validator (value) {
        return ['checkbox', 'radio'].includes(value)
      }
    }
  },
  computed: {
    checked () {
      if (this.type === 'radio') {
        return this.model == this.value
      }

      // For checkbox
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
      if (this.type === 'radio') {
        this.$emit(MODEL.event, this.value)
        return
      }

      // For checkbox
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
