/*
 * @Author: niumengfei
 * @Date: 2022-12-12 12:55:25
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-13 19:43:31
 */
interface StateType {
    isCollapse: boolean;
}

export default {
    // state: (): StateType => {
    //     return {
    //         isCollapse: false
    //     }
    // },
    state: {
        isCollapse: false
    },
    actions: {
        changeIsCollapse({ commit }: any){
            commit('CHANGE_IS_COLLAPSE');
        },
    },
    mutations: {
        CHANGE_IS_COLLAPSE(state: any){
            state.isCollapse = !state.isCollapse;
        },
    },
}
