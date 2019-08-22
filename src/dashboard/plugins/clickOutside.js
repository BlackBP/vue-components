import Vue from 'vue'

Vue.use({
    install($vm, options = {}) {
        const KEY = '__vueClickOutside__';

        /**
         *
         * @param {HTMLElement} rootEl
         * @param {HTMLElement} eventTarget
         * @param {Function} callback
         */
        function handler(rootEl, eventTarget, callback = () => {}) {
            const isChild = rootEl.contains(eventTarget);
            const isSelf = eventTarget === rootEl;

            if(!isChild && !isSelf) {
                callback();
            }
        }

        Vue.directive('click-outside', {
            bind(rootEl, binding, vNode) {
                const callback = typeof binding.value === 'function' ? binding.value : () => {};

                rootEl[KEY] = {
                    listener: event => {
                        handler(rootEl, event.target, callback);
                    }
                };

                document.addEventListener('click', rootEl[KEY]['listener'])
            },
            unbind(rootEl, binding, vNode) {
                document.removeEventListener('click', rootEl[KEY]['listener'])
            }
        })
    }
});