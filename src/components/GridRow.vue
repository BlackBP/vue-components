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
                [`--justify-${props.justify}`]: true,
                [`--items-${props.alignItems}`]: true,
                [`--no-gutters`]: props.noGutters,
                [`--no-wrap`]: props.noWrap
            }];

            return createElement('div', data, children)
        }
    }
</script>
