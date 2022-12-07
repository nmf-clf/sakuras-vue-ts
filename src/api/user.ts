/*
 * @Author: niumengfei
 * @Date: 2022-12-07 14:13:27
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-07 17:23:48
 */
import AxiosAjax from "@/utils/http/Axios/AxiosAjax";
import { LoginParams, User } from "./model/userModel";

enum Api {
    register = '/sakuras-api/user/register',
    login = '/sakuras-api/user/login'
}

export const RegisterAjax = (data: LoginParams) => 
    AxiosAjax<User>({ url: Api.register, method: 'POST', data })

export const LoginAjax = (data: LoginParams) =>
    AxiosAjax<User>({ url: Api.login, method: 'POST', data })
