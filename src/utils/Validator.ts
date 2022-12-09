/*
 * @Author: niumengfei
 * @Date: 2022-12-09 13:23:17
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-09 15:36:45
 */
/* 校验表单数据 */
interface ParamsType {
    msg?: string,
    trigger?: string,
    compareVal?: string | number,
}

export default {
    isNotEmpty: (params: ParamsType = {}) => { //是否为空
        let { msg, trigger } = params;
        return [{ 
            validator: (rule: any, value: any, callback: any) => {
                value === '' ? callback(new Error(msg || '该项不能为空!')) : callback();
            }, 
            trigger
        }]
    },
    isSameWiAnOther: (params: ParamsType = {}) => { //两次输入是否一致
        let { msg, trigger, compareVal } = params;
        console.log('compareVal', compareVal);
        return [{ 
            validator: (rule: any, value: any, callback: any) => {
                console.log(1234, value, compareVal);
                value === '' 
                ? callback(new Error(msg))
                : value !== compareVal ? callback(new Error("两次输入不匹配!"))
                : callback()
            }, 
            trigger
        }]
    },
}

