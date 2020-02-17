import * as Components from './components'
import { pluginFactory } from './install'

// The Components plugin
const VComponentsPlugin = pluginFactory({
  components: Components
});

// Components named export
export * from './components'

// Plugins
// export {AlertPlugin} from './plugins/alert';
// export {NotificationPlugin} from './plugins/notification'

// Default export is the Components plugin
export default VComponentsPlugin
