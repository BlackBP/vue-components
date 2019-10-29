import Vue from 'vue'
import ServiceNotify from '../components/ServiceNotify'

const ServiceNotifyConstructor = Vue.extend(ServiceNotify);

Vue.use({
    install($vm, options) {
        const $instance = new ServiceNotifyConstructor({
            el: document.createElement('div'),
            beforeDestroy() {
                document.body.removeChild(this.$el)
            }
        });

        document.body.appendChild($instance.$el);

        $vm.prototype.$notify = {
            /**
             *
             * @type {String} message
             * @type {Object} [config]
             * @type {Number} [config.title]
             * @type {Number} [config.color]
             * @type {Number} [config.duration]
             * @type {function} [config.onClick]
             * @type {function} [config.onClose]
             */
            add(message, config = {}) {
                $instance.add({
                    message,
                    ...config
                });
            }
        };
    }
});