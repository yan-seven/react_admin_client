import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import './index.less'
import { reqWeather } from '../../api/index'
import { formateDate } from '../../utils/dateUtils'
import memoryUtils from '../../utils/memoryUtils'
import storageUtils from '../../utils/storageUtils'
import menuList from '../../config/menuconfig'
import LinkButton from '../../components/link-button'
import { Modal} from 'antd';
import { ExclamationCircleOutlined } from '@ant-design/icons';

class Header extends Component {
    state = {
        currentTime: formateDate(Date.now()),
        city: '',
        weather: '',
        temperature: ''
    }
    getTime = () => {
        this.intervalid=setInterval(() => {
            const currentTime = formateDate(Date.now())
            this.setState({ currentTime })
        }, 1000)
    }
    getWeather = async (citycode) => {
        const { city, weather, temperature } = await reqWeather(citycode)
        this.setState({ city, weather, temperature })
    }
    getTitle = () => {
        const path = this.props.location.pathname
        let title
        menuList.forEach(item => {
            if (item.key === path) {
                title = item.title
            } else if (item.children) {
                const citem = item.children.find(citem => citem.key === path)
                if (citem) {
                    title = citem.title
                }
            }
        })
        return title
    }
    logout = () => {
        const { confirm } = Modal;
        confirm({
            title: '提示',
            icon: <ExclamationCircleOutlined />,
            content: '确定退出用户吗？',
            onOk: () => {
                storageUtils.removeUser()
                memoryUtils.user = {}
                console.log(this)
                this.props.history.replace('/login')
            }
        })
    }
    componentDidMount() {
        this.getTime()
        this.getWeather(411302)
    }
    componentWillUnmount(){
        clearInterval(this.intervalid)
    }
    render() {
        const { currentTime, city, weather, temperature } = this.state
        const username = memoryUtils.user.username
        const title = this.getTitle()
        return (
            <div className='header'>
                <div className='header-top'>
                    <span>欢迎，{username}</span>
                    <LinkButton  onClick={this.logout}>退出</LinkButton>
                </div>
                <div className='header-bottom'>
                    <div className='header-bottom-left'>{title}</div>
                    <div className='header-bottom-right'>
                        <span>{currentTime}</span>
                        <span>{' ' + city + ' ' + weather + ' ' + temperature + '℃'}</span>
                    </div>
                </div>
            </div>
        )
    }
}
export default withRouter(Header)
