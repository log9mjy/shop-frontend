<template>
    <el-container class="container">
        <el-aside class="aside">
            <layout-aside/>
        </el-aside>
        <el-container>
            <el-header class="header">
                <layout-header/>
            </el-header>
            <el-main class="main" >
                <div class="tab-view">
                    <div class="tab-item" v-for="item in tabs" :key="item.path" @click="choiceTab(item)">
                        <span :class="[item.path===nativePath?'tab-dto-active':'tab-dto']"></span>
                        <span class="tab-item-title">{{item.title}}</span>
                        <i v-if="item.path!=='/home'" @click.prevent.stop="delTab(item)"
                           class="el-icon-close tab-item-del"></i>
                    </div>
                </div>
                <router-view class="main-container" id="main"></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import LayoutAside from "./module/layout-aside";
    import LayoutHeader from "./module/layout-header";

    export default {
        components: {
            LayoutAside,
            LayoutHeader
        },
        name: "index",
        data() {
            return {
                tabs: [{
                    title: "首页",
                    path: "/home",
                    query: {},
                }],
                nativePath: ""
            }
        },
        mounted() {
            this.addPath(this.$route);
        },
        watch: {
            $route(v1) {
                this.addPath(v1);
            }
        },
        methods: {
            /**
             * 添加菜单
             */
            addPath(route) {
                if (this.isExist(route)) {
                    this.nativePath = route.path;
                } else {
                    this.tabs.push({
                        title: route.meta.title,
                        path: route.path,
                        query: route.query,
                    });
                    this.nativePath = route.path;
                }
            },
            /**
             * 选择菜单
             */
            choiceTab(route) {
                if (this.nativePath === route.path) {
                    return;
                }
                this.nativePath = route.path;
                this.$router.push({
                    path: route.path,
                    query: route.query,
                });
            },
            /**
             * 删除菜单
             * @param route
             */
            delTab(route) {
                let index = 0;
                for (let i = 0; i < this.tabs.length; i++) {
                    if (this.tabs[i].path === route.path) {
                        // 首项不能删除
                        if (i === 0) {
                            return;
                        }
                        index = i - 1;
                        this.tabs.splice(i, 1);
                        break;
                    }
                }
                // 当前选中的为移除选项
                if (route.path === this.nativePath) {
                    this.nativePath = this.tabs[index].path;
                    this.$router.push({
                        path: this.tabs[index].path,
                        query: this.tabs[index].query,
                    });
                }
            },
            /**
             * 是否存在
             */
            isExist(route) {
                for (let i = 0; i < this.tabs.length; i++) {
                    if (this.tabs[i].path === route.path) {
                        return true;
                    }
                }
                return false;
            },
        }
    }
</script>

<style scoped>
    .main-container {
        width: 100%;
        padding: 10px 10px;
        box-sizing: border-box;
        flex: 1;
        overflow-y: auto;
    }

    .container {
        width: 100%;
        height: 100vh;
    }

    .aside {
        width: 240px !important;
        background-color: #28333E;
    }

    .header {
        height: 60px;
        border-bottom: 1px solid whitesmoke;
    }

    .main {
        overflow: hidden;
        background-color: whitesmoke;
        display: flex;
        flex-direction: column;
    }

    .tab-view {
        height: 43px;
        border: 1px solid whitesmoke;
        background-color: white;
        display: flex;
        flex-wrap: nowrap;
        overflow-x: auto;
    }

    .tab-item {
        padding: 0 15px;
        line-height: 43px;
        border-right: 1px solid whitesmoke;
        display: flex;
        align-items: center;
        cursor: pointer;
    }

    .tab-item-title {
        color: #696969;
        font-size: 14px;
    }

    .tab-item-title:hover {
        color: #444444;
    }

    .tab-dto-active, .tab-dto {
        height: 8px;
        width: 8px;
        border-radius: 8px;
        margin-right: 12px;
        display: block;

    }

    .tab-dto-active {
        background-color: #36b368;
    }

    .tab-dto {
        background-color: lightgray;
    }

    .tab-item-del {
        color: #c2c2c2;
        font-size: 14px;
        margin-left: 8px;
    }

    .tab-item-del:hover {
        color: #36b368;
    }

    .el-main {
        padding: 0 !important;
    }
</style>