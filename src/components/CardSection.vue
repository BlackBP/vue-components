<script>
    export default {
        name: "c-card-section",
        functional: true,
        render(createElement, context) {
            let data = {
                class: {
                    'c-card-sect': true
                }
            };

            data = _.defaultsDeep(data, context.data);

            return createElement('div', data, context.children)
        }
    }
</script>
