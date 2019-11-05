import Alert from './Alert.vue';

export const AlertPlugin = (Vue, config) => {
    const AlertClass = Vue.extend(Alert);
    const Instance = new AlertClass({
        el: document.createElement('div'),
        beforeDestroy() {
            document.body.removeChild(this.$el)
        }
    });

    document.body.appendChild(Instance.$el);

    Vue.prototype.$alert = {};
};