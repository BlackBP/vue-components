<script>
export default {
  name: 'c-row',
  functional: true,
  props: {
    noGutters: {
      type: Boolean,
      default: false
    },
    alignItems: {
      type: String,
      default: 'start'
    },
    justify: {
      type: String,
      default: 'start'
    },
    noWrap: {
      type: Boolean,
      default: false
    }
  },
  render (createElement, { data, props, children }) {
    let baseClass = 'c-row'

    data.class = [data.class, baseClass, {
      [`is-justify-${props.justify}`]: true,
      [`is-items-${props.alignItems}`]: true,
      [`is-no-gutters`]: props.noGutters,
      [`is-no-wrap`]: props.noWrap
    }]

    return createElement('div', data, children)
  }
}
</script>
