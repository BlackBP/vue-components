<template>
    <textarea class="c-text-area"
              :id="inputId"
              :class="className"
              :rows="rows"
              :maxlength="attrMaxLength"
              :disabled="disabled"
              :readonly="readonly"
              :placeholder="placeholder"
              :value="value"
              @input="onInput"
              @focus="onFocus"
              @blur="onBlur">
    </textarea>
</template>

<script>
import MixinFormTextInput from '../../mixins/form-text-input'
import MixinFormInput from '../../mixins/form-input'

export default {
  name: 'c-text-area',
  mixins: [
    MixinFormTextInput,
    MixinFormInput
  ],
  props: {
    rows: {
      type: [Number, String],
      default: 5
    }
  }
}
</script>
