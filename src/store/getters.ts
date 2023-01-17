/*
 * @Author: niumengfei
 * @Date: 2022-12-12 14:20:39
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-17 10:46:46
 */
const getters = {
    userInfo: (state: any) => state.user,
    deviceType: (state: any) => state.user.screenWidth > 700 ? 'pc' : 'mobile',
    isCollapse: (state: any) => state.admin.isCollapse,
    tagsNameList: (state: any) => state.admin?.tags?.list.map((item: any) => item.name).filter((item: any) => item),
}

export default getters;
