/*
 * @Author: niumengfei
 * @Date: 2022-12-07 14:13:27
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-16 17:34:42
 */
import AxiosAjax from "@/utils/http";
import { GetListParams, ArticleListRes } from "./model/articleModel";

enum Api {
    getlist = 'article/list',
    getDetail = 'article/detail',
    addArticle = 'article/addOrUpdate',
    deleteArticle = 'article/delete',
}
// 获取文章列表
export const GetArticleListAjax = (data: GetListParams) => 
    AxiosAjax.post<ArticleListRes>({ url: Api.getlist,  data, loading: '.vdmin-table' })
// 获取文章详情
export const GetArticleDetailAjax = (data: GetListParams) => 
    AxiosAjax.post<ArticleListRes>({ url: Api.getDetail,  data, loading: '.vdmin-table' })
// 文章新增/更新
export const AddArticleAjax = (data: any) => 
    AxiosAjax.post<ArticleListRes>({ url: Api.addArticle,  data, loading: '.sakuras-markdown-editor' })
// 文章删除
export const deleteArticleAjax = (data: any) => 
    AxiosAjax.post<ArticleListRes>({ url: Api.deleteArticle,  data, loading: '.vdmin-table' })
