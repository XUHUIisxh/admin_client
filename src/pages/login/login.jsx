import React, { Component } from 'react';
import { Form, Icon, Input, Button, message } from 'antd';
import { Redirect } from 'react-router-dom'
import { reqLogin } from '../../api';
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils';

import './login.less';
import logo from './images/logo.png';

// 登录的路由组件
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  handleSubmit = (event) => {
    event.preventDefault()
    this.props.form.validateFields(async (err, values) => {
      if (!err) {
        // console.log('发送ajax请求', values);
        // 发送登录请求
        const { username, password } = values
        const result = await reqLogin(username, password)
        // console.log(response);
        if (result.status === 0) {
          // 提示登录成功
          message.success('登录成功！')

          memoryUtils.user = result.data
          storageUtils.saveUser(result.data)

          // 跳转到路由管理界面
          this.props.history.replace('/')

        } else {
          // 提示错误信息
          message.error(result.msg)
        }

      } else {
        console.log('校验失败', err);
      }
    });


    // 得到form对象
    // const form = this.props.form

    // // 获取表单项的输入数据
    // const values = form.getFieldsValue()
    // console.log(values);

  }
  validataPass = (rule, value, callback) => {
    if (!value) {
      callback('请输入密码！')
    } else if (value.length < 4) {
      callback('密码长度不能小于4位！')
    } else if (value.length > 14) {
      callback('密码长度不能大于14位！')
    } else if (/^[a-zA-Z0-9_]$/.test(value)) {
      callback('只能包含数字字母以及大小写！')
    } else {
      callback()
    }
  }

  render() {
    const user = memoryUtils.user
    if (user && user._id) {
      return <Redirect to='/' />
    }

    const form = this.props.form
    const { getFieldDecorator } = form


    return (
      <div className='login'>
        <header className='login-header'>
          <img src={logo} alt="" />
          <h1>后台管理系统</h1>
        </header>
        <section className='login-content'>
          <h1>用户登录</h1>
          <Form
            onSubmit={this.handleSubmit}
            className="login-from"
          >
            <Form.Item>
              {
                getFieldDecorator('username', {
                  rules: [
                    { required: true, whitespace: true, message: '请输入用户名！' },
                    { min: 4, message: '用户名最少为4位！' },
                    { max: 14, message: '用户名最长为14位！' },
                    { pattern: /^[a-zA-Z0-9_]+$/, message: '用户名只能包含数字大小写以及下划线！' }
                  ],
                  initialValue: 'admin'
                })(
                  <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="账号" />
                )
              }
            </Form.Item>
            <Form.Item>
              {
                getFieldDecorator('password', {
                  rules: [
                    { validator: this.validataPass }
                  ]
                })(
                  <Input
                    prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                    type="password"
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
      </div >
    );
  }
}

/*
1. 高阶函数
    1). 一类特别的函数
        a. 接受函数类型的参数
        b. 返回值是函数
    2). 常见
        a. 定时器: setTimeout()/setInterval()
        b. Promise: Promise(() => {}) then(value => {}, reason => {})
        c. 数组遍历相关的方法: forEach()/filter()/map()/reduce()/find()/findIndex()
        d. 函数对象的bind()
        e. Form.create()() / getFieldDecorator()()
    3). 高阶函数更新动态, 更加具有扩展性

2. 高阶组件
    1). 本质就是一个函数
    2). 接收一个组件(被包装组件), 返回一个新的组件(包装组件), 包装组件会向被包装组件传入特定属性
    3). 作用: 扩展组件的功能
    4). 高阶组件也是高阶函数: 接收一个组件函数, 返回是一个新的组件函数
 */
/*
包装Form组件生成一个新的组件: Form(Login)
新组件会向Form组件传递一个强大的对象属性: form
 */
const WrapLogin = Form.create()(Login)

export default WrapLogin;
/*
1. 前台表单验证
2. 收集表单输入数据
 */

/*
async和await
1. 作用?
   简化promise对象的使用: 不用再使用then()来指定成功/失败的回调函数
   以同步编码(没有回调函数了)方式实现异步流程
2. 哪里写await?
    在返回promise的表达式左侧写await: 不想要promise, 想要promise异步执行的成功的value数据
3. 哪里写async?
    await所在函数(最近的)定义的左侧写async
 */