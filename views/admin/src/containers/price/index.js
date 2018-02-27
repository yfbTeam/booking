import React from 'react';
import SiderBar from '../../components/sider'
import {priceService} from '../../api/index';
import {getList, Add, Edit, Delete} from '../../api/api';
import { Layout, Breadcrumb,Table,Button,Modal,Input,Form ,message } from 'antd';
import {userService} from "../../api";


const FormItem = Form.Item;
const {Content,Header} = Layout;

export default class Price extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            _id:"",
            price:""
        }
    }
    render(){
        return(
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <SiderBar />
                    <Layout>

                        <Content style={{ margin: '16px' }}>
                            <Header style={{ background: '#fff', padding: 16,marginBottom:'16px' }} >票价管理</Header>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                <Form onSubmit={this.handleSubmit}>
                                    <FormItem
                                        label='票价'
                                        labelCol={{ span: 2 }}
                                        wrapperCol={{ span:6 }}

                                    >
                                        <Input placeholder="请输入票价" onChange={this.handleChange} type="number" value={this.state.price}/>
                                    </FormItem>
                                    <FormItem>
                                        <Button type="primary" htmlType="submit" className="login-form-button" style={{marginLeft:'8.33333333%'}}>
                                           保存
                                        </Button>
                                    </FormItem>
                                </Form>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
    handleChange = (e)=>{
        this.setState({
            price:e.target.value
        })
    }
    handleSubmit = (e)=>{
        e.preventDefault();
        let price = this.state.price;
        if(price===''){
            Add(priceService,{price:price},function(res){
                this.setState({
                    price:res.price
                })
                message.success('成功创建数据');
            },function(err){
                console.log(err);
            })
        }else{
            var _id = this.state._id;
            Edit(priceService+`/${_id}`,{price:price},(res)=>{
                this.setState({
                    price:price
                })
                message.success('成功编辑数据');
            },(err)=>{
                console.log(err);
            })
        }
    }
    fetch = ()=>{
        var that = this;
        getList(priceService,function(res){
            that.setState({
                _id:res[0]._id,
               price:res[0].price
           })
        },function(err){
            console.log(err)
        })
    }
    componentDidMount(){
        this.fetch();
    }
}