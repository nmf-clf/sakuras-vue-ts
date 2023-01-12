/*
 * @Author: niumengfei
 * @Date: 2022-10-29 14:04:02
 * @LastEditors: niumengfei 870424431@qq.com
 * @LastEditTime: 2023-01-12 10:47:57
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
    // ucs-2 string to base64 encoded ascii
    utoa(str: string) {
        let newStr = window.btoa(unescape(encodeURIComponent(str)));
        var reg1 = new RegExp(/[/]/,'g');
        var reg2 = new RegExp(/[?]/,'g');
        var reg3 = new RegExp("&&",'g');
        var reg4 = new RegExp("==",'g');

        newStr = newStr.replace(reg1,'wscsdwscsdwscsd1')
        newStr = newStr.replace(reg2,'wscsdwscsdwscsd2')
        newStr = newStr.replace(reg3,'wscsdwscsdwscsd3')
        newStr = newStr.replace(reg4,'wscsdwscsdwscsd4')
        return newStr;
    }
    // base64 encoded ascii to ucs-2 string
    atou(str: any) {
        var reg1 = new RegExp("wscsdwscsdwscsd1",'g');
        var reg2 = new RegExp("wscsdwscsdwscsd2",'g');
        var reg3 = new RegExp("wscsdwscsdwscsd3",'g');
        var reg4 = new RegExp("wscsdwscsdwscsd4",'g');

        str = str.replace(reg1,'/')
        str = str.replace(reg2,'?')
        str = str.replace(reg3,'&&')
        str = str.replace(reg4,'==')
        return decodeURIComponent(escape(window.atob(str)));
    }
    //URI解码
    decodeURIComponent(key: string){
        if(!key) return {};
        return (window.location.href).indexOf(key) > 0 ? JSON.parse(decodeURIComponent(window.location.href.split("data=")[1])) : {};
    }
    //URI编码
    encodeURIComponent(val: any){
        return window.encodeURIComponent(JSON.stringify(val))
    }
    //清空非校验表单reative对象值
    clearFormData = (formData: any) => {
        const keys = Object.keys(formData);
        let obj: { [name: string]: string } = {};
        keys.forEach((item) => {
          obj[item] = "";
        });
        Object.assign(formData, obj);
    }
}

export default new Utils();