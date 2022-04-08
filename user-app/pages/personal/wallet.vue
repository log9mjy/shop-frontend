<template>
	<view class="page padding" sty>
		<view class="wallet-card" @tap="linkRecharge()">
			<image src="../../static/image/wallet-bg.png"></image>
			<view class="wallet-amout-view">
				<view class="wallet-amout-title">
					<text>总资产 (元)</text>
				</view>
				<view class="wallet-amout">
					<text>{{info.money}}</text>
				</view>
			</view>
		</view>
		<view class="scrollView-wrapper">
			<scroll-view class="scrollView" scroll-y>
				<view class="wallet-item">
					<view class="wallet-item-title">
						<view style="">银行卡</view>
						<view style="">2022-04-09</view>
					</view>
					<view class="amount">+30</view>
				</view>
			</scroll-view>
		</view>
	</view>
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
			onNavigationBarButtonTap() {
				uni.navigateTo({
					url: "./wallet-recharge"
				})
			}
		}
	}
</script>

<style>
	.wallet-card {
		width: 100%;
		position: relative;
		border-radius: 30rpx;
		overflow: hidden;
	}

	.wallet-card image {
		width: 100%;
		height: 300rpx;
		border-radius: 30rpx;
	}

	.wallet-amout-view {
		position: absolute;
		left: 30rpx;
		top: 50%;
		transform: translateY(-50%);
	}

	.wallet-amout {
		color: #FFFFFF;
		font-size: 80rpx;
		font-weight: bold;
		margin-top: 10rpx;
	}

	.wallet-amout-title {
		color: #FFFFFF;
		font-size: 28rpx;
	}

	.scrollView {
		height: 100%;
		background-color: #FFFFFF;
		border-radius: 30rpx;
	}

	.scrollView-wrapper {
		flex: 1;
		width: 100%;
		padding: 30rpx 0;
		box-sizing: border-box;
	}

	.wallet-item {
		display: flex;
		justify-content: space-between;
		padding: 30rpx 30rpx;
		box-sizing: border-box;
		align-items: center;
	}


	.wallet-item .amount {
		font-size: 40rpx;
		color: #FF3333;
	}

	.wallet-item-title view:nth-child(2) {
		font-size: 26rpx;
		margin-top: 10rpx;
		color: #888888;
	}

	.wallet-item-title view:nth-child(1) {
		font-size: 32rpx;
		color: #333;
	}
</style>
