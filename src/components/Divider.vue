<script>
    export default {
        name: "c-divider",
        functional: true,
        render(createElement, context) {
            let data = {
                class: {
                    'c-divider': true
                }
            };

            data = _.defaultsDeep(data, context.data);

            return createElement('div', data, context.children)
        }
    }
</script>
