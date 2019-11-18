<script>
    import TransitionCollapse from './Transition.vue';
    import {createProp} from "../../utils/component";

    export default {
        name: "c-collapse",
        functional: true,
        props: {
            visible: createProp(Boolean, false)
        },
        render(createElement, {props = {}, children = []}) {
            const {
                visible
            } = props;

            return createElement(TransitionCollapse, [
                visible ? children : null
            ])
        }
    }
</script>
