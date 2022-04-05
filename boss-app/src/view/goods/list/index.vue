<template>
    <div>
        <div class="search-form">
            <el-form :inline="true" size="small">
                <el-form-item label="商品名称">
                    <el-input v-model="searchForm.name" placeholder="商品名称"></el-input>
                </el-form-item>
                <el-form-item label="品牌">
                    <el-select v-model="searchForm.brand_id" style="width: 100px" clearable>
                        <el-option v-for="item in brandOptions" :key="item.id" :label="item.name"
                                   :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="分类">
                    <el-cascader v-model="searchForm.category" :options="categoryOptions" :props="{value:'id',label:'name' }
                    " clearable></el-cascader>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchForm.audit_status" style="width: 100px" clearable>
                        <el-option v-for="item in auditOptions" :key="item.code" :label="item.name" :value="item.code">
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
                <el-table-column prop="id" label="商品编号"></el-table-column>
                <el-table-column prop="shop_name" label="店铺"></el-table-column>
                <el-table-column prop="name" label="商品名称" show-overflow-tooltip></el-table-column>
                <el-table-column label="商品图">
                    <template slot-scope="scope">
                        <el-image class="table-image" :src="scope.row.thumbnail"
                                  :preview-src-list="scope.row.thumbnail |toArray"/>
                    </template>
                </el-table-column>
                <el-table-column prop="price" label="价格"></el-table-column>
                <el-table-column prop="brand_name" label="品牌"></el-table-column>
                <el-table-column prop="created_at" label="创建日期"></el-table-column>
                <el-table-column label="状态" prop="audit_name"></el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="linkEdit(scope.row.id)">
                            编辑
                        </el-button>
                        <el-button size="mini" type="danger" icon="el-icon-delete" @click="del(scope.row.id)">删除
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
    import {goods_page, brand_options, category_options, goods_del} from "../../../api/goods";

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
            brand_options().then(res => {
                this.brandOptions = res.list;
            });
            category_options().then(res => {
                this.categoryOptions = res.list;
            })
        },
        methods: {
            del(id) {
                this.$confirm('确认删除该商品?')
                    .then(() => {
                        goods_del({id}).then(() => {
                            this.getData();
                        })
                    })
            },
            getData() {
                let params = {
                    page: this.pageNumber,
                    brand_id: this.searchForm.brand_id,
                    name: this.searchForm.name,
                    audit_status: this.searchForm.audit_status
                };
                if (this.searchForm.category && this.searchForm.category.length > 0) {
                    params.category_id = this.searchForm.category[this.searchForm.category.length - 1]
                }
                goods_page(params).then(res => {
                    this.tableData = res.list;
                    this.total = res.data.count;
                })
            },
            reset() {
                this.searchForm = {
                    name: '',
                    audit_status: '',
                    brand_id: '',
                    category: []
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
            linkAdd() {
                this.$router.push({
                    path: "/goods/add"
                })
            },
            linkEdit(id) {
                this.$router.push({
                    path: "/goods/edit",
                    query: {
                        id: id
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>