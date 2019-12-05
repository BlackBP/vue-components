<script>
    export default {
        name: "c-list",
        functional: true,
        render(createElement, {data, children}) {
            let baseClassName = 'c-list';

            data.class = [baseClassName, data.class];

            return createElement('div', data, children)
        }
    }
</script>
