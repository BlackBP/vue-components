import _ from 'lodash'

/**
 *
 * @param {Function} createElement
 * @param {String} className
 * @param {Object} props
 * @param {String} props.helperText
 * @param {String} props.errorText
 * @return {null|*}
 */
const createHelper = (createElement, className, props = {}) => {
    const {
        helperText,
        errorText
    } = props;
    const data = {
        class: className
    };

    if(_.size(errorText) > 0) {
        return createElement('div', data, errorText)
    }

    if(_.size(helperText) > 0) {
        return createElement('div', data, helperText)
    } else {
        return null;
    }
};

export default createHelper