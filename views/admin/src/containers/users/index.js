import React from  'react';

import SiderBar from '../../components/sider'
import { Layout, Breadcrumb  } from 'antd';
const {Content,Header} = Layout;

export default class Users extends React.Component{

    render(){
        return(
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <SiderBar />
                    <Layout>

                        <Content style={{ margin: '16px' }}>
                            <Header style={{ background: '#fff', padding: 0,marginBottom:'16px' }} />
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>

                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }

}