const path = require('path')
const { name } = require('./package.json')
module.exports = {
    devServer: {
        port: 8091,
        // 允许被主应用跨域fetch请求到
        disableHostCheck: true,
        //  配置跨域请求头，解决开发环境的跨域问题
        headers: {
            'Access-Control-Allow-Origin': '*'
        }
    },
    configureWebpack: {
        resolve: {
            alias: {
                "@": path.resolve(__dirname, 'src')
            }
        },
        output: {
            //  // 微应用的包名，这里与主应用中注册的微应用名称一致
            library: `${name}-[name]`,
            // 把子应用打包成umd库格式
            libraryTarget: 'umd',
            // 按需加载相关
            jsonpFunction: `webpackJsonp_${name}`
        }
    }
}