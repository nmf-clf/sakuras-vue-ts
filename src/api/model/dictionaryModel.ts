/*
 * @Author: niumengfei
 * @Date: 2022-12-07 17:22:21
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-07 17:51:04
 */
export interface GetListParams {
}

export interface DictionaryListResItem {
    id: number,
    _id?: number | string,
    type: string,
    label: string,
    value?: string,
    children?: DictionaryListResItem[],
}

export type Tree = DictionaryListResItem;

export type DictionaryListRes = DictionaryListResItem[];

export type DictionaryGroupRes = {
    dictionList: DictionaryListResItem[],
    cateNumInfo: any,
    tagNumInfo: any,
}