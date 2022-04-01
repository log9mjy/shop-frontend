<template>
	<scroll-view class="page" scroll-y>
		<view class="panl">
			<view class="user-info">
				<view class="user-avatar">
					<image src="../../static/image/user-avatar.jpg"></image>
				</view>
				<view class="user-nick">
					<text>秋风竹韵</text>
					<text>淘宝账户: 54565454654564</text>
				</view>
			</view>
			<view class="set-icon">
				<image src="../../static/icon/right.png"></image>
			</view>
		</view>
		<view class="panl panl-line">
			<view class="panl-title">商家入驻</view>
			<view class="set-icon">
				<image src="../../static/icon/right.png"></image>
			</view>
		</view>
		<view class="panl panl-line">
			<view class="panl-title">帮助于反馈</view>
			<view class="set-icon">
				<image src="../../static/icon/right.png"></image>
			</view>
		</view>
		<view class="ext-button" @click="logout">退出登录</view>
	</scroll-view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			logout() {
				uni.navigateTo({
					url: "../login/login"
				})
			}

		}
	}
</script>

<style>
	.panl {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 30rpx;
		align-items: center;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.set-icon image {
		width: 40rpx;
		height: 40rpx;
	}

	.user-info {
		display: flex;
	}

	.user-avatar image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 120rpx;
	}

	.user-nick {
		display: flex;
		flex-direction: column;
		justify-content: center;
		margin-left: 20rpx;
	}

	.user-nick text:nth-child(1) {
		color: #000000;
		font-size: 40rpx;
	}

	.user-nick text:nth-child(2) {
		color: #888888;
		font-size: 28rpx;
		margin-top: 10rpx;
	}

	.panl-title {
		color: #111111;
		font-size: 32rpx;
	}

	.panl-line {
		border-top: 1rpx solid #F8F8F8;
	}

	.ext-button {
		margin-top: 15rpx;
		padding: 30rpx 0;
		text-align: center;
		color: #111111;
		background-color: #FFFFFF;
	}
</style>
