import {
    defaultsDeep,
    get
} from './utils/helpers';

const CONFIG_KEY = '$componentsConfig';

/**
 *
 * @typedef {{}} ComponentsConfig
 */
const DefaultConfig = {
    /**
     * Icon.vue
     * @memberOf ComponentsConfig
     */
    icon: {
        vendorPrefix: 'mdi mdi-'
    },

    /**
     * Loading.vue
     * @memberOf ComponentsConfig
     */
    loading: {
        spinner: '',
        defaultText: 'Загрузка...'
    },

    /**
     * TextInput.vue
     * @memberOf ComponentsConfig
     */
    textInput: {
        /**
         *
         * @param $vm
         * @param mask
         * @param hasMask
         * @param fieldRef
         */
        mounted($vm, mask, hasMask, fieldRef) {
            // Your code
        },

        /**
         *
         * @param $vm
         * @param mask
         * @param hasMask
         * @param fieldRef
         */
        beforeDestroy($vm, mask, hasMask, fieldRef) {
            // Your code
        }
    }
};

/**
 *
 * @param Vue
 * @param config
 */
export function setConfig(Vue, config) {
    Vue.prototype[CONFIG_KEY] = defaultsDeep(config, DefaultConfig);
}


/**
 *
 * @param {Object} context
 * @param {String} [path]
 * @return {*}
 */
export function getConfig(context = {}, path = '') {
    let config = get(context, CONFIG_KEY, {});
    return get(config, path, {});
}