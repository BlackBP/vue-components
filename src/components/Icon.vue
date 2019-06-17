<script>
    export default {
        name: "c-icon",
        functional: true,
        props: {
            tag: {
                type: String,
                default: 'i'
            },
            name: {
                type: String,
                default: 'dots-horizontal',
                required: true
            },
            size: {
                type: String,
                default: ''
            },
            vendorPrefix: {
                type: String,
                default: 'mdi mdi-'
            }
        },
        render(createElement, {data, props}) {
            let baseClass = 'c-icon';

            data.class = [data.class, baseClass, `${props.vendorPrefix}${props.name}`];

            if(props.size) {
                data.style = [data.style, {
                    fontSize: props.size
                }];
            }

            return createElement(props.tag, data);
        }
    }
</script>
