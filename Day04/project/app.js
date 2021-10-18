//1.引入express模块
const express = require('express');
//引入自定义模块
const datajson = require('./data');
//2.创建web/服务器
const app = express();
//3.监听端口8080
app.listen(8080, () => {
  console.log('web服务器启动成功');
});
//4.静态资源托管
app.use(express.static('./public'));
//urlencoded 格式又叫做form格式
app.use(express.urlencoded({ extended: false }));
//路由（get /list）查询
//易错点：地址没有点
app.get('/list', (req, res) => {
  //1.看看是否前台访问了/list接口
  console.log('有人访问了我');
  res.send(datajson);
});
//2.使用APIpost get方法发送，使用端口/list
//http://127.0.0.1:8080/list

//路由 (get/query)查询一条数据
app.get('/query', (req, res) => {
  //get请求的参数 存在req.query里
  console.log(req.query);
  let obj = req.query;
  //datajson是个数组
  //obj长这样{id:'3'}
  //obj.id是'3'  obj.id-1 =='3'-1==2  如果+1可以通过-0+1
  //datajson[obj.id-1]
  res.send(datajson[obj.id - 1]);
});

//post方式传递参数，需要一个中间件解析表单的数据（建议写在上面静态托管下面）

//路由 （post /login）
app.post("/login", (req, res) => {
  //post接收参数使用req.body
  console.log(req.body);
  // { id: '5', name: 'tom' }
  //假设真正的能登录的{id:3,name:jack}
  const zzd = { id: '3', name: 'jack' };
  //拿到了前台传来的数据
  let obj = req.body;
  //需要比对
  // res.send(zzd.name);
  if (obj.name == zzd.name) {
    //说明用户名name对上了
    res.send({
      code: 1,
      msg: '登录成功'
    });
  } else {
    //反之就是name没有对上
    res.send({
      code: 0,
      msg: '登录失败'
    });
  }
});

//路由 (put/edit)修改
app.put('/edit', (req, res) => {
  //传递和接收参数的方式都和post一致
  console.log(req.body);
  //返回内容
  res.send({
    code: 1,
    msg: "修改了一条数据",
    data: req.body//前台发来的数据,后台再发回去(不是必须要这样做)
  })

});

//路由 (delete/delete)删除
app.delete("/delete", (req, res) => {
  //和get一样参数存在于req.query里了
  res.send({
    code: 1,
    msg: "删除成功",
    data: req.query
  })

})