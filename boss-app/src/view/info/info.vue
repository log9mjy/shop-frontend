<template>
    <div class="container" v-loading="loading">
        <div class="form">
            <div class="from-title">修改信息</div>
            <el-form size="small" :model="form" label-width="80px" ref="form" :rules="rules">
                <el-form-item label="头像" prop="photo">
                    <upload :file-list="form.photo.url |toArray" @success="uploadAlbum" @del="delAlbum"/>
                </el-form-item>
                <el-form-item label="名称" prop="username">
                    <el-input v-model="form.username" placeholder="名称"></el-input>
                </el-form-item>
            </el-form>
            <div class="form-footer">
                <el-button @click="updateInfo" class="form-footer-button" size="small" type="primary">修改</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {user_update_info} from "../../api/admin";
    import Upload from "../../components/upload";
    import {get_info, set_info} from "../../util/userInfo";

    export default {
        name: "password",
        components: {
            Upload
        },
        data() {
            return {
                form: {
                    photo: {},
                    username: ""
                },
                loading: false,
                rules: {
                    photo: [{required: true, message: '请上传'}],
                    username: [{required: true, message: '请输入'}],
                },
                info: {}
            }
        },
        mounted() {
            let info = get_info();
            this.info = info;
            this.form = {
                photo: {url: info.photo, path: ''},
                username: info.username
            };
        },
        methods: {
            updateInfo() {
                this.loading = true;
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        user_update_info({
                            photo: this.form.photo.path,
                            username: this.form.username,
                        }).then(() => { 
                            this.loading = false;
                            this.info.photo = this.form.photo.url;
                            this.info.username = this.form.username;
                            set_info(this.info);
                            this.$message.success("修改成功");
                        })
                    }
                })
            },
            uploadAlbum(e) {
                this.form.photo = e;
            },
            delAlbum() {
                this.form.photo = {};
            }

        }

    }
</script>

<style scoped>

    .container {
        position: relative;
        width: 100%;
        margin-top: 150px;
        display: flex;
        flex-direction: column;
        align-items: center;
    }

    .from-title {
        font-size: 16px;
        font-weight: bold;
        margin-bottom: 30px;
        color: #333333;
        text-align: center;
    }

    .form {
        width: 350px;
        padding: 40px 30px;
        background-color: #ffffff;
        border-radius: 5px;
        display: block;
    }

    .form-footer {
        margin-top: 40px;
    }

    .form-footer-button {
        width: 270px;
        margin-left: 60px;
    }
</style>