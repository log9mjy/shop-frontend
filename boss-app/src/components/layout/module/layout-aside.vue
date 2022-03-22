<template>
    <div>
        <div class="layout-logo">
            <span>小猴乐厨购</span>
        </div>
        <div class="layout-user">
            <img :src='info.avatar' alt="你好"/>
            <span class="nickname">{{info.nickname}}</span>
            <span class="role">{{info.role}}</span>
        </div>
        <el-menu :default-active="nativePath" background-color="#28333e" text-color="#d2d2d2"
                 active-text-color="#36b368">
            <el-submenu v-if="item.children&&item.children.length>0" v-for="item in menus" :key="item.id" :index="item.path">
                <template slot="title">
                    <i :class="item.icon"></i>
                    <span>{{item.title}}</span>
                </template>
                <el-menu-item v-for="child in item.children" :key="child.id" @click="handlerPath(child)" :index="child.path">
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
            if (!this.info) {
                user_info().then(res => {
                    this.info = res.data;
                    this.menus = res.data.menus;
                    set_info(this.info);
                })
            } else {
                this.menus = this.info.menus
            }
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
