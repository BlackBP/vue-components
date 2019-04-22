import Vue from 'vue';
import {META} from '../router/routes';

Vue.use({
    install(vue, options) {
        vue.prototype.$appRoute = META;
    }
});
