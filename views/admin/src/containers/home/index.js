import React from  'react';
import './index.css';
import SiderBar from '../../components/common'
import { Layout, Breadcrumb } from 'antd';
const {Content} = Layout;

export default class Home extends React.Component{
    render() {
        return (
            <Layout style={{ minHeight: '100vh' }}>
                <SiderBar />
                <Layout>
                    <Content style={{ margin: '16px' }}>
                        <div style={{ padding: 24,fontSize:'3vh', background: '#fff',minHeight: '96vh',display:'flex',justifyContent:'center',alignItems:'center'}}>
                            欢迎来到汽车票订票系统
                        </div>
                    </Content>
                </Layout>
            </Layout>
        );
    }
}
