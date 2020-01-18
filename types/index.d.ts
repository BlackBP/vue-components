import Vue from 'vue'
import * as VComponents from '../src/components'

export class VComponent extends Vue {
    [key: string]: any
}
export * from '../src/components'
export default VComponents