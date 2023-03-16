/*
 * @Author: niumengfei
 * @Date: 2022-12-07 17:22:21
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-16 17:24:14
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
    type: number,
    typeName: string,
    content: string,
    createDate: string,
    updateDate: string,
    status: string,
    opreation: string,
    username: string,
    readNum: number,
    nickname: string,
    _id: string,
    hot: number,
}

export type ArticleListRes = {
    current: number,
    list: ArticleListResItem[],
    pageSize: number,
    total: number,
};