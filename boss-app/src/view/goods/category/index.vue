<template>
    <div>
        <div class="search-form">
            <el-form :inline="true" size="small">
                <el-form-item label="分类">
                    <el-cascader v-model="searchForm.category" :options="categoryOptions" :props="{value:'id',label:'name', checkStrictly: true }
                    " clearable></el-cascader>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" icon="el-icon-search" @click="search">查询</el-button>
                    <el-button icon="el-icon-refresh-left" @click="reset">重置</el-button>
                </el-form-item>
            </el-form>
        </div>
        <div class="table-view">
            <div class="add-view">
                <el-button icon="el-icon-plus" type="primary" plain @click="openDialog('add',0,{})">新增</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" align="center" row-key="id"
                      :tree-props="{children: 'children'}">
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column label="logo">
                    <template slot-scope="scope">
                        <el-image class="table-image" fit="cover" :src="scope.row.logo"
                                  :preview-src-list="scope.row.logo |toArray"></el-image>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="text" @click="openDialog('add',scope.row.id,scope.row)">
                            新增
                        </el-button>
                        <el-button size="mini" type="text" @click="openDialog('edit',0,scope.row)">
                            编辑
                        </el-button>
                        <el-button size="mini" type="text" @click="del(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="type==='add'?'添加分类':'编辑分类'" :visible.sync="dialogVisible" width="400px">
            <el-form ref="form" size="small" :model="form" label-width="60px" :rules="rules">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="form.name" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="logo" prop="logo">
                    <upload :file-list="form.logo.url |toArray" @success="upload" @del="delImage"/>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="dialogVisible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="submit">确 定</el-button>
       </span>
        </el-dialog>
    </div>
</template>

<script>

    import Upload from "../../../components/upload";
    import {category_del, category_edit, category_list, category_add} from "../../../api/goods_category";
    import {category_options} from "../../../api/goods";

    export default {
        name: "index",
        components: {
            Upload
        },
        data() {
            return {
                tableData: [],
                type: 'add',
                dialogVisible: false,
                form: {
                    name: '',
                    category: '',
                    logo: {},
                },
                rules: {
                    name: [{required: true, message: '请输入'}],
                    logo: [{required: true, message: '请上传'}],
                },
                categoryOptions: [],
                searchForm: {
                    category: []
                },
                editId: 0,
                pid: 0
            }
        },
        mounted() {
            this.getData();
            category_options().then(res => {
                this.categoryOptions = res.list;
            })
        },
        methods: {
            del(id) {
                this.$confirm('确认删除该分类?')
                    .then(() => {
                        category_del({id}).then(() => {
                            this.getData();
                        })
                    })
            },
            openDialog(type, pid, data) {
                this.type = type;
                this.pid = pid;
                this.dialogVisible = true;
                if (type === 'add') {
                    this.form = {
                        name: '',
                        logo: {},
                    }
                } else {
                    this.editId = data.id;
                    this.form = {
                        name: data.name,
                        logo: {url: data.logo},
                    }
                }
            },
            submit() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.type === 'add') {
                            let params = {
                                name: this.form.name,
                                pid: this.pid,
                                logo: this.form.logo.path,
                            };
                            category_add(params).then(() => {
                                this.$message.success("添加成功");
                                this.dialogVisible = false;
                                this.getData();
                            })
                        }
                        if (this.type === 'edit') {
                            let params = {
                                name: this.form.name,
                                id: this.editId,
                                logo: this.form.logo.path,
                            };
                            category_edit(params).then(() => {
                                this.$message.success("修改成功");
                                this.dialogVisible = false;
                                this.getData();
                            })
                        }
                    }
                })
            },
            getData() {
                let params = {
                    name: this.searchForm.name,
                };
                if (this.searchForm.category && this.searchForm.category.length > 0) {
                    params.category_id = this.searchForm.category[this.searchForm.category.length - 1]
                }
                category_list(params).then(res => {
                    this.tableData = res.list;
                })
            },
            reset() {
                this.searchForm = {
                    name: '',
                    category: []
                }
            },
            search() {
                this.getData();
            },
            upload(e) {
                this.form.logo = e;
            },
            delImage() {
                this.form.logo = {};
            }
        }
    }
</script>

<style scoped>

</style>
