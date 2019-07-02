import Vue from 'vue';
import {STATE, MUTATION, GETTER} from '../store/store-maps';

Vue.prototype.$storeMeta = {
    state: STATE,
    mutation: MUTATION,
    getter: GETTER
};
