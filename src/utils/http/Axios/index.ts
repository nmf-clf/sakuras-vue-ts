/*
 * @Author: niumengfei
 * @Date: 2022-10-29 14:36:35
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-13 17:24:09
 */
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import { ElMessage, ElLoading } from 'element-plus'
import { RequestLog, Utils } from "@/utils";
import { DynamicKey } from "@/utils/Const";
const { env, runDependencies } = ProcessEnv;
// console.log('当前环境::', env, runDependencies);

interface MyResponseType<T> {
    status?: number | string, 
    code: string,
    message: string,
    data: T,
}
interface ParmsType {
    url: string,
    data?: object, 
}
//创建axios应用实例
const instance = axios.create({
    /* 在这里重写参数默认值 */
    baseURL: ((e)=> env == 'pro' ? runDependencies.pro : runDependencies.dev)(),
    withCredentials: false,
    timeout: 10000, //请求超时时间
    // headers: { 'X-Requested-With': 'XMLHttpRequest' },
});
const service = async<T = any> (config: AxiosRequestConfig): Promise<MyResponseType<T>> => {
    // const loading = ElLoading.service({
    //     customClass: 'sakuras-loading',
    //     text: '正在加载中，请稍后...',
    //     background: "rgba(0,0,0,0)",
    // })
    RequestLog(`发起['${config.url}]：参数=> ${JSON.stringify(config.data)}`);
    let _config = {
        ...config, //无法重新设置config的值
        headers: {
            Authorization: '',
            Sid: DynamicKey.split("").reverse().join("") || Utils.encryptByRSA(DynamicKey),
        }
    }
    try{
        const res = await instance.request<MyResponseType<T>>(_config);
        let { data } = res;
        // loading.close();
        /* 1: 成功 0: 失败 */
        if(data.code == '1'){
            return { ...data };
        }else{
            let msg = (data.message || `request failed: code is ${data.code} , expect 1`);
            ElMessage.error('出错啦=> ' + msg);
            return Promise.reject(`响应异常=> ${msg}`);
        }
    }catch(err: Error | unknown){
        // loading.close();
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
    get: function<T>({ url }: ParmsType){
        return service<T>({ url, method: 'Get' })
    },
    post: function<T>({ url, data }: ParmsType){
        return service<T>({ url, method: 'POST', data })
    },
}

export default AxiosAjax;
