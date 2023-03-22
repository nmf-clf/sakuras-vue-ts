/*
 * @Author: niumengfei
 * @Date: 2022-10-29 14:04:02
 * @LastEditors: niumengfei 870424431@qq.com
 * @LastEditTime: 2023-03-22 17:21:08
 */
import { StaticKey, DynamicKey, RSAPublicKey } from './Const';
import  { JSEncrypt }  from 'jsencrypt';
import moment from "moment";
var CryptoJS = require("crypto-js");

// 公共方法
class Utils{
    platfrom;
    encrypt;
    decrypt;
    
    constructor() {
        // 获取平台标志
        this.platfrom = {
            Android: (function () {
                return navigator.userAgent.match(/Android/i) ? true : false;
            })(),
            iOS: (function () {
                return navigator.userAgent.match(/iPhone|iPad|iPod/i) ? true : false;
            })(),
            WeChat: (function () {
                return navigator.userAgent.toLowerCase().match(/micromessenger/i) ? true : false;
            })(),
        };
        // 加密
        this.encrypt = {
            DynamicDES: (message: string) => { // 动态DES
                console.log('DynamicKey::', DynamicKey);
                var keyHex = CryptoJS.enc.Utf8.parse(DynamicKey);
                var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });
                return encrypted.ciphertext.toString();
            },
            StaticDES: (message: string) =>{  // 静态DES 
                var keyHex = CryptoJS.enc.Utf8.parse(StaticKey);
        
                var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });
                return encrypted.ciphertext.toString();
            }, 
            RSA(Key24: string) { // RSA
                const encrypt = new JSEncrypt();
                encrypt.setPublicKey(RSAPublicKey);
                const encrypted = encrypt.encrypt(Key24);
                return encrypted;
            }
        }
        // 解密
        this.decrypt = {
            DynamicDES: (ciphertext: string) => {
                console.log('DynamicKeyDynamicKeyDynamicKeyDynamicKey', DynamicKey);
                try{
                    var keyHex = CryptoJS.enc.Utf8.parse(DynamicKey);
        
                    var decrypted = CryptoJS.DES.decrypt({
                        ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
                    }, keyHex, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    var result_value = decrypted.toString(CryptoJS.enc.Utf8);
                    return result_value;
                }catch(err){
                    console.log('decryptByDES-err====================>',err)
                }
            },
            StaticDES: (ciphertext: string) =>{
                try{
                    var keyHex = CryptoJS.enc.Utf8.parse(StaticKey);
                    var decrypted = CryptoJS.DES.decrypt({
                        ciphertext: CryptoJS.enc.Hex.parse(ciphertext)
                    }, keyHex, {
                        mode: CryptoJS.mode.ECB,
                        padding: CryptoJS.pad.Pkcs7
                    });
                    var result_value = decrypted.toString(CryptoJS.enc.Utf8);
                    return result_value;
                }catch(err){
                    console.log('decryptByDES2-err=====================>',err)
                }
            },
            RSA(Key24: string) {
                const decrypt = new JSEncrypt();
                decrypt.setPrivateKey('RSA-私钥');
                const decrypted = decrypt.decrypt(Key24);
                return decrypted;
            }
        }
    }
    // 判断是否是空对象
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
    // URI解码
    decodeURIComponent(key: string){
        if(!key) return {};
        return (window.location.href).indexOf(key) > 0 ? JSON.parse(decodeURIComponent(window.location.href.split("data=")[1])) : {};
    }
    // URI编码
    encodeURIComponent(val: any){
        return window.encodeURIComponent(JSON.stringify(val))
    }
    // 清空非校验表单reative对象值
    clearFormData = (formData: any) => {
        const keys = Object.keys(formData);
        let obj: { [name: string]: string } = {};
        keys.forEach((item) => {
          obj[item] = "";
        });
        Object.assign(formData, obj);
    }
    // 生成随机数 
    randomString = (len: number, type?: string) => {
        len = len || 32;
        let $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        type == 'number' ? $chars = '1234567890' : null;
        let maxPos = $chars.length;
        let pwd = '';
        for (let i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
    // 生成包含时间的随机数
    randomByDate = () => {
        let res = this.randomString(4, 'number')
        return res;
    }
    // 防抖
    debounce = (func: ()=>void, wait: number) =>{
        let timer:any = null;
        return function(this: any, ...args: any) {
            if(timer) clearTimeout(timer);
            timer = setTimeout(() => {
                func.apply(this, args)
            }, wait);
        }
    }
    // 节流
    throttle = (func: () => void, wait: number) => {
        let lastTime = 0; 
        return function() {
            let curTime = new Date().getTime();
            if((curTime - lastTime) > wait){
                func()
                lastTime = curTime
            }
        }
    }
    // 日期
    moment = () => {
        return {
            // 获取当前日期
            currentDate: (type?: string) => {
                return type ? moment().format(type) : moment().format('YYYY-MM-DD');
            }
        }
    }
    // 过滤 Markdown 特殊字符
    filterMarkdown = (markdown: string) => {
        if(!markdown) return '';
        // 先过滤 []() 链接
        const regExp_link = /\[.*?\]\((.*?)\)/g; // 匹配链接中括号和括号之间的内容
        let result = markdown;
        let match;
        while ((match = regExp_link.exec(markdown))) { // 遍历所有匹配到的链接
            const link: any = match[0]; // 获取当前匹配到的链接
            const name = link.match(/\[(.*?)\]/)[1]; // 提取链接名称
            result = result.replace(link, name); // 替换链接为名称
        }
        // 过滤标签
        result = result.replace(/<[^>]*>/g, '');
        // 再过滤 特殊字符
        const regExp_special = /[#>*\-+`~_]/g; // 匹配 # > * - + ` ~ _ 
        result = result.replace(regExp_special, '');
        return result;
    }
}

export default new Utils();