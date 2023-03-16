/*
 * @Author: niumengfei
 * @Date: 2023-03-14 10:14:51
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-14 10:21:36
 */

interface StateType {
    routeTitle: string
}

export default {
    state: (): StateType => {
        return {
            routeTitle: '',
        }
    },
    actions: {
        setRouteInfo({ commit }: any, value: StateType){
            commit('SET_ROUTE_INFO', value)
        },
        
    },
    mutations: {
        SET_ROUTE_INFO(state: any, value: StateType){
            Object.assign(state, {
                ...value
            })
        },
    },
}