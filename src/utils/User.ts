/*
 * @Author: niumengfei
 * @Date: 2023-02-20 19:29:23
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-24 14:55:57
 */
const User = {
    get: () => {
        const userInfo = localStorage.getItem('userInfo');
        return userInfo ? JSON.parse(userInfo) : {};
    },
    save: (userInfo: object) => {
        localStorage.setItem('userInfo', JSON.stringify(userInfo));
    },
    remove: () => {
        localStorage.removeItem('userInfo');
    }
}

export default User;
