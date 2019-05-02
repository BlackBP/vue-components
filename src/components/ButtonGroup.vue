<script>
    export default {
        name: "c-btn-group",
        functional: true,
        render(createElement, {data, children}) {
            let baseClass = 'c-btn-group';

            data.class = [data.class, baseClass];

            return createElement('div', data, children)
        }
    }
</script>
