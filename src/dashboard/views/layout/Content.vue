<script>
    export default {
        name: "layout-content",
        functional: true,
        render(createElement, {data, children}) {

            data.class = [data.class, 'app-content'];

            return createElement('div', data, children)
        }
    }
</script>
