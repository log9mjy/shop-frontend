<template>
    <div>
        <div class="search-form">
            <el-form :inline="true" size="small">
                <el-form-item label="用户名称">
                    <el-input v-model="searchForm.name" placeholder="用户名称"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-view">
            <el-table :data="tableData" style="width: 100%" align="center">
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="username" label="名称"></el-table-column>
                <el-table-column prop="mobile" label="电话"></el-table-column>
                <el-table-column label="头像">
                    <template slot-scope="scope">
                        <el-image class="table-image" :src="scope.row.photo"
                                  :preview-src-list="scope.row.photo |toArray"/>
                    </template>
                </el-table-column>
                <el-table-column prop="gender_name" label="性别"></el-table-column>
                <el-table-column prop="money" label="账户"></el-table-column>
                <el-table-column prop="created_at" label="创建日期"></el-table-column>
            </el-table>
        </div>
        <el-pagination class="page" background layout="total,prev, pager, next" :total="total"
                       @current-change="currentChange"></el-pagination>
    </div>
</template>

<script>
    import {user_list} from "../../api/user";

    export default {
        name: "index",
        data() {
            return {
                tableData: [],
                total: 0,
                pageNumber: 1,
                searchForm: {
                    name: '',
                    brand_id: '',
                    audit_status: '',
                    category: []
                },
                brandOptions: [],
                categoryOptions: [],
                auditOptions: [
                    {
                        "code": "1",

                        "name": "审核通过"
                    },
                    {
                        "code": "2",

                        "name": "待审核"

                    },
                    {
                        "code": "3",

                        "name": "已驳回"

                    }]
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                let params = {
                    page: this.pageNumber,
                    content: this.searchForm.name,
                    user_type: 1,
                };
                user_list(params).then(res => {
                    this.tableData = res.list;
                    this.total = res.data.count;
                })
            },
            reset() {
                this.searchForm = {
                    content: '',
                }
            },
            search() {
                this.pageNumber = 1;
                this.getData();
            },
            currentChange(e) {
                this.pageNumber = e;
                this.getData();
            },
        }
    }
</script>

<style scoped>

</style>