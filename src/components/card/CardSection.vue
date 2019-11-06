<script>
    import {createProp} from "../../utils/component";

    export default {
        name: "c-card-section",
        functional: true,
        props: {
            tag: createProp(String, 'div')
        },
        render(createElement, {data, children, props}) {
            const className = 'c-card-section';

            data.class = [data.class, className];

            return createElement(props.tag, data, children)
        }
    }
</script>
