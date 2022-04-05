import layout from "../components/layout";

const routes = [
        {
            path: '/login',
            name: 'login',
            meta: {
                title: "管理端-登录"
            },
            component: () => import('../view/login')
        }, {
            path: '/',
            name: 'Index',
            meta: {
                title: "首页"
            },
            component: layout,
            redirect: '/home',
            children: [
                {
                    path: '/home',
                    name: 'Home',
                    meta: {
                        title: "首页"
                    },
                    component: () => import('../view/home')
                },

            ]
        },
        {
            path: '/system',
            name: 'System',
            component: layout,
            children: [
                {
                    path: 'password',
                    name: 'SystemPassword',
                    meta: {
                        title: "修改密码"
                    },
                    component: () => import('../view/info/password')
                },
                {
                    path: 'info',
                    name: 'SystemInfo',
                    meta: {
                        title: "个人资料"
                    },
                    component: () => import('../view/info/info')
                },

            ]
        },
        {
            path: "/goods",
            name: 'Goods',
            component: layout,
            children: [
                {
                    path: 'category',
                    name: 'GoodsCategory',
                    meta: {
                        title: "商品分类"
                    },
                    component: () => import('../view/goods/category')
                },
                {
                    path: 'brand',
                    name: 'GoodsGrand',
                    meta: {
                        title: "品牌"
                    },
                    component: () => import('../view/goods/brand')
                },
                {
                    path: 'list',
                    name: 'GoodsList',
                    meta: {
                        title: "商品列表"
                    },
                    component: () => import('../view/goods/list')
                },
                {
                    path: 'add',
                    name: 'GoodsAdd',
                    meta: {
                        title: "新增商品"
                    },
                    component: () => import('../view/goods/add')
                }, {
                    path: 'edit',
                    name: 'GoodsEdit',
                    meta: {
                        title: "商品编辑"
                    },
                    component: () => import('../view/goods/edit')
                },
            ]
        }, {
            path: "/wrapper",
            name: 'Wrapper',
            component: layout,
            children: [
                {
                    path: 'ad',
                    name: 'WrapperHomeAd',
                    meta: {
                        title: "广告位"
                    },
                    component: () => import('../view/wrapper/home-ad')
                },
            ]
        }, {
            path: "/user",
            name: 'User',
            component: layout,
            children: [
                {
                    path: 'list',
                    name: 'UserList',
                    meta: {
                        title: "用户列表"
                    },
                    component: () => import('../view/user/list')
                },
            ]
        },
        {
            path: "/merchant",
            name: 'Merchant',
            component: layout,
            children: [
                {
                    path: 'list',
                    name: 'MerchantList',
                    meta: {
                        title: "商家列表"
                    },
                    component: () => import('../view/merchant/list')
                },
            ]
        }, {
            path: "/member",
            name: 'member',
            component: layout,
            children: [
                {
                    path: 'member',
                    name: 'MemberRecharge',
                    meta: {
                        title: "充值记录"
                    },
                    component: () => import('../view/member/recharge')
                },
            ]
        },
    ]
;

export default routes;
