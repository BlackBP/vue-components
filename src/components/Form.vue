<script>
    export default {
        name: "c-form",
        functional: true,
        render(createElement, {data, children}) {
            return createElement('form', data, children)
        }
    }
</script>