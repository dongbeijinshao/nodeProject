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

var tokenObj = require('./config/jwt');
          

module.exports = {
    add: function (param, res, next) {
        let { username, password, email, sex, birthday} = param
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
                        connection.query(sql.insert, [hash, username, md5password, email, sex, birthday], function(err, res2) {
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
    queryUserPwd: function (param, res) {
        let { username, password } = param;
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
                let authToken = new tokenObj();
                let token = authToken.createToken(result[0]['uid'], 60 * 15);
                info = {
                    code: 200,
                    msg: '登录成功',
                    data: { token }
                };
                console.log('1111', token)
            } else {
                info = {
                    code: '1',
                    msg: '登录失败'
                };
            }
            res.json(info)
        }), (err) => {
            console.log('err--->', err)
        }
    },
    delete: function(param, res, next) {
        pool.getConnection(function(err, connection) {
            var id = +req.query.id;
            connection.query(sql.delete, id, function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'delete';
                }
                json(res, result);
                connection.release();
            });
        });
    },
    update: function(req, res, next) {
        var param = req.body;
        if (param.name == null || param.age == null || param.id == null) {
            json(res, undefined);
            return;
        }
        pool.getConnection(function(err, connection) {
            connection.query(sql.update, [param.name, param.age, +param.id], function(err, result) {
                if (result.affectedRows > 0) {
                    result = 'update'
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryById: function(req, res, next) {
        var id = +req.query.id;
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryById, id, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'select',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    },
    queryAll: function(req, res, next) {
        pool.getConnection(function(err, connection) {
            connection.query(sql.queryAll, function(err, result) {
                if (result != '') {
                    var _result = result;
                    result = {
                        result: 'selectall',
                        data: _result
                    }
                } else {
                    result = undefined;
                }
                json(res, result);
                connection.release();
            });
        });
    }
}