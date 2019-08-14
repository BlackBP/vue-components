<script>
    import {getConfig} from '../utils'

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
        render(createElement, {data, props, parent}) {
            const baseClass = 'c-icon';
            const config = getConfig(parent, 'icon');
            const vendorPrefix = _.isString(props.vendorPrefix) && props.vendorPrefix !== '' ? config.vendorPrefix : props.vendorPrefix;

            data.class = [data.class, baseClass, `${vendorPrefix}${props.name}`];

            if(props.size) {
                data.style = [data.style, {
                    fontSize: props.size
                }];
            }

            return createElement(props.tag, data);
        }
    }
</script>
