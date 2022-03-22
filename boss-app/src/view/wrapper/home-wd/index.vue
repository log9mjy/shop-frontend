<template>
    <div>
        <div class="table-view">
            <div class="add-view">
                <el-button icon="el-icon-plus" type="primary" plain @click="openDialog('add')">新增</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" align="center">
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="title" label="用户名称"></el-table-column>
                <el-table-column label="广告图">
                    <template slot-scope="scope">
                        <el-image class="table-image" fit="cover" :src="scope.row.picUrl"
                                  :preview-src-list="scope.row.picUrl |toArray"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="sort" label="排序"></el-table-column>
                <el-table-column prop="createTime" label="创建时间"></el-table-column>
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

        <el-dialog :title="type==='add'?'添加广告':'编辑广告'" :visible.sync="dialogVisible" width="400px">
            <el-form ref="form" size="small" :model="form" label-width="60px" :rules="rules">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="广告" prop="picUrl">
                    <upload :file-list="form.picUrl |toArray" @success="upload" @del="delImage"></upload>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="form.sort" placeholder="排序"></el-input>
                </el-form-item>
                <el-form-item label="跳转">
                    <el-input v-model="form.linkPath" placeholder="跳转"></el-input>
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
    import {ad_add, ad_del, ad_edit, ad_list} from "../../../api/ad";

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
                    title: '',
                    picUrl: '',
                    sort: 0,
                    linkPath: '',
                },
                rules: {
                    title: [{required: true, message: '请输入'}],
                    picUrl: [{required: true, message: '请上传'}],
                    sort: [{required: true, message: '请输入'}],
                },
                editId: 0
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            del(id) {
                this.$confirm('确认删除该广告位?')
                    .then(() => {
                        ad_del(id).then(() => {
                            this.getData();
                        })
                    })
            },
            openDialog(type, data) {
                this.type = type;
                this.dialogVisible = true;
                if (type === 'add') {
                    this.form = {
                        title: '',
                        picUrl: '',
                        sort: 0,
                        linkPath: '',
                    }
                } else {
                    this.editId = data.id;
                    this.form = {
                        title: data.title,
                        picUrl: data.picUrl,
                        sort: data.sort,
                        linkPath: data.linkPath,
                    }
                }
            },
            submit() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.type === 'add') {
                            let {...params} = this.form;
                            params.type = "home_wd";
                            ad_add(params).then(() => {
                                this.$message.success("添加成功");
                                this.dialogVisible = false;
                                this.getData();
                            })
                        }
                        if (this.type === 'edit') {
                            ad_edit(this.editId, this.form).then(() => {
                                this.$message.success("修改成功");
                                this.dialogVisible = false;
                                this.getData();
                            })
                        }

                    }
                })
            },
            getData() {
                ad_list({type: 'home_wd'}).then(res => {
                    this.tableData = res.data;
                })
            },
            upload(e) {
                this.form.picUrl = e;
            },
            delImage() {
                this.form.picUrl = '';
            }
        }
    }
</script>

<style scoped>

</style>
