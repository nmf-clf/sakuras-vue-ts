/*
 * @Author: niumengfei
 * @Date: 2022-12-07 14:13:27
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-08 14:46:33
 */
import AxiosAjax from "@/utils/http";
import { GetListParams, DictionaryListRes, DictionaryListResItem } from "./model/dictionaryModel";

enum Api {
    getlist = 'dictionary/list',
    getDetail = 'dictionary/detail',
    addDictionary = 'dictionary/addOrUpdate',
    deleteDictionary = 'dictionary/delete',
}
// 获取字典列表
export const GetDictionaryListAjax = (data: GetListParams) => 
    AxiosAjax.post<DictionaryListRes>({ url: Api.getlist,  data })
// 字典新增/更新
export const AddDictionaryAjax = (data: any) => 
    AxiosAjax.post<DictionaryListResItem>({ url: Api.addDictionary,  data })
// 字典删除
export const deleteDictionaryAjax = (data: any) => 
    AxiosAjax.post<DictionaryListRes>({ url: Api.deleteDictionary,  data})

export default {
    GetDictionaryListAjax,
    AddDictionaryAjax,
    deleteDictionaryAjax,
}