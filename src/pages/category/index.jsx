import React, { Component } from 'react'
import { Card, Button, Table, Space, message, Modal } from 'antd';
import {
  PlusOutlined,
  ArrowRightOutlined
} from '@ant-design/icons';
import LinkButton from '../../components/link-button'
import { reqUpdateCategory, reqAddCategory, reqCategorys } from '../../api'
import AddForm from './add_form'
import UpdateForm from './update_form';
 


export default class Category extends Component {
  updateRef=React.createRef();
  addRef=React.createRef();
  state = {
    loading: false,
    parentId: 0,
    parentName: '',
    categorys: [],
    subCategorys: [],
    showStatus: 0
  }
  getCategorys = async (parentId) => {
    this.setState({
      loading: true
    })
    const result = await reqCategorys(parentId)
    if (result.status === 0) {
      const categorys = result.data
      if (parentId === 0) {
        this.setState({
          categorys
        })
      } else {
        this.setState({
          subCategorys: categorys
        })
      }
      this.setState({
        loading: false
      })
    } else {
      message.error('获取分类列表失败')
    }

  }
  initColumns = () => {
    this.columns = [
      {
        title: '分类名称',
        dataIndex: 'name',
      },
      {
        title: '操作',
        width: 300,
        key: 'action',
        render: (category) => (
          <Space size="middle">
            <LinkButton onClick={() => { this.showModal(2,category) }}>修改分类</LinkButton>
            {this.state.parentId === 0 ? <LinkButton onClick={() => { this.showSubCategorys(category) }}>查看子分类</LinkButton> : null}
          </Space>
        ),
      },
    ];
  }
  showSubCategorys = (category) => {
    this.setState({
      parentId: category._id,
      parentName: category.name
    }, () => {
      this.getCategorys(this.state.parentId)
    })
  }
  showCategorys = () => {
    this.setState({
      parentId: 0,
      parentName: '',
      subCategorys: []
    })
  }
  showModal = (add_update,category) => {
    this.category=category
    this.setState({
      showStatus: add_update
    })
  }
  addCategory =async () => {
    const categoryName=this.addRef.current.categoryName
    const parentId=this.addRef.current.parentCategoryId
    
    this.setState({
      showStatus: 0
    })
    if(categoryName!==''){
      const result=await reqAddCategory({categoryName,parentId})
    if(result.status===0){
      message.success('添加成功')
      this.getCategorys()
    }else{
      message.error(result.msg)
    }
    }else{
      message.error('分类名称不能为空')
      this.setState({
        showStatus: 1
      })
    }
  }
  updateCategory =async () => {
    const categoryId=this.category._id
    this.setState({
      showStatus: 0
    })
    const categoryName=this.updateRef.current.newCategoryName
    if(categoryName!==''){
      const result=await reqUpdateCategory({categoryId,categoryName})
      if(result.status===0){
        message.success('修改成功')
        this.getCategorys(this.category.parentId)
      }else{
        message.error(result.msg)
      }
    }else{
      message.error('分类名称不能为空')
      this.setState({
        showStatus: 2
      })
    }
   
  }
  handleCancel = () => {
    this.setState({
      showStatus: 0
    })

  }
  //为第一次render准备数据
  UNSAFE_componentWillMount() {
    this.initColumns()
  }
  //执行异步任务
  componentDidMount() {
    const { parentId } = this.state
    this.getCategorys(parentId)
  }
  render() {
    const { categorys, subCategorys, parentId, parentName, showStatus, loading } = this.state
    const category=this.category||{}
    const title = parentId === 0 ? '一级分类列表' : (
      <span>
        <LinkButton onClick={this.showCategorys}>一级分类列表</LinkButton>
        <ArrowRightOutlined />{parentName}
      </span>
    )
    return (
      <Card title={title} extra={<Button type='primary' onClick={() => { this.showModal(1) }}><PlusOutlined  />添加</Button>}>
        <Table
          columns={this.columns}
          dataSource={parentId === 0 ? categorys : subCategorys}
          bordered
          rowKey='_id'
          pagination={{
            defaultPageSize: 5,
            showQuickJumper: true
          }}
          loading={loading}
        />
        <Modal title="添加分类"
          visible={showStatus === 1}
          onOk={this.addCategory}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >
          <AddForm categorys={categorys} ref={this.addRef}></AddForm>
        </Modal>
        <Modal title="修改分类"
          visible={showStatus === 2}
          onOk={this.updateCategory}
          onCancel={this.handleCancel}
          destroyOnClose={true}
        >{
        }
          <UpdateForm   
            categoryName={category.name}
            ref={this.updateRef}
           ></UpdateForm>
        </Modal>
      </Card>
    )
  }
}
