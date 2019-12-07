<script>
    const ClassName = 'c-form-field';

    /**
     *
     * @param createElement
     * @param props
     * @param slots
     * @return {null|VNode}
     */
    const createLabel = (createElement, props, slots) => {
        const {
            label: propLabel = '',
            labelFor: propLabelFor = ''
        } = props;
        const hasLabelFor = propLabelFor === '';
        const tag = hasLabelFor  ? 'div' : 'label';

        if (propLabel === '') {
            return null
        }

        return createElement(tag, {
            class: `${ClassName}__label`,
            attrs: {
                for: hasLabelFor ? propLabelFor : false
            }
        }, propLabel)
    };

    export default {
        name: "c-form-field",
        functional: true,
        props: {
            label: {
                type: String,
                default: '',
            },
            labelFor: {
                type: String,
                default: '',
            }
        },
        render(createElement, {data, props, slots, children}) {
            slots = slots();
            data.class = [data.class, ClassName];

            return createElement('div', data, [
                createLabel(createElement, props, slots),
                children
            ])
        }
    }
</script>