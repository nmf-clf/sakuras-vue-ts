/*
 * @Author: niumengfei
 * @Date: 2022-12-07 17:22:21
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-17 18:07:43
 */
export interface LoginParams {
    username: string;
    password: string;
}

export interface User {
    name: string,
    ps: string,
    token: string,
}