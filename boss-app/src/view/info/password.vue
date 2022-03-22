<template>
    <div class="container" v-loading="loading">
        <div class="form">
            <div class="from-title">修改密码</div>
            <el-form size="small" :model="form" label-width="80px" ref="form" :rules="rules">
                <el-form-item label="旧密码" prop="oldPassword">
                    <el-input v-model="form.oldPassword" placeholder="旧密码"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" placeholder="新密码"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="rePassword">
                    <el-input v-model="form.rePassword" placeholder="新密码"></el-input>
                </el-form-item>
            </el-form>
            <div class="form-footer">
                <el-button @click="updatePassword" class="form-footer-button" size="small" type="primary">修改</el-button>
            </div>
        </div>
    </div>
</template>

<script>
    import {user_update_password} from "../../api/admin";
    import {remove_info} from "../../util/userInfo";
    import {remove_token} from "../../util/token";

    export default {
        name: "password",
        data() {
            let validatePassword = (rule, value, callback) => {
                if (value === '') {
                    callback(new Error('请再次输入密码'));
                } else if (value !== this.form.password) {
                    callback(new Error('两次输入密码不一致!'));
                } else {
                    callback();
                }
            };
            return {
                form: {
                    oldPassword: '',
                    password: '',
                    rePassword: ""
                },
                loading: false,
                rules: {
                    oldPassword: [{required: true, message: '旧密码不能为空'}],
                    password: [{required: true, message: '密码不能为空'}],
                    rePassword: [{validator: validatePassword, required: true, trigger: 'blur'}],
                }
            }
        },
        methods: {
            updatePassword() {
                this.loading = true;
                this.$refs['form'].validate(valid => {
                    if (valid) {
                        user_update_password(this.form.oldPassword, this.form.password).then(() => {
                            this.loading = false;
                            remove_info();
                            remove_token();
                            this.$router.push({
                                path: '/login'
                            })
                        })
                    }
                })
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
        width: 200px;
        margin-left: 60px;
    }
</style>