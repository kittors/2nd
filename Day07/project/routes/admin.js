//引入express
const express = require('express');
//引入连接池模块
const pool = require('../pool');
// 创建路由对象
const router = express.Router();
// 下面为所有的路由
// 1.管理员登录接口
// post /admin/losgin
// 访问接口地址 :http://127.0.0.1:8080/admin/login
router.post('/login', (req, res, next) => {
  // 看看前台的请求是否发送了
  console.log('post接口有访问了');
  // 查看请求的参数
  let obj = req.body;
  console.log(obj);
  // 执行sql到数据库查询数据
  // 以下是验证sql语句正确(可以注释)
  // 后台要和前台协商传输来的参数属性名
  // let sql = `select * from admin where a_names ="${obj.anames}" and a_pwd="${obj.apwd}";`
  // console.log(sql);

  // 执行sql命令
  pool.query("select * from admin where a_names = ? and a_pwd =?", [obj.anames, obj.apwd], (err, data) => {
    // 统一的错误处理中间件
    if (err) {
      next(err);
      return;
    }
    // 处理返回结果
    // 查看数据是否从数据库拿回
    console.log(data);

    if (!!data.length) {
      res.send({
        code: 1,
        msg: "找到该用户"
      });
    } else {
      res.send({
        code: 0,
        msg: "没有找到该用户"
      });

    }

  });
});
// 2.管理员查询所有用户信息接口 get 
// get /list
// 访问接口地址 :http://127.0.0.1:8080/admin/list
router.get('/list', (req, res, next) => {
  // 验证是否有访问
  console.log("list接口有人访问了")
  // console.log(req.body);
  // 验证sql select * from userinfo
  pool.query("select * from userinfo;", (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    res.send({
      code: 1,
      msg: '返回所有数据',
      data: data
    })
  });
});
// 3.管理员查询一个用户信息
// get /query
// 访问的接口地址:http://127.0.0.1:8080/admin/query
// 路由对象的get方法(接口地址,回调函数)
router.get('/query', (req, res, next) => {
  console.log("query接口有人访问了");
  // 获取前台传参
  let obj = req.query;
  console.log(obj);

  // 连接数据库(传入sql)
  pool.query("select * from userinfo where u_names = ?", [obj.uname], (err, data) => {
    // 错误处理
    if (err) {
      next(err);
      return;
    }
    // 返回查询数据
    console.log(data);
    if (!!data.length) {
      // 查到返回1.查到该用户,用户数据
      res.send({
        code: 1,
        msg: "找到该用户",
        data: data
      });
    } else {
      // 没查到返回0,未查到该用户
      res.send({
        code: 0,
        msg: "没有找到该用户"
      });
    }
  });
});

// 4.管理员删除用户信息
// delete /del 接收参数方式 /del/:uid
//访问接口地址:http://127.0.0.1:8080/del
// 备注:前台的传参方式不是?,直接 /参数
//RESTful风格的传递和接收方式req.params
router.delete('/del/:uid', (req, res, next) => {
  let obj = req.params;
  console.log(obj);
  pool.query('delete from userinfo where u_id = ?', [obj.uid], (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    if (data.affectedRows === 1) {
      // 说明 删除失败
      res.send({
        code: 1,
        msg: '删除成功'
      });

    } else {
      res.send({
        code: 0,
        msg: '删除失败'
      });
    }
  });
});

// 暴露路由对象
module.exports = router;