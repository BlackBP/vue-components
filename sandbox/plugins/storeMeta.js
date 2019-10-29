import Vue from 'vue';
import {MUTATION, GETTER} from '../store/store-maps';

Vue.prototype.$storeMeta = {
    mutation: MUTATION,
    getter: GETTER
};
