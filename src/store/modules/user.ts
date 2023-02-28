import { Utils } from "@/utils";

/*
 * @Author: niumengfei
 * @Date: 2022-12-12 12:55:25
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-28 10:34:31
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
            dictionary: {},
            ...userInfo,
        }
    },
    actions: {
        setWidthAndHeight({ commit }: any, value: number[]){
            commit('SET_WIDTH_AND_Height', value)
        },
        saveUserInfo({ commit }: any, value: any){
            commit('SAVE_USER_INFO', value)
        },
        saveDictionary({ commit }: any, value: any){
            commit('SAVE_DICTIONARY', value)
        }
    },
    mutations: {
        SET_WIDTH_AND_Height(state: any, value: number[]){
            state.screenWidth = value[0]
            state.screenHeight = value[1]
        },
        SAVE_USER_INFO(state: any, value: any){
            if(Utils.isEmptyObj(value)){ // 注销
                state.username = '';
                state.nickname = '';
                state.userId = '';
            }else{
                state.username = value.username;
                state.nickname = value.nickname;
                state.userId = value._id;
            }
        },
        SAVE_DICTIONARY(state: any, value: any){
            state.dictionary = value;
        },
    },
}
