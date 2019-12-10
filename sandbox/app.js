import Vue from 'vue'
import Components, {NotificationPlugin} from '../src/index'
import AppView from './App.vue'

Vue.use(NotificationPlugin);
Vue.use(Components);

new Vue({
    el: '#app',
    render: h => h(AppView)
});