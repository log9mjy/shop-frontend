<template>
    <div>
        <div class="search-form">
            <el-form :inline="true" size="small">
                <el-form-item label="位置">
                    <el-select v-model="searchForm.advert_type" style="width: 100px" clearable>
                        <el-option v-for="item in typeOptions" :key="item.code" :label="item.name"
                                   :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="状态">
                    <el-select v-model="searchForm.audit_status" style="width: 100px" clearable>
                        <el-option v-for="item in auditOptions" :key="item.code" :label="item.name"
                                   :value="item.code">
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
                <el-button icon="el-icon-plus" type="primary" plain @click="openDialog('add')">新增</el-button>
            </div>
            <el-table :data="tableData" style="width: 100%" align="center">
                <el-table-column prop="id" label="编号"></el-table-column>
                <el-table-column prop="advert_name" label="广告名称"></el-table-column>
                <el-table-column prop="advert_type_name" label="位置"></el-table-column>
                <el-table-column label="广告图" show-overflow-tooltip>
                    <template slot-scope="scope">
                        <el-image class="table-image" fit="cover" :src="scope.row.imgList"
                                  :preview-src-list="scope.row.imgList | toArray"></el-image>
                    </template>
                </el-table-column>
                <el-table-column prop="link" label="路径" show-overflow-tooltip></el-table-column>
                <el-table-column prop="disable_status_name" label="状态">
                    <template slot-scope="scope">
                        <el-button size="mini" v-if="scope.row.disable_status===2" type="text"
                                   @click="changeStatus(scope.row.id,1,scope.row)">停用
                        </el-button>
                        <el-button v-else size="mini" type="text"
                                   @click="changeStatus(scope.row.id,2,scope.row)">
                            启用
                        </el-button>
                    </template>
                </el-table-column>
                <el-table-column prop="note" label="备注" show-overflow-tooltip>
                </el-table-column>
                <el-table-column label="操作" width="200px">
                    <template slot-scope="scope">
                        <el-button size="mini" type="primary" icon="el-icon-edit" @click="openDialog('edit',scope.row)">
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
        <el-dialog :title="type==='add'?'添加广告':'编辑广告'" :visible.sync="dialogVisible" width="400px">
            <el-form ref="form" size="small" :model="form" label-width="60px" :rules="rules">
                <el-form-item label="标题" prop="advert_name">
                    <el-input v-model="form.advert_name" placeholder="标题"></el-input>
                </el-form-item>
                <el-form-item label="位置" prop="advert_type">
                    <el-select v-model="form.advert_type" style="width: 100px" clearable>
                        <el-option v-for="item in typeOptions" :key="item.code" :label="item.name"
                                   :value="item.code">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="广告" prop="imgList">
                    <upload :limit="1" :file-list="form.imgList.url |toArray" @success="upload"
                            @del="delImage"></upload>
                </el-form-item>
                <el-form-item label="跳转">
                    <el-input v-model="form.link" placeholder="跳转"></el-input>
                </el-form-item>
                <el-form-item label="备注">
                    <el-input v-model="form.note" placeholder="备注"></el-input>
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
    import {ad_add, ad_del, ad_edit, ad_list, type, ad_audit} from "../../../api/ad";

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
                    advert_name: '',
                    advert_type: '',
                    link: '',
                    imgList: {},
                    note: '',
                },
                rules: {
                    advert_name: [{required: true, message: '请输入'}],
                    advert_type: [{required: true, message: '请选择'}],
                    imgList: [{required: true, message: '请上传'}],
                },
                searchForm: {
                    disable_status: '',
                    advert_type: ''
                },
                pageNumber: 1,
                typeOptions: [],
                auditOptions: [],
                editId: 0,
                total: 0
            }
        },
        mounted() {
            this.getData();
            type().then(res => {
                this.typeOptions = res.list.advertType;
                this.auditOptions = res.list.disableStatus;
            })
        },
        methods: {
            changeStatus(id, status, data) {
                ad_audit({id, disable_status: status}).then(() => {
                    data.disable_status = status;
                    let msg = status === 1 ? '已启用' : '已停用';
                    this.$message.success(msg);
                })
            },
            currentChange(e) {
                this.pageNumber = e;
                this.getData();
            },
            search() {
                this.pageNumber = 1;
                this.getData();
            },
            reset() {
                this.searchForm = {
                    disable_status: '',
                    advert_type: ''
                }
            },
            del(id) {
                this.$confirm('确认删除该广告位?')
                    .then(() => {
                        ad_del({id}).then(() => {
                            this.getData();
                        })
                    })
            },
            openDialog(type, data) {
                this.type = type;
                this.dialogVisible = true;
                if (type === 'add') {
                    this.form = {
                        advert_name: '',
                        advert_type: '',
                        link: '',
                        imgList: {},
                        note: '',
                    }
                } else {
                    this.editId = data.id;
                    this.form = {
                        advert_name: data.advert_name,
                        advert_type: data.advert_type + "",
                        link: data.link,
                        imgList: {
                            path: data.img,
                            url: data.imgList
                        },
                        note: data.note,
                    }
                }
            },
            submit() {
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        let params = {
                            advert_name: this.form.advert_name,
                            advert_type: this.form.advert_type,
                            link: this.form.link,
                            imgList: this.form.imgList.url,
                            img: this.form.imgList.path,
                            note: this.form.note,
                        };
                        if (this.type === 'add') {
                            ad_add(params).then(() => {
                                this.$message.success("添加成功");
                                this.dialogVisible = false;
                                this.getData();
                            })
                        }
                        if (this.type === 'edit') {
                            params.id = this.editId;
                            ad_edit(params).then(() => {
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
                    disable_status: this.searchForm.audit_status,
                    advert_type: this.searchForm.advert_type,
                    page: this.pageNumber,
                    pageSize: 10
                };
                ad_list(params).then(res => {
                    this.tableData = res.list;
                    this.total = res.data.count;
                })
            },
            upload(e) {
                this.form.imgList = e;
            },
            delImage() {
                this.form.imgList = {}
            }
        }
    }
</script>

<style scoped>

</style>
