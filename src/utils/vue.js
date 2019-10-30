import _ from './index';

/**
 *
 * @param {Object} {components}
 * @returns {Function} plugin install function
 */
export const installFactory = ({components}) => {
    return {
        install(Vue, config) {
            registerComponents(Vue, components)
        }
    }
};

/**
 *
 * @param {Object} Vue
 * @param {String} name
 * @param {Object} definition
 */
export const registerComponent = (Vue, name, definition) => {
    if(Vue && name && definition) {
        Vue.component(name, definition)
    }
};

/**
 *
 * @param {Object} Vue
 * @param {Object} components
 */
export const registerComponents = (Vue, components = {}) => {
    for (const component in components) {
        registerComponent(Vue, component, components[component])
    }
};

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
