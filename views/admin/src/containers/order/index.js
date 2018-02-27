import React from  'react';
import moment from 'moment'
import SiderBar from '../../components/sider'
import {roleService,userService} from '../../api/index';
import {getList, Add, Edit, Delete} from '../../api/api';
import { Layout, Breadcrumb,Table,Button,Modal,Input,Form ,message,Radio,DatePicker  } from 'antd';
import {orderService, priceService} from "../../api";


const FormItem = Form.Item;
const {Content,Header} = Layout;
const RadioGroup = Radio.Group;

export default class Users extends React.Component{
    constructor(props){
        super(props);
        this.state={
            _id:"",
            price:{},
            phone:'',
            address:"",
            num:1,
            date:"",
            list:[],
            visible:false,
            visible1:false,
            columns: [{
                title: '出发时间',
                dataIndex: 'goTime',
                key: 'goTime'
            },{
                title:'人数',
                dataIndex: 'peopleNum',
                key: 'peopleNum'
            },{
                title:'票价',
                dataIndex: 'price.price',
                key: 'price.price'
            },{
                title:'电话',
                dataIndex: 'phone',
                key: 'phone'
            },{
                title:'地址',
                dataIndex: 'address',
                key: 'address'
            },{
                title:"创建时间",
                dataIndex:'createdAt',
                key: 'createdAt'
            },{
                title: '操作',
                key: '_id',
                render: (text, item) => (
                    <span>
                        <Button type="primary"  onClick={(e)=>{this.editModal(item)}}>编辑</Button>
                        <Button type="danger"  onClick={(e)=>{this.handleDelete(item._id)}}>删除</Button>
                    </span>
                )
            }],
            pagination:{
                hideOnSinglePage:true
            },
        }
    }
    render(){
        return(
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <SiderBar />
                    <Layout>

                        <Content style={{ margin: '16px' }}>
                            <Header style={{ background: '#fff', padding: 16,marginBottom:'16px' }} >订单管理</Header>
                                <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                <Button type="primary" style={{marginBottom:"16px"}} onClick={this.showModal}>增加</Button>
                                <Table columns={this.state.columns} dataSource={this.state.list} pagination={this.state.pagination}/>
                                <Modal
                                    title="新增订单"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Form>
                                        <FormItem
                                            label='电话'
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span:18 }}

                                        >
                                            <Input placeholder="请输入电话号" onChange={this.handlePhoneChange} type="number"/>
                                        </FormItem>
                                        <FormItem
                                            label='出发时间'
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span:18 }}
                                        >
                                            <DatePicker onChange={this.changeGoTime} format={'YYYY-MM-DD'}/>
                                        </FormItem>
                                        <FormItem
                                            label='人数'
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span:18 }}
                                        >
                                            <Input placeholder="请输入人数" onChange={this.handleNumChange} type="number"/>
                                        </FormItem>
                                        <FormItem
                                            label='票价'
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span:18 }}
                                        >
                                            <span>{this.state.price.price}</span>
                                        </FormItem>
                                        <FormItem
                                            label='地址'
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span:18 }}
                                        >
                                            <Input placeholder="请输入详细地址" onChange={this.handleAddressChange}/>
                                        </FormItem>
                                    </Form>
                                </Modal>
                                <Modal
                                    title="编辑订单"
                                    visible={this.state.visible1}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Form>
                                        <FormItem
                                            label='电话'
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span:18 }}

                                        >
                                            <Input placeholder="请输入电话号" onChange={this.handlePhoneChange} type="number" value={this.state.phone}/>
                                        </FormItem>
                                        <FormItem
                                            label='出发时间'
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span:18 }}
                                        >
                                            <DatePicker onChange={this.changeGoTime} defaultValue={moment(this.state.date, 'YYYY-MM-DD')} format={'YYYY-MM-DD'}/>
                                        </FormItem>
                                        <FormItem
                                            label='人数'
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span:18 }}
                                        >
                                            <Input placeholder="请输入人数" onChange={this.handleNumChange} type="number" value={this.state.num}/>
                                        </FormItem>
                                        <FormItem
                                            label='票价'
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span:18 }}
                                        >
                                            <span>{this.state.price.price}</span>
                                        </FormItem>
                                        <FormItem
                                            label='地址'
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span:18 }}
                                        >
                                            <Input placeholder="请输入详细地址" onChange={this.handleAddressChange} value={this.state.address}/>
                                        </FormItem>
                                    </Form>
                                </Modal>
                            </div>
                        </Content>
                    </Layout>
                </Layout>
            </div>
        )
    }
    changeGoTime = (date,dateString)=>{
        this.setState({
            date:date
        })
    }
    editModal = (obj)=>{
        this.setState({
            visible1: true,
            address:obj.address,
            phone:obj.phone,
            num:obj.peopleNum,
            date:obj.goTime,
            _id:obj._id,
            price:obj.price
        });
    }
    showModal = ()=>{
        this.setState({
            visible: true,
        });
    }
    handlePhoneChange=(e)=>{
        this.setState({
            phone:e.target.value
        })
    }
    handleNumChange=(e)=>{
        this.setState({
            num:e.target.value
        })
    }
    handleAddressChange=(e)=>{
        this.setState({
            address:e.target.value
        })
    }
    handleDelete = (id)=>{
        var that = this;
        Modal.confirm({
            title: '提示',
            content: '您确定要删除该数据吗',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                Delete(orderService+`/${id}`,(res)=>{

                    var items = [];
                    var list = that.state.list
                    for(var i=0;i<list.length;i++){
                        if(list[i]._id !== id){
                            items.push(list[i])
                        }
                    }
                    that.setState({
                        list:items
                    })
                    message.success('成功删除数据');
                },(err)=>{
                    console.log(err);
                })
            }
        });

    }
    handleOk = (e) => {
        var that = this;
        Add(orderService,{goTime:this.state.date,phone:this.state.phone,address:this.state.address,peopleNum:this.state.num,price:this.state.price._id},(res)=>{
            var list = that.state.list;
            res.price = that.state.price
            list.push(res);
            that.setState({
                list:list,
                visible:false
            })
        },(err)=>{
            console.log(err);
        })
    }
    editOk = ()=>{
        const _id = this.state._id,name = this.state.name,value=this.state.value
        Edit(userService+`/${_id}`,{name:name,role:value},(res)=>{
            this.getUserList();
            this.setState({
                visible1: false
            })
        },(err)=>{
            console.log(err);
        })
    }
    getPrice = ()=>{
        getList(priceService,(res)=>{
            this.setState({
                price:res[0]
            })
        })
    }
    fetch = ()=>{
        getList(orderService,(res)=>{
            this.setState({
                list:res
            })
        })
    }
    handleCancel = (e) => {
        this.setState({
            visible: false,
            visible1:false
        });
    }
    componentDidMount(){
       this.fetch();
       this.getPrice();
    }
}