/** 
 * 处理路由，以及映射相应 的业务操作
*/
var express = require('express');
var router = express.Router();

var curdUser = require('../../curd/user');

var tokenObj = require('../../curd/config/jwt');

/**
 *  用户注册模块
 */

 router.post('/reg', (req, res, next) => {
     // 获取数据
    const param = req.body;
    if (!param.username || !param.password) {
        res.send({'code': '1', 'msg': '必填字段未填写'})
    }
    curdUser.add(param, res)
 });

router.post('/login', (req, res, next) => {
    // 获取前台页面传过来的参数
    const param = req.body;
    curdUser.queryUserPwd(param, res)
});

router.get('/info', (req, res, next) => {
    const token = req.body.token || req.query.token || req.headers['x-token'];
    if (token) {
        let authToken = new tokenObj();
        authToken.checkToken(token, function (checked, decode) {
            if (checked) {
               const uid = decode.uid;
               console.log('uid--->', uid);
               next();
            }
        });
    }
   
})

module.exports = router;


