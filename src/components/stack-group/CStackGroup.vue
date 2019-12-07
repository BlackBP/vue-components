<script>
    const ClassName = 'c-stack-group';

    export default {
        name: "c-stack-group",
        functional: true,
        props: {
            tag: {
                type: String,
                default: 'div'
            },
            inline: {
                type: Boolean,
                default: false
            },
            column: {
                type: Boolean,
                default: false
            },
            alignItems: {
                type: String,
                default: 'center'
            },
            justify: {
                type: String,
                default: 'between',
            },
            wrap: {
                type: Boolean,
                default: false
            }
        },
        render(createElement, {data, props, children}) {
            data.class = [data.class, ClassName, {
                [`is-inline`]: props.inline,
                [`is-column`]: props.column,
                [`is-items-${props.alignItems}`]: true,
                [`is-justify-${props.justify}`]: true,
                [`is-wrap`]: props.wrap,
            }];

            return createElement(props.tag, data, children);
        }
    }
</script>
