import PluginVue from 'rollup-plugin-vue'
import PluginResolve from 'rollup-plugin-node-resolve'
import PluginLocalResolve from 'rollup-plugin-local-resolve'
import PluginCommonjs from 'rollup-plugin-commonjs'
import PluginCopy from 'rollup-plugin-copy'
import {terser as PluginTerser} from "rollup-plugin-terser"

export default {
    input: './src/components.js',
    output: {
        dir: './dist',
        format: 'esm'
    },
    plugins: [
        PluginResolve(),
        PluginLocalResolve(),
        PluginCommonjs(),
        PluginVue(),
        PluginTerser(),
        PluginCopy({
            targets: [
                {src: './src/styles', dest: './dist', rename: 'sass'}
            ]
        })
    ]
};
