/**
 *
 * @param {Function} createElement
 * @param {String} className
 * @param {Object} props
 * @param {Number} props.count
 * @param {String|Number} props.countMax
 * @param {Boolean} props.showCount
 * @return {null|VNode}
 */
const createCounter = (createElement, className, props) => {
    const {
        count,
        countMax,
        showCount
    } = props;

    if (showCount) {
        return createElement('div', {
            class: className,
        }, `${count}/${countMax}`)
    } else {
        return null;
    }
};

export default createCounter