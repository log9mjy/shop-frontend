<template>
    <div>
        <div class="layout-card">
            <div class="layout-head">
                <div>
                    <span :class="[step>0?'layout-active-title':'']">1.编辑基本信息</span>
                    <span :class="[step===1?'layout-active-label':'']"></span>
                </div>
                <div>
                    <span :class="[step>1?'layout-active-title':'']">2.编辑商品详情</span>
                    <span :class="[step===2?'layout-active-label':'']"></span>
                </div>
                <div>
                    <span :class="[step>2?'layout-active-title':'']">3.编辑商品规格</span>
                </div>
            </div>
            <div class="layout-container">
                <div v-if="step===1">
                    <div class="layout-title">基本信息</div>
                    <div class="layout-content">
                        <el-form size="small" ref="base-info" label-width="100px" :model="form" :rules="rules">
                            <el-form-item label="商品标题" prop="title">
                                <el-input v-model="form.title" placeholder="输入商品名称" style="width: 400px" type="textarea"
                                          :maxlength="100" show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item label="副标题">
                                <el-input v-model="form.subTitle" placeholder="输入商品简短描述" style="width: 300px"
                                          type="textarea" :maxlength="50" show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item label="商品排序" prop="sort">
                                <el-input v-model="form.sort" placeholder="输入商品排序" style="width: 200px"></el-input>
                            </el-form-item>
                            <el-form-item label="商品状态" prop="status">
                                <el-radio v-model="form.status" :label="1">上架</el-radio>
                                <el-radio v-model="form.status" :label="0">下架</el-radio>
                            </el-form-item>
                            <el-form-item label="商品分类">
                                <el-cascader v-model="form.cid" :options="options"
                                             :props="{label:'title',value:'id'}"></el-cascader>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="layout-title">商品图片</div>
                    <div class="layout-content">
                        <upload :limit="5" :file-list="albums" @success="uploadAlbum" @del="delAlbum"></upload>
                    </div>
                </div>
                <div v-if="step===2">
                    <div class="layout-title">商品参数</div>
                    <div class="layout-content">
                        <div>
                            <el-button size="mini" icon="el-icon-plus" @click="addAttribute">新增</el-button>
                        </div>
                        <div v-for="(item,index) in attributes" :key="index">
                            <div class="card-wrapper">
                                <el-input v-model="item.key" style="width: 250px" placeholder="属性"></el-input>
                                <span style="margin: 0 10px">-</span>
                                <el-input v-model="item.value" style="width: 250px" placeholder="值"></el-input>
                                <div class="del" @click="delAttribute(index)">x</div>
                            </div>
                        </div>
                    </div>
                    <div class="layout-title">详情图片</div>
                    <div class="layout-content">
                        <upload :limit="30" :file-list="details" @success="uploadDetail" @del="delDetail"></upload>
                    </div>
                </div>
                <div v-if="step===3">
                    <div class="layout-title">商品类型</div>
                    <div class="layout-content">
                        <div class="card-border-wrapper">
                            <div v-for="(item,index) in specificationsTemplate" :key="index"
                                 @click="changeType(index)"
                                 :class="templateIndex===index?'card-border-active':'card-border'">
                                {{item.title}}
                            </div>
                        </div>
                    </div>
                    <div v-for="(item,index) in specifications" :key="index">
                        <div class="layout-title">{{item.title}}
                            <el-button style="margin-left: 10px" size="mini" icon="el-icon-plus" round
                                       @click="addSpecification(index)">新增
                            </el-button>
                        </div>
                        <div class="layout-content specification-wrapper">
                            <div class="attr-wrapper" v-for="(p,i) in item.values" :key="i">
                                <el-input v-model="p.value" :placeholder="'输入'+item.title"/>
                                <div style="margin-top: 10px">
                                    <mini-upload :limit="5" :file-list="p.albums"
                                                 v-if="item.isUploadPic"
                                                 @success="e=>uploadSpecPic(e,index,i)"
                                                 @del="e=>delSpecPic(e,index,i)"/>
                                </div>
                                <div class="del" @click="delSpecification(index,i)">x</div>
                            </div>
                        </div>
                    </div>
                    <div class="layout-title">商品规格
                        <el-button @click="refreshSku" size="mini" icon="el-icon-refresh">刷新</el-button>
                    </div>
                    <div class="sku-container">
                        <div class="sku-wrapper" v-for="(item,index) in skus" :key="index">
                            <el-form label-width="80px">
                                <el-form-item v-for="(s,i) in item.specifications" :key="i" :label="s.key">
                                    <el-input style="width: 200px" v-model="s.value" disabled/>
                                </el-form-item>
                                <el-form-item label="状态">
                                    <el-radio v-model="item.status" :label="1">上架</el-radio>
                                    <el-radio v-model="item.status" :label="0">下架</el-radio>
                                </el-form-item>
                                <el-form-item label="价格">
                                    <el-input v-model="item.price" style="width: 200px" placeholder="输入价格"/>
                                </el-form-item>
                                <el-form-item label="库存">
                                    <el-input v-model="item.inventory" style="width: 200px" placeholder="输入库存"/>
                                </el-form-item>
                                <el-form-item label="销量">
                                    <el-input v-model="item.volume" style="width: 200px" placeholder="输入销量"/>
                                </el-form-item>
                                <el-form-item label="排序">
                                    <el-input v-model="item.sort" style="width: 200px" placeholder="输入排序"/>
                                </el-form-item>
                            </el-form>
                            <div class="del">x</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="layout-bottom" v-if="step===1">
                <el-button size="mini" icon="el-icon-arrow-left" @click="back">返回</el-button>
                <el-button size="mini" type="primary" @click="changeStep(2)">下一步</el-button>
            </div>
            <div class="layout-bottom" v-if="step===2">
                <el-button size="mini" @click="changeStep(1)">上一步</el-button>
                <el-button size="mini" type="primary" @click="changeStep(3)">下一步</el-button>
            </div>
            <div class="layout-bottom" v-if="step===3">
                <el-button size="mini" @click="changeStep(2)">上一步</el-button>
                <el-button size="mini" type="primary" icon="el-icon-upload2" @click="save">保存</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import MiniUpload from "../../../components/upload-mini";
    import Upload from "../../../components/upload";
    import {category_list} from "../../../api/goods_category";
    import {specification_template} from "../../../api/goods";
    import {goods_add} from "../../../api/goods";

    export default {
        name: "index",
        components: {
            Upload,
            MiniUpload
        },
        data() {
            return {
                step: 1,
                options: [],
                form: {
                    title: "",
                    subTitle: "",
                    cid: [],
                    sort: 0,
                    status: 1
                },
                rules: {
                    title: [{required: true, message: '请输入'}],
                    status: [{required: true, message: '请选择'}],
                    sort: [{required: true, message: '请输入'}],
                },
                albums: [],
                details: [],
                specificationsTemplate: [],
                templateIndex: 0,
                attributes: [{key: "", value: ""}],
                specifications: [],
                skus: []
            }
        },
        mounted() {
            category_list().then(res => {
                this.options = res.data;
            });
            specification_template().then(res => {
                this.specificationsTemplate = res.data;
                this.specifications = this.specificationsTemplate[0].values.map(i => {
                        return {title: i.value, isUploadPic: i.isUploadPic, values: [{value: "", albums: []}]}
                    }
                );
                this.refreshSku();
            })
        },
        methods: {
            back() {
                this.$router.push({
                    path: "/goods/list"
                })
            },
            save() {
                // 校验商品名称
                let title = this.form.title;
                if (!title) {
                    this.$message.error("请输入商品名称");
                    return
                }
                // 校验商品规格(规格图和商品主图不能都为空)
                if (!this.albums || this.albums.length === 0) {
                    if (!this.specifications || this.specifications.length === 0) {
                        this.$message.error("请上传商品图");
                        return
                    }
                    for (let specification of this.specifications) {
                        // 如果规格需要上传图片才判断
                        if (specification.isUploadPic) {
                            for (let value of specification.values) {
                                if (!value.albums || value.albums.length === 0) {
                                    this.$message.error("商品图和规格图至少上传一种");
                                    return
                                }
                            }
                        }
                    }
                }
                let params = {
                    title: this.form.title,
                    subTitle: this.form.subTitle,
                    sort: this.form.sort,
                    status: this.form.status
                };
                if (this.form.cid.length > 0) {
                    params.cid1 = this.form.cid[0];
                    if (this.form.cid.length > 1) {
                        params.cid2 = this.form.cid[1];
                    }
                }
                params.albums = this.albums;
                params.details = this.details;
                params.attributes = this.attributes;
                params.specifications = this.specifications;
                params.skus = this.skus;
                goods_add(params).then(() => {
                    this.$message.success("商品新增成功");
                })
            },
            uploadSpecPic(e, i1, i2) {
                this.specifications[i1].values[i2].albums.push(e);
            },
            delSpecPic(e, i1, i2) {
                this.specifications[i1].values[i2].albums.splice(e, 1);
            },
            changeStep(e) {
                if (e === 2 && this.step === 1) {
                    this.$refs['base-info'].validate(valid => {
                        if (valid) {
                            this.step = 2;
                        }
                    })
                } else {
                    this.step = e;
                }
            },
            uploadAlbum(e) {
                this.albums.push(e)
            },
            delAlbum(e) {
                this.albums.splice(e, 1)
            },
            uploadDetail(e) {
                this.details.push(e)
            },
            delDetail(e) {
                this.details.splice(e, 1)
            },
            addAttribute() {
                this.attributes.push({key: "", value: ""})
            },
            delAttribute(e) {
                this.attributes.splice(e, 1)
            },
            addSpecification(e) {
                this.specifications[e].values.push({value: "", albums: []})
            },
            delSpecification(i, i2) {
                this.specifications[i].values.splice(i2, 1)
            },
            changeType(e) {
                this.templateIndex = e;
                let values = this.specificationsTemplate[e].values;
                this.specifications = values.map(i => {
                        return {title: i.value, isUploadPic: i.isUploadPic, values: [{value: "", albums: []}]}
                    }
                );
                this.refreshSku();
            },
            refreshSku() {
                this.skus = [];
                this.combinationSku(this.skus, this.specifications, [], 0);
            },
            combinationSku(skus, specifications, temp, index) {
                if (specifications.length === index) {
                    let arr = [];
                    for (let i = 0; i < temp.length; i++) {
                        arr.push({key: specifications[i].title, value: temp[i].value});
                    }
                    skus.push({
                        specifications: arr,
                        price: 0,
                        inventory: 0,
                        volume: 0,
                        status: 0,
                        sort: 0,
                    });
                    return;
                }
                for (let i = 0; i < specifications[index].values.length; i++) {
                    temp[index] = specifications[index].values[i];
                    this.combinationSku(skus, specifications, temp, index + 1);
                }
            }

        }
    }
