<script>
    export default {
        name: "c-stack-item",
        functional: true,
        props: {
            flex: {
                type: Boolean,
                default: false
            }
        },
        render(createElement, {data, props, children}) {
            let baseClass = 'c-stack-item';

            data.class = [baseClass, data.class, {
                [`${baseClass}--flex`]: props.flex
            }];

            return createElement('div', data, children)
        }
    }
</script>
