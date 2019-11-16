import PluginVue from 'rollup-plugin-vue';
import PluginResolve from 'rollup-plugin-node-resolve';
import PluginLocalResolve from 'rollup-plugin-local-resolve';
import PluginCommonjs from 'rollup-plugin-commonjs';
import {terser as PluginTerser} from 'rollup-plugin-terser';

export default {
    input: './docs/src/app.js',
    output: {
        file: './docs/public/app.min.js',
        format: 'iife'
    },
    plugins: [
        PluginResolve(),
        PluginLocalResolve(),
        PluginCommonjs(),
        PluginVue(),
        PluginTerser()
    ],
}
