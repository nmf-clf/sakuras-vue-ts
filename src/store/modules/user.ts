import { Utils } from "@/utils";

/*
 * @Author: niumengfei
 * @Date: 2022-12-12 12:55:25
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-02 17:22:31
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
        return {
            screenWidth: document.documentElement.clientWidth,
            screenHeight: document.documentElement.clientHeight,
            fontSize: 18,
            username: '',
            ...userInfo,
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
            if(Utils.isEmptyObj(value)){
                state.username = '';
            }else{
                state.username = 'niumengfei';
                state.nickname = '夜雨清梦';
            }
        }
    },
}
