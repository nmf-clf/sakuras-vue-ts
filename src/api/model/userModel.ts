/*
 * @Author: niumengfei
 * @Date: 2022-12-07 17:22:21
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-19 16:49:26
 */
export interface LoginParams {
    username: string;
    password: string;
}

export interface UserRes {
    name: string,
    ps: string,
    token: string,
}