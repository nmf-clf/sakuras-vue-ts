/*
 * @Author: niumengfei
 * @Date: 2022-10-29 14:36:35
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-07 17:03:01
 */
import axios, { AxiosResponse, AxiosRequestConfig } from "axios";
import requestLog from '../../Tnlog'
import { ElMessage } from 'element-plus'

interface MyResponseType<T> {
    status?: number | string, 
    code: string,
    message: string,
    data: T,
}

//创建axios应用实例
const instance = axios.create({
    /* 在这里重写参数默认值 */
    baseURL: (function (e) {
        // if (process.env.NODE_DEV !== 'production' && window.TIAN.proxy === 'true') {
        //     return '';
        // }
        // return 'https://www.sakuras.group';
        return 'http://localhost:9001'
    })(),
    withCredentials: false,
    timeout: 50000, //请求超时时间
    // headers: { 'X-Requested-With': 'XMLHttpRequest' },
});
const AxiosAjax = async<T = any> (config: AxiosRequestConfig): Promise<MyResponseType<T>> => {
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
            let msg: string = (data.message || `request failed: code is ${data.code} , expect 1`);
            ElMessage.error('出错啦=> ' + msg);
            return Promise.reject(`响应异常=> msg`);
        }
    }catch(err: Error | unknown){
        let msg: string = '请求失败';
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

export default AxiosAjax;
