import { pluginFactory } from '../../install'
import NotificationList from './NotificationList.vue'

export const NotificationPlugin = pluginFactory((Vue, options = {}) => {
  const {
    position: optionPosition = ''
  } = options

  const ViewClass = Vue.extend(NotificationList)
  const ViewInstance = new ViewClass({
    el: document.createElement('div'),
    name: 'NotificationApp',
    propsData: {
      position: optionPosition
    },
    beforeDestroy () {
      document.body.removeChild(this.$el)
    }
  })

  document.body.appendChild(ViewInstance.$el)

  Vue.prototype.$notify = {
    add: (message, config = {}) => {
      ViewInstance.add({
        message,
        ...config
      })
    },
    removeAll: () => {
      ViewInstance.removeAll()
    },
    setPosition: (value) => {
      ViewInstance.setPosition(value)
    }
  }
})
