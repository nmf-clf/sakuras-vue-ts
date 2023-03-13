import { Utils } from "@/utils";
import { DictionaryApi } from '@/api';
import { User } from '@/utils';

/*
 * @Author: niumengfei
 * @Date: 2022-12-12 12:55:25
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-13 16:58:22
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
        changeDictionary({ commit }: any, value: any){ // 单纯修改字典值时候
            commit('SAVE_DICTIONARY', value)
        },
        saveDictionary({ commit }: any, value: any){
            DictionaryApi.GetDictionaryGroupAjax({
                userId: User.get().userId
            })
            .then(res =>{
                let { dictionList, cateNumInfo, tagNumInfo } = res.data;
                let dictionary = {};
                dictionList.map(item => { dictionary[item.type] = item.children || [] })
                commit('SAVE_DICTIONARY', {
                    dictionary,
                    cateNumInfo, 
                    tagNumInfo,
                })
            })
        },
    },
    mutations: {
        SET_WIDTH_AND_Height(state: any, value: number[]){
            state.screenWidth = value[0]
            state.screenHeight = value[1]
        },
        SAVE_USER_INFO(state: any, value: any){
            if(Utils.isEmptyObj(value)){ // 注销
                Object.keys(state).map(v => {
                    if(!['screenWidth', 'screenHeight', 'fontSize'].includes(v)){ // 注销删除用户信息，但不包含自适应配置
                        delete state[v]
                    }
                })
            }else{ // 登录/更新
                Object.assign(state, {
                   ...value,
                   userId: value._id
                });
            }
        },
        SAVE_DICTIONARY(state: any, value: any){
            // 为了防止添加了不必要的 state 属性，可以做个判断
            Object.assign(state, {
                ...value
            });
        },
    },
}
