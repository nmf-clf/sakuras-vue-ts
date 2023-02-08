/*
 * @Author: niumengfei
 * @Date: 2022-12-07 17:22:21
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-08 17:25:30
 */
export interface GetListParams {
}

export interface DictionaryListResItem {
    id: number,
    _id?: number,
    type: string,
    label: string,
    value?: string,
    children?: DictionaryListResItem[],
}

export type Tree = DictionaryListResItem;

export type DictionaryListRes = DictionaryListResItem[];