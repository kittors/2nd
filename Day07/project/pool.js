const mysql = require('mysql');
const pool = mysql.createPool({
  //host 主机地址
  host: '127.0.0.1',
  //端口号
  port: '3306',
  // 用户名
  user: 'root',
  // 密码
  password: '',
  // 需要连接的数据
  database: 'mydb',
  // 连接池限制的最大连接数
  connectionLimit: 15
});
module.exports = pool;