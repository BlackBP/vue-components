<script>
    export default {
        name: "c-card",
        functional: true,
        props: {
            tag: {
                type: String,
                default: 'div'
            }
        },
        render(createElement, {data, children, props}) {
            const className = 'c-card';

            data.class = [data.class, className];

            return createElement(props.tag, data, children)
        }
    }
</script>
