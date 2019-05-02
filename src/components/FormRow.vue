<script>
    export default {
        name: "c-form-row",
        functional: true,
        render(createElement, context) {
            let data = {
                class: {
                    'c-form-row': true
                }
            };

            data = _.defaultsDeep(data, context.data);

            return createElement('div', data, context.children)
        }
    }
</script>
