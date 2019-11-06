<script>
    import {getConfig} from '../../config';
    import {createProp} from "../../utils/component";

    export default {
        name: "c-icon",
        functional: true,
        props: {
            tag: createProp(String, 'i'),
            name: createProp(String, 'dots-horizontal', true),
            size: createProp(String, ''),
            vendorPrefix: createProp(String, 'mdi mdi-')
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

            if(propSize) {
                data.style = [data.style, {
                    fontSize: propSize
                }];
            }

            return createElement(propTag, data);
        }
    }
</script>
