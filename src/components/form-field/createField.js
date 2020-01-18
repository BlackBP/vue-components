import _ from 'lodash'

/**
 *
 * @param {Function} createElement
 * @param {String} className
 * @param {Object} props
 * @param {Function} scopedSlot
 * @return {null|VNode}
 */
const createField = (createElement, className, props = {}, scopedSlot) => {
    if(_.isFunction(scopedSlot)) {
        return createElement('div', {
            class: className
        }, scopedSlot(props))
    } else {
        return null
    }
};

export default createField