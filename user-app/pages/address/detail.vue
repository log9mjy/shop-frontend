<template>
	<view class="page">
		<view class="nav-view" :style="'margin-top:'+l+'px'">
			<view class="nav-left">
				<image src="../../static/icon/left.png" @tap="back"></image>
				<text>添加收货地址</text>
			</view>
			<view class="nav-right">管理</view>
		</view>
		<view>
			<view class="input-item">
				<view class="input-label">收货人</view>
				<view class="input-wrapper">
					<input placeholder="名字" />
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">手机号码</view>
				<view class="input-wrapper">
					<input placeholder="手机号" />
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">详细地址</view>
				<view class="input-wrapper">
					<input placeholder="省 市 区 小区楼栋" />
				</view>
			</view>
			<view class="input-item-radio">
				<view class="input-label-radio">设为默认地址</view>
				<view>
					<switch color="#ff5500"></switch>
				</view>
			</view>
			<view class="save-btn-view">
				<view class="back-color center save-btn">保存</view>
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
			}
		}
	}
</script>

<style>
	.input-item,
	.input-item-radio {
		display: flex;
		padding: 20rpx 30rpx;
		align-items: center;
	}

	.input-item-radio {
		justify-content: space-between;
	}

	.input-label,
	.input-label-radio {
		color: #000000;
		font-size: 30rpx;
		font-weight: bold;
	}

	.input-label {
		width: 150rpx;
	}

	.input-wrapper {
		background-color: #F2F3F5;
		flex: 1;
		border-radius: 15rpx;
		font-size: 28rpx;
		height: 80rpx;
		align-items: center;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.save-btn {
		height: 80rpx;
		border-radius: 80rpx;
	}

	.save-btn-view {
		margin-top: 30rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	switch {
		transform: scale(0.7);
	}
</style>
