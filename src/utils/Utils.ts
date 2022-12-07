/*
 * @Author: niumengfei
 * @Date: 2022-10-29 14:04:02
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-06 15:09:32
 */
//公共方法
class Utils{
    platfrom;

    constructor() {
        //获取平台标志
        this.platfrom = {
          Android: (function () {
            return navigator.userAgent.match(/Android/i) ? true : false;
          })(),
          iOS: (function () {
            return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
          })(),
          WeChat: (function () {
            return navigator.userAgent.toLowerCase().match(/micromessenger/i)
              ? true
              : false;
          })(),
        };
    }
    //判断是否是空对象
    isEmptyObj(obj: any){
        if(!obj) return true; //空的基本数据类型 返回true
        return JSON.stringify(obj) === '{}' ? true : false; //空对象返回true
    }
}
let newUtils = new Utils();

export default newUtils;