const MixinFormInput = {
  props: {
    id: {
      type: String,
      default: ''
    },
    value: {
      type: null,
      default: ''
    },
    disabled: {
      type: Boolean,
      default: false
    },
    readonly: {
      type: Boolean,
      default: false
    },
    state: {
      type: String,
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  computed: {
    inputId () {
      return this.id !== '' ? this.id : false
    }
  }
}

export default MixinFormInput
