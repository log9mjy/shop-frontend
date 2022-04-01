<template>
	<view class="page container">
		<view class="login-logo-view">
			<view class="login-logo-title">手机号注册</view>
		</view>
		<view class="login-form-view">
			<view class="login-form-item">
				<image class="login-prefix-icon" src="../../static/icon/icon-mobile.png"></image>
				<input v-model="form.mobile" placeholder="请输入手机号" type="number" />
			</view>
			<view class="login-form-item">
				<image class="login-prefix-icon" src="../../static/icon/icon-code.png"></image>
				<input v-model="form.code" placeholder="请输入验证码" type="number" />
				<text v-if="flag" class="send-code-tips">重发({{sec}}s)</text>
				<text v-else class="send-code-tips" @click="sendCode">发送验证码</text>
			</view>
		</view>
		<view class="login-button">
			<view @click="submit">立即注册</view>
		</view>
		<view class="agr-view">
			<radio :checked="choice" color="#ff5601" @tap="check()"></radio>
			<view>
				<text>已阅读并同意一下协议: </text>
				<text class="spec-view"> 《平台服务协议》</text>
				<text class="spec-view"> 《隐私协议》</text>
				<text class="spec-view"> 《注册协议》</text>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		user_register
	} from "../../api/user.js"
	export default {
		data() {
			return {
				choice: false,
				sec: 60,
				flag: false,
				form: {
					mobile: '',
					code: ''
				}
			}
		},
		methods: {
			check() {
				this.choice = !this.choice
			},
			sendCode() {
				this.flag = true;
				let timer = setInterval(() => {
					this.sec = this.sec - 1;
					if (this.sec === 0) {
						clearInterval(timer);
						this.flag = false
					}
				}, 1000)
			},
			submit() {
				if (!this.choice) {
					getApp().globalData.toast("请同意协议")
					return;
				}
				user_register({
					user_type: 1,
					mobile: this.form.mobile,
					code: this.form.code
				}).then(res => {
					uni.setStorageSync("token", res.data.userData.token);
					uni.setStorageSync("info", JSON.stringify(res.data.userData));
					uni.reLaunch({
						url: "../home/home"
					})
				})
			}
		}
	}
</script>

<style>
	.login-logo-view {
		margin-top: 150rpx;
	}

	.login-logo-title {
		color: #000000;
		font-size: 50rpx;
		font-weight: 600;
	}

	.login-logo-tips {
		margin-top: 30rpx;
		color: #555555;
		font-size: 28rpx;
	}

	.login-form-item {
		width: 100%;
		border-bottom: 1rpx solid #F2F3F5;
		font-size: 28rpx;
		padding: 20rpx 0;
		display: flex;
	}

	.eye-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.login-form-item input {
		flex: 1;
		margin-left: 20rpx;
	}

	.login-form-view {
		margin-top: 50rpx;
	}

	.forget-view {
		display: flex;
		width: 100%;
		justify-content: flex-end;
		font-size: 30rpx;
		color: #333333;
		margin-top: 30rpx;
	}

	.login-button {
		margin-top: 70rpx;
		background: linear-gradient(to right, #ff850c, #ff5500);
		text-align: center;
		color: #FFFFFF;
		width: 100%;
		height: 80rpx;
		border-radius: 800rpx;
		line-height: 80rpx;
	}

	.agr-view {
		position: absolute;
		width: 690rpx;
		left: 50%;
		transform: translateX(-50%);
		font-size: 26rpx;
		bottom: 50rpx;
		display: flex;
		color: #555555;
		align-items: center;
	}

	.agr-view radio {
		transform: scale(0.5);
	}

	.spec-view {
		color: #000000;
	}

	.login-prefix-icon {
		width: 40rpx;
		height: 40rpx;
	}

	.send-code-tips {
		font-size: 32rpx;
		color: #111111;
	}
</style>
