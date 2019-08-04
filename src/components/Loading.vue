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
        render(createElement, {props, data}) {
            let baseClass = 'c-loading';
            let content = [
                createElement('div', {class: `${baseClass}__spinner`})
            ];

            if (props.text) {
                content.push(createElement('div', {
                    class: `${baseClass}__text`
                }, props.text))
            }

            data.class = [data.class, {
                [`${baseClass}`]: true,
                [`${baseClass}--elevated`]: props.elevated,
                [`${baseClass}--dense`]: props.dense
            }];

            return createElement('div', data, content);
        }
    }
</script>
