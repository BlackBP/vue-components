import {get} from "../utils/helpers";

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
 * @param color
 * @return {String}
 */
export const getColorClassName = (color = '') => {
    return color !== '' ? `is-${color}` : ''
};

export default {
    props: {
        tag: {
            type: String,
            default: 'button'
        },
        type: {
            type: [String, Boolean],
            default: false
        },
        color: {
            type: String,
            default: ''
        },
        size: {
            type: String,
            default: ''
        },
        bordered: {
            type: Boolean,
            default: false
        },
        elevated: {
            type: Boolean,
            default: false
        },
        transparent: {
            type: Boolean,
            default: false
        },
        disabled: {
            type: Boolean,
            default: false
        },
    }
}