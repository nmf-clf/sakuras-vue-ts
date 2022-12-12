/*
 * @Author: niumengfei
 * @Date: 2022-12-09 13:23:17
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-12 13:45:06
 */
/* 校验表单数据 */
interface ParamsType {
    msg?: string,
    trigger?: string,
    compareVal?: string | number,
}
/**
 * @author https://www.sakuras.group
 * @description 校验是否为空
 * @param {{}}
 * @returns {[]}
*/
export default {
    isNotEmpty: (params: ParamsType = {}) => { //是否为空
        let { msg, trigger } = params;
        return [{ 
            validator: (rule: any, value: any, callback: any) => {
                value === '' ? callback(new Error(msg || '该项不能为空!')) 
                : callback();
            }, 
            trigger
        }]
    },
    sameWithAnother: (params: ParamsType = {}) => { //两次输入是否一致
        let { msg, trigger, compareVal } = params;
        return [{ 
            validator: (rule: any, value: any, callback: any) => {
                console.log(1234, value, compareVal);
                value === '' ? callback(new Error(msg))
                : value !== compareVal ? callback(new Error("两次输入不匹配!"))
                : callback()
            }, 
            trigger
        }]
    },
    VerifyUserName: (params: ParamsType = {}) =>{
        return [{ 
            validator: (rule: any, value: any, callback: any) => {
                console.log(value);
                var uPattern = /^[a-zA-Z0-9_-|\u4E00-\u9FA5]{4,16}$/;
                value === '' ? callback(new Error('请填写用户名!')) 
                : value === 'admin' ?  callback()
                : !uPattern.test(value) ? callback(new Error('用户名仅支持 4-16位 的中英文、数字、下划线、减号'))
                : callback();
            },
        }]
    },
    VerifyPassWord: (params: ParamsType = {}) =>{
        return [{ 
            validator: (rule: any, value: any, callback: any) => {
                var pPattern = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;
                console.log(pPattern.test("iFat3"));
                value === '' ? callback(new Error('请填写密码!'))
                : value === '111' ?  callback()
                : !pPattern.test(value) ? callback(new Error('密码仅支持 至少6位 且包括1个大写字母，1个小写字母，1个数字 和 1个特殊字符'))
                : callback();
            },
        }]
    }
}

