const { name } = require('./package.json')

module.exports = {
    devServer: {
        headers: {
            "Access-Control-Allow-Origin": "*",
        },
        port: 8093
    },
    // publicPath: '/',
    configureWebpack: {
        output: {
            // 把子应用打包成 umd 库格式
            // library: `${name}-[name]`,
            library: `vue-app-3`,
            libraryTarget: 'umd',
            jsonpFunction: `webpackJsonp_${name}`
        }
    }
}