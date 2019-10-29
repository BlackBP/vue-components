import Vue from 'vue'

// Vuex store & vue router
import store from './store'
import router from './router'

// Plugins
import './plugins/clickOutside'
import './plugins/components'
import './plugins/notify'
import './plugins/routes'
import './plugins/storeMeta'

// View
import App from './views/App.vue'

Vue.config.productionTip = false;

new Vue({
    store,
    router,
    render: h => h(App)
}).$mount('#app');
