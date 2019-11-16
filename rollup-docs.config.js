import PluginVue from 'rollup-plugin-vue';
import PluginNodeResolve from 'rollup-plugin-node-resolve';
import PluginLocalResolve from 'rollup-plugin-local-resolve';
import PluginCommonjs from 'rollup-plugin-commonjs';
import PluginNodeGlobals from 'rollup-plugin-node-globals';
import PluginReplace from 'rollup-plugin-replace';
import {terser as PluginTerser} from 'rollup-plugin-terser';

export default {
    input: 'docs/src/app.js',
    output: {
        file: 'docs/public/app.min.js',
        format: 'iife',
        globals: {
        }
    },
    plugins: [
        PluginVue(),
        PluginNodeResolve(),
        PluginLocalResolve(),
        PluginCommonjs(),
        PluginReplace({
            'process.env.NODE_ENV': JSON.stringify('development'),
            'process.env.VUE_ENV': JSON.stringify('browser')
        }),
        // PluginNodeGlobals(),
        // PluginTerser()
    ],
}
