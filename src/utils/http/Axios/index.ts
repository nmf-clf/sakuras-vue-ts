/*
 * @Author: niumengfei
 * @Date: 2022-10-29 14:36:35
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-12 11:24:22
 */
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import requestLog from '../../Tnlog'
import { ElMessage } from 'element-plus'
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
    timeout: 50000, //请求超时时间
    // headers: { 'X-Requested-With': 'XMLHttpRequest' },
});
const service = async<T = any> (config: AxiosRequestConfig): Promise<MyResponseType<T>> => {
    requestLog(`发起['${config.url}]：参数=> ${JSON.stringify(config.data)}`);
    let _config = {
        ...config, //无法重新设置config的值
        headers: {
            Authorization: '',
        }
    }
    try{
        const res = await instance.request<MyResponseType<T>>(_config);
        let { data } = res;
        /* 1: 成功 0: 失败 */
        if(data.code == '1'){
            return { ...data };
        }else{
            let msg = (data.message || `request failed: code is ${data.code} , expect 1`);
            ElMessage.error('出错啦=> ' + msg);
            return Promise.reject(`响应异常=> ${msg}`);
        }
    }catch(err: Error | unknown){
        let msg = '请求失败';
        err instanceof Error ? (msg = err.message) : (msg = String(err));
        ElMessage.error('响应异常=>' + msg);
        requestLog('响应异常=>' + err, 2);
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
