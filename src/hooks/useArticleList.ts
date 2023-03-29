import { reactive, onMounted, onUnmounted } from 'vue';
import { User } from '@/utils';
import { ArticleApi } from '@/api';
import { DataItemType } from "@/vdmin/article/type";

interface NewDataItemType extends DataItemType {
    _color?: string;
    _type?: string;
}

interface stateType {
    loading: boolean,
    error: null,
    data: NewDataItemType[],
    hasMore: boolean,
}

export default function useArticleList() {
    const state = <stateType>reactive({
        loading: false,
        error: null,
        data: [],
        hasMore: true,
    });
    // 查询最新文章
    let page = 1;
    
    const getArticleList = (params?: any, callback?: () => void) => {
        const { pageSize = 1000 } = params;
        state.loading = true;
        ArticleApi.GetNewArticleListAjax({ 
            username: User.get().username,
            page,
            pageSize,
            notlogin: true,
        })
        .then(res =>{
            state.loading = false;
            let { list } = res.data;
            if(list.length < 1){
                state.hasMore = false; 
                return;
            }
            if(list.length < pageSize){ // 没有下一页
                state.hasMore = false; 
            }else{
                page ++;
            }
            state.data.push(...list);
            callback?.();
        })
        .catch(err =>{
            state.loading = false;
        })
    }
    
    const imgLoaded = (index: number) => {
        state.data[index]['loaded'] = true;
    }
    
    return {
        state,
        imgLoaded,
        getArticleList,
    };
}