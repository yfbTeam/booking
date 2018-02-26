import React from  'react';
import SiderBar from '../../components/sider'
import {roleService} from '../../api/index';
import {getList, Add, Edit, Delete} from '../../api/api';
import { Layout, Breadcrumb,Table,Button,Modal,Input,Form ,message} from 'antd';


const FormItem = Form.Item;
const {Content,Header} = Layout;


export default class Users extends React.Component{

    constructor(){
        super()
        this.state={
            _id:"",
            list:[],
            visible:false,
            visible1:false,
            name:'',
            columns: [{
                title: '角色名称',
                dataIndex: 'name',
                key: 'name'
            },{
                title:"创建时间",
                dataIndex:'createdAt',
                key: 'createdAt'
            },{
                title: '操作',
                key: '_id',
                render: (text, item) => (
                    <span>
                        <Button type="primary"  onClick={(e)=>{this.editModal(item._id,item.name)}}>编辑</Button>
                        <Button type="danger"  onClick={(e)=>{this.handleDelete(item._id)}}>删除</Button>
                    </span>
                )
            }],
            pagination:{
                hideOnSinglePage:true
            }
        }
    }
    render(){
        return(
            <div>
                <Layout style={{ minHeight: '100vh' }}>
                    <SiderBar />
                    <Layout>

                        <Content style={{ margin: '16px' }}>
                            <Header style={{ background: '#fff', padding: 16,marginBottom:'16px',lineHeight:'32px' }} >角色管理</Header>
                            <div style={{ padding: 24, background: '#fff', minHeight: 360 }}>
                                <Button type="primary" style={{marginBottom:"16px"}} onClick={this.showModal}>增加</Button>
                                <Table columns={this.state.columns} dataSource={this.state.list} pagination={this.state.pagination}/>
                                <Modal
                                    title="新增角色"
                                    visible={this.state.visible}
                                    onOk={this.handleOk}
                                    onCancel={this.handleCancel}
                                    okText="确定"
                                    cancelText="取消"
                                >
                                    <Form>
                                        <FormItem
                                            label='角色名称'
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span:18 }}

                                        >
                                            <Input placeholder="请输入角色名称" onChange={this.handleChange}/>
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
                                            label='角色名称'
                                            labelCol={{ span: 4 }}
                                            wrapperCol={{ span:18 }}

                                        >
                                            <Input placeholder="请输入角色名称" onChange={this.handleChange} value={this.state.name}/>
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
    handleChange=(e)=>{
        this.setState({
            name:e.target.value
        })
    }
    editModal = (id,name)=>{
        this.setState({
            visible1: true,
            name:name,
            _id:id
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
                Delete(roleService+`/${id}`,(res)=>{
                    var items = [];
                    var list = that.state.list
                    for(var i=0;i<list.length;i++){
                        if(list[i]._id !== id){
                            items.push(list[i])
                        }
                    }
                    console.log(items)
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
    editOk = ()=>{
        const _id = this.state._id,name = this.state.name
        Edit(roleService+`/${_id}`,{name:name},(res)=>{
            this.fetch();
            this.setState({
                visible1: false
            })
        },(err)=>{
            console.log(err);
        })
    }
    fetch = ()=>{
        getList(roleService,(res)=>{
            this.setState({
                list:res
            })
        },(err)=>{
            console.log(err)
        })
    }
    showModal = ()=>{
        this.setState({
            visible: true,
        });
    }
    fetch = ()=>{
        getList(roleService,(res)=>{
            this.setState({
                list:res
            })
        },(err)=>{
            console.log(err)
        })
    }
    handleOk = (e) => {
       Add(roleService,{name:this.state.name},(res)=>{
           var list = this.state.list
           list.push(res);
           this.setState({
               list:list,
               visible: false,
               name:''
           })

       },(err)=>{
           console.log(err);
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
    }
}