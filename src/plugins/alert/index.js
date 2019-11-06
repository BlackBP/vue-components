import {pluginFactory} from '../../install';
import Alert from './Alert.vue';

export const AlertPlugin = pluginFactory((Vue, options = {}) => {
    const ViewClass = Vue.extend(Alert);
    const ViewInstance = new ViewClass({
        el: document.createElement('div'),
        beforeDestroy() {
            document.body.removeChild(this.$el)
        }
    });

    document.body.appendChild(ViewInstance.$el);

    Vue.prototype.$alert = {};
});