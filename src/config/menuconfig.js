import {
    HomeOutlined ,
    UnorderedListOutlined,
    BarChartOutlined,
    ToolOutlined,
    AppstoreOutlined,
    UserOutlined,
    SafetyCertificateOutlined
} from '@ant-design/icons';

const menuList = [
    {
        key: '/home',
        title: '首页',
        icon: <HomeOutlined />
    },
    {
        key: 'sub1',
        title: '商品',
        icon: <AppstoreOutlined />,
        children: [
            {
                key: '/category',
                title: '品类管理',
                icon: <UnorderedListOutlined />
            },
            {
                key: '/product',
                title: '商品管理',
                icon: <ToolOutlined />
            },
        ]
    },
    {
        key: '/user',
        title: '用户管理',
        icon: <UserOutlined />
    },
    {
        key: '/role',
        title: '角色管理',
        icon: <SafetyCertificateOutlined />
    },
    {
        key: 'sub2',
        title: '图形图表',
        icon: <BarChartOutlined />,
        children: [
            {
                key: '/charts/bar',
                title: '柱形图',
                icon: ''
            },
            {
                key: '/charts/line',
                title: '折线图',
                icon: ''
            },
            {
                key: '/charts/pie',
                title: '饼图',
                icon: ''
            },
        ]
    },
]
export default menuList
