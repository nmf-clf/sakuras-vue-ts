/*
 * @Author: niumengfei
 * @Date: 2022-12-12 14:20:39
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-03-14 10:22:05
 */
const getters = {
    userInfo: (state: any) => state.user,
    deviceType: (state: any) => state.user.screenWidth ? state.user.screenWidth > 700 ? 'pc' : 'mobile' : 'pc', // 默认 PC 端
    isCollapse: (state: any) => state.admin.isCollapse,
    tagsNameList: (state: any) => state.admin?.tags?.list.map((item: any) => item.name).filter((item: any) => item),
    routeInfo: (state: any) => state.route,
}

export default getters;
