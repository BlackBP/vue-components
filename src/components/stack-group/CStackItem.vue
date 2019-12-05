<script>
    let ClassName = 'c-stack-item';

    export default {
        name: "c-stack-item",
        functional: true,
        props: {
            tag: {
                type: String,
                default: 'div'
            },
            flex: {
                type: Boolean,
                default: false
            }
        },
        render(createElement, {data, props, children}) {
            data.class = [data.class, ClassName, {
                [`${ClassName}--flex`]: props.flex
            }];

            return createElement(props.tag, data, children)
        }
    }
</script>
