import Vue from 'vue';
import Meta from '../router/meta';

Vue.use({
    install(vue, options) {
        vue.prototype.$appRoute = Meta;
    }
});
