/*
 * @Author: niumengfei
 * @Date: 2023-02-20 19:29:23
 * @LastEditors: niumengfei 870424431@qq.com
 * @LastEditTime: 2023-03-27 18:16:20
 */
const User = {
    get: () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : {};
    },
    save: (userInfo: object) => {
        const _user = {
            ...User.get(),
            ...userInfo
        }
        localStorage.setItem('userInfo', JSON.stringify(_user));
    },
    remove: () => {
        localStorage.removeItem('userInfo');
    }
}

export default User;
