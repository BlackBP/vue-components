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
        render(createElement, context) {
            let props = context.props;
            let baseClass = 'c-loading';
            let data = {
                class: {
                    [`${baseClass}`]: true,
                    [`${baseClass}--elevated`]: props.elevated,
                    [`${baseClass}--dense`]: props.dense
                }
            };
            let children = [
                createElement('div', {class: `${baseClass}__spinner`})
            ];

            if (props.text) {
                children.push(createElement('div', {
                    class: `${baseClass}__text`
                }, props.text))
            }

            data = _.defaultsDeep(data, context.data);

            return createElement('div', data, children);
        }
    }
</script>
