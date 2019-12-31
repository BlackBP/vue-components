<script>
    export default {
        name: "c-container",
        functional: true,
        props: {
            fluid: {
                type: Boolean,
                default: false
            }
        },
        render(createElement, {data, props, children}) {
            let baseClass = 'c-container';

            data.class = [data.class, baseClass, {
                [`is-fluid`]: props.fluid
            }];

            return createElement('div', data, children)
        }
    }
</script>
