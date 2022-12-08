/*
 * @Author: niumengfei
 * @Date: 2022-12-08 17:47:58
 * @LastEditors: niumengfei
 * @LastEditTime: 2022-12-08 17:48:10
 */
module.exports = {
    dev: {
        env: 'dev',
        apiDomain: 'http://google.com',
    },
    test: {
        env: 'test',
        apiDomain: 'http://sina.com',
    },
    prod: {
        env: 'prod',
        apiDomain: 'http://baidu.com',
    },
}
