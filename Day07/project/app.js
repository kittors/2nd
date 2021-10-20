// 1.引入express
const express = require('express');
// 6.引入用户路由和管理员路由
const userRouter = require('./routes/user');
const adminRouter = require('./routes/admin');
// 2.创建web服务器
const app = express();
// 3.监听8080端口
app.listen(8080, () => {
  console.log("WEB服务器已经启动");
})
// 4.托管静态资源
app.use(express.static("./views"));
// 5.express.urlencoded中间件
app.use(express.urlencoded({
  extended: false
}));
// 用用户模块的时候 /user/edit 修改
// 7.挂载用户路由 /user   
app.use('/user', userRouter);
// 8.挂载管理员路由  /admin
app.use('/admin', adminRouter);

// 处理错误的中间件
app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({
    code: 500,
    msg: "服务器错误"
  });
});
