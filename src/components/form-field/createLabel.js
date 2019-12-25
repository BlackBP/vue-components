/**
 *
 * @param {Function} createElement
 * @param {String} className
 * @param {Object} props
 * @param {String} props.label
 * @param {String} props.labelFor
 * @return {null|VNode}
 */
const createLabel = (createElement, className, props = {}) => {
    const {
        label: propLabel = '',
        labelFor: propLabelFor = '',
    } = props;
    const hasLabel = propLabel !== '';
    const hasLabelFor = propLabelFor !== '';
    const labelTag = hasLabelFor ? 'label' : 'div';
    const data = {
        class: className,
        attrs: {
            for: hasLabelFor ? propLabelFor : false
        }
    };

    if (hasLabel) {
        return createElement(labelTag, data, propLabel)
    } else {
        return null
    }
};

export default createLabel