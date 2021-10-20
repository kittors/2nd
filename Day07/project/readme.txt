day07 项目接口说明
模块一：管理员模块
1.管理员登陆
接口地址：http://127.0.0.1:8080/admin/login
客户端接口：/admin/login
方式：POST
客户端传参数的属性名：
（1）用户名：anames 
（2）密码：apwd

2.管理员查询所有用户列表
接口地址：http://127.0.0.1:8080/admin/list
客户端接口：/admin/list
方式：GET
客户端传参数的属性名：无需传参

3.管理员查询通过用户名查询用户
接口地址：http://127.0.0.1:8080/admin/query
客户端接口：/admin/query
方式：GET
客户端传参数的属性名：
(1)用户的名字：unames

4.管理员删除用户信息
接口地址：http://127.0.0.1:8080/admin/del
客户端接口：/admin/del
方式：DELETE
客户端传参数的属性名：
(1)用户的名字：uid
注意：RESTful风格的传递和接收方式  例如：/admin/del/10

模块二：用户模块
1.用户的注册(新增)信息
接口地址：http://127.0.0.1:8080/user/reg
客户端接口:/user/reg
方式：POST
客户端传参数的属性名:(只用占位，整个对象需要保持字段名与传递数据的参数key一致)
(1)用户的名字:u_names
(2)用户的电话号:u_phone
(3)用户是否会员:u_member

2.用户修改个人信息
接口地址：http://127.0.0.1:8080/user/edit
客户端接口：/user/edit
方式:PUT
客户端传参数的属性名:
(1)用户的名字:u_names
(2)用户的电话号:u_phone
(3)用户是否会员:u_member
(4)用户修改前的旧手机号:old_phone
