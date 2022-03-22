<template>
    <div>
        <div class="param-wrapper">
            <div class="param-title">系统参数</div>
            <div class="param-value" v-for="item in base" :key="item.id">
                <div style="color: #333333;width: 70px">{{item.name}}</div>
                <el-input v-if="item.fieldType===1" v-model="item.value"
                          style="width: 300px;margin-left: 15px" @blur="updateInput(item)"></el-input>
                <upload style="margin-left: 20px" v-if="item.fieldType===2" :file-list="item.value |toArray"
                        @success="e=>updateImage(item.id,e)" @del="()=>delImage(item.id)"/>
            </div>
        </div>
        <div class="param-wrapper">
            <div class="param-title">邮件参数</div>
            <div class="param-value" v-for="item in email" :key="item.id">
                <div style="color: #333333;width: 70px">{{item.name}}</div>
                <el-input v-if="item.fieldType===1" v-model="item.value"
                          style="width: 300px;margin-left: 15px" @blur="updateInput(item)"></el-input>
                <upload style="margin-left: 20px" v-if="item.fieldType===2" :file-list="item.value |toArray"
                        @success="e=>updateImage(item.id,e)" @del="()=>delImage(item.id)"/>
            </div>
        </div>
        <div class="param-wrapper">
            <div class="param-title">小程序</div>
            <div class="param-value" v-for="item in program" :key="item.id">
                <div style="color: #333333;width: 70px">{{item.name}}</div>
                <el-input v-if="item.fieldType===1" v-model="item.value"
                          style="width: 300px;margin-left: 15px" @blur="updateInput(item)"></el-input>
                <upload style="margin-left: 20px" v-if="item.fieldType===2" :file-list="item.value |toArray"
                        @success="e=>updateImage(item.id,e)" @del="()=>delImage(item.id)"/>
            </div>
        </div>
        <div class="param-wrapper">
            <div class="param-title">微信支付</div>
            <div class="param-value" v-for="item in weixin" :key="item.id">
                <div style="color: #333333;width: 70px">{{item.name}}</div>
                <el-input v-if="item.fieldType===1" v-model="item.value"
                          style="width: 300px;margin-left: 15px" @blur="updateInput(item)"></el-input>
                <upload style="margin-left: 20px" v-if="item.fieldType===2" :file-list="item.value |toArray"
                        @success="e=>updateImage(item.id,e)" @del="()=>delImage(item.id)"/>
            </div>
        </div>
    </div>
</template>

<script>
    import {system_config, system_edit} from "../../../api/config";
    import Upload from "../../../components/upload";

    export default {
        name: "index",
        components: {
            Upload
        },
        data() {
            return {
                base: [],
                email: [],
                program: [],
                weixin: [],
                data: []
            }
        },
        mounted() {
            system_config().then(res => {
                this.data = res.data;
                this.base = res.data.filter(i => i.type === 1);
                this.email = res.data.filter(i => i.type === 4);
                this.program = res.data.filter(i => i.type === 2);
                this.weixin = res.data.filter(i => i.type === 3);
            })
        },
        methods: {
            updateInput(item) {
                system_edit({
                    id: item.id,
                    value: item.value
                }).then(() => {
                    this.$message.success("保存成功")
                })
            },
            updateImage(id, url) {
                for (let item of this.data) {
                    if (item.id === id) {
                        item.value = url;
                        break;
                    }
                }
                system_edit({
                    id: id,
                    value: url
                }).then(() => {
                    this.$message.success("保存成功")
                })
            },
            delImage(id) {
                for (let item of this.data) {
                    if (item.id === id) {
                        item.value = '';
                        break;
                    }
                }
            }
        }
    }
</script>

<style scoped>

    .param-wrapper {
        background-color: #ffffff;
        padding: 15px 50px;
    }

    .param-title {
        color: #333333;
        font-size: 14px;
        font-weight: bold;
    }

    .param-value {
        display: flex;
        font-size: 14px;
        align-items: center;
        margin-top: 10px;
    }


</style>