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
        render(createElement, {data, props}) {
            let baseClass = 'c-icon';

            data.class = [data.class, baseClass, `${props.vendorPrefix}${props.name}`];

            if(props.size) {
                data.style = [data.style, {
                    fontSize: props.size
                }];
            }

            return createElement('i', data);
        }
    }
</script>
