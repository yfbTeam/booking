import React from 'react';
import {Link,NavLink} from 'react-router-dom'
import { Layout, Menu, Icon } from 'antd';
const {Sider } = Layout;

export default class SiderBar extends React.Component{
    state = {
        collapsed: false,
    };
    onCollapse = (collapsed) => {
        this.setState({ collapsed });
    }
    render(){
        return(
            <Sider
                collapsible
                collapsed={this.state.collapsed}
                onCollapse={this.onCollapse}
            >
                <div className="logo" />
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
                </Menu>
            </Sider>
        )
    }
}