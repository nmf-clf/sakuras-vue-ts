/*
 * @Author: niumengfei
 * @Date: 2022-11-07 15:18:04
 * @LastEditors: niumengfei 870424431@qq.com
 * @LastEditTime: 2023-04-04 15:01:39
 */
const { defineConfig } = require('@vue/cli-service')
const webpack = require('webpack')
/* 配置按需加载 */
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')
// const DefineOptions = require('unplugin-vue-define-options/webpack');
// const VueMacros = require('unplugin-vue-macros/webpack');
// console.log('xxxxxxxxxxx', DefineOptions);
// const  ElementPlus  = require('unplugin-element-plus')
/* 配置@路径 */
const path = require('path')
const pk = require('./package.json')
/* 
    process.env：cross-env 插件可以将 scripts 命令注入到此对象里
*/
module.exports = defineConfig({
    publicPath: './', //影响资源加载的公共路径 配置./可以打包后本地访问
    transpileDependencies: true, //转译包管理文件,可传数组
    lintOnSave: false,  //关闭语法检查 防止1.组件名必须驼峰式 2.vue3中data和setup不能共用属性
    // productionSourceMap: true, //生产环境是否生成 sourceMap 文件
    configureWebpack: { /* 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。 */
        name: 'sakuras',
        resolve: {
        alias: {
            '@': path.join(__dirname, 'src'), //resolve('src')
        },
        // fallback: {
        //   http: require.resolve("stream-http"),
        // },
        },
        plugins: [ 
            // require('unplugin-vue-define-options/webpack')(),
            AutoImport({  resolvers: [ElementPlusResolver()] }), //配置组件库按需引入(官方) 从13MB减少到7MB
            Components({ resolvers: [ElementPlusResolver()] }), //配置组件库按需引入(官方)clear
            new webpack.DefinePlugin({ ProcessEnv: JSON.stringify({ ...process.env, ...pk }) }),
            // ElementPlus(),
        ],
    },
    chainWebpack: config => {
        config
        .plugin('html')
        .tap(args => {
            args[0].title = '夜语清梦'
            return args
        })
        /* config.module
        .rule('md')
        .test(/\.md$/)
        .use('html-loader')
        .loader('html-loader')
        .end()
        
        .use('markdown-loader')
        .loader('markdown-loader')
        .end() */
    },
    devServer: {
        // open: true, //自动打开浏览器
        // host: 'localhost', //主机名
        host: '0.0.0.0', //局域网访问
        port: '9001', //端口号
        // autoOpenBrowser: true, 
        proxy:{
            '/sakuras-api': { //连接远程后端服务时使用此代理
                target: process.env?.apidev ? 'http://localhost:5555/' : 'https://sakuras.group/', // apidev 时连接本地node启动的后端服务
                changeOrigin: true,
                /* pathRewrite: {
                    '^/local-api': "/sakuras-api"
                } */
            },
        }
    }
})