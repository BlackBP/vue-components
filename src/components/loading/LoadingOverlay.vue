<script>
    import CLoading from "./Loading.vue";

    export default {
        name: "c-loading-overlay",
        functional: true,
        props: {
            loading: {
                type: Boolean,
                default: false,
                required: true
            },
            loadingText: {
                type: String,
                default: 'Загрузка...',
            },
            loadingDense: {
                type: Boolean,
                default: false,
            }
        },
        render(createElement, {data, props, children}) {

            const className = 'c-loading-overlay';
            const {
                loading: propLoading,
                loadingText: propLoadingText,
                loadingDense: propLoadingDense,
            } = props;

            const ElSpinner = propLoading ? createElement('div', {
                class: `${className}__spinner`
            }, [
                createElement(CLoading, {
                    props: {
                        text: propLoadingText,
                        elevated: true,
                        dense: propLoadingDense
                    }
                })
            ]) : null;

            data.class = [data.class, className];

            return createElement('div', data, [
                ElSpinner,
                children
            ])
        }
    }
</script>
