import React from  'react';

import Common from '../../components/common'
import {userService,roleService} from '../../api/index';
import {getList, Add, Edit, Delete} from '../../api/api';
import { Layout, Breadcrumb,Table,Button,Modal,Input,Form ,message,Radio } from 'antd';


const FormItem = Form.Item;
const {Content,Header} = Layout;
const RadioGroup = Radio.Group;

export default class Users extends React.Component{
    constructor(props){
        super(props);
        this.state={
            _id:"",
            roleList:[],
            list:[],
            visible:false,
            visible1:false,
            name:'',
            columns: [{
                title: '用户名称',
                dataIndex: 'name',
                key: 'name'
            },{
                title:'角色',
                dataIndex: 'role.name',
                key: 'role.name'
            },{
                title:"创建时间",
                dataIndex:'createdAt',
                key: 'createdAt'
            },{
                title: '操作',
                key: '_id',
                render: (text, item) => (
                    <span>
                        <Button type="primary"  onClick={(e)=>{this.editModal(item._id,item.name,item.role._id)}}>编辑</Button>
                        <Button type="danger"  onClick={(e)=>{this.handleDelete(item._id)}}>删除</Button>
                    </span>
                )
            }],
            pagination:{
                hideOnSinglePage:true
            },
            value: '',
        }
    }
    render(){
        const nodes = this.state.roleList.map((item,index)=>{
            return (
                <Radio value={item._id} key={index}>{item.name}</Radio>
            )
        })
        return(
            <div>
                <Common>
                    <Header style={{ background: '#fff', padding: 16,marginBottom:'16px',lineHeight:'32px' }} >用户管理</Header>
                    <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                        <Button type="primary" style={{marginBottom:"16px"}} onClick={this.showModal}>增加</Button>
                        <Table columns={this.state.columns} dataSource={this.state.list} pagination={this.state.pagination}/>
                        <Modal
                            title="新增用户"
                            visible={this.state.visible}
                            onOk={this.handleOk}
                            onCancel={this.handleCancel}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Form>
                                <FormItem
                                    label='用户名称'
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span:18 }}

                                >
                                    <Input placeholder="请输入用户名称" onChange={this.handleChange}/>
                                </FormItem>
                                <FormItem
                                    label='角色'
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span:18 }}
                                >
                                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                                        {nodes}
                                    </RadioGroup>
                                </FormItem>
                            </Form>
                        </Modal>
                        <Modal
                            title="编辑角色"
                            visible={this.state.visible1}
                            onOk={this.editOk}
                            onCancel={this.handleCancel}
                            okText="确定"
                            cancelText="取消"
                        >
                            <Form>
                                <FormItem
                                    label='用户名称'
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span:18 }}

                                >
                                    <Input placeholder="请输入用户名称" onChange={this.handleChange} value={this.state.name}/>
                                </FormItem>
                                <FormItem
                                    label='角色'
                                    labelCol={{ span: 4 }}
                                    wrapperCol={{ span:18 }}
                                >
                                    <RadioGroup onChange={this.onChange} value={this.state.value}>
                                        {nodes}
                                    </RadioGroup>
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                </Common>
            </div>
        )
    }
    editModal = (id,name,value)=>{
        this.setState({
            visible1: true,
            name:name,
            _id:id,
            value:value
        });
    }
    showModal = ()=>{
        this.setState({
            visible: true,
        });
    }
    handleChange=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    onChange = (e) => {
        this.setState({
            value: e.target.value,
        });
    }
    handleDelete = (id)=>{
        var that = this;
        Modal.confirm({
            title: '提示',
            content: '您确定要删除该数据吗',
            okText: '确认',
            cancelText: '取消',
            onOk(){
                Delete(userService+`/${id}`,(res)=>{
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
        Add(userService,{name:this.state.name,role:this.state.value,password:'123456'},(res)=>{
            var list = that.state.list;

            getList(roleService+`/${res.role}`,function(res1){

                res.role = res1;
                list.push(res);
                that.setState({
                    list:list,
                    visible: false,
                    name:'',
                    value:that.state.roleList[0]._id
                })
            },function(err){
                console.log(err)
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
    getRolelist = ()=> {
        getList(roleService, (res) => {
            this.setState({
                value:res[0]._id,
                roleList: res
            })
        }, (err) => {
            console.log(err)
        })
    }
    getUserList = ()=>{
        getList(userService,(res)=>{
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
        this.getRolelist();
        this.getUserList();
    }
}