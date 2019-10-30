import PluginVue from 'rollup-plugin-vue';
import PluginResolve from 'rollup-plugin-node-resolve';
import PluginLocalResolve from 'rollup-plugin-local-resolve';
import PluginCommonjs from 'rollup-plugin-commonjs';
import PluginCopy from 'rollup-plugin-copy';
import {terser as PluginTerser} from 'rollup-plugin-terser';

const CONFIG = {
    input: './src/index.js',
    output: {
        fileName: 'lib',
        dir: '/dist',
    },
    plugins: [
        PluginResolve(),
        PluginLocalResolve(),
        PluginCommonjs(),
        PluginVue(),
        PluginTerser()
    ],
    pluginOpts: {
        copy: {
            targets: [
                {
                    src: './src/styles',
                    dest: './dist',
                    rename: 'sass'
                }
            ]
        }
    },

    /**
     *
     * @param postfix
     * @return {string}
     */
    getFileName(postfix = '') {
        postfix = typeof postfix === 'string' && postfix !== '' ? `.${postfix}` : '';

        return `${__dirname}/${this.output.dir}/${this.output.fileName}${postfix}.js`
    }
};

export default [

    // ESM
    {
        input: CONFIG.input,
        output: {
            file: CONFIG.getFileName('esm'),
            format: 'esm'
        },
        plugins: CONFIG.plugins,
    },

    // CommonJS
    {
        input: CONFIG.input,
        output: {
            file: CONFIG.getFileName('common'),
            format: 'cjs',
            exports: 'named'
        },
        plugins: [
            ...CONFIG.plugins,
            PluginCopy(CONFIG.pluginOpts.copy)
        ]
    },
];
