<template>
    <div class="upload-view">
        <div :class="['lk-upload-image-container',index!==0?'margin-left':'']" v-for="(item, index) in fileList"
             :key="index">
            <el-image :preview-src-list="fileList" class="lk-upload-image" :src="item" fit="cover"/>
            <i class="el-icon-remove del-image" @click="delImage(index)"></i>
        </div>
        <div :class="['lk-upload',fileList.length>0?'margin-left':'']" @click="handleClick"
             v-if="limit > fileList.length">
            <input class="lk-upload-input" type="file" @change="doUpload" ref="uploadImage"
                   accept=".jpg, .jpeg, .png, .gif"/>
        </div>

    </div>
</template>
<script>
    import {upload} from "../../api/upload";


    export default {
        props: {
            fileList: {
                type: Array,
                default: () => {
                    return [];
                }
            },
            limit: {
                type: Number,
                default: 1
            },
        },

        methods: {
            /**
             * 删除图片
             */
            delImage(index) {
                this.$emit("del", index);
            },
            /**
             * 点击事件
             */
            handleClick() {
                this.$refs.uploadImage.click();
            },

            /**
             * 执行上传事件
             */
            doUpload(e) {
                const file = e.target.files[0];
                upload(file).then(res => {
                    this.$message.success("上传成功");
                    this.$emit("success", res.url);
                })
            }
        },

    }
</script>
<style scoped>
    .lk-upload {
        box-sizing: border-box;
        width: 30px;
        height: 30px;
        border-radius: 4px;
        border: 1px dashed #d9d9d9;
        position: relative;
        cursor: pointer;
    }

    .lk-upload::after,
    .lk-upload::before {
        background-color: #8c939d;
        top: 50%;
        left: 50%;
        position: absolute;
        transform: translate(-50%, -50%);
    }

    .lk-upload::after {
        content: "";
        width: 10px;
        height: 1px;
    }

    .lk-upload::before {
        content: "";
        width: 1px;
        height: 10px;
    }

    .lk-upload:hover {
        border: 1px dashed #409eff;
    }

    .lk-upload-input {
        display: none;
    }

    .upload-view {
        display: flex;
        flex-wrap: wrap;
        width: 100%;
    }

    .lk-upload-image {
        width: 30px;
        height: 30px;
        border-radius: 2px;
        border: 1px dashed #d9d9d9;
        padding: 2px;
        box-sizing: border-box;
    }

    .lk-upload-image:hover {
        border: 1px dashed #409eff;
    }

    .lk-upload-image-container {
        position: relative;
    }

    .del-image {
        color: #ff0000;
        font-size: 14px;
        position: absolute;
        top: -8px;
        right: -6px;
        cursor: pointer;
    }

    .margin-left {
        margin-left: 10px;
    }

    .sure-icon {
        font-size: 18px;
        cursor: pointer;
        color: #909399;
    }

    .sure-icon:hover {
        color: #36b368;
    }

    .cropper-wrapper >>> .el-dialog__body {
        padding: 0 !important;
        box-sizing: border-box !important;
    }
</style>
