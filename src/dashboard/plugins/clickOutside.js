import Vue from 'vue'

Vue.use({
    install($vm, options = {}) {
        Vue.directive('click-outside')
    }
});