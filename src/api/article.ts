/*
 * @Author: niumengfei
 * @Date: 2022-12-07 14:13:27
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-17 18:18:54
 */
import AxiosAjax from "@/utils/http";
import { GetListParams, ArticleListRes } from "./model/articleModel";

enum Api {
    getlist = 'article/list',
}

export const GetArticleListAjax = (params: GetListParams) => 
    AxiosAjax.get<ArticleListRes>({ url: Api.getlist + '?username=' + params.username })

