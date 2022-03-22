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
            path: "/system",
            name: 'System',
            component: layout,
            children: [
                {
                    path: 'admin',
                    name: 'SystemAdmin',
                    meta: {
                        title: "管理员"
                    },
                    component: () => import('../view/system/admin')
                },
                {
                    path: 'role',
                    name: 'SystemRole',
                    meta: {
                        title: "系统角色"
                    },
                    component: () => import('../view/system/role')
                },
                {
                    path: 'permission',
                    name: 'SystemPermission',
                    meta: {
                        title: "权限管理"
                    },
                    component: () => import('../view/system/permission')
                },
                {
                    path: 'password',
                    name: 'SystemPassword',
                    meta: {
                        title: "修改密码"
                    },
                    component: () => import('../view/info/password')
                },
                {
                    path: 'config',
                    name: 'SystemConfig',
                    meta: {
                        title: "参数配置"
                    },
                    component: () => import('../view/system/config')
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
                    path: 'detail',
                    name: 'GoodsDetail',
                    meta: {
                        title: "商品详情"
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
                    path: 'home-ad',
                    name: 'WrapperHomeAd',
                    meta: {
                        title: "首页广告"
                    },
                    component: () => import('../view/wrapper/home-ad')
                }, {
                    path: 'home-wd',
                    name: 'WrapperHomeWd',
                    meta: {
                        title: "首页橱窗"
                    },
                    component: () => import('../view/wrapper/home-wd')
                },
            ]
        },
    ]
;

export default routes;
