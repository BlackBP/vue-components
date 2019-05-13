import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        drawer: {
            isOpen: false
        }
    },
    mutations: {
        toggleDrawer(state, newState) {
            state.drawer.isOpen = !state.drawer.isOpen;
        }
    }
})
