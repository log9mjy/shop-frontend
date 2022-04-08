<template>
	<scroll-view class="page" scroll-y>
		<view class="panl panl-line" @tap="updateAvatar">
			<view class="user-avatar">
				<image :src="info.photo"></image>
			</view>
			<view class="set-icon">
				<image src="../../static/icon/right.png"></image>
			</view>
		</view>
		<view class="panl panl-line" @tap="updateNick">
			<view class="panl-title">昵称</view>
			<view class="set-icon">
				<text>{{info.username}}</text>
				<image src="../../static/icon/right.png"></image>
			</view>
		</view>
		<view class="panl panl-line" >
			<view class="panl-title">手机号</view>
			<view class="set-icon">
				<text style="color: #888888;font-size: 28rpx;">{{info.mobile}}</text>
			</view>
		</view>
		<view class="ext-button" @click="logout">退出登录</view>
	</scroll-view>
</template>

<script>
	import {
		get_info
	} from "../../utils/info.js"
	export default {
		data() {
			return {
				info: {}
			}
		},
		onShow() {
			this.info = get_info();
		},
		methods: {
			logout() {
				uni.navigateTo({
					url: "../login/login"
				})
			},
			updateAvatar() {
				uni.chooseImage({
					sourceType: ["album"],
					count: 1,
					success: (res) => {

					}
				})
			},
			updateNick() {
				uni.navigateTo({
					url: "./nickname"
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

	.set-icon {
		display: flex;
		align-items: center;
	}

	.set-icon text {
		margin-right: 10rpx;
		font-size: 30rpx;
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
