var createError = require('http-errors');

var express = require('express'); // 加载express模块

var path = require('path'); // 路径模块

// 这就是一个解析cookie工具，通过req.cookies可以取cookie
var cookieParser = require('cookie-parser');

// 在控制台中，显示req请求
var logger = require('morgan'); 

// 路由信息(接口地址),存放rooters的根目录
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
// api版本 v1
var apiVersion_1 = require('./api/v1/user')
// token 认证
var JwtUtil = require('./public/javascripts/jwt');
var app = express();

// view engine setup
// 设置视图根目录
app.set('views', path.join(__dirname, 'views'));
// 设置视图格式
app.set('view engine', 'ejs');

//设置跨域访问（设置在所有的请求前面即可）
app.all("*", function (req, res, next) {
  //设置允许跨域的域名，*代表允许任意域名跨域
  res.header("Access-Control-Allow-Origin", "*");
  //允许的header类型
  res.header("Access-Control-Allow-Headers", "content-type");
  //跨域允许的请求方式 
  res.header("Access-Control-Allow-Methods", "DELETE,PUT,POST,GET,OPTIONS");
  if (req.method == 'OPTIONS')
      res.send(200); //让options尝试请求快速结束
  else
      next();
});

// 载入中间件,登录拦截
app.use((req, res, next) => {
   // 把登陆和注册请求去掉了，其他的多有请求都需要进行token校验 
   console.log(req.url != '/api/v1/user/login' && req.url != '/api/v1/user/reg')
   if (req.url != '/api/v1/user/login' && req.url != '/api/v1/user/reg') {
    const token = req.headers['x-token'];
    let jwt = new JwtUtil(token);
    let result = jwt.verifyToken();
    if (result == 'err') {
        console.log(result);
        res.send({status: 403, msg: '登录已过期,请重新登录'});
    } else {
      next();
    }
  } else {
    next();
  }
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 配置路由，（自定义路径，上面设置的接口地址）
app.use('/', indexRouter);
app.use('/users', usersRouter);

// 映射路径,用户路径
app.use('/api/v1/user', apiVersion_1)

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
