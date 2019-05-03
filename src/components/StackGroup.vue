<script>
    export default {
        name: "c-stack-group",
        functional: true,
        props: {
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
            alignContent: {
                type: String,
                default: 'between',
            },
            wrap: {
                type: Boolean,
                default: false
            }
        },
        render(createElement, {data, props, children}) {
            let baseClass = 'c-stack';

            data.class = [data.class, baseClass, {
                [`${baseClass}--inline`]: props.inline,
                [`${baseClass}--column`]: props.column,
                [`${baseClass}--items-${props.alignItems}`]: true,
                [`${baseClass}--content-${props.alignContent}`]: true,
                [`${baseClass}--wrap`]: props.wrap,
            }];

            return createElement('div', data, children);
        }
    }
</script>
