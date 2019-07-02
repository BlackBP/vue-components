import Vue from 'vue'
import Vuex from 'vuex'
import {MUTATION, STATE, GETTER} from './store-maps'

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        [STATE.drawer]: {
            isOpen: false
        }
    },
    getters: {
        [GETTER.drawerIsOpen](state) {
            return state[STATE.drawer].isOpen
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
