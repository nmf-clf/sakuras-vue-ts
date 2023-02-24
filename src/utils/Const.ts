/*
 * @Author: niumengfei
 * @Date: 2023-01-13 13:47:03
 * @LastEditors: niumengfei
 * @LastEditTime: 2023-02-24 13:55:41
 */
export const  randomString = (len: number) => {
    len = len || 32;
    var $chars = 'ABCDEFGHJKMNPQRSTWXYZabcdefhijkmnprstwxyz';    /****默认去掉了容易混淆的字符oOLl,9gq,Vv,Uu,I1****/
    var maxPos = $chars.length;
    var pwd = '';
    for (var i = 0; i < len; i++) {
        pwd += $chars.charAt(Math.floor(Math.random() * maxPos));
    }
    return pwd;
}

export const StaticKey = 'kEHrDooxWHCWtfeSxvDvgqTs'; // 本地存储用户信息 key

export const DynamicKey = randomString(24); // DES Token 加密存储 key

// export const RSAPublicKey = '-----BEGIN PUBLIC KEY-----MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAng53U8oC9tYxNj2qIMfpMeDE1K3ifuyEVdcWPHmVeE9cla8xT6kCdi92bcBPilo1KzuZL1aqjP2oq3BmiMFKey6SxWHlDhMvkaPiBAs08/3beKw94pPRmkmz/UoTsZPzfvKhbCdDgEPBYWT8VNCCTyhf9+W/5pkQDhbdNjqhwFgOhXfnp8Qdti96Mk8McuFdUkgceNhPWtgroBoecX2CBcCOimD1emY/3xWblDamvw+FoDxOcySCh8ZzVR33q32eeap5Yvj7r+mpavIgQ14gxiFOFFJZrvlCinpP+K9wTkoq9Fg3o4zSJvb6bqFI70gCX5iwqHkEd0N8+F/hzm843wIDAQAB-----END PUBLIC KEY-----';

// RSA 公钥
export const RSAPublicKey = `-----BEGIN PUBLIC KEY-----MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQCK3siV2MKl7ADFMajEsbc/ZrSTfo9h37c6+m0cUHOTqGR4V+Ugzc5Wzpcrz6QGu7/umQBJRC3LZ8xRW8+J6Z1lI0+Tr6LT8NfLUeyBTBXkBI1j0BIzmEjsW/a1vDr2ahXn1RFvtnHeKs41lbICkY7mRA2cAyiMWhrteM1d1MR3gQIDAQAB-----END PUBLIC KEY-----`;

