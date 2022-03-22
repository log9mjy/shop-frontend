<template>
    <div>
        <div class="table-view">
            <div class="add-view">
                <el-button icon="el-icon-plus" type="primary" plain @click="openDialog('add',0)">新增</el-button>
            </div>
            <el-collapse accordion>
                <el-collapse-item v-for="(item,index) in tableData" :key="index">
                    <template slot="title">
                        <div class="coll-wrapper">
                            <div>
                                <el-image class="coll-image" :src="item.coverPic"
                                          :preview-src-list="item.coverPic | toArray"></el-image>
                                <span class="coll-title">{{item.title}}</span>
                            </div>
                            <div>
                                <el-button type="primary" size="mini" icon="el-icon-plus" circle
                                           @click.prevent.stop="openDialog('add',item.id)"></el-button>
                                <el-button type="warning" size="mini" icon="el-icon-edit" circle
                                           @click.prevent.stop="openDialog('edit',item)"></el-button>
                                <el-button type="danger" size="mini" icon="el-icon-delete" circle
                                           @click.prevent.stop="del(item.id)"></el-button>
                            </div>
                        </div>
                    </template>
                    <div class="coll-expand">
                        <div class="coll-wrapper" v-for="(child,i) in item.children" :key="i">
                            <div>
                                <el-image class="coll-image" :src="child.coverPic"
                                          :preview-src-list="child.coverPic | toArray"></el-image>
                                <span class="coll-title">{{child.title}}</span>
                            </div>
                            <div>
                                <el-button type="warning" size="mini" icon="el-icon-edit" circle
                                           @click.prevent.stop="openDialog('edit',child)"></el-button>
                                <el-button type="danger" size="mini" icon="el-icon-delete" circle
                                           @click.prevent.stop="del(child.id)"></el-button>
                            </div>
                        </div>
                    </div>
                </el-collapse-item>
            </el-collapse>
        </div>
        <el-dialog :visible.sync="visible" :title="type==='add'?'添加分类':'编辑分类'" width="500px">
            <el-form ref="form" size="small" :model="form" label-width="80px" :rules="rules">
                <el-form-item label="标题" prop="title">
                    <el-input v-model="form.title" placeholder="分类名称"></el-input>
                </el-form-item>
                <el-form-item label="封面图" prop="coverPic">
                    <upload :file-list="form.coverPic |toArray" @success="upload" @del="delImage"></upload>
                </el-form-item>
                <el-form-item label="排序" prop="sort">
                    <el-input v-model="form.sort" style="width: 100px" placeholder="越大的排在越前面"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="visible = false">取 消</el-button>
                <el-button size="small" type="primary" @click="submit">确 定</el-button>
       </span>
        </el-dialog>
    </div>
</template>

<script>
    import Upload from "../../../components/upload";
    import {category_add, category_del, category_edit, category_list} from "../../../api/goods_category";

    export default {
        name: "index",
        components: {
            Upload
        },
        data() {
            return {
                visible: false,
                type: 'add',
                editId: 0,
                parentId: 0,
                tableData: [],
                form: {
                    title: "",
                    coverPic: "",
                    sort: 0
                },
                rules: {
                    title: [{required: true, message: '请输入标题'}],
                    coverPic: [{required: true, message: '请上传封面图'}],
                    sort: [{required: true, message: '请输入排序'}],
                },
            }
        },
        mounted() {
            this.getData();
        },
        methods: {
            getData() {
                category_list().then(res => {
                    this.tableData = res.data
                })
            },
            del(id) {
                this.$confirm('确认删除该分类?')
                    .then(() => {
                        category_del(id).then(() => {
                            this.getData();
                        })
                    })
            },
            openDialog(type, data) {
                this.type = type;
                this.visible = true;
                if (type === 'edit') {
                    this.editId = data.id;
                    this.form.coverPic = data.coverPic;
                    this.form.title = data.title;
                    this.form.sort = data.sort;
                }
                if (type === 'add') {
                    this.parentId = data;
                }
            },
            submit() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        if (this.type === 'add') {
                            let {...param} = this.form;
                            param.parentId = this.parentId;
                            category_add(param).then(() => {
                                this.$message.success("添加成功");
                                this.visible = false;
                                this.getData();
                            })
                        }
                        if (this.type === 'edit') {
                            category_edit(this.editId, this.form).then(() => {
                                this.$message.success("修改成功");
                                this.visible = false;
                                this.getData();
                            })
                        }

                    }
                })
            },
            upload(e) {
                this.form.coverPic = e;
            },
            delImage() {
                this.form.coverPic = '';
            }
        }
    }
</script>

<style scoped>
    .coll-image {
        width: 30px;
        height: 30px;
        padding: 1px;
        box-sizing: border-box;
        border: 1px dashed #cccccc;
        border-radius: 2px;
    }

    .coll-title {
        margin-left: 5px;
    }

    .coll-wrapper {
        display: flex;
        justify-content: space-between;
        padding: 0 20px;
        width: 100%;
    }

    .coll-wrapper div {
        display: flex;
        align-items: center;
    }

    .coll-expand {
        width: 100%;
        box-sizing: border-box;
        padding-left: 30px;
        padding-right: 60px;
    }

</style>