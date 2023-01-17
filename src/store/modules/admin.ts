/*
 * @Author: niumengfei
 * @Date: 2022-12-12 12:55:25
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-17 10:46:59
 */
interface ListType {
    title: string,
    path: string,
    name?: string,
}
interface AdminStateType {
    isCollapse: boolean;
    defaultBarKey: string,
    tags: {
        show: boolean,
        list: ListType[]
    }
}

export default {
    state: <AdminStateType>{
        isCollapse: false,
        defaultBarKey: '',
        tags: {
            show: true,
            list: [
                {
                    "title": "首页",
                    "path": "/admin/index",
                    "name": 'AdminHome'
                },
            ]
        }
    },
    actions: {
        changeIsCollapse({ commit }: any){
            commit('CHANGE_IS_COLLAPSE');
        },
        addTags({ commit }: any, value: ListType){
            commit('ADD_TAGS', value);
        },
        deleteTags({ commit }: any, value: number){
            commit('DELETE_TAGS', value);
        },
        resetTags({ commit }: any, value: ListType){
            commit('RESET_TAGS', value);
        },
    },
    mutations: {
        CHANGE_IS_COLLAPSE(state: AdminStateType){
            state.isCollapse = !state.isCollapse;
        },
        ADD_TAGS(state: AdminStateType, value: ListType){
            if(state.tags.list.filter(item => item.path === value.path).length > 0) return state;
            state.tags.list.push(value);
            !state.tags.show && (state.tags.show = true);
        },
        DELETE_TAGS(state: AdminStateType, index: number){
            state.tags.list.splice(index, 1);
            state.tags.list.length == 0 && (state.tags.show = false);
        },
        RESET_TAGS(state: AdminStateType, value: ListType){
            state.tags.list = [value];
        },
    },
}
