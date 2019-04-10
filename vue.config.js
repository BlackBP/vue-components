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
                data: `@import "@/styles/_variables.scss"; @import "@/styles/_mixins.scss";`
            }
        }
    }
};
