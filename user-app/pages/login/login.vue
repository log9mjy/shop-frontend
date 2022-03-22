<template>
	<view class="page container">
		<view class="login-logo-view">
			<view class="login-logo-title">亲, 欢迎登录</view>
			<view class="login-logo-tips">
				<text>没有账号?</text>
				<text style="color: #F0AD4E;margin-left: 15rpx;">立即注册</text>
			</view>
		</view>
		<view class="login-form-view">
			<view class="login-form-item">
				<input placeholder="请输入手机号" />
			</view>
			<view class="login-form-item">
				<input :type="model===1?'password':'text'" placeholder="请输入密码" />
				<image v-if="model===1" class="eye-icon" src="../../static/icon/hide.png" @tap="change()"></image>
				<image v-else class="eye-icon" src="../../static/icon/show.png" @tap="change()"></image>
			</view>
		</view>
		<view class="forget-view">
			<view>忘记密码</view>
		</view>
		<view class="login-button">
			<view>登录</view>
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
	export default {
		data() {
			return {
				choice: false,
				model: 1
			}
		},
		methods: {
			check() {
				this.choice = !this.choice
			},
			change() {
				this.model = this.model === 1 ? 2 : 1;
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
</style>
