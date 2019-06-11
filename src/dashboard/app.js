import _ from 'lodash';
import Vue from 'vue';

// Vuex store & vue router
import store from './store';
import router from './router';

// Plugins
import './plugins/routes';

// View
import App from './views/App.vue';

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
