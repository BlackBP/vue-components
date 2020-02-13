import CBtn from './CBtn.vue'
import { pluginFactory } from '../../install'

const CBtnPlugin = pluginFactory({
  components: {
    CBtn
  }
})

export { CBtn, CBtnPlugin }
