import React, { Component } from 'react'
import { Redirect, Route, Switch } from 'react-router'
import ProductHome from './product_home'
import ProductDetail from './product_detail'
import ProductAddUpdate from './product_add_update'
import './index.less'

export default class Product extends Component {
    render() {
        return (
            <Switch>
                <Route path='/product/' component={ProductHome} exact></Route>
                <Route path='/product/detail' component={ProductDetail}></Route>
                <Route path='/product/addupdate' component={ProductAddUpdate}></Route>
                <Redirect to='/product/'/>
            </Switch>
        )
    }
}
