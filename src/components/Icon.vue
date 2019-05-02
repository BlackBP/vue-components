<script>
    export default {
        name: "c-icon",
        functional: true,
        props: {
            name: {
                type: String,
                default: 'dots-horizontal',
                required: true
            },
            size: {
                type: String,
                default: '',
                required: false
            },
            vendorPrefix: {
                type: String,
                default: 'mdi mdi-',
                required: false
            }
        },
        render(createElement, context) {
            let props = context.props;
            let data = {
                class: {
                    'c-icon': true,
                    [`${props.vendorPrefix}${props.name}`]: true
                },
                style: {}
            };

            if (props.size) {
                data.style.fontSize = props.size;
            }

            data = _.defaultsDeep(data, context.data);

            return createElement('i', data);
        }
    }
</script>
