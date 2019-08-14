import _ from 'lodash';

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
    getConfig,
}
