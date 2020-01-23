import * as Components from './components'
import {installFactory} from './install'

// Components
export * from './components'

// Plugins
// export {AlertPlugin} from './plugins/alert';
export {NotificationPlugin} from './plugins/notification'

export default installFactory({
    components: Components
})