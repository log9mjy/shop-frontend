<template>
	<view class="page">
		<scroll-view class="scroll" scroll-y>
			<view class="card address" v-if="detail.address">
				<view class="address-info">
					<view class="address-wrapper">
						<view>收货人:</view>
						<view style="margin-left:15rpx">
							<text> {{detail.address.username}}</text>
							<text class="mobile">{{detail.address.mobile}}</text>
						</view>
					</view>
					<view>
						{{detail.address.detail}}
					</view>
				</view>
				<view class="update-view">
					<view class="update-title" @tap="linkAddress">修改</view>
				</view>
			</view>

			<view class="card address" v-if="!detail.address">
				<view class="address-title">您还没有收获地址</view>
				<view class="op-wrapper">
					<view @tap="linkAddress">添加地址</view>
				</view>
			</view>

			<view class="card card-margin">
				<view class="order-num">共{{detail.total}}件商品</view>
				<view v-for="(item,index) in detail.goods" class="order-item" :key="index">
					<image class="goods-pic" :src="item.coverPic"></image>
					<view class="goods-info">
						<view class="goods-title">{{item.title}}</view>
						<view class="goods-price">
							<view class="goods-pc">{{'¥ '+item.price}}</view>
							<view class="goods-num">共{{item.num}}件</view>
						</view>
					</view>
				</view>
			</view>
			<view class="card card-margin">
				<view class="panle-item">
					<view>商品总价</view>
					<view class="price-value">{{detail.totalPrice}}</view>
				</view>
				<view class="panle-item card-margin">
					<view>运费</view>
					<view class="price-value">0</view>
				</view>
			</view>
			<view class="card card-margin panle-item">
				<view>备注</view>
				<input v-model="remark" class="panle-item-input" placeholder-class="placeholder"
					placeholder="选填,如有特殊情况可以告诉我们" />
			</view>
		</scroll-view>

		<view class="bottom-wrapper card">
			<view>
				待支付:
				<text class="buy-price">{{detail.totalPrice}}</text>
			</view>
			<view class="buy-button center-xy" @tap="pay">
				立即支付
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				remark: "",
				detail: {
					"address": {
						"id": 10011,
						"username": "周三",
						"mobile": "13487786862",
						"detail": "四川省成都市春熙路",
					},
					"goods": [{
							"goodsId": 11517,
							"title": "花花公子男士外套春季2022新款春秋韩版潮流衣服秋冬休闲男装夹克",
							"coverPic": "../../static/temp/goods.jpg",
							"price": 115,
							"num": 1
						},
						{
							"goodsId": 11690,
							"title": "花花公子男士外套春季2022新款春秋韩版潮流衣服秋冬休闲男装夹克",
							"coverPic": "../../static/temp/goods.jpg",
							"price": 188,
							"num": 2
						},
						{
							"goodsId": 11686,
							"title": "花花公子男士外套春季2022新款春秋韩版潮流衣服秋冬休闲男装夹克",
							"coverPic": "../../static/temp/goods.jpg",
							"price": 126,
							"num": 1
						}
					],
					"total": 4,
					"totalPrice": 617
				}
			}
		},
		methods:{
			linkAddress() {
				uni.navigateTo({
					url: "../address/list"
				})
			},
			pay(){}
		}
	}
</script>

<style>
	.bottom-wrapper {
		height: 120rpx;
		position: fixed;
		left: 0;
		bottom: 0;
		width: 100%;
		display: flex;
		align-items: center;
		padding: 0 20rpx;
		box-sizing: border-box;
		justify-content: space-between;
		color: #333333;
		font-size: 28rpx;
	}

	.buy-button {
		width: 280rpx;
		height: 80rpx;
		background-image: linear-gradient(to right, #FF7258, #FF525F);
		border-radius: 80rpx;
		color: #ffffff;
	}

	.scroll {
		width: 100%;
		height: calc(100vh - 120rpx);
		padding: 20rpx 20rpx;
		box-sizing: border-box;
		background-color: #f7f7f7;
		color: #333333;
		font-size: 28rpx;
	}

	.panle-item {
		display: flex;
		align-items: center;
	}

	.panle-item-input {
		flex: 1;
		margin-left: 20rpx;
		color: #333333;
	}

	.label {
		flex: 1;
	}

	.placeholder {
		font-size: 28rpx;
	}

	.price-value {
		flex: 1;
		text-align: right;
		position: relative;
	}

	.order-item {
		display: flex;
		padding: 20rpx 0;
	}

	.goods-pic {
		width: 100rpx;
		height: 100rpx;
	}

	.goods-info {
		margin-left: 20rpx;
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.goods-price {
		display: flex;
		margin-top: 10rpx;
		align-items: center;

	}

	.order-num {
		font-size: 24rpx;
		color: #888888;
		text-align: right;
	}

	.goods-num {
		font-size: 24rpx;
		color: #888888;
		margin-left: 15rpx;
	}

	.goods-title {
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		width: 550rpx;
	}

	.buy-price {
		font-size: 35rpx;
		font-weight: bold;
		color: #FF216A;
		position: relative;
		padding-left: 20rpx;
	}

	.buy-price::before {
		content: '¥';
		font-size: 25rpx;
		font-weight: normal;
		position: absolute;
		left: 0;
		bottom: 0;
	}

	.address-wrapper {
		display: flex;
		padding-bottom: 10rpx;
	}

	.mobile {
		color: #888888;
		margin-left: 15rpx;
	}

	.address {
		display: flex;
		align-items: center;
	}

	.op-wrapper {
		display: flex;
		padding-left: 30rpx;
		border-left: 1rpx solid #999999;
	}

	.op-wrapper view {
		color: #F58C08;
	}

	.address-title {
		flex: 1;
		color: #009742;
		font-weight: bold;
	}

	.update-view {
		width: 130rpx;
		position: relative;
		display: flex;
		justify-content: flex-end;

	}

	.update-title {
		border-left: 1rpx solid #999999;
		color: #F58C08;
		padding-left: 30rpx;
	}

	.address-info {
		flex: 1;
	}

	.pay-item {
		display: flex;
		justify-content: space-between;
		padding: 15rpx 0;
		align-items: center;
	}

	.pay-icon {
		width: 35rpx;
		height: 35rpx;
	}

	.pay-icon-1 {
		width: 40rpx;
		height: 40rpx;
	}

	.payment {
		display: flex;
		align-items: center;
	}

	.payment text {
		margin-left: 15rpx;
		color: #333333;
	}

	.input-item {
		display: flex;
		align-items: center;
	}

	.panel-tips {
		color: #888888;
		margin-left: 20rpx;
	}
</style>
