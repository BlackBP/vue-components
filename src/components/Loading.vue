<script>
    export default {
        name: "c-loading",
        functional: true,
        props: {
            text: {
                type: String,
                default: 'Загрузка...',
            },
            elevated: {
                type: Boolean,
                default: false,
            },
            dense: {
                type: Boolean,
                default: false,
            }
        },
        render(createElement, {props, data, parent}) {
            const config = parent.$bbpComponentsConfig.loading;

            let baseClass = 'c-loading';
            let content = [];
            let spinner = createElement('div', {class: `${baseClass}__spinner`});
            let {
                spinner: customSpinner,
                text
            } = config;

            if(customSpinner) {
                spinner = createElement('div', {class: `${baseClass}__spinner`}, [
                    createElement('img', {
                        attrs: {
                            src: customSpinner
                        }
                    })
                ]);
            }

            content.push(spinner);

            if (props.text) {
                content.push(createElement('div', {
                    class: `${baseClass}__text`
                }, props.text))
            }

            data.class = [data.class, {
                [`${baseClass}`]: true,
                [`--elevated`]: props.elevated,
                [`--dense`]: props.dense,
                [`--default`]: !customSpinner,
            }];

            return createElement('div', data, content);
        }
    }
</script>
