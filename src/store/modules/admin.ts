/*
 * @Author: niumengfei
 * @Date: 2022-12-12 12:55:25
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-14 20:19:58
 */
interface ListType {
    title: string,
    path: string,
}
interface StateType {
    isCollapse: boolean;
    defaultBarKey: string,
    tags: {
        show: boolean,
        list: ListType[]
    }
}

export default {
    state: <StateType>{
        isCollapse: false,
        defaultBarKey: '',
        tags: {
            show: true,
            list: [
                {
                    // "name": "home",
                    "title": "首页",
                    "path": "/admin/index"
                },
            ]
        }
    },
    actions: {
        changeIsCollapse({ commit }: any){
            commit('CHANGE_IS_COLLAPSE');
        },
        setTags({ commit }: any, value: object){
            commit('SET_TAGS', value);
        },
        deleteTags({ commit }: any, value: number){
            commit('DELETE_TAGS', value);
        },
    },
    mutations: {
        CHANGE_IS_COLLAPSE(state: StateType){
            state.isCollapse = !state.isCollapse;
        },
        SET_TAGS(state: StateType, value: any){
            if(state.tags.list.filter(item => item.path === value.path).length > 0) return state;
            
            state.tags.list.push(value)
        },
        DELETE_TAGS(state: StateType, index: number){
            //切换路由：先获取当前关闭的标签在数组中的下标，然后获取上一个对象下标
            // router.back();
            // if(index > 0){ //如果下标值大于0，说明前面还有

            // }
            state.tags.list.splice(index, 1)
        }
    },
}
