import React, { Component } from 'react'
import { Card, Input, Form, Cascader, Button } from 'antd'
import { ArrowLeftOutlined, } from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import UploadImg from '../../components/upload_img'
import { reqCategorys} from '../../api'

const Item = Form.Item
const { TextArea } = Input;

export default class ProductAddUpdate extends Component {

    refImg=React.createRef()
    state={
        optionLists:[],
        loadData:[]
    }

    getOptionLists=async (parentId)=>{
        const result=await reqCategorys(parentId)
        if(result.status===0){
            const catogorys=result.data
            if(parentId===0){
                this.initOptionLists(catogorys)
            }else{
                return catogorys
            }

        }
    }

    initOptionLists=async (categorys)=>{
        const {isUpdate,product}=this
        const {pCategoryId}=product
        const options=categorys.map(c=>({
            value: c._id,
            label: c.name,
            isLeaf: false,
        }))
        if(isUpdate&&pCategoryId!==0){
            const subCategorys=await this.getOptionLists(pCategoryId)
            const optionChild=subCategorys.map(c=>({
                value:c._id,
                label:c.name,
                isLeaf:true
            }))
            const targetOption=options.find(option=>option.value===pCategoryId)
            targetOption.children=optionChild
        }

        this.setState({
            optionLists:options
        })
    }

    UNSAFE_componentWillMount(){
        const {product}=this.props.location.state||{}
        this.isUpdate=!!product
        this.product=product
    }

    componentDidMount(){
        this.getOptionLists(0)
    }

    render() {
        const {optionLists}=this.state
        const {isUpdate,product} =this
        const categoryIds=[]
        if(isUpdate){
            const {pCategoryId,categoryId} = product
            if(pCategoryId===0){
                categoryIds.push(categoryId)
            }else{
                categoryIds.push(pCategoryId)
                categoryIds.push(categoryId)
            }
        }
        const title = (
            <span>
                <LinkButton onClick={() => this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{ color: 'blue', marginRight: 10, fontSize: 20 }} />
                </LinkButton>
                <span>{isUpdate?'修改商品信息':"添加商品"}</span>
            </span>
        )
        const formItemLayout = {
            labelCol: { span: 3 },
            wrapperCol: { span: 6 }
        }
        const onFinish=(values)=>{
            console.log(values)
        }
        const loadData=selectedOptions=> {
            const targetOption = selectedOptions[0];
            targetOption.loading = true;
            // load options lazily
            setTimeout(async () => {
              targetOption.loading = false;
              const subcatogorys= await this.getOptionLists(targetOption.value)
              if(subcatogorys && subcatogorys.length>0){
                targetOption.children = subcatogorys.map(c=>({
                    label: c.name,
                    value: c._id,
                    isLeaf:true
                  }))
                  this.setState({
                      optionLists:[...this.state.optionLists]
                  })
              }else{
                  targetOption.isLeaf=true
              }
            }, 1000);
          };
        return (
            <Card title={title} className='detail'>
                <Form {...formItemLayout}
                    onFinish={onFinish}
                    initialValues={{
                        productname:product?product.name:'',
                        productdesc:product?product.desc:'',
                        productprice:product?product.price:'',
                        productcatogory:categoryIds
                      }}
                    >
                    <Item
                        label='商品名称'
                        name='productname'
                        rules={[
                            {
                                required: true,
                                message: '商品名称不能为空',
                            },
                        ]}
                    >
                        <Input></Input>
                    </Item>
                    <Item
                        label='商品描述'
                        name='productdesc'
                        rules={[
                            {
                                required: true,
                                message: '商品描述不能为空',
                            },
                        ]}
                    >
                        <TextArea placeholder='请输入商品描述' autoSize={{ minRows: 4, maxRows: 6 }}></TextArea>
                    </Item>
                    <Item
                        label='商品价格'
                        name='productprice'
                        rules={[
                            {
                                required: true,
                                message: '商品价格不能为空',
                            },
                            {
                                validator: (_, value) =>{
                                    if(value>=0){
                                        return Promise.resolve()
                                    }else{
                                        return Promise.reject(new Error('价格不能为负数'))
                                    }
                                    
                                }
                                
                            }
                        ]}
                    >
                        <Input
                            type='number'
                            addonAfter="元"
                            placeholder='请输入商品价格'
                        ></Input>
                    </Item>
                    <Item 
                    label='商品分类'
                        name='productcatogory'
                        rules={[
                            {
                              required: true,
                              message: '商品分类不能为空',
                            },
                          ]}>
                        <Cascader options={optionLists} loadData={loadData} placeholder='请指定商品分类'></Cascader>
                    </Item>
                    <Item label='上传图片'>
                        <UploadImg 
                        //ref={this.refImg}
                        />
                    </Item>
                    <Item>
                        <Button type='primary' htmlType='submit'>提交</Button>
                    </Item>

                </Form>
            </Card>
        )
    }
}
