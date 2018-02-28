import React from 'react';
import ReactDOM from "react-dom";
import Login from '../containers/login'
import Cookies from 'js-cookie'
import { Redirect} from 'react-router-dom'
import {userService} from "../api";
import {LogOut} from '../api/api'
import {Link,NavLink} from 'react-router-dom'
import { Layout, Menu, Icon ,Button} from 'antd';


const {Content,Sider } = Layout;


export default class Common extends React.Component{
    constructor(props){
        super(props);
        this.state={
            collapsed: false,
            name:'',
            redirect:false
        }
    }
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    render(){
        if(this.state.redirect){
            return <Redirect to="/" />
        }
        return(
            <Layout style={{ minHeight: '100vh' }}>
                <Sider
                    collapsible
                    collapsed={this.state.collapsed}
                    onCollapse={this.onCollapse}
                >
                    <div style={{padding:'16px'}}>
                        <span style={{color:'#fff'}}>{this.state.name}</span>
                        <Button onClick={this.logout} type="primary" style={{float:'right'}}>退出</Button>
                    </div>
                    <Menu theme="dark" defaultSelectedKeys={['1']} mode="inline">
                        <Menu.Item key="1">
                            <NavLink to="/">
                                <Icon type="home" />
                                <span>首页</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="2">
                            <NavLink to="/users">
                                <Icon type="user" />
                                <span>用户管理</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="3">
                            <NavLink to="/roles">
                                <Icon type="bars" />
                                <span>角色管理</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="4">
                            <NavLink to="/price">
                                <Icon type="bars" />
                                <span>票价管理</span>
                            </NavLink>
                        </Menu.Item>
                        <Menu.Item key="5">
                            <NavLink to="/order">
                                <Icon type="bars" />
                                <span>订单管理</span>
                            </NavLink>
                        </Menu.Item>
                    </Menu>
                </Sider>
                <Layout>
                    <Content style={{ margin: '16px' }}>
                        {this.props.children}
                    </Content>
                </Layout>
            </Layout>
        )
    }
    logout = () =>{
        var that = this;
        LogOut(userService,(res)=>{
       if(res.status==0){
           that.setState({
               redirect:true
           })
           ReactDOM.unmountComponentAtNode(document.getElementById('root'))
           ReactDOM.render(<Login/>,document.getElementById('root'))
       }
        },(err)=>{

        })
    }
    componentDidMount(){
        var name = Cookies.get('name');
        this.setState({
            name:name
        })
    }
}