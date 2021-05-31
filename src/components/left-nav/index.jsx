import React, { Component } from 'react'
import './index.less'
import logo from '../../assets/imgs/8.jpg'
import { Link,withRouter } from 'react-router-dom'
import { Menu } from 'antd';
import menuList from '../../config/menuconfig'

const { SubMenu } = Menu;
class LeftNav extends Component {
    reduceGetMenu=(menuList)=>{
        return menuList.reduce((pre,item)=>{
            if(!item.children){
                pre.push(
                    (
                        <Menu.Item key={item.key} icon={item.icon}>
                            <Link to={item.key} ></Link>
                            {item.title}
                        </Menu.Item>
                    )
                )
            }else{
                const path=this.props.location.pathname
                const citem=item.children.find(citem=>path.indexOf(citem.key)===0)
                if(citem){
                    this.openkey=item.key
                }
                pre.push(
                    (
                        <SubMenu key={item.key} icon={item.icon} title={item.title}>
                        {this.reduceGetMenu(item.children)}
                        </SubMenu>
                    )
                )
            }
            return pre
        },[])
    }

    UNSAFE_componentWillMount(){
        this.menuNodes=this.reduceGetMenu(menuList)
    }

    render() {
        let path=this.props.location.pathname
        if(path.indexOf('/product')===0){
            path='/product'
        }
        return (
            <div className='left_nav'>
                <Link to='/' className='left-nav-header'>
                    <img src={logo} alt='左侧导航logo' />
                    <h2>彦七后台</h2>
                </Link>
                <Menu
                    defaultSelectedKeys={['/home']}
                    selectedKeys={[path]}
                    mode="inline"
                    theme="dark"
                    defaultOpenKeys={[this.openkey]}
                    
                >
                    {
                    this.menuNodes
                    }
                </Menu>
            </div>
        )
    }
}
export default withRouter(LeftNav)