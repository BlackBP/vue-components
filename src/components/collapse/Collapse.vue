<script>
    import TransitionCollapse from './Transition.vue';

    export default {
        name: "c-collapse",
        functional: true,
        props: {
            visible: {
                type: Boolean,
                default: false
            },
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
