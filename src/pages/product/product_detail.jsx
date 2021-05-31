import React, { Component } from 'react'
import {Card, List,} from 'antd'
import {ArrowLeftOutlined} from '@ant-design/icons'
import LinkButton from '../../components/link-button'
import {reqCategory} from '../../api'

const Item=List.Item
export default class ProductDetail extends Component {
    state={
        cName1:'',
        cName2:''
    }

    async componentDidMount(){
        const {pCategoryId,categoryId} = this.props.location.state.product
        if(pCategoryId==='0'){
            const result=await reqCategory(categoryId)
            const cName1=result.data.name
            this.setState({cName1})
        }else{
            //一次性发送多个请求,都成功了，才正常处理,提高效率
            const results=await Promise.all([
                reqCategory(pCategoryId),
                reqCategory(categoryId)
            ])
            const cName1=results[0].data.name
            const cName2=results[1].data.name
            this.setState({cName1,cName2})
        }
    }

    render() {
        const {name,desc,price,detail,imgs}=this.props.location.state.product
        const {cName1,cName2} = this.state
        const title=(
            <span>
                <LinkButton onClick={()=>this.props.history.goBack()}>
                    <ArrowLeftOutlined style={{color:'blue',marginRight:10,fontSize:20}}/>
                </LinkButton>
                <span>商品详情</span>
            </span> 
        )
        return (
            <Card title={title} className='detail'>
                <List>
                    <Item>
                        <span className='left'>商品名称：</span>
                        <span>{name}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品描述：</span>
                        <span>{desc}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品价格：</span>
                        <span>{price}</span>
                    </Item>
                    <Item>
                        <span className='left'>所属分类：</span>
                        <span>{cName1}{cName2?'-->'+cName2:''}</span>
                    </Item>
                    <Item>
                        <span className='left'>商品图片：</span>
                        <span>
                            {
                            imgs.map(img=>(
                                <img key={img} className='product_img' src={img} alt='产品图片'/>
                            ))
                            }
                        </span>
                    </Item>
                    <Item>
                        <span className='left'>商品详情：</span>
                        <span dangerouslySetInnerHTML={{__html:detail}}>
                        </span>
                    </Item>
                </List>
            </Card>
        )
    }
}
