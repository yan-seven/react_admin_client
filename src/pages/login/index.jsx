import React, { Component } from 'react'
import { Form, Input, Button, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import './login.less'
import logo from '../../assets/imgs/8.jpg'
import {reqLogin} from '../../api'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import { Redirect } from 'react-router-dom';


export default class Login extends Component {
    render() {
        if(memoryUtils.user&&memoryUtils.user._id){
            return <Redirect to='/' />
        }
        const onFinish =async (values) => {
            const {username,password}=values
            const response=await reqLogin(username,password)
            const result=response
            if(result.status===0){
                const user=result.data
                memoryUtils.user=user
                storageUtils.saveUser(user)
                console.log(memoryUtils.user)
                message.success('登陆成功')
                this.props.history.push('/')
            }else{
                message.error(result.msg)
            }
          };

        return (
            <div className="login">
               <header className="login-header">
                   <img src={logo} alt='图标'/>
                   <h1>后台管理系统</h1>
               </header>
                <section className="login-content">
                    <h2>用户登录</h2>
                        <Form name="normal_login" className="login-form"
                            onFinish={onFinish}
                            >
                            <Form.Item
                                name="username"
                                rules={[
                                {
                                    required: true,
                                    message: '用户名必须输入',
                                },
                                {
                                    max:8,
                                    message:'用户名最多8位'
                                }
                                ]}
                            >
                                 <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="用户名" />
                                </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[
                                {
                                    required: true,
                                    message: '密码必须输入',
                                },
                                {
                                    pattern:/^[a-zA-Z0-9_-]{2,16}$/,
                                    message: '密码必须为8-16位，由英文、数字或下划线组成',
                                },
                                ]}
                            >
                            <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="密码"
                            />
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
