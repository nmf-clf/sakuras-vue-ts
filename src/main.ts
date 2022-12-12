/*
 * @Author: niumengfei
 * @Date: 2022-11-07 15:18:04
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-12 13:29:33
 */
import { createApp } from 'vue'
import App from './App.vue' //引入跟组件
import router from './router' // 引入路由实例对象
import store from './store' //引入vuex实例对象
import plusIcons from './elementIcon' //按需引入icon组件
import 'animate.css';
import './assets/common.less';
import 'element-plus/es/components/message/style/css' //按需引入某个样式
// import ElementPlus from 'element-plus' //完整引入组件库
// import 'element-plus/dist/index.css' //完整引入组件库样式

const app = createApp(App) //创建并挂载根实例 //createApp(App).mount('#app') //原脚手架写法
//坑点： 通过此方式可以全局通过标签使用 而不可以通过表达式使用，且如果使用表达式方式需要再组件内import 同时还需要再入口处增加 icon 的图标库样式
plusIcons.map(component => app.component(component.name, component) ) //注册element-plus图标

app.use(router)
app.use(store) // 将 store 实例作为插件安装
// app.use(ElementPlus) //完整使用组件库 
app.mount('#app')