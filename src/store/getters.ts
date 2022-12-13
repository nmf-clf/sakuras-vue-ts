/*
 * @Author: niumengfei
 * @Date: 2022-12-12 14:20:39
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-13 18:45:57
 */
const getters = {
    userInfo: (state: any) => state.user,
    deviceType: (state: any) => state.user.screenWidth > 700 ? 'pc' : 'mobile',
    isCollapse: (state: any) => state.admin.isCollapse,
}

export default getters;
