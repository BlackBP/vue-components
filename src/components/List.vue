<script>
    export default {
        name: "c-list",
        functional: true,
        render(createElement, {data, props, children}) {
            let baseClass = 'c-list';

            data.class = [baseClass, data.class];

            return createElement('div', data, children)
        }
    }
</script>
