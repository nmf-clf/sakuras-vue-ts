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

export const RSAKey = 'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAp7Td8VdfmXTE4SvEyziGTh3ddf6eCHJ8NWZAWp2Iu9FfJgpx+t8nhvY6CXEmZ9cAAykpDMCBZEWL0zI5/9pWsi/+eXZ8t/a/WD3Fw5Yj89Nbpkc4ehAlUwLMMBaojAaoZtw/SBgjLFjaGf59KkS7zeJsqUoLTVsFzZ3oRfkObnxtvT1JWDOFTeEAfdrk+mdji/u4PbcbOBa2YTFOBuqwPJ2wFliTD66QZk6gc2FeNi0rH6JraBrgh3SNqwt0xh/z/J4cwMCEUmI+7glkaisRwqPdfrs9Jy9QAyaVMfo4QI8aiBi3hKtoSgJ/FHkps0ip13KoIQYWm5e+FPKJXU4OMQIDAQAB'; // 公有秘钥

