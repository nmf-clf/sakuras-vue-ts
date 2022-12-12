/*
 * @Author: niumengfei
 * @Date: 2022-12-12 14:20:39
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-12 17:51:18
 */
const getters = {
  userInfo: (state: any) => state.user,
  deviceType: (state: any) => state.user.screenWidth > 700 ? 'pc' : 'mobile',
}
export default getters;
