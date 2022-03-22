<template>
    <div>
        <div class="table-view">
            <div class="add-view">
                <el-button icon="el-icon-plus" type="primary" plain @click="openDialog('add')">新增</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" align="center">
                <el-table-column prop="id" label="角色编号"></el-table-column>
                <el-table-column prop="name" label="角色名称"></el-table-column>
                <el-table-column prop="code" label="角色code"></el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="openDialog('edit',scope.row)">
                            编辑
                        </el-button>
                        <el-button size="mini" :disabled="scope.row.isDefault" type="danger" icon="el-icon-delete"
                                   @click="del(scope.row.id)">删除
                        </el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>

        <el-dialog :title="type==='add'?'添加角色':'编辑角色'" :visible.sync="dialogVisible" width="400px">
            <el-form ref="form" size="small" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="角色名称" prop="name">
                    <el-input v-model="form.name" placeholder="角色名称"></el-input>
                </el-form-item>
                <el-form-item label="角色code" prop="code">
                    <el-input v-model="form.code" placeholder="角色code"></el-input>
                </el-form-item>
                <el-form-item label="关联权限" >
                    <el-tree class="form-tree" ref="tree" :data="tree" show-checkbox node-key="id"
                             :default-checked-keys="form.permissions" :props="defaultProps">
                    </el-tree>
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
    import {role_add, role_update, role_del, role_list} from "../../../api/role";
    import {permission_tree} from "../../../api/permission";

    export default {
        name: "index",
        data() {
            return {
                tableData: [],
                type: 'add',
                dialogVisible: false,
                form: {
                    name: '',
                    code: 'ROLE_',
                    permissions: []
                },
                rules: {
                    name: [{required: true, message: '请输入角色名称'}],
                    code: [{required: true, message: '请输入角色code'}],
                    permissions: [{required: true, message: '请选择'}]
                },
                options: [],
                editId: 0,
                tree: [],
                defaultProps: {
                    children: 'children',
                    label: 'title'
                }
            }
        },
        mounted() {
            this.getData();
            this.initTree();
        },
        methods: {
            initTree() {
                permission_tree().then(res => {
                    this.tree = res.data;
                })
            },

            del(id) {
                this.$confirm('确认删除该角色?')
                    .then(() => {
                        role_del(id).then(() => {
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
                        code: 'ROLE_',
                    };
                    this.$nextTick(() => {
                        this.$refs.tree.setCheckedKeys([]);
                    })
                } else {
                    this.editId = data.id;
                    this.form = {
                        name: data.name,
                        code: data.code,
                        permissions: data.permissions
                    };
                    this.$nextTick(() => {
                        this.$refs.tree.setCheckedKeys(data.permissions);
                    })
                }
            },

            submit() {
                this.form.permissions = this.$refs.tree.getCheckedKeys();
                this.$nextTick(() => {
                    this.$refs['form'].validate(valid => {
                        if (valid) {
                            if (this.type === 'add') {
                                role_add(this.form).then(() => {
                                    this.$message.success("添加成功");
                                    this.dialogVisible = false;
                                    this.getData();
                                })
                            }
                            if (this.type === 'edit') {
                                role_update(this.editId, this.form).then(() => {
                                    this.$message.success("修改成功");
                                    this.dialogVisible = false;
                                    this.getData();
                                })
                            }

                        }
                    })
                });
            },

            getData() {
                role_list().then(res => {
                    this.tableData = res.data;
                })
            },
        }
    }
</script>

<style scoped>

</style>