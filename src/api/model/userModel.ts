/*
 * @Author: niumengfei
 * @Date: 2022-12-07 17:22:21
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-13 15:19:07
 */
export interface LoginParams {
    // username: string;
    // password: string;
    params: string;
}

export interface UserRes {
    name: string,
    ps: string,
    token: string,
}