import Vue, { PluginFunction, PluginObject } from 'vue'

// PluginFunction options interface
export interface VConfigOptions {
    [key: string]: any
}

// Plugin definition
export interface VPlugin extends PluginObject<VConfigOptions> {
    install: PluginFunction<VConfigOptions>
}

// Component definition
export class VComponent extends Vue {
    [key: string]: any
}

// Components named export
export * from './components'

// The Components plugin
export declare const VComponentsPlugin: VPlugin

// Default export is the Components plugin
export default VComponentsPlugin
