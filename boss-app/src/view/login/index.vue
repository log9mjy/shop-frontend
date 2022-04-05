<template>
    <div class="login-container">
        <div class="login-form">
            <img src="../../assets/image/abc.png" class="login-form-image" alt=""/>
            <div class="login-form-view">
                <div class="login-title">欢迎登陆</div>
                <div class="login-sub-title">做大做强</div>
                <div class="login-form-item" style="margin-top: 60px">
                    <img class="input-icon" src="../../assets/image/mobile.png" alt=""/>
                    <input class="login-input" v-model="mobile" placeholder="电话"/>
                </div>
                <div class="login-form-item" style="margin-top: 20px">
                    <img class="input-icon" src="../../assets/image/code.png" alt=""/>
                    <input class="login-input" type="password" v-model="password" placeholder="密码"
                           aria-placeholder="密码"/>
                </div>
                <div class="login-button" @click="submitForm">登陆</div>
            </div>
        </div>
    </div>
</template>

<script>
    import {login} from "../../api/admin";
    import {set_token} from "../../util/token";
    import {set_info} from '../../util/userInfo';

    export default {
        data() {
            return {
                mobile: "",
                password: "",
            };
        },
        methods: {
            /**
             * 提交表单
             */
            submitForm() {
                if (!this.mobile) {
                    this.$message({type: "error", message: "请输入电话"});
                    return;
                }
                if (!this.password) {
                    this.$message({type: "error", message: "请输入密码"});
                    return;
                }
                login(this.mobile, this.password).then(res => {
                    set_token(res.data.userData.token);
                    set_info(res.data.userData);
                    this.$router.push({
                        path: "/",
                    });
                });
            }
        }
    };
</script>

<style>
    input:-webkit-autofill {
        box-shadow: 0 0 0 1000px #fff inset;
        -webkit-text-fill-color: #333;
    }

    .login-container {
        position: relative;
        height: 100vh;
        width: 100vw;
        background: url(../../assets/image/bg.png) no-repeat;
    }

    .login-form {
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        width: 850px;
        height: 500px;
        border-radius: 12px;
        display: flex;
        box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
    }

    .login-form-image {
        height: 100%;
    }

    .login-title {
        color: #3D95FF;
        font-size: 30px;
        font-weight: 800;
    }

    .login-form-view {
        height: 100%;
        flex: 1;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
    }

    .login-sub-title {
        margin-top: 20px;
        color: #3D95FF;
        font-size: 22px;
        font-weight: 800;
    }

    .login-form-item {
        width: 250px;
        height: 40px;
        padding: 0 10px;
        box-sizing: border-box;
        background-color: #fff;
        border-radius: 40px;
        display: flex;
        align-items: center;
        box-shadow: 0 2px 10px rgba(61, 126, 255, 0.2);
    }

    .login-form-item:hover {
        box-shadow: 0 4px 10px rgba(29, 212, 181, 0.2);
    }

    .input-icon {
        width: 20px;
        height: 20px;
    }

    .login-input {
        margin-left: 5px;
        outline: none;
        border: none;
    }

    .input-split {
        background-color: #CCCCCC;
        height: 20px;
        width: 1px;
        margin: 0 15px;
    }

    .send-button {
        color: #3D95FF;
        cursor: pointer;
        font-size: 12px;
    }

    .login-button {
        margin-top: 60px;
        background: linear-gradient(to right, #3D95FF, #3D7EFF);
        box-shadow: 0 4px 10px rgba(61, 126, 255, 0.5);
        width: 250px;
        height: 40px;
        display: flex;
        justify-content: center;
        align-items: center;
        color: #fff;
        font-size: 16px;
        border-radius: 40px;
        cursor: pointer;
    }

    .login-button:hover {
        box-shadow: 0 4px 10px rgba(255, 113, 50, 0.5);
    }
</style>
