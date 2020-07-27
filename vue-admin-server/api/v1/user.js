/** 
 * 处理路由，以及处理映射相应
*/
var express = require('express');
var router = express.Router();

var curdUser = require('../../curd/user');


/**
 *  用户注册模块
 */
 router.post('/reg', (req, res, next) => {
    curdUser.add(req, res, next)
 });

/** 
 * 用户登录 
 */
router.post('/login', (req, res, next) => {
    curdUser.queryUserPwd(req, res, next)
});

/** 
 *  用户查询详情
 */
router.get('/info', (req, res, next) => {
    console.log('info')
   curdUser.queryById(req, res, next)
})

router.get('/test', (req, res, next) => {
    console.log(req, res);
    res.json({
        code: 200,
        data: {
            a:'hello',
            b:'world'
        },
        msg: '接口调取成功'

    })
})

module.exports = router;


