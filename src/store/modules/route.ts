/*
 * @Author: niumengfei
 * @Date: 2023-03-14 10:14:51
 * @LastEditors: niumengfei 870424431@qq.com
 * @LastEditTime: 2023-03-29 10:43:03
 */

interface StateType {
    routeTitle: string,
    keepAliveList: string[],
}

interface ChangeTagType {
    type: number, // 1 增加 0 删除
    routeName: string, // 组件命名 
    callback: () => void
}

export default {
    state: (): StateType => {
        return {
            routeTitle: '',
            keepAliveList: [], // 需要缓存的数组
        }
    },
    actions: {
        setRouteInfo({ commit }: any, value: StateType){
            commit('SET_ROUTE_INFO', value)
        },
        changeRouteTag({ commit }: any, value: ChangeTagType){
            commit('CHANGE_ROUTE_TAG', value)
        },
    },
    mutations: {
        SET_ROUTE_INFO(state: StateType, value: StateType){
            Object.assign(state, {
                ...value
            })
        },
        CHANGE_ROUTE_TAG(state: StateType, value: ChangeTagType){
            if(value.type){ 
                if(!state.keepAliveList.find(v => v === value.routeName)){
                    state.keepAliveList.push(value.routeName)
                }
            }else{
                Object.assign(state, {
                    keepAliveList: state.keepAliveList.filter(v => v !== value.routeName)
                })
                value.callback && value.callback();
            }
        },
    },
}