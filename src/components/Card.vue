<script>
    import CLoading from "./Loading.vue";

    export default {
        name: "c-card",
        functional: true,
        components: {
            CLoading
        },
        props: {
            tag: {
                type: String,
                default: 'div'
            },
            loading: {
                type: Boolean,
                default: false
            }
        },
        render(createElement, {data, children, props}) {
            let baseClass = 'c-card';

            data.class = [data.class, baseClass];

            if(props.loading) {
                children = createElement(CLoading, {
                    style: {
                        margin: 'auto'
                    }
                })
            }

            return createElement(props.tag, data, children)
        }
    }
</script>
