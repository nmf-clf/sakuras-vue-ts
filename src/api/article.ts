/*
 * @Author: niumengfei
 * @Date: 2022-12-07 14:13:27
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-20 10:51:25
 */
import AxiosAjax from "@/utils/http";
import { GetListParams, ArticleListRes } from "./model/articleModel";

enum Api {
    getlist = 'article/list',
}

export const GetArticleListAjax = (data: GetListParams) => 
    AxiosAjax.post<ArticleListRes>({ url: Api.getlist,  data })

