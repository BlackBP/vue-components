/**
 *
 * @typedef {{}} ComponentsConfig
 */
const Config = {

    /**
     * Register all components or not
     */
    includeAll: true,

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

export default Config;