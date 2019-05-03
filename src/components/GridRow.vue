<script>
    export default {
        name: "c-grid-container",
        functional: true,
        props: {
            flex: {
                type: Boolean,
                default: false
            }
        },
        render(createElement, {data, props, children}) {
            let baseClass = 'c-grid-container';

            data.class = [baseClass, data.class];

            return createElement('div', data, children)
        }
    }
</script>
