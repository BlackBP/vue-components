import {pluginFactory} from '../../install';
import NotificationList from './NotificationList.vue';

export const NotificationPlugin = pluginFactory((Vue, options = {}) => {
    const {
        position = ''
    } = options;

    const ViewClass = Vue.extend(NotificationList);
    const ViewInstance = new ViewClass({
        el: document.createElement('div'),
        propsData: {
            position
        },
        beforeDestroy() {
            document.body.removeChild(this.$el)
        }
    });

    document.body.appendChild(ViewInstance.$el);

    Vue.prototype.$notify = {
        add: (message, config) => {
            ViewInstance.add({
                message,
                ...config
            })
        }
    };
});