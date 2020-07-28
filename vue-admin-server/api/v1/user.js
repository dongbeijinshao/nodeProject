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
    curdUser.login(req, res, next)
});

/** 
 *  用户查询详情
 */
router.get('/info', (req, res, next) => {
   curdUser.userInfo(req, res, next)
})

/** 
 *  用户退出 
 */

router.post('/logout', (req, res, next) => {
    curdUser.logout(req, res, next)
 })

module.exports = router;


