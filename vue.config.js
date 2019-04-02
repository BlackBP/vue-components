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
                data: `@import "@/styles/base/_variables.scss"; @import "@/styles/base/_mixins.scss";`
            }
        }
    }
};
