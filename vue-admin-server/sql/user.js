var user = {
  insert:'INSERT INTO user(uid, username, password, email, sex, birthday) VALUES(?,?,?,?,?,?)',
  delete: 'delete from user where uid=?',
  update:'update user set username=?, password=? where uid=?',
  queryById: 'select * from user where uid=?',
  queryByUser: 'select * from user where username=?',
  queryByUserPwd: 'select * from user where username=? and password=?',
  queryAll: 'select * from user'
};

module.exports = user;