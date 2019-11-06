import {
    setConfig
} from './config';

/**
 *
 * @param {Object} {components: Object}
 * @return {Function} plugin install function
 */
export const installFactory = ({components}) => {
    return pluginFactory((Vue, config) => {
        setConfig(Vue, config);
        registerComponents(Vue, components);
    })
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
 * @param {Object} Vue
 * @param {String} name
 * @param {Object} definition
 */
export const registerComponent = (Vue, name, definition) => {
    if (Vue && name && definition) {
        Vue.component(name, definition)
    }
};

/**
 *
 * @param {Function} install
 * @return {{install: Function}}
 */
export function pluginFactory(install) {
    return {
        install
    }
}