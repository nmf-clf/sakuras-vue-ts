/*
 * @Author: niumengfei
 * @Date: 2022-12-07 17:22:21
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-15 11:07:53
 */
export interface GetListParams {
    username?: string,
    page?: number,
    pageSize?: number,
    _id?: string | string[], 
    loading?: string, 
}

export interface ArticleListResItem {
    title: string,
    type: string,
    content: string,
    createDate: string,
    updateDate: string,
    status: string,
    opreation: string,
    username: string,
    readNum: number,
    nickname: string,
}

export type ArticleListRes = {
    current: number,
    list: ArticleListResItem[],
    pageSize: number,
    total: number,
};