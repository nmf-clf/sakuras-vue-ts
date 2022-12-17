/*
 * @Author: niumengfei
 * @Date: 2022-12-07 14:13:27
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-17 18:19:21
 */
import AxiosAjax from "@/utils/http";
import { LoginParams, User } from "./model/userModel";

enum Api {
    register = 'user/register',
    login = 'user/login'
}

export const RegisterAjax = (data: LoginParams) => 
    AxiosAjax.post<User>({ url: Api.register, data })

export const LoginAjax = (data: LoginParams) =>
    AxiosAjax.post<User>({ url: Api.login, data })

