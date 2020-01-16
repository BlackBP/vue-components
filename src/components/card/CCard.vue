<script lang="ts">
    import Vue, {CreateElement, RenderContext, VNode} from 'vue'

    type CardProps = {
        tag: string
    }

    export default Vue.extend({
        name: "c-card",
        functional: true,
        props: {
            tag: {
                type: String,
                default: 'div'
            }
        },
        render(createElement: CreateElement, {data = {}, props = <CardProps>{}, children}: RenderContext<CardProps>): VNode {
            const className = 'c-card';

            data.class = [data.class, className];

            return createElement(props.tag, data, children)
        }
    })
</script>
