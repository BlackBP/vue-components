<script lang="ts">
    import {CreateElement, PropOptions, RenderContext, VNode, VNodeData} from 'vue'

    type CardProps = {
        tag: string
    }

    export default {
        name: "c-card",
        functional: true,
        props: {
            tag: <PropOptions>{
                type: String,
                default: 'div'
            }
        },
        render(createElement: CreateElement, {data = <VNodeData>{}, props = <CardProps>{}, children}: RenderContext<CardProps>): VNode {
            const className = 'c-card';

            data.class = [data.class, className];

            return createElement(props.tag, data, children)
        }
    }
</script>
