import Vue from 'vue';
import Components, {NotificationPlugin} from '../../src/index';

Vue.use(NotificationPlugin, {
    position: 'bottom-left'
});
Vue.use(Components);