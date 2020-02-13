<script>
export default {
  name: 'c-card',
  functional: true,
  props: {
    tag: {
      type: String,
      default: 'div'
    }
  },
  render (createElement, { data, props, children }) {
    const className = 'c-card'

    data.class = [data.class, className]

    return createElement(props.tag, data, children)
  }
}
</script>
