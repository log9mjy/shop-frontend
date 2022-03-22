<template>
    <div>
        <div class="search-form">
            <el-form :inline="true" size="small">
                <el-form-item label="商品名称">
                    <el-input v-model="searchForm.title" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="商品编号">
                    <el-input v-model="searchForm.spuId" placeholder="商品编号"></el-input>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchForm.status" style="width: 100px">
                        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-view">
            <div class="add-view">
                <el-button icon="el-icon-plus" type="primary" plain @click="linkAdd">新增</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" align="center">
                <el-table-column prop="spuId" label="商品编号"></el-table-column>
                <el-table-column prop="title" label="商品名称" show-overflow-tooltip></el-table-column>
                <el-table-column prop="inventory" label="库存"></el-table-column>
                <el-table-column prop="volume" label="销量"></el-table-column>
                <el-table-column label="状态">
                    <template slot-scope="scope">
                        <span class="active" v-if="scope.row.status===1">销售中</span>
                        <span class="invalid" v-if="scope.row.status===2">已下架</span>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="linkEdit(scope.row.spuId)">
                            编辑
                        </el-button>
                        <el-button :disabled="scope.row.isDefault" size="mini" type="danger" icon="el-icon-delete"
                                   @click="del(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-pagination class="page" background layout="total,prev, pager, next" :total="total"
                       @current-change="currentChange"></el-pagination>
    </div>
</template>

<script>
    import {goods_page} from "../../../api/goods";

    export default {
        name: "index",
        data() {
            return {
                tableData: [],
                total: 0,
                pageNumber: 1,
                searchForm: {
                    title: '',
                    status: 0,
                    spuId: ''
                },
                options: [{label: '所有', value: 0}, {label: '销售中', value: 1}, {label: '已下架', value: 2}]
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                let {...params} = this.searchForm;
                params.pageNumber = this.pageNumber;
                goods_page(params).then(res => {
                    this.tableData = res.data.data;
                    this.total = res.data.total;
                })
            },
            reset() {
                this.searchForm = {
                    title: '',
                    status: 0,
                    spuId: ''
                }
            },
            search() {
                this.getData();
            },
            currentChange(e) {
                this.pageNumber = e;
                this.getData();
            },
            linkAdd() {
                this.$router.push({
                    path: "/goods/add"
                })
            },
            linkEdit(id) {
                this.$router.push({
                    path: "/goods/detail",
                    query: {
                        spuId: id
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>