module.exports = {
    publicPath: '',
    outputDir: 'dist',
    assetsDir: undefined,
    runtimeCompiler: undefined,
    productionSourceMap: undefined,
    parallel: undefined,
    css: {
        modules: false,
        loaderOptions: {
            sass: {
                data: `@import "@/assets/styles/base/_mixins.scss"; @import "@/assets/styles/base/_variables.scss";`
            }
        }
    },
    filenameHashing: false,
    chainWebpack: config => {
        config.plugins.delete('html');
        config.plugins.delete('preload');
        config.plugins.delete('prefetch')
    }
};
