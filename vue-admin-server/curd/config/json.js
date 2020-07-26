//json.js
//封装接送模块
var json = function(res, result = {flag: null}) {
  let info = {}
  switch (result.flag) {
    case 'add':
      info = {
        code: 200,
        msg: result.msg ? result.msg : '添加成功'
      };
      break;
    case 'delete':
      info = {
        code: 200,
        msg: result.msg ? result.msg : '删除成功'
      };
      break;
    case 'update':
      info = {
        code: 200,
        msg: result.msg ? result.msg : '修改成功'
      };
      break;
    case 'select':
      info = {
        code: 200,
        data: result.data,
        msg: result.msg ? result.msg : '查询成功'
      };
      break;
    case 'selectAll':
      info = {
        code: 200,
        data: result.data,
        msg: result.msg ? result.msg : '查询所有成功'
      };
      break;
    default:
      info = {
        code: '1',
        msg: result.msg ? result.msg : '操作失败'
      }
      break;
  }
  res.json(info)

};
module.exports = json;