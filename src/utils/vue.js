import {
    setConfig
} from './config';

/**
 *
 * @param {Object} {components}
 * @returns {Function} plugin install function
 */
export function installFactory ({components}) {
    return {
        install(Vue, config) {
            setConfig(Vue, config);
            registerComponents(Vue, components);
        }
    }
}

/**
 *
 * @param {Object} Vue
 * @param {String} name
 * @param {Object} definition
 */
export function registerComponent (Vue, name, definition) {
    if(Vue && name && definition) {
        Vue.component(name, definition)
    }
}

/**
 *
 * @param {Object} Vue
 * @param {Object} components
 */
export function registerComponents (Vue, components = {}) {
    for (const component in components) {
        registerComponent(Vue, component, components[component])
    }
}
