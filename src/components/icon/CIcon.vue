<script lang="ts">
    import {CreateElement, PropOptions, RenderContext, VNode, VNodeData} from 'vue'
    import {IconProps} from "../../../types/icon";

    export default {
        name: "c-icon",
        functional: true,
        props: {
            tag: <PropOptions>{
                type: String,
                default: 'i',
            },
            name: <PropOptions>{
                type: String,
                default: '',
                required: true
            },
            size: <PropOptions>{
                type: String,
                default: ''
            },
            vendorPrefix: <PropOptions>{
                type: String,
                default: 'mdi mdi-'
            },
        },
        render(createElement: CreateElement, {data = <VNodeData>{}, props = <IconProps>{}}: RenderContext<IconProps>): VNode {
            const className = 'c-icon';

            data.class = [data.class, className, `${props.vendorPrefix}${props.name}`];

            if (props.size) {
                data.style = [data.style, {
                    fontSize: props.size
                }];
            }

            return createElement(props.tag, data);
        }
    }
</script>