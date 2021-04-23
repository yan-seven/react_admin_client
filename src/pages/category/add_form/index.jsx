import React , { Component } from 'react'
import { Form, Select, Input } from 'antd'
import PropTypes from 'prop-types'

const Option = Select.Option

export default class AddForm extends Component {
    formRef = React.createRef();
    parentCategoryId=0
    categoryName=''
    static propTypes = {
        categoryName: PropTypes.string
    }
    change=()=>{
        this.parentCategoryId=this.formRef.current.getFieldValue("parentCategoryId")
        this.categoryName=this.formRef.current.getFieldValue("categoryName") 
    }
    render() {
        const {categorys}=this.props
        return (
            <Form
                name='add_form'
                ref={this.formRef}
                onValuesChange={this.change}
                initialValues={{
                    parentCategoryId:0
                }}
            >
                <Form.Item name='parentCategoryId'>
                    <Select style={{ width: "100%" }}>
                        <Option value={0} key={0}>一级分类</Option>
                        {
                        categorys.map((item)=><Option value={item._id} key={item._id}>{item.name}</Option>)
}
                    </Select>
                </Form.Item>
                <Form.Item 
                    name="categoryName"
                     rules={[
                        {
                            required: true,
                            message: '分类名不能为空',
                        },
                        ]}
                    >
                    <Input placeholder='请输入分类名称'></Input>
                </Form.Item>
               
            </Form>
        )
    }
}
