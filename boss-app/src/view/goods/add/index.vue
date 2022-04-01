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
                            <el-form-item label="商品名称" prop="name">
                                <el-input v-model="form.name" placeholder="输入商品名称" style="width: 400px" type="textarea"
                                          :maxlength="100" show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item label="商品说明" prop="project_describe">
                                <el-input v-model="form.project_describe" placeholder="输入商品说明" style="width: 300px"
                                          type="textarea" :maxlength="100" show-word-limit></el-input>
                            </el-form-item>
                            <el-form-item label="商品品牌" prop="brand_id">
                                <el-select v-model="form.brand_id" style="width: 100px" clearable>
                                    <el-option v-for="item in options" :key="item.id" :label="item.name"
                                               :value="item.id">
                                    </el-option>
                                </el-select>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div class="layout-title">商品图片</div>
                    <div class="layout-content">
                        <upload :limit="5" :file-list="albums.map(i=>i.url)" @success="uploadAlbum"
                                @del="delAlbum"></upload>
                    </div>
                </div>
                <div v-if="step===2">
                    <div class="layout-title">详情图片</div>
                    <div class="layout-content">
                        <upload :limit="30" :file-list="details.map(i=>i.url)" @success="uploadDetail"
                                @del="delDetail"></upload>
                    </div>
                </div>
                <div v-if="step===3">
                    <div class="layout-title">商品规格
                        <el-button @click="addSpecification" size="mini" icon="el-icon-plus">新增</el-button>
                    </div>
                    <div v-for="(item,index) in specifications" :key="index" style="position: relative;">
                        <div class="layout-title">
                            <el-input style="width: 200px" v-model="item.title" placeholder="输入规格项"/>
                            <el-button style="margin-left: 10px" icon="el-icon-plus"
                                       @click="addSpecificationValue(index)">新增
                            </el-button>
                        </div>
                        <div class="layout-content specification-wrapper">
                            <div class="attr-wrapper" v-for="(p,i) in item.values" :key="i">
                                <el-input v-model="p.value" :placeholder="'输入'+item.title"/>
                                <div class="del" @click="delSpecificationValue(index,i)">x</div>
                            </div>
                        </div>
                        <div class="del-left" @click="delSpecification(index)">x</div>
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
                                <el-form-item label="价格">
                                    <el-input v-model="item.project_price" style="width: 200px" placeholder="输入价格"/>
                                </el-form-item>
                                <el-form-item label="库存">
                                    <el-input v-model="item.project_stock" style="width: 200px" placeholder="输入库存"/>
                                </el-form-item>
                                <el-form-item label="排序">
                                    <el-input v-model="item.specs_seq" style="width: 200px" placeholder="输入排序"/>
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
    import {brand_options, goods_add} from "../../../api/goods";

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
                    name: "",
                    project_describe: "",
                    brand_id: "",
                },
                rules: {
                    name: [{required: true, message: '请输入'}],
                    project_describe: [{required: true, message: '请输入'}],
                    brand_id: [{required: true, message: '请选择'}],
                },
                albums: [],
                details: [],
                specifications: [],
                skus: []
            }
        },
        mounted() {
            brand_options().then(res => {
                this.options = res.list;
            });
        },
        methods: {
            back() {
                this.$router.push({
                    path: "/goods/list"
                })
            },
            save() {
                let params = {
                    brand_id: this.form.brand_id + "",
                    project_describe: this.form.project_describe,
                    name: this.form.name,
                };
                if (this.albums.length === 0) {
                    this.$message.error("请上传商品图片");
                }
                let arr = this.albums.map(i => {
                    return {
                        is_default: "0",
                        url: i.path
                    }
                });
                arr[0].is_default = "1";
                params.shop_image = arr;
                params.details = this.details.map(i => i.path);
                let attribute_key = {};
                this.specifications.map(i => {
                    attribute_key[i.title] = i.values.map(j => j.value);
                });
                params.attribute_key = attribute_key;
                params.project_specs = this.skus.map(i => {
                    let specs = i.specifications.map(j => {
                        let r = {};
                        r[j.key] = j.value;
                        return r;
                    });
                    return {
                        specs_seq: i.specs_seq,
                        project_stock: i.project_stock,
                        project_price: i.project_price,
                        project_specs: specs
                    }
                });
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
            delSpecification(i) {
                this.specifications.splice(i)
            },
            addSpecification() {
                this.specifications.push({
                    title: '',
                    values: []
                })
            },
            addSpecificationValue(i) {
                this.specifications[i].values.push({value: ""})
            },
            delSpecificationValue(i, i2) {
                this.specifications[i].values.splice(i2, 1)
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
                        project_stock: "0",
                        project_price: "0",
                        specs_seq: "0"
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
        z-index: 9999;
    }

    .del-left {
        position: absolute;
        color: #ff0000;
        font-size: 20px;
        right: 0;
        top: -12px;
        cursor: pointer;
        z-index: 9999;
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