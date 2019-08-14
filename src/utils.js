import _ from 'lodash';

/**
 *
 * @param {*} value
 * @return {boolean}
 */
export function isEmptyString(value) {
    return _.isString(value) && value === ''
}

/**
 *
 * @param {Object} context
 * @param {String} [path]
 * @return {*}
 */
export function getConfig(context = {}, path = '') {
    let config = _.get(context, '$componentsConfig', {});
    return _.get(config, path, {});
}

export default {
    isEmptyString,
    getConfig,
}
