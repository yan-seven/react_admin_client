import React, { Component } from 'react'
import {Card,Select,Input,Table,Button, message} from 'antd'
import {PlusOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button'
//import {reqProducts, reqSearchProducts,reqUpdateStatus} from '../../api'
import {PAGE_SIZE} from '../../utils/constants'
import { reqUpdateStatus } from '../../api'

const Option=Select.Option
export default class ProductHome extends Component {
    state={
        products:[
            {
                'status':1,
                "_id":"001",
                'name':'华硕777',
                'price':5699,
                "desc":'经典款，姐妹们冲',
                'pCategoryId':"6074fbf0dc4ac51728f9df02",
                'categoryId':"6075407ddc4ac51728f9df0d",
                'detail':"<p>我的华硕</p>",
                'imgs':[
                    'http://localhost:3000/static/media/8.5a098bc8.jpg',
                ]
            },
            {
                'status':0,
                "_id":"002",
                'name':'联想888',
                'price':3999,
                "desc":'性价比极高，被7万人种草',
                'pCategoryId':"6074fbf0dc4ac51728f9df02",
                'categoryId':"60754099dc4ac51728f9df0e",
                'detail':"<p>我的联想</p>",
                'imgs':[
                    'http://localhost:3000/static/media/8.5a098bc8.jpg',
                ]
            }
        ],
        total:0,
        loading:false,
        searchName:'',
        searchType:'productName'
    }

    initColumns=()=>{
        this.columns=  [{
            title: '商品名称',
            dataIndex: 'name',
          },
          {
            title: '商品描述',
            dataIndex: 'desc',
          },
          {
            title: '价格',
            dataIndex: 'price',
            render:(price)=>'￥'+price
        },
          {
            width:100,
            title: '状态',
            render:(product)=>{
                const {status,_id} = product
                return(
                    <span >
                        <Button 
                            type='primary' 
                            onClick={()=>this.updateStatus(_id,status===1?2:1)}
                        >{status===1?'下架':'在售'}</Button>
                        <span>{status===1?'在售':'已下架'}</span>
                    </span>
                )
            }
          },
          {
            width:100,
            title: '操作',
            render:(product)=>{
                return(
                    <span>
                        <LinkButton onClick={()=>this.props.history.push('/product/detail',{product})}>详情</LinkButton>
                        <LinkButton onClick={()=>this.props.history.push('/product/addupdate',{product})}>修改</LinkButton>
                    </span>
                )
            }
          }
        ]
    }

    // getProducts=async (pageNum)=>{
    //     this.pageNum=pageNum
    //     const {searchName,searchType} = this.state
    //     this.setState({loading:true})
    //     let result
    //     if(searchName!==''){
    //         result=await reqSearchProducts({pageNum,pageSize:PAGE_SIZE,searchName,searchType})
    //     }else{
    //         result=await reqProducts({pageNum,pageSize:PAGE_SIZE})
    //     }
    //     this.setState({loading:false})
    //     if(result.status===0){
    //         const {total,list}=result.data
    //         this.setState({
    //             total,
    //             products:list
    //         })
    //     }
    // }

    updateStatus=async (productId,status)=>{
        const result=await reqUpdateStatus(productId,status)
        if(result.status===0){
            message.success('更新状态成功')
           // this.getProducts(this.pageNum)
        }else{
            message.error('更新状态失败')
        }
    }

    UNSAFE_componentWillMount(){
        this.initColumns()
    }

    // componentDidMount(){
    //     this.getProducts(1)
    // }

    render() {
        const {products,total,loading,searchName,searchType} = this.state
        const title=(
            <span>
                <Select value={searchType} style={{width:150}}
                     onChange={value=>this.setState({searchType:value})}>
                    <Option value='productName'>按名称搜索</Option>
                    <Option value='productDesc'>按描述搜索</Option>
                </Select>
                <Input placeholder='关键字' style={{width:150,margin:'0 10px'}} 
                    value={searchName}
                    onChange={event=>this.setState({searchName:event.target.value})}
                />
                <Button type='primary' onClick={()=>this.getProducts(1)}>搜索</Button>
            </span>
        )
        const extra=(
            <Button type='primary' onClick={()=>this.props.history.push('/product/addupdate')}>
                <PlusOutlined />
                <span>添加商品</span>
            </Button>
        )
        return (
            <Card title={title} extra={extra}>
                <Table 
                    loading={loading}
                    dataSource={products} 
                    columns={this.columns}
                    rowKey='_id'
                    bordered
                    pagination={{
                        defaultPageSize:PAGE_SIZE,
                        showQuickJumper:true,
                        total,
                        //onChange:this.getProducts
                    }}
                    />
            </Card>
        )
    }
}
