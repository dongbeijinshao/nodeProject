/** 
 * 处理数据库交互，以及返回给前端数据业务
*/
// 实现与MySQL交互
var mysql = require('mysql');

// 连接数据库配置
var dbconf = require('../conf/db');

// 用于处理数组对象的库
var _ = require('lodash');

// 写专门的sql语句
var sql = require('../sql/user');

// 用于md5加密
var crypto = require('crypto');

// 生成uid的方法
var utils = require('../public/javascripts/utils')

// 使用连接池，提升性能
var pool  = mysql.createPool(_.extend({}, dbconf.mysql));

// token 认证
var JwtUtil = require('../public/javascripts/jwt');

// 抛出异常
var createError = require('http-errors');

module.exports = {
    add: function (req, res, next) { // 新增一个用户
        let { username, password, email, sex, birthday} = req.body
        if (!username || !password) {
            return res.status(404).send(next(createError(404, '必填项未填写完整')));
        }
        //对密码加密
        const md5 = crypto.createHash('md5'),
        md5password = md5.update(password).digest('hex');
        let promise = new Promise(function(resolve, reject){
            pool.getConnection(function(err, connection){
                if(err){
                    reject(err)
                } else {
                    connection.query(sql.queryByUser, [username], function(err, result){
                        if (err) {
                            reject(err)
                        } else {

                            resolve(result)
                        }
                        connection.release();
                    })
                }
            })
        });
        promise.then(function(res1){
            pool.getConnection(function(err, connection){
                if (err) {
                    console.log(err)
                } else {
                    let info;
                    if (res1.length > 0) {
                        info = {
                            code: 200,
                            msg: '用户名存在'
                        };   
                        res.json(info)
                    } else {
                        let hash = utils.hash()
                        connection.query(sql.insert, [hash, username, md5password, email, sex, birthday], (err, res2) =>{
                            if(res2) {
                                info = {
                                    code: 200,
                                    msg: '用户注册成功'
                                };    
                            }
                            // 释放连接 
                            connection.release();
                            res.json(info)
                        });
                    }
                    // 传递给前台json数据
                }
            })
        }), function(err) {
            console.log('连接失败', err);
        }
    },
    queryUserPwd: function (req, res, next) { // 给登录用户新增token
        let { username, password } = req.body;
        const md5 = crypto.createHash('md5'),
        md5password = md5.update(password).digest('hex');
        let promise = new Promise(function(resolve, reject){
            pool.getConnection(function(err, connection){
                if(err){
                    reject(err);
                } else {
                    connection.query(sql.queryByUserPwd, [username, md5password], function(err, result){
                        if(err) {
                            reject(err);
                        } else {
                            resolve(result)
                        }
                        connection.release();
                    });
                }
            })
        });
        promise.then((result)=> {
            let info;
            if(result.length > 0) {
                let uid = result[0]['uid']
                let jwt = new JwtUtil({uid});
                let token = jwt.generateToken();
                info = {
                    code: 200,
                    msg: '登录成功',
                    data: { token }
                };
            } else {
                info = {
                    code: '1',
                    msg: '登录失败'
                };
            }
            res.json(info)
        }), (err) => {
        }
    },
    queryById: function(req, res, next) { // 通过id查用户详情
        const token = req.body.token || req.query.token || req.headers['x-token'];
        let jwt = new JwtUtil(token);
        const result = jwt.verifyToken();
        let uid = result.uid;
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryById, [uid], (err, result) => {
                result = JSON.parse(JSON.stringify(result))
                let info;
                if (err) {
                    console.log(err)
                } else {
                    console.log('result', result)
                    if (result.length > 0) {
                        info = {
                            code: 200,
                            msg: '用户详情查询成功',
                            data: result[0]
                        }
                    } else {
                        info = {
                            code: 404,
                            msg: '找不到该用户详情',
                        }
                    }
                    console.log('info--->', info)
                    res.json(info);
                }
                connection.release();
            });
        });
    }
}