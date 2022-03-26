<template>
    <div>
        <div class="layout-logo">
            <span>做大做强</span>
        </div>
        <div class="layout-user">
            <img :src='info.photo' alt="你好"/>
            <span class="nickname">{{info.username}}</span>
            <span class="role">{{info.userTypeName}}</span>
        </div>
        <el-menu :default-active="nativePath" background-color="#28333e" text-color="#d2d2d2"
                 active-text-color="#36b368">
            <el-submenu v-if="item.children&&item.children.length>0" v-for="item in menus" :key="item.id"
                        :index="item.path">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                </template>
                <el-menu-item v-for="child in item.children" :key="child.id" @click="handlerPath(child)"
                              :index="child.path">
                    <span>{{child.title}}</span>
                </el-menu-item>
            </el-submenu>
            <el-menu-item v-else :index="item.path" @click="handlerPath(item)">
                <i :class="item.icon"></i>
                <span slot="title">{{item.title}}</span>
            </el-menu-item>
        </el-menu>
    </div>
</template>

<script>
    import {get_info, set_info} from "../../../util/userInfo";
    import {user_info} from "../../../api/admin";

    export default {
        name: "layout-aside",
        data() {
            return {
                info: {},
                menus: [],
                nativePath: this.$route.path
            }
        },
        created() {
            this.info = get_info();
            this.menus = [{
                title: "首页",
                icon: "el-icon-menu",
                path: "/home"
            }, {
                title: "商品管理",
                icon: "el-icon-goods",
                path: "/goods",
                children: [{
                    title: "商品列表",
                    path: "/goods/list",
                }, {
                    title: "品牌",
                    path: "/goods/brand",
                }, {
                    title: "商品分类",
                    path: "/goods/category",
                }
                ]
            }, {
                title: "商城装修",
                icon: "el-icon-s-shop",
                path: "/wrapper",
                children: [{
                    title: "广告位",
                    path: "/wrapper/ad",
                }]
            }, {
                title: "用户管理",
                icon: "el-icon-user",
                path: "/user",
                children: [{
                    title: "用户列表",
                    path: "/user/list",
                }]
            }, {
                title: "商家管理",
                icon: "el-icon-s-custom",
                path: "/merchant",
                children: [{
                    title: "商家列表",
                    path: "/merchant/list",
                }]
            }, {
                title: "会员充值",
                icon: "el-icon-s-check",
                path: "/member",
                children: [{
                    title: "充值记录",
                    path: "/member/recharge",
                }]
            }]
        },
        watch: {
            $route(v1) {
                this.nativePath = v1.path;
            },
        },
        methods: {
            handlerPath(item) {
                this.$router.push({path: item.path})
            }
        }
    }
</script>

<style scoped>

    .layout-logo {
        height: 60px;
        width: 100%;
        text-align: center;
        line-height: 60px;
    }

    .layout-logo span {
        color: #36b368;
        font-size: 21px;
        font-weight: 600;
    }

    .layout-user {
        padding-bottom: 20px;
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .layout-user img {
        width: 70px;
        height: 70px;
        border-radius: 70px;
        cursor: pointer;
    }

    .layout-user .nickname {
        font-size: 14px;
        color: #f5f5f5;
        margin-top: 20px;
        cursor: pointer;
    }

    .layout-user .role {
        font-size: 12px;
        margin-top: 5px;
        color: #888;
        cursor: pointer;
    }
</style>
