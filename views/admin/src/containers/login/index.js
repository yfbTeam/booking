import React from 'react';
import './index.css'
import { Form, Icon, Input, Button, Checkbox,Row, Col } from 'antd';
import {userService} from "../../api";
import {LoginFun} from "../../api/api";

const FormItem = Form.Item;

class LoginForm extends React.Component {
    handleSubmit = (e) => {
        var that = this;
        e.preventDefault();
        that.props.form.validateFields((err, values) => {
            if (!err) {
                console.log('Received values of form: ', values);
                LoginFun(userService,{name:values.userName,password:values.password},function(res){

                },function(err){
                    console.log(err)
                })
            }
        });
    }
    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Row>
                <Col span={6} offset={9}>
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('userName', {
                        rules: [{ required: true, message: 'Please input your username!' }],
                    })(
                        <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />} placeholder="Username" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('password', {
                        rules: [{ required: true, message: 'Please input your Password!' }],
                    })(
                        <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('remember', {
                        valuePropName: 'checked',
                        initialValue: true,
                    })(
                        <Checkbox>记住</Checkbox>
                    )}
                    <a className="login-form-forgot" href="">Forgot password</a>
                    <div>
                    <Button type="primary" htmlType="submit" className="login-form-button">
                        登录
                    </Button>
                    </div>
                    <div>
                    <a href="/register">注册</a>
                    </div>
                </FormItem>
            </Form>
                </Col>
            </Row>
        );
    }
}

 const Login = Form.create()(LoginForm);

export default Login

