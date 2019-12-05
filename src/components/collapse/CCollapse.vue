<script>
    import CCollapseTransition from './CCollapseTransition.vue';

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

            return createElement(CCollapseTransition, [
                visible ? children : null
            ])
        }
    }
</script>
