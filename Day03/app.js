//1.引入express模块
var express = require('express');
//2.创建web服务器
var app = express();
//3.设置监听端口为8080
app.listen(8080, () => {
  console.log('web服务器启动成功')
});
//4.使用中间价托管静态资源文件
app.use(express.static('./public'));
//5.使用get方法创建路由 (get /nodeget)
app.get('/nodeget', (req, res) => {
  console.log('有人访问了我');
});