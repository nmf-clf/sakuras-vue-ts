/*
 * @Author: niumengfei
 * @Date: 2022-10-29 14:04:02
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-01-30 19:18:43
 */
import { StaticKey, DynamicKey, RSAKey } from './Const';
import  { JSEncrypt }  from 'jsencrypt';
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
            // 动态DES
            DynamicDES: (message: string) => { 
                console.log('DynamicKey::', DynamicKey);
                var keyHex = CryptoJS.enc.Utf8.parse(DynamicKey);
                var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });
                return encrypted.ciphertext.toString();
            },
            // 静态DES 
            StaticDES: (message: string) =>{
                var keyHex = CryptoJS.enc.Utf8.parse(StaticKey);
        
                var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
                    mode: CryptoJS.mode.ECB,
                    padding: CryptoJS.pad.Pkcs7
                });
                return encrypted.ciphertext.toString();
            }, 
            // RSA
            RSA(Key24: string) {
                const encrypt = new JSEncrypt();
                encrypt.setPublicKey(RSAKey);
                const encrypted = encrypt.encrypt(Key24);
                return encrypted;
            }
        }
        // 解密
        this.decrypt = {
            DynamicDES: (ciphertext: string) => {
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
    randomString = (len: number) => {
        len = len || 32;
        var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
        var maxPos = $chars.length;
        var pwd = '';
        for (var i = 0; i < len; i++) {
            pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
        }
        return pwd;
    }
    // 动态DES加密
    DynamicEncryptByDES = (message: string) => {
        var keyHex = CryptoJS.enc.Utf8.parse(DynamicKey);

        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.ciphertext.toString();
    }
    // 动态DES解密
    DynamicDecryptByDES = (ciphertext: string) => {
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
    }
    // DES加密(针对用户信息本地存储固定key加密)
    StaticEncryptByDES2 = (message: string) => {
        var keyHex = CryptoJS.enc.Utf8.parse(StaticKey);

        var encrypted = CryptoJS.DES.encrypt(message, keyHex, {
            mode: CryptoJS.mode.ECB,
            padding: CryptoJS.pad.Pkcs7
        });
        return encrypted.ciphertext.toString();
    }
    // DES解密(针对用户信息本地存储固定key解密)
    StaticDecryptByDES2 = (ciphertext: string) => {
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
    }
    // RSA加密 
    encryptByRSA(Key24: string) {
        // console.log('随机Key24==>',Key24)
        const encrypt = new JSEncrypt();
        encrypt.setPublicKey(RSAKey);
        const encrypted = encrypt.encrypt(Key24);
        return encrypted;
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
}

export default new Utils();