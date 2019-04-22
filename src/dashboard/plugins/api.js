import Vue from 'vue';

import product from '../api/product';
import productCategory from '../api/productCategory';
import productGroup from '../api/productGroup';

Vue.use({
    install(vue, options) {
        vue.prototype.$api = {
            product,
            productCategory,
            productGroup
        };
    }
});
