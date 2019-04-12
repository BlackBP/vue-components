import _ from 'lodash'
import Vue from 'vue'

// View
import App from './views/App.vue'

// Components
import {
    Btn,
    BtnGroup,
    Checkbox,
    Chip,
    Icon,
    IconBtn,
    Loading,
    Modal,
    Radio,
    Select,
    Switcher,
    TextArea,
    TextInput
} from "./components";

Vue.config.productionTip = false;

Vue.component('c-btn', Btn);
Vue.component('c-btn-group', BtnGroup);
Vue.component('c-checkbox', Checkbox);
Vue.component('c-chip', Chip);
Vue.component('c-icon', Icon);
Vue.component('c-icon-btn', IconBtn);
Vue.component('c-loading', Loading);
Vue.component('c-modal', Modal);
Vue.component('c-radio', Radio);
Vue.component('c-select', Select);
Vue.component('c-switch', Switcher);
Vue.component('c-textarea', TextArea);
Vue.component('c-text-input', TextInput);

new Vue({
    render: h => h(App)
}).$mount('#app');
