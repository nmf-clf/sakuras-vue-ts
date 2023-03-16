/*
 * @Author: niumengfei
 * @Date: 2022-11-07 15:18:04
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-14 10:43:06
 */
import { createStore } from 'vuex';
import createPersistedState from "vuex-persistedstate"; //vuex状态持久化
import getters from './getters';

const files = require.context('./modules', false, /\.ts$/);
const modules = {};

files.keys().forEach((key) =>  modules[key.replace(/(\.\/|\.ts)/g, '')] = files(key).default ); 

Object.keys(modules).forEach((key) => modules[key]['namespaced'] = true ); //开启命名空间

// 创建一个新的 store 实例
export default createStore({
    // state() { return {} },
    // mutations: {},
    // actions: {},
    modules,
    getters,
    /* vuex数据持久化配置 */
    plugins: [
        createPersistedState({
            storage: window.localStorage, //存储方: localStorage | sessionStorage | cookies
            // 存储的 key 的key值
            key: "userInfo",
            reducer(state) { //render错误修改
                // 要存储的数据：本项目采用es6扩展运算符的方式存储了state中所有的数据
                return { ...state.user }
            }
        })
    ]
})
