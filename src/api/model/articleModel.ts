/*
 * @Author: niumengfei
 * @Date: 2022-12-07 17:22:21
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-16 13:27:56
 */
export interface GetListParams {
    username?: string,
    page?: number,
    pageSize?: number,
    _id?: string, 
}

export interface ArticleListResItem {
    title: string,
    type: string,
    content: string,
    createDate: string,
    updateDate: string,
    status: string,
    opreation: string,
}

export type ArticleListRes = {
    current: number,
    list: ArticleListResItem[],
    pageSize: number,
    total: number,
};