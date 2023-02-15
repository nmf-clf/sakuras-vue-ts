/*
 * @Author: niumengfei
 * @Date: 2022-12-07 14:13:27
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-15 16:58:51
 */
import AxiosAjax from "@/utils/http";
import { GetListParams, ArticleListRes, ArticleListResItem } from "./model/articleModel";

enum Api {
    getlist = 'article/list',
    getDetail = 'article/detail',
    addArticle = 'article/addOrUpdate',
    deleteArticle = 'article/delete',
    resetIndex = 'article/resetIndex',
}
// 获取文章列表
export const GetArticleListAjax = (data: GetListParams) => 
    AxiosAjax.post<ArticleListRes>({ url: Api.getlist, data, loading: '.vdmin-table' })
// 获取文章详情
export const GetArticleDetailAjax = (data: GetListParams) => 
    AxiosAjax.post<ArticleListResItem>({ url: Api.getDetail, data, loading: '.vdmin-table' })
// 文章新增/更新
export const AddArticleAjax = (data: any) => 
    AxiosAjax.post<ArticleListRes>({ url: Api.addArticle, data, loading: '.sakuras-markdown-editor' })
// 文章删除
export const deleteArticleAjax = (data: any) => 
    AxiosAjax.post<ArticleListRes>({ url: Api.deleteArticle, data, loading: '.vdmin-table' })
// 获取最新文章列表-前台
export const GetNewArticleListAjax = (data: GetListParams) => 
    AxiosAjax.post<ArticleListRes>({ url: Api.getlist, data, loading: data.loading })
// 获取文章详情-前台
export const GetArticleNewDetailAjax = (data: GetListParams) => 
AxiosAjax.post<ArticleListResItem>({ url: Api.getDetail, data, loading: data.loading })
// 编辑文章顺序
export const ResetArticleIndexAjax = (data: any) => 
AxiosAjax.post<any>({ url: Api.resetIndex, data, loading: data.loading})
// 文章新增/更新
export const AddNewArticleAjax = (data: any) => 
    AxiosAjax.post<ArticleListRes>({ url: Api.addArticle, data, loading: data.loading })

export default {
    GetArticleListAjax,
    GetArticleDetailAjax,
    AddArticleAjax,
    deleteArticleAjax,
    GetNewArticleListAjax,
    GetArticleNewDetailAjax,
    ResetArticleIndexAjax,
    AddNewArticleAjax,
}