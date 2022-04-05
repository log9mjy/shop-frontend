<template>
    <div>
        <div class="search-form">
            <el-form :inline="true" size="small">
                <el-form-item label="品牌名称">
                    <el-input v-model="searchForm.name" placeholder="品牌名称"></el-input>
                </el-form-item>
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
                <el-button icon="el-icon-plus" type="primary" plain @click="openDialog('add')">新增</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" align="center">
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="name" label="名称"></el-table-column>
                <el-table-column label="logo">
                    <template slot-scope="scope">
                        <el-image class="table-image" fit="cover" :src="scope.row.logoUrl"
                                  :preview-src-list="scope.row.logoUrl |toArray"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="categoryName" label="分类"></el-table-column>
                <el-table-column prop="created_at" label="创建时间"></el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="openDialog('edit',scope.row)">
                            编辑
                        </el-button>
                        <el-button :disabled="scope.row.isDefault" size="mini" type="danger" icon="el-icon-delete"
                                   @click="del(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="type==='add'?'添加品牌':'编辑品牌'" :visible.sync="dialogVisible" width="400px">
            <el-form ref="form" size="small" :model="form" label-width="60px" :rules="rules">
                <el-form-item label="标题" prop="name">
                    <el-input v-model="form.name" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="分类" prop="category" v-if="type==='add'">
                    <el-cascader v-model="form.category" :options="categoryOptions" :props="{value:'id',label:'name', checkStrictly: true }
                    " clearable></el-cascader>
                </el-form-item>
                <el-form-item label="logo" prop="logo">
                    <upload :file-list="form.logo.url |toArray" @success="upload" @del="delImage"/>
                </el-form-item>
                <el-form-item label="官网">
                    <el-input v-model="form.office_web" placeholder="官网链接"></el-input>
                </el-form-item>
                <el-form-item label="描述">
                    <el-input type="textarea" v-model="form.brand_describe" placeholder="品牌描述"></el-input>
                </el-form-item>
                <el-form-item label="故事">
                    <el-input type="textarea" v-model="form.brand_story" placeholder="品牌故事"></el-input>
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
    import {brand_add, brand_del, brand_edit, brand_list} from "../../../api/goods_brand";
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
                    brand_describe: '',
                    brand_story: '',
                    logo: {},
                    office_web: ''
                },
                rules: {
                    name: [{required: true, message: '请输入'}],
                    category: [{required: true, message: '请选择'}],
                    logo: [{required: true, message: '请上传'}],
                },
                categoryOptions: [],
                searchForm: {
                    name: '',
                    category: []
                },
                editId: 0
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
                this.$confirm('确认删除该品牌?')
                    .then(() => {
                        brand_del({id}).then(() => {
                            this.getData();
                        })
                    })
            },
            openDialog(type, data) {
                this.type = type;
                this.dialogVisible = true;
                if (type === 'add') {
                    this.form = {
                        name: '',
                        category: '',
                        brand_describe: '',
                        brand_story: '',
                        logo: {},
                        office_web: ''
                    }
                } else {
                    this.editId = data.id;
                    this.form = {
                        name: data.name,
                        category: [data.category_id],
                        brand_describe: data.brand_describe,
                        brand_story: data.brand_story,
                        logo: {url: data.logoUrl, path: data.logo},
                        office_web: data.office_web
                    }
                }
            },
            submit() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        let params = {
                            name: this.form.name,
                            brand_describe: this.form.brand_describe,
                            brand_story: this.form.brand_story,
                            logo: this.form.logo.path,
                            office_web: this.form.office_web
                        };
                        if (this.form.category && this.form.category.length > 0) {
                            params.category_id = this.form.category[this.form.category.length - 1]
                        }
                        if (this.type === 'add') {
                            brand_add(params).then(() => {
                                this.$message.success("添加成功");
                                this.dialogVisible = false;
                                this.getData();
                            })
                        }
                        if (this.type === 'edit') {
                            params.id = this.editId;
                            brand_edit(params).then(() => {
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
                brand_list(params).then(res => {
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