</script>

<style scoped>
    .layout-card {
        background-color: #ffffff;
        border-radius: 2px;
        width: 100%;
        height: 100%;
        padding: 10px 20px;
        box-sizing: border-box;
        display: flex;
        flex-direction: column;
    }

    .layout-title {
        margin-top: 10px;
        color: #333333;
        font-weight: bold;
        background-color: #f8f8f8;
        padding: 15px 10px;
    }

    .layout-content {
        margin-top: 15px;
    }

    .layout-head {
        background-color: #f8f8f8;
        display: flex;
        margin: 10px 0 20px 0;
    }

    .layout-head div {
        display: flex;
        flex: 1;
        height: 50px;
        align-items: center;
        justify-content: center;
        font-size: 16px;
        color: #333333;
        cursor: pointer;
    }


    .layout-active-title {
        flex: 1;
        color: #ffffff !important;
        background-color: #36b368;
        height: 100%;
        text-align: center;
        line-height: 50px;
    }

    .layout-active-label {
        content: '';
        width: 0;
        height: 0;
        border-top: 25px solid transparent;
        border-left: 25px solid #36b368;
        border-bottom: 25px solid transparent;
    }

    .layout-bottom {
        width: 100%;
        height: 50px;
        background-color: #FAECDB;
        display: flex;
        align-items: center;
        justify-content: center;
    }

    .layout-container {
        flex: 1;
        overflow-y: auto;
    }

    .card-wrapper {
        padding: 10px 10px;
        border: 1px dashed #cccccc;
        position: relative;
        display: inline-block;
        margin-top: 15px;
    }

    .card-wrapper:hover {
        border: 1px dashed #36b368;
    }

    .del {
        position: absolute;
        color: #ff0000;
        font-size: 20px;
        right: -5px;
        top: -12px;
        cursor: pointer;
    }

    .card-border, .card-border-active {
        width: 100px;
        height: 50px;
        border-radius: 2px;
        margin: 0 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 14px;
        cursor: pointer;
    }

    .card-border {
        border: 1px solid #cccccc;
    }

    .card-border-active {
        border: 1px solid #36b368;
        color: #36b368;
        position: relative;
    }

    .card-border-active::after {
        position: absolute;
        content: "√";
        color: #ffffff;
        width: 0;
        height: 0;
        border-top: 10px solid transparent;
        border-left: 10px solid #36b368;
        border-bottom: 10px solid transparent;
        transform: rotate(45deg);
        bottom: -7px;
        right: -2px;
    }

    .card-border-wrapper {
        display: flex;
    }

    .attr-wrapper {
        width: 200px;
        padding: 10px;
        border: 1px dashed #cccccc;
        position: relative;
        margin: 0 15px;
    }

    .specification-wrapper {
        display: flex;
    }

    .sku-wrapper {
        width: 500px;
        padding: 30px 0;
        border: 1px dashed #cccccc;
        margin: 20px 0;
        position: relative;
    }

    .sku-container {
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        box-sizing: border-box;
        padding: 5px;
    }

</style>