import Vue from "vue";
import Router from "vue-router";
import routes from "./route";
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';

import {get_token} from '../util/token'

Vue.use(Router);

const route = new Router({
    routes
});

/**
 * 白名单
 */
const whiteList = ['/login'];

/**
 * 前置钩子
 */
route.beforeEach((to, from, next) => {
    if (to.meta.title) {
        document.title = to.meta.title
    }
    NProgress.start();
    let token = get_token();
    if (token) {
        if (to.path === '/login') {
            next({path: '/'});
            NProgress.done()
        } else {
            next();
            NProgress.done()
        }
    } else {
        if (whiteList.indexOf(to.path) !== -1) {
            next();
            NProgress.done()
        } else {
            // 否则全部重定向到登录页
            next(`/login?redirect=${to.path}`)
            NProgress.done()
        }
    }

});

/**
 * 后置钩子
 */
route.afterEach(() => {
    // 结束Progress
    NProgress.done()
});

export default route;
