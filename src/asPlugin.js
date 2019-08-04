import Vue from 'vue'
import Components from './components.js'

export default {
    install($vue, options = {}) {

        Object.keys(Components).forEach(name => {
            Vue.component(name, Components[name]);
        });

    }
}