/*
 * @Author: niumengfei
 * @Date: 2022-10-29 14:36:35
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-23 19:09:43
 */
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { ElMessage, ElLoading } from 'element-plus'
import { RequestLog, Utils } from "@/utils";
import { DynamicKey } from "@/utils/Const";
const { env, runDependencies } = ProcessEnv;

type LoadingType = boolean | string;

interface ParmsType {
    url: string,
    data?: object, 
    loading?: LoadingType,
}

interface MyResponseType<T> {
    status?: number | string, 
    code: string,
    message: string,
    data: T,
}

//创建axios应用实例
const instance = axios.create({
    /* 在这里重写参数默认值 */
    baseURL: ((e)=> env == 'pro' ? runDependencies.pro : runDependencies.dev)(),
    withCredentials: false,
    timeout: 10000, //请求超时时间
    // headers: { 'X-Requested-With': 'XMLHttpRequest' },
});
const service = async<T = any> (config: AxiosRequestConfig, loading: LoadingType): Promise<MyResponseType<T>> => {
    let reqLoading;
    if(loading){
        reqLoading = ElLoading.service({
            customClass: 'sakuras-loading',
            text: 'loading...',
            background: "rgba(255, 255, 255, 0.5)",
            target: typeof loading == 'string' ? loading : 'body',
        })
    }
   
    RequestLog(`发起['${config.url}]：参数=> ${JSON.stringify(config.data)}`);
    let _config = {
        ...config, //无法重新设置config的值
        headers: {
            Authorization: '',
            Sid: Utils.encrypt.RSA(JSON.stringify(DynamicKey)),
        }
    }
    try{
        const res = await instance.request<MyResponseType<T>>(_config);
        let { data } = res;
        reqLoading?.close();
        /* 1: 成功 0: 失败 */
        if(data.code == '1'){
            return { ...data };
        }else{
            let msg = (data.message || `request failed: code is ${data.code} , expect 1`);
            ElMessage.error('出错啦=> ' + msg);
            return Promise.reject(`响应异常=> ${msg}`);
        }
    }catch(err: Error | unknown){
        reqLoading?.close();
        let msg = '请求失败';
        err instanceof Error ? (msg = err.message) : (msg = String(err));
        ElMessage.error('响应异常=>' + msg);
        RequestLog('响应异常=>' + err, 2);
        return Promise.reject(err);
        // return {
        //     code: '0',
        //     message,
        //     data: null as any,
        //     status: err.response?.status,
        // }
    }
}

const AxiosAjax = {
    get: function<T>({ url, loading = false }: ParmsType){
        return service<T>({ url, method: 'Get'}, loading)
    },
    post: function<T>({ url, data, loading = false }: ParmsType){
        return service<T>({ url, method: 'POST', data }, loading)
    },
}

export default AxiosAjax;
