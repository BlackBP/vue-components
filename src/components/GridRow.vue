<script>
    export default {
        name: "c-grid-row",
        functional: true,
        props: {
            noGutters: {
                type: Boolean,
                default: false
            },
            alignItems: {
                type: String,
                default: 'start'
            },
            justify: {
                type: String,
                default: 'start'
            },
            noWrap: {
                type: Boolean,
                default: false
            }
        },
        render(createElement, {data, props, children}) {
            let baseClass = 'c-grid-row';

            data.class = [data.class, baseClass, {
                [`${baseClass}--justify-${props.justify}`]: true,
                [`${baseClass}--items-${props.alignItems}`]: true,
                [`${baseClass}--no-gutters`]: props.noGutters,
                [`${baseClass}--no-wrap`]: props.noWrap
            }];

            return createElement('div', data, children)
        }
    }
</script>
