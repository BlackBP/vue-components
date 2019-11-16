import Vue from 'vue';
import {MUTATION, GETTER} from '../store/store-types';

Vue.prototype.$storeMeta = {
    mutation: MUTATION,
    getter: GETTER
};
