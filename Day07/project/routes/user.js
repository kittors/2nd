//引入express
const express = require('express');
//引入连接池模块
const pool = require('../pool');
// 创建路由对象
const router = express.Router();
// 下面为所有的路由
// 1.用户注册的接口
// post /reg
// 访问接口: http://127.0.0.1:8080/user/reg
router.post('/reg', (req, res, next) => {
  //接收参数
  let obj = req.body;
  // insert into userinfo set? 直接把obj整体放入
  // 使用这种方式时，传参的字段名需要和数据库对应的字段名相同
  pool.query("insert into userinfo set ?", [obj], (err, data) => {
    if (err) { next(err); return }
    // 查看返回内容
    console.log(data);
    // 这里的判断我觉的没有意义，data.affectedRows只可能为1，不然就会违反数据库的中userinfo表的列约束，从而触发上方的服务器错误
    if (data.affectedRows) {
      res.send({
        code: 1,
        msg: '注册成功',
        data: data
      });
    } else {
      res.send({
        code: 0,
        msg: '注册失败',
      });
    }

  });
});

//用户修改信息 
// 请求方式put /edit 
// 接口访问地址 http://127.0.0.1:8080/user/edit
router.put('/edit', (req, res, next) => {
  let obj = req.body;
  // 判断是否各项为空
  console.log(obj);
  // 后台写判断空值浪费服务器资源，一般都是在前台判断了
  // let i = 400;
  // for (let k in obj) {
  //   i++
  //   if (!obj[k]) {
  //     res.send({
  //       code: i,
  //       msg: k + "不能为空"
  //     });
  //     return;
  //   }
  // }
  let sql = `update userinfo set u_names='${obj.u_names}',u_phone='${obj.u_phone}',u_member=${obj.u_member} where u_phone='${obj.oldphone}';`;
  pool.query(sql, (err, data) => {
    if (err) {
      next(err);
      return;
    }
    console.log(data);
    // 如果affectedRows为0则是修改失败反之则是修改成功
    if (data.affectedRows === 0) {
      res.send({
        code: 0,
        msg: '修改失败'
      });
    } else {
      res.send({
        code: 1,
        msg: '修改成功'
      });
    }
  });
});
// 暴露路由对象
module.exports = router;