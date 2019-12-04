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
            label: propLabel,
            labelFor: propLabelFor
        } = props;

        if (propLabel === '' || propLabelFor === '') {
            return null
        }

        return createElement('label', {
            class: `${ClassName}__label`,
            attrs: {
                for: propLabelFor
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