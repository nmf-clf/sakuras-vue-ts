/*
 * @Author: niumengfei
 * @Date: 2022-12-07 14:13:27
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-10 16:42:40
 */
import AxiosAjax from "@/utils/http";
import { GetListParams, DictionaryListRes, DictionaryListResItem } from "./model/dictionaryModel";

enum Api {
    getlist = 'dictionary/list',
    addDictionary = 'dictionary/addOrUpdate',
    deleteDictionary = 'dictionary/delete',
    resetIndex = 'dictionary/resetIndex',

}
// 获取字典列表
export const GetDictionaryListAjax = (data: GetListParams) => 
    AxiosAjax.post<DictionaryListRes>({ url: Api.getlist,  data })
// 字典新增/更新
export const AddDictionaryAjax = (data: any) => 
    AxiosAjax.post<DictionaryListResItem>({ url: Api.addDictionary,  data })
// 字典删除
export const DeleteDictionaryAjax = (data: any) => 
    AxiosAjax.post<DictionaryListRes>({ url: Api.deleteDictionary,  data})
// 更新字典下标
export const ResetDictionaryIndexAjax = (data: any) => 
    AxiosAjax.post<any>({ url: Api.resetIndex,  data})

export default {
    GetDictionaryListAjax,
    AddDictionaryAjax,
    DeleteDictionaryAjax,
    ResetDictionaryIndexAjax,
}