import React, { Component } from 'react'
import { Form, Input } from 'antd'
import PropTypes from 'prop-types'


export default class UpdateForm extends Component {
    formRef = React.createRef();
    newCategoryName=''
    static propTypes = {
        categoryName: PropTypes.string
    }
    onChange = () => {
        this.newCategoryName=this.formRef.current.getFieldValue("categoryName")   
    }
    render() {
        const {categoryName} =this.props
        return (
            <Form
                name='update_form'
                onValuesChange={this.onChange}
                ref={this.formRef}
                initialValues={{
                    categoryName
                  }}
            >
                
                <Form.Item 
                    name="categoryName"
                    rules={[
                        {
                            required: true,
                            message: '分类名不能为空',
                        }
                        ]}
                    >
                       <Input  placeholder='请输入修改的分类名'></Input>
                </Form.Item >
            </Form>
           
        )
    }
}
