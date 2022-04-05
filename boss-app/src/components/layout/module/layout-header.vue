<template>
    <div class="view">
        <div style="color: #555;font-size: 12px">
            <span>欢迎使用! 今天是</span>
            <span>{{new Date().getFullYear()+'年'}}</span>
            <span>{{new Date().getMonth()+1+'月'}}</span>
            <span>{{new Date().getDate()+'日'}}</span>
        </div>
        <div class="layout-head-user" v-if="info" @mouseenter="visible=true" @mouseleave="visible=false">
            <img class="user-avatar" v-if="info.photo" :src="info.photo" alt=""/>
            <span class="user-nickname">{{info.username}}</span>
            <i style="color:#888" :class="[!visible?'el-icon-caret-bottom':'el-icon-caret-top']"></i>
            <div class="user-info" v-if="visible">
                <div @click="updatePassword">修改密码</div>
                <div @click="updateInfo">个人资料</div>
                <div @click="logout">注销登录</div>
            </div>
        </div>
    </div>
</template>

<script>

    import {get_info, remove_info, set_info} from "../../../util/userInfo";
    import {remove_token} from "../../../util/token";
    import {user_info} from "../../../api/admin";

    export default {
        name: "layout-header",
        data() {
            return {
                info: {},
                visible: false
            }
        },
        created() {
            this.info = get_info();
            if (!this.info) {
                user_info().then(res => {
                    this.info = res.data;
                    set_info(res.data);
                })
            }
        },
        methods: {
            updatePassword() {
                this.$router.push({
                    path: "/system/password"
                })
            },
            updateInfo(){
                this.$router.push({
                    path: "/system/info"
                })
            },
            logout() {
                remove_info();
                remove_token();
                this.$router.push({
                    path: '/login'
                })
            }
        }
    }
</script>

<style scoped>
    .view {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 100%
    }

    .layout-head-user {
        position: relative;
        display: flex;
        align-items: center;
        height: 100%;
        margin-right: 20px;
    }

    .user-avatar {
        width: 40px;
        height: 40px;
        border-radius: 5px;
    }

    .user-nickname {
        color: #333333;
        font-size: 13px;
        margin: 0 10px;
    }

    .user-info {
        position: absolute;
        top: 55px;
        left: 50%;
        transform: translateX(-50%);
        width: 150px;
        background-color: #ffffff;
        padding: 10px 0;
        border-radius: 5px;
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04)
    }

    .user-info div {
        font-size: 13px;
        color: #444;
        padding: 10px 20px;
        cursor: pointer;
    }

    .user-info div:hover {
        background-color: #EBEEF5;
    }

    .icon-ch {
        cursor: pointer;
        font-size: 18px;
    }
</style>