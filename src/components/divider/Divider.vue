<script>
    export default {
        name: "c-divider",
        functional: true,
        render(createElement, {data}) {
            let baseClass = 'c-divider';

            data.class = [data.class, baseClass];

            return createElement('div', data)
        }
    }
</script>
