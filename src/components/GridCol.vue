<script>
    export default {
        name: "c-grid-row",
        functional: true,
        props: {
            noGutters: {
                type: Boolean,
                default: false
            }
        },
        render(createElement, {data, props, children}) {
            let baseClass = 'c-grid-row';

            data.class = [baseClass, data.class, {
                [`${baseClass}--no-gutters`]: props.noGutters
            }];

            return createElement('div', data, children)
        }
    }
</script>
