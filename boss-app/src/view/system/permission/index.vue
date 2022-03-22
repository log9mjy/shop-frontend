<template>
    <div style="height: 100%">
        <div class="table-view p-container">
            <div class="p-tree">
                <div style="margin-bottom: 20px">
                    <el-button type="primary" icon="el-icon-plus" size="mini" @click="openForm('add')">新增</el-button>
                    <el-button type="danger" icon="el-icon-delete" size="mini" @click="del">删除</el-button>
                </div>
                <el-tree :data="tree"
                         default-expand-all
                         highlight-current
                         :expand-on-click-node="false"
                         :props="defaultProps"
                         @node-click="handleNodeClick"
                ></el-tree>
            </div>
            <div class="p-form">
                <el-form ref="form" size="small" :model="form" label-width="60px" :rules="rules">
                    <el-form-item label="父级" v-if="type==='add'">
                        <el-input :disabled="true" v-model="parentTitle" placeholder="父级"></el-input>
                    </el-form-item>
                    <el-form-item label="类型" prop="type">
                        <el-radio v-model="form.type" :label="0">菜单</el-radio>
                        <el-radio v-model="form.type" :label="1">按钮</el-radio>
                    </el-form-item>
                    <el-form-item label="标题" prop="title">
                        <el-input v-model="form.title" placeholder="标题"></el-input>
                    </el-form-item>
                    <el-form-item label="权限">
                        <el-input v-model="form.permission" placeholder="权限"></el-input>
                    </el-form-item>
                    <el-form-item label="路径" prop="path">
                        <el-input v-model="form.path" placeholder="路径"></el-input>
                    </el-form-item>
                    <el-form-item label="排序" prop="sort">
                        <el-input v-model="form.sort" placeholder="排序"></el-input>
                    </el-form-item>
                    <el-form-item label="图标">
                        <el-input v-model="form.icon" placeholder="图标"></el-input>
                    </el-form-item>
                </el-form>
                <div class="form-footer">
                    <el-button size="small" type="primary" @click="submit">保 存</el-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import {
        permission_tree,
        permission_detail,
        permission_add,
        permission_update,
        permission_del
    } from "../../../api/permission";

    export default {
        name: "index",
        data() {
            return {
                tree: [],
                form: {
                    parentId: '',
                    title: '',
                    type: 0,
                    permission: '',
                    path: '',
                    icon: '',
                    sort: 0
                },
                rules: {
                    title: [{required: true, message: '请输入标题'}],
                    type: [{required: true, message: '请选择类型'}],
                    path: [{required: true, message: '请输入路径'}],
                    sort: [{required: true, message: '请输入排序'}],
                },
                defaultProps: {
                    children: 'children',
                    label: 'title'
                },
                type: 'add',
                parentTitle: '-'
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            submit() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.type === 'add') {
                            permission_add(this.form).then(() => {
                                this.$message.success("添加成功");
                                this.getData();
                            })
                        }
                        if (this.type === 'edit') {
                            permission_update(this.form.id, this.form).then(() => {
                                this.$message.success("修改成功");
                                this.getData();
                            })
                        }

                    }
                })
            },
            del() {
                this.$confirm('确认删除该权限?')
                    .then(() => {
                        permission_del(this.form.parentId).then(() => {
                            this.getData();
                        })
                    })
            },
            getData() {
                permission_tree().then(res => {
                    this.tree = res.data;
                })
            },
            handleNodeClick(e) {
                this.type = 'edit';
                permission_detail(e.id).then(res => {
                    this.form = res.data;
                    this.parentTitle = e.title;
                    this.form.parentId = e.id;
                })
            },
            openForm(type) {
                this.type = type;
            },
        }
    }
</script>

<style scoped>
    .p-tree {
        width: 200px;
        height: 100%;
        background-color: #ffffff;
    }

    .p-container {
        height: 100%;
        width: 100%;
        display: flex;
        padding-top: 50px;
        padding-left: 200px;
        box-sizing: border-box;
    }

    .p-form {
        margin-left: 30px;
        width: 300px;
    }
</style>