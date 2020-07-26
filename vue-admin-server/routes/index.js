var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
  // 使用绝对定位打开views下面的html文件
});

module.exports = router;
