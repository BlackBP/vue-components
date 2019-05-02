<script>
    export default {
        name: "c-loading",
        functional: true,
        props: {
            text: {
                type: String,
                default: 'Загрузка...',
                required: false
            },
            elevated: {
                type: Boolean,
                default: false,
                required: false
            },
            dense: {
                type: Boolean,
                default: false,
                required: false
            }
        },
        render(createElement, {props, data}) {
            let baseClass = 'c-loading';
            let children = [
                createElement('div', {class: `${baseClass}__spinner`})
            ];

            if (props.text) {
                children.push(createElement('div', {
                    class: `${baseClass}__text`
                }, props.text))
            }

            data.class = [data.class, {
                [`${baseClass}`]: true,
                [`${baseClass}--elevated`]: props.elevated,
                [`${baseClass}--dense`]: props.dense
            }];

            return createElement('div', data, children);
        }
    }
</script>
