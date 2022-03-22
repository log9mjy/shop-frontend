<template>
	<view class="page">
		<view class="nav-view" :style="'margin-top:'+l+'px'">
			<view class="nav-left">
				<image src="../../static/icon/left.png" @tap="back"></image>
				<text>我的收货地址</text>
			</view>
			<view class="nav-right">管理</view>
		</view>
		<scroll-view scroll-y class="scroll">
			<view v-for="i in 100" class="addr-item">
				<view class="addr-content">
					<view class="addr-info">
						<text>往事随风</text>
						<text>13082870526</text>
						<text>默认</text>
					</view>
					<view class="addr-detail">四川省 成都市 青羊区 三利云锦北区</view>
				</view>
				<view class="addr-item-icon">
					<image src="../../static/icon/edit.png"></image>
				</view>
			</view>
		</scroll-view>
		<view class="bottom-view">
			<view class="bottom-btn" @tap="linkAdd">
				<image src="../../static/icon/plus.png"></image>
				<text>添加收货地址</text>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				l: 0
			}
		},
		onShow() {
			let info = uni.getSystemInfoSync();
			this.l = info.statusBarHeight;
		},
		methods: {
			back() {
				uni.navigateBack()
			},
			linkAdd() {
				uni.navigateTo({
					url: "./detail"
				})
			}
		}
	}
</script>

<style>
	.bottom-view {
		height: 120rpx;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.bottom-btn {
		background: linear-gradient(to right, #ff850c, #ff5500);
		display: flex;
		align-items: center;
		justify-content: center;
		height: 80rpx;
		width: 100%;
		color: #FFFFFF;
		font-size: 30rpx;
		line-height: 80rpx;
		border-radius: 80rpx;
	}

	.bottom-btn image {
		width: 30rpx;
		height: 30rpx;
	}

	.bottom-btn text {
		margin-left: 15rpx;
	}

	.addr-item-icon image {
		width: 40rpx;
		height: 40rpx;
	}

	.scroll {
		height: 0;
		flex: 1;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.addr-item {
		display: flex;
		justify-content: space-between;
		padding: 20rpx 0;
	}

	.addr-content {}

	.addr-info {
		display: flex;
		align-items: center;
	}

	.addr-info text:nth-child(1) {
		color: #000000;
		font-size: 30rpx;
		font-weight: bold;
	}

	.addr-info text:nth-child(2) {
		color: #555555;
		font-size: 26rpx;
		margin-left: 20rpx;
	}


	.addr-info text:nth-child(3) {
		color: #FF5500;
		border: 1rpx solid #FF5500;
		font-size: 20rpx;
		padding: 2rpx 10rpx;
		margin-left: 20rpx;
	}

	.addr-detail {
		color: #333333;
		font-size: 28rpx;
		margin-top: 15rpx;
	}
</style>
