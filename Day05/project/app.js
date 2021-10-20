// 1.引入express模块
const express = require('express');
// 2.引入data.js自定义模块
const datajson = require('./data');
//3.创建web服务器
const app = express();
//4.监听端口8080
app.listen(8080, () => {
  console.log("web服务器启动成功");
})
//5.托管静态资源 ./public 文件夹
app.use(express.static("./public"));
//6.创建查询的路由 /list
app.get("/list", (req, res) => {
  //没有按照标准格式返回数据
  res.send(datajson);
})