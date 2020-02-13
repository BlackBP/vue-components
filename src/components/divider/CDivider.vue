<script>
const className = 'c-divider'

export default {
  name: 'c-divider',
  functional: true,
  render (createElement, { data }) {
    data.class = [data.class, className]

    return createElement('div', data)
  }
}
</script>
