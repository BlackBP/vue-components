<script>
    import {getConfig} from '../../config';

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
            },
        },
        render(createElement, {data, props, parent}) {
            const baseClassName = 'c-icon';
            const config = getConfig(parent, 'icon');
            const {
                tag: propTag,
                name: propName,
                size: propSize,
                vendorPrefix: propVendorPrefix,
            } = props;
            const vendorPrefix = config.vendorPrefix ? config.vendorPrefix : propVendorPrefix;

            data.class = [data.class, baseClassName, `${vendorPrefix}${propName}`];

            if (propSize) {
                data.style = [data.style, {
                    fontSize: propSize
                }];
            }

            return createElement(propTag, data);
        }
    }
</script>
