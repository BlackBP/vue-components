import {isFunction} from "./helpers";

/**
 *
 * @param {*} type
 * @param {*} defaultValue
 * @param {Boolean} [required]
 * @param {Function} [validator]
 * @return {{type: *, default: *, required: *, [validator]: *}}
 */
export const createProp = (type = null, defaultValue = null, required = false, validator = null) => {
    const prop = {
        type,
        default: defaultValue,
        required
    };

    if(isFunction(validator)) {
        prop.validator = validator;
    }

    return prop
};