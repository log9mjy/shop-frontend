<template>
    <div>
        <div class="search-form">
            <el-form :inline="true" size="small">
                <el-form-item label="名称">
                    <el-input v-model="searchForm.nickname" placeholder=""></el-input>
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
                <el-table-column prop="id" label="用户编号"></el-table-column>
                <el-table-column prop="nickname" label="用户名称"></el-table-column>
                <el-table-column prop="account" label="用户账户"></el-table-column>
                <el-table-column label="用户头像">
                    <template slot-scope="scope">
                        <el-image class="table-image" fit="cover" :src="scope.row.avatar"
                                  :preview-src-list="scope.row.avatar |toArray"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="roleName" label="用户角色"></el-table-column>
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
        <el-pagination class="page" background layout="total,prev, pager, next" :total="total"
                       @current-change="currentChange"></el-pagination>

        <el-dialog :title="type==='add'?'添加账户':'编辑账户'" :visible.sync="dialogVisible" width="400px">
            <el-form ref="form" size="small" :model="form" label-width="60px" :rules="rules">
                <el-form-item label="角色" prop="roleId">
                    <el-select v-model="form.roleId" placeholder="请选择" value="">
                        <el-option v-for="item in options" :key="item.id" :label="item.name"
                                   :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="名称" prop="nickname">
                    <el-input v-model="form.nickname" placeholder="名称"></el-input>
                </el-form-item>
                <el-form-item label="账户" prop="account">
                    <el-input v-model="form.account" placeholder="账户"></el-input>
                </el-form-item>
                <el-form-item label="头像" prop="avatar">
                    <upload :file-list="form.avatar |toArray" @success="upload" @del="delImage"></upload>
                </el-form-item>
                <el-form-item label="密码">
                    <el-input v-model="form.password" placeholder="密码"></el-input>
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
    import {user_page, user_add, user_update, user_del} from "../../../api/admin";
    import Upload from "../../../components/upload";
    import {role_options} from "../../../api/role";

    export default {
        name: "index",
        components: {
            Upload
        },
        data() {
            return {
                tableData: [],
                total: 0,
                pageNumber: 1,
                searchForm: {
                    nickname: ''
                },
                type: 'add',
                dialogVisible: false,
                form: {
                    nickname: '',
                    account: '',
                    password: '',
                    avatar: '',
                    roleId: ''
                },
                rules: {
                    roleId: [{required: true, message: '请选择'}],
                    nickname: [{required: true, message: '名称不能为空'}],
                    account: [{required: true, message: '账户不能为空'}],
                    avatar: [{required: true, message: '请上传'}]
                },
                options: [],
                editId: 0
            }
        },
        mounted() {
            this.initOptions();
            this.getData();
        },
        methods: {
            del(id) {
                this.$confirm('确认删除该管理员?')
                    .then(() => {
                        user_del(id).then(() => {
                            this.getData();
                        })
                    })
            },
            openDialog(type, data) {
                this.type = type;
                this.dialogVisible = true;
                if (type === 'add') {
                    this.form = {
                        nickname: '',
                        account: '',
                        password: '',
                        avatar: '',
                        roleId: ''
                    }
                } else {
                    this.editId = data.id;
                    this.form = {
                        nickname: data.nickname,
                        account: data.account,
                        password: '',
                        avatar: data.avatar,
                        roleId: data.roleId
                    }
                }
            },
            initOptions() {
                role_options().then(res => {
                    this.options = res.data;
                })
            },
            submit() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.type === 'add') {
                            if (!this.form.password) {
                                this.$message.error("请输入密码");
                                return;
                            }
                            user_add(this.form).then(() => {
                                this.$message.success("添加成功");
                                this.dialogVisible = false;
                                this.getData();
                            })
                        }
                        if (this.type === 'edit') {
                            user_update(this.editId, this.form).then(() => {
                                this.$message.success("修改成功");
                                this.dialogVisible = false;
                                this.getData();
                            })
                        }

                    }
                })
            },
            reset() {
                this.searchForm = {
                    nickname: ''
                }
            },
            search() {
                this.pageNumber = 1;
                this.getData();
            },
            getData() {
                let params = {
                    pageNumber: this.pageNumber,
                    nickname: this.searchForm.nickname
                };
                user_page(params).then(res => {
                    this.tableData = res.data.data;
                    this.total = res.data.total;
                })
            },
            currentChange(e) {
                this.pageNumber = e;
                this.getData();
            },
            upload(e) {
                this.form.avatar = e;
            },
            delImage() {
                this.form.avatar = '';
            }
        }
    }
</script>

<style scoped>

</style>
