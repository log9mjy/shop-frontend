<template>
	<view class="page">
		<view class="page-head">
			<image src="../../static/image/personal-bg.png" class="page-head-bg"></image>
			<view class="info-view" :style="'top:'+(l+10)+'px'">
				<view class="user-info-view">
					<view class="user-info">
						<image :src="user.photo"></image>
						<view class="user-nick-view">
							<view class="user-nick">{{user.username}}</view>
							<view class="user-number">手机号: {{user.mobile}}</view>
						</view>
					</view>
					<view class="user-set" @tap="linkSet()">
						<image src="../../static/icon/set.png"></image>
					</view>
				</view>
				<view class="user-order-view">
					<view class="user-order-nav">
						<view class="user-order-title">我的订单</view>
						<view class="user-order-nav-icon" @tap="linkOrder(-1)">
							<text>全部</text>
							<image src="../../static/icon/right.png"></image>
						</view>
					</view>
					<view class="user-order-container">
						<view class="user-order-item" @tap="linkOrder(1)">
							<image src="../../static/icon/order-1.png"></image>
							<text>待付款</text>
							<view></view>
						</view>
						<view class="user-order-item" @tap="linkOrder(2)">
							<image src="../../static/icon/order-2.png"></image>
							<text>待发货</text>
							<view class="order-num">5</view>
						</view>
						<view class="user-order-item" @tap="linkOrder(3)">
							<image src="../../static/icon/order-3.png"></image>
							<text>待收货</text>
							<view></view>
						</view>
					</view>
				</view>
				<view class="card ad-view">
					<view class="tool-item" v-for="(item,index) in tools" :key="index" @tap="linkAd(item.path)">
						<image :src="item.image"></image>
						<text>{{item.title}}</text>
					</view>
					<view class="tool-item"></view>
					<view class="tool-item"></view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				l: 0,
				user: {},
				ad: [{
					image: "../../static/image/ad-3.jpg"
				}, {
					image: "../../static/image/ad-3.jpg"
				}],
				tools: [{
					image: "../../static/icon/icon-pack.png",
					title: "钱包",
					path: './wallet'
				}, ],
				// {
				// 	image: "../../static/icon/icon-invite.png",
				// 	title: "邀请",
				// 	path: './wallet'
				// }, {
				// 	image: "../../static/icon/icon-sm.png",
				// 	title: "实名",
				// 	path: './wallet'
				// },
			}
		},
		onShow() {
			let info = uni.getSystemInfoSync();
			this.l = info.statusBarHeight;
			let user = uni.getStorageSync("info");
			this.user = JSON.parse(user);
		},
		methods: {
			linkSet() {
				uni.navigateTo({
					url: "set"
				})
			},
			linkAd(path) {
				uni.navigateTo({
					url: path
				})
			},
			linkOrder(type) {
				uni.navigateTo({
					url: "../order/list?type=" + type
				})
			},
			linkWallet() {
				uni.navigateTo({
					url: "./wallet"
				})
			}
		}
	}
</script>

<style>
	.page-head-bg {
		width: 100%;
		height: 500rpx;
	}

	.page-head {
		position: relative;
	}

	.head-title-view {
		position: absolute;
		bottom: 10px;
		color: #FFFFFF;
		padding-left: 15px;
		box-sizing: border-box;
	}

	.head-title {
		font-weight: 900;
		font-size: 45rpx;
	}

	.head-sub-title {
		margin-left: 10rpx;
		font-weight: 800;
		font-size: 30rpx;
	}

	.head-title-wrapper {
		display: flex;
		align-items: center;
	}

	.info-view {
		position: absolute;
		width: 690rpx;
		left: 50%;
		transform: translateX(-50%);
	}

	.user-info-view {
		display: flex;
		justify-content: space-between;
	}

	.user-set image {
		width: 40rpx;
		height: 40rpx;
		margin-top: 10rpx;
	}

	.user-info {
		display: flex;
		color: #FFFFFF;
		font-size: 30rpx;
	}

	.user-info image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 150rpx;
	}

	.user-nick-view {
		margin-left: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.user-nick-view .user-nick {
		font-weight: bold;
		font-size: 40rpx;
	}

	.user-nick-view .user-number {
		margin-top: 20rpx;
	}

	.user-ac-view {
		display: flex;
		margin: 50rpx 0;
		justify-content: space-between;
	}

	.user-ac-view view {
		display: flex;
		flex-direction: column;
		align-items: center;
		padding: 0 50rpx;
		box-sizing: border-box;
	}

	.user-ac-item image {
		width: 50rpx;
		height: 50rpx;
	}

	.user-ac-item text {
		margin-top: 15rpx;
		font-size: 28rpx;
		color: #FFFFFF;
	}

	.user-order-view {
		background-color: #FFFFFF;
		border-radius: 30rpx;
		box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		padding: 15rpx 20rpx;
		box-sizing: border-box;
		margin-top: 50rpx;
	}

	.user-order-nav {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.user-order-title {
		font-size: 35rpx;
		font-weight: bold;
	}

	.user-order-nav-icon {
		display: flex;
		align-items: center;
	}

	.user-order-nav-icon text {
		color: #555555;
		font-size: 28rpx;
	}

	.user-order-nav-icon image {
		width: 35rpx;
		height: 35rpx;
	}

	.user-order-container {
		display: flex;
		justify-content: space-between;
		margin: 30rpx 0 10rpx 0;
	}

	.user-order-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		position: relative;
	}

	.user-order-item image {
		width: 50rpx;
		height: 50rpx;
	}

	.user-order-item text {
		margin-top: 15rpx;
		color: #000000;
		font-size: 28rpx;
	}

	.order-num {
		position: absolute;
		background-color: #F0AD4E;
		color: #FFFFFF;
		font-size: 24rpx;
		min-width: 30rpx;
		height: 30rpx;
		border-radius: 30rpx;
		text-align: center;
		line-height: 30rpx;
		right: 0rpx;
		top: -15rpx;
	}

	.ad-view {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		margin-top: 30rpx;
	}

	.ad-image image {
		width: 300rpx;
	}

	.tool-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		width: 120rpx;
		height: 150rpx;
	}

	.tool-item image {
		width: 50rpx;
		height: 50rpx;
	}

	.tool-item text {
		color: #333333;
		font-size: 28rpx;
		margin-top: 15rpx;
	}
</style>
