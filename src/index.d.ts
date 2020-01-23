import Vue from 'vue'
import * as VComponents from './components'

export class VComponent extends Vue {
    [key: string]: any
}

export * from './components'
export default VComponents