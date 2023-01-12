/*
 * @Author: niumengfei
 * @Date: 2022-12-07 14:13:27
 * @LastEditors: niumengfei 870424431@qq.com
 * @LastEditTime: 2023-01-12 15:29:31
 */
import AxiosAjax from "@/utils/http";
import { GetListParams, ArticleListRes } from "./model/articleModel";

enum Api {
    getlist = 'article/list',
    getDetail = 'article/detail',
    addArticle = 'article/add',
}
// 获取文章列表
export const GetArticleListAjax = (data: GetListParams) => 
    AxiosAjax.post<ArticleListRes>({ url: Api.getlist,  data })
// 获取文章详情
export const GetArticleDetailAjax = (data: GetListParams) => 
    AxiosAjax.post<ArticleListRes>({ url: Api.getDetail,  data })
// 文章新增
export const AddArticleAjax = (data: any) => 
    AxiosAjax.post<ArticleListRes>({ url: Api.addArticle,  data })

