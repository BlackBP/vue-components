import Vue from 'vue'
import Components from '../../components.js'
import TetrisLoader from "../components/LoaderTetris";

Vue.use(Components, {
    loading: {
        spinner: TetrisLoader
    }
});