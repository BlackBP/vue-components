import Vue from "vue";

import uniqueId from "../utils/uniqueId";

Vue.use({
    install($vm, options) {

        /**
         *
         * @type {uniqueId}
         */
        $vm.prototype.$uuId = uniqueId;
    }
});