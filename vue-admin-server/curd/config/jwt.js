var jwt = require("jsonwebtoken");  //引用jws模块

//用es6的语法对生成Token和验证Token方法进行函数的封装
class Token {
    createToken(uid, time) {
        var payload = { uid }  // Token 数据
        var secret = 'gys.com' // 这是加密的key（密钥或私钥） 
        var token = jwt.sign(payload, secret, {
            expiresIn: time // 24小时过期,以秒作为单位
        })
        return token;
    }
    checkToken(token, fn) {
        var secret = 'gys.com' // 这是加密的key（密钥或私钥） 
        jwt.verify(token, secret, function (err, decode) {
            if (err) { // 当token过期，或这是一个伪造的token，或这是无效的token时会触发此逻辑 
                console.log(err)
                fn(false, err);
            } else {
                console.log(decode.msg);
                fn(true, decode);
            }
        })
    }
}
module.exports = Token;
