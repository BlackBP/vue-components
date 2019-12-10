<script>
    const ClassName = 'c-form-field';

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
        render(createElement, {data = {}, props = {}, slots, children}) {
            slots = slots();
            data.class = [data.class, ClassName];

            const {
                label: propLabel = '',
                labelFor: propLabelFor = ''
            } = props;
            const hasLabel = propLabel !== '';
            const hasLabelFor = propLabelFor !== '';
            const labelTag = hasLabelFor ? 'label' : 'div';

            return createElement('div', data, [
                hasLabel ? createElement(labelTag, {
                    class: `${ClassName}__label`,
                    attrs: {
                        for: hasLabelFor ? propLabelFor : false
                    }
                }, propLabel) : null,
                children
            ])
        }
    }
</script>