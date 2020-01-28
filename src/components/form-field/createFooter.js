/**
 *
 * @param {Function} createElement
 * @param {String} className
 * @param {Object} props
 * @param {Boolean} props.hasError
 * @param {Boolean} props.hasHelper
 * @param {Boolean} props.hasCounter
 * @param {Array} children
 * @return {null|VNode}
 */
const createFooter = (createElement, className, props, children) => {
    const {
        hasError = false,
        hasHelper = false,
        hasCounter = false,
    } = props;

    if (hasError || hasHelper || hasCounter) {
        return createElement('div', {
            class: className
        }, children)
    } else {
        return null
    }
};

export default createFooter