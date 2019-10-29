import Vue from 'vue'
import Vuex from 'vuex'
import {MUTATION, GETTER} from './store-maps'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        drawer: {
            isOpen: false
        }
    },
    getters: {
        [GETTER.drawerIsOpen](state) {
            return state.drawer.isOpen
        }
    },
    mutations: {
        [MUTATION.toggleDrawer](state) {
            state.drawer.isOpen = !state.drawer.isOpen;
        },
        [MUTATION.openDrawer](state) {
            state.drawer.isOpen = true
        },
        [MUTATION.closeDrawer](state) {
            state.drawer.isOpen = false
        }
    }
})
