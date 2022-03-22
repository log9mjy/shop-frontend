<template>
    <div class="upload-view">
        <div :class="['lk-upload-image-container',index!==0?'margin-left':'']" v-for="(item, index) in fileList"
             :key="index">
            <el-image :preview-src-list="fileList" class="lk-upload-image" :src="item" fit="cover"/>
            <i class="el-icon-remove del-image" @click="delImage(index)"></i>
        </div>
        <div :class="['lk-upload',fileList.length>0?'margin-left':'']" @click="handleClick"
             v-if="limit > fileList.length">
            <input v-if="cropped" class="lk-upload-input" type="file" @change="choice" ref="uploadImage"
                   accept=".jpg, .jpeg, .png, .gif"/>
            <input v-else class="lk-upload-input" type="file" @change="doUpload" ref="uploadImage"
                   accept=".jpg, .jpeg, .png, .gif"/>
        </div>
        <el-dialog v-if="cropped" :visible.sync="visible" title="裁剪图片" width="560px" append-to-body
                   class="cropper-wrapper">
            <i slot="title" class="el-icon-check sure-icon" @click="cropPic"></i>
            <vue-cropper ref="cropper" :min-canvas-width="500" :aspect-ratio="aspectRatio" :src="imgSrc"/>
        </el-dialog>
    </div>
</template>
<script>
    import {upload_token} from "../../api/upload";
    import {upload} from "qiniu-js";
    import VueCropper from 'vue-cropperjs';
    import 'cropperjs/dist/cropper.css';

    export default {
        components: {VueCropper},
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
            cropped: {
                default: false,
                type: Boolean
            },
            aspectRatio: {
                default: 1,
                type: Number
            }
        },
        data() {
            return {
                imgSrc: "",
                visible: false
            }
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
             * 选择图片
             */
            choice(e) {
                this.$nextTick(() => {
                    this.visible = true;
                    const file = e.target.files[0];
                    if (file.type.indexOf('image/') === -1) {
                        alert('Please select an image file');
                        return;
                    }
                    if (typeof FileReader === 'function') {
                        const reader = new FileReader();
                        reader.onload = (event) => {
                            this.imgSrc = event.target.result;
                            this.$refs.cropper.replace(event.target.result);
                        };
                        reader.readAsDataURL(file);
                    } else {
                        alert('Sorry, FileReader API not supported');
                    }
                })
            },
            /**
             * 计算base64 大小
             */
            showSize(base64url) {
                base64url = base64url.substring(22);
                let equalIndex = base64url.indexOf("=");
                if (base64url.indexOf("=") > 0) {
                    base64url = base64url.substring(0, equalIndex);
                }
                let strLength = base64url.length;
                return parseInt(strLength - (strLength / 8) * 2);
            },
            /**
             *  剪切图片
             */
            cropPic() {
                let cropImg = this.$refs.cropper.getCroppedCanvas().toDataURL();
                upload_token().then(res => {
                    let prefix = res.data.prefix;
                    let key = "image/" + new Date().getTime() + ".jpg";
                    let url = "http://upload-z2.qiniup.com/putb64/" + this.showSize(cropImg) + "/key/" + window.btoa(key);
                    let xhr = new XMLHttpRequest();
                    xhr.onreadystatechange = () => {
                        if (xhr.readyState === 4) {
                            let url = prefix + "/" + key;
                            this.$message.success("上传成功");
                            this.$emit("success", url);
                            this.visible = false;
                        }
                    };
                    xhr.open("POST", url, true);
                    xhr.setRequestHeader("Content-Type", "application/octet-stream");
                    xhr.setRequestHeader("Authorization", 'UpToken ' + res.data.token);
                    xhr.send(cropImg.substring(22));
                })
            },
            /**
             * 执行上传事件
             */
            doUpload(e) {
                const file = e.target.files[0];
                upload_token().then(res => {
                    let key = "image/" + new Date().getTime() + ".jpg";
                    let prefix = res.data.prefix;
                    const observe = upload(file, key, res.data.token);
                    observe.subscribe(() => {
                    }, () => {
                    }, (res) => {
                        let url = prefix + "/" + res.key;
                        this.$message.success("上传成功");
                        this.$emit("success", url);
                    });
                })
            }
        },

    }
</script>
<style scoped>
    .lk-upload {
        box-sizing: border-box;
        width: 80px;
        height: 80px;
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
        width: 20px;
        height: 1px;
    }

    .lk-upload::before {
        content: "";
        width: 1px;
        height: 20px;
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
        width: 80px;
        height: 80px;
        border-radius: 4px;
        border: 1px dashed #d9d9d9;
        padding: 5px;
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
        font-size: 18px;
        position: absolute;
        top: -10px;
        right: -8px;
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
