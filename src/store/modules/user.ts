/*
 * @Author: niumengfei
 * @Date: 2022-12-12 12:55:25
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-12 19:12:38
 */
interface StateType {
    screenWidth: number;
    screenHeight: number;
    username: string
}

const _u = localStorage.getItem('userInfo') || '';
const userInfo = _u ? JSON.parse(_u) : {};

export default {
    state: (): StateType => {
        return userInfo || {
            screenWidth: document.documentElement.clientWidth,
            screenHeight: document.documentElement.clientHeight,
            // userInfo: {
            username: ''
            // }, //用户信息
        }
    },
    actions: {
        setWidthAndHeight({ commit }: any, value: number[]){
            commit('SET_WIDTH_AND_Height', value)
        },
        saveUserInfo({ commit }: any, value: any){
            commit('SAVE_USER_INFO', value)
        }
    },
    mutations: {
        SET_WIDTH_AND_Height(state: any, value: number[]){
            state.screenWidth = value[0]
            state.screenHeight = value[1]
        },
        SAVE_USER_INFO(state: any, value: any){
            state.username = value.username
        }
    },
}
