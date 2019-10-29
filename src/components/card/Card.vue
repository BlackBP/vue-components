<script>
    export default {
        name: "c-card",
        functional: true,
        props: {
            tag: {
                type: String,
                default: 'div'
            },
        },
        render(createElement, {data, children, props}) {
            let baseClass = 'c-card';
            data.class = [data.class, baseClass];
            return createElement(props.tag, data, children)
        }
    }
</script>
