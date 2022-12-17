/*
 * @Author: niumengfei
 * @Date: 2022-12-07 17:22:21
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-17 18:10:27
 */
export interface GetListParams {
    username: string,
}

interface ArticleListResItem {
    title: string,
    status: string,
    type: string,
    createDate: string,
    updateDate: string,
}
export type ArticleListRes = ArticleListResItem[];