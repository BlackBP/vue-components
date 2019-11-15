import {get} from "../utils/helpers";
import {createProp} from "../utils/component";

export const MODIFIERS_MAP = {
    transparent: 'is-transparent',
    elevated: 'is-elevated',
    bordered: 'is-bordered',
    block: 'is-block',
};

export const SIZES_MAP = {
    xs: 'is-small',
    md: 'is-medium',
    lg: 'is-large'
};

/**
 *
 * @param size
 * @returns {String}
 */
export const getSizeClassName = (size = '') => {
    return get(SIZES_MAP, size, '')
};

/**
 *
 * @param className
 * @param color
 * @return {String}
 */
export const getColorClassName = (className = '', color = '') => {
    if(color !== '') {
        return `${className}-${color}`
    }

    return ''
};

export default {
    props: {
        tag: createProp(String, 'button'),
        type: createProp([String, Boolean], false),
        color: createProp(String, ''),
        size: createProp(String, ''),
        bordered: createProp(Boolean, false),
        elevated: createProp(Boolean, false),
        transparent: createProp(Boolean, false),
        disabled: createProp(Boolean, false),
    }
}