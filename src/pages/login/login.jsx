import React, {Component } from 'react'
import { 
  Form,
  Icon, 
  Input, 
  Button } from 'antd';
import './login.less'
import logo from './images/logo.png'
  
const Item = Form.Item // 不能写在import之前

/**
 * 登录的路由组建
 */
class Login extends Component {
  
  handleSubmit = (event) => {
    // 阻止事件的默认行为
    event.preventDefault()

    // 对所有表单字段进行检验
    this.props.form.validateFields((err, values) => {
      // 校验成功
      if (!err) {
        console.log('提交登录的ajax请求 '+ values);
      } else {
        console.log("校验失败");
      }
    });

    // 得到form对象
    // const form = this.props.form
    // // 获取表单项的输入数据
    // const values = form.getFieldsValue()
    // console.log('loginSumbit', values);
    
  }

  /**
   * 对密码自定义验证
   */
  validatePwd = (rule, value, callback) => {
    console.log('validatePwd()',rule, value);
    if(!value){
      callback("密码必须输入")
    }else if(value.length<=4){
      callback("密码长度不能小于4")
    }else if (value.length >= 12){
      callback("密码长度不能大于12")
    }else if(!/^[a-zA-Z0-9_]+$/.test(value)){
      callback("密码必须是英文数字下划线")
    } else {
      callback() // 验证通过
    }
    // callback("xxxx") // 验证失败,指定提示文本
  }

  render(){
    // 得到强大功能的form对象(将form对象属性包装到作为参数的组件中)
    // const form = this.props.form;
    const { getFieldDecorator } = this.props.form;

    return (
      <div className="login">
        <header className="login-header">
          <img src={logo} alt="logo"></img>
          <h1>React项目, 后台管理系统</h1>
        </header>
        <section className="login-content">
          <h2>用户登录</h2>
          <Form onSubmit={this.handleSubmit} className="login-form">
            <Item>
              {
                getFieldDecorator('username',{ // 配置对象, 属性名是特定的一些名称
                  // 声明式验证: 直接使用别人定义好的验证规则进行验证
                  rules: [
                    {required: true,whitespace: true, message: 'Please input your username!'},
                    {min: 4, message: '用户名至少为4位'},
                    {max: 12, message: '用户名最多12位'},
                    {pattern: /^[a-zA-Z0-9_]+$/, message: '用户名必须是字母数字下划线'},
                  ],
                })( 
                  <Input
                    prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="用户名"
                  />
                )
              }
            </Item>
            <Form.Item>
              {
                getFieldDecorator('password',{
                  rules: [
                    {
                      validator: this.validatePwd
                    }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    placeholder="密码"
                  />
                )
              }
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit" className="login-form-button">
                登录
              </Button>
            </Form.Item>
          </Form>
        </section>
      </div>
    )
  }
}

/**
 * 1. 高阶函数
 *    1）、一类特别函数
 *        a、接收函数类型的参数
 *        b、返回值是函数
 *    2)、常见  
 *        a、定时器：setTimeout() / setInterval()
 *        b、Promise: Promise(() => {}) then (value=>{},reason=>{})
 *        c、数组遍历方法, forEach() filter() map() reduce() find() findIndex()
 *        d、函数对象的bind()方法, 
 *        e、 Form.create()() / getFieldDecorator()()
 *    3)、高阶函数更新动态, 更加具有扩展性
 * 2. 高阶组件
 *    1)、本质是一个函数
 *    2)、接受一个组件(被包装组件), 返回一个新的组件(包装组件), 新组件内部渲染被包装的组件 传入特定属性
 *    3)、作用：扩展组件的功能
 *    4）、高阶组件你也是高阶函数
 * /
/**
 * 包装Form组件 生成新的组件 Form(Login)
 * 新组件会向Form组件传递一个强大的对象属性, form
 */
const WrapLogin = Form.create()(Login)
export default WrapLogin
// export default Login;
/**
 * 1. 前台表单验证
 * 2. 收集表单输入数据
 */