/*
 * @Author: niumengfei
 * @Date: 2022-12-07 14:13:27
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-07 17:08:50
 */
import AxiosAjax from "@/utils/http";
import { LoginParams, UserRes } from "./model/userModel";

enum Api {
    register = 'user/register',
    login = 'user/login'
}

export const RegisterAjax = (data: LoginParams) => 
    AxiosAjax.post<UserRes>({ url: Api.register, data })

export const LoginAjax = (data: LoginParams) =>
    AxiosAjax.post<UserRes>({ url: Api.login, data })

export default {
    LoginAjax,
    RegisterAjax,
}

