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
                data: `@import "@/assets/styles/base/_variables.scss"; @import "@/assets/styles/base/_mixins.scss";`
            }
        }
    }
};
