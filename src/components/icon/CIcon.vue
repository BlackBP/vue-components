<script lang="ts">
    import Vue, {CreateElement, RenderContext, VNode} from 'vue'

    type IconProps = {
        tag: string
        name: string
        size: string
        vendorPrefix: string
    }

    export default Vue.extend({
        name: "c-icon",
        functional: true,
        props: {
            tag: {
                type: String,
                default: 'i',
            },
            name: {
                type: String,
                default: '',
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
        render(createElement: CreateElement, {data = {}, props = <IconProps>{}}: RenderContext<IconProps>): VNode {
            const className = 'c-icon';

            data.class = [data.class, className, `${props.vendorPrefix}${props.name}`];

            if (props.size) {
                data.style = [data.style, {
                    fontSize: props.size
                }];
            }

            return createElement(props.tag, data);
        }
    });
</script>