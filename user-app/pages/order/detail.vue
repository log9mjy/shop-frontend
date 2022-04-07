<template>
	<view class="page padding">
		<view class="card order-top">
			<view>
				<image class="top-icon" src="../../static/icon/icon-order-finish.png"></image>
				<text class="top-title">等待您的支付</text>
			</view>
		</view>
		<view class="card address-wrapper">
			<view class="address-top">
				<view class="address-label">收货人:</view>
				<view class="address-detail">{{detail.address.username}}</view>
			</view>
			<view class="address-top" style="margin-top:20rpx">
				<view class="address-label">联系电话:</view>
				<view class="address-detail">{{detail.address.mobile}}</view>
			</view>
			<view class="address-top" style="margin-top:20rpx">
				<view class="address-label">收货地址:</view>
				<view class="address-detail">{{detail.address.detail}}</view>
			</view>
		</view>

		<view class="card order-wrapper">
			<view v-for="(item,index) in detail.orderItems" :key="index" class="goods-wrapper">
				<image class="goods-pic" :src="item.coverPic"></image>
				<view style="margin-left:20rpx">
					<view class="goods-title">{{item.title}}</view>
					<view class="goods-price">
						<view>{{'¥ '+item.price}}</view>
						<view class="goods-num">共 {{item.num}} 件</view>
					</view>
				</view>
			</view>
			<view class="button-wrapper">
				<view v-if="detail.payment===1&&(detail.tradeStatus===1||detail.tradeStatus===2)" class="button"
					@tap="openApply">申请售后</view>
				<view v-if="detail.tradeStatus===0" class="button" @tap="pay">立即付款
				</view>
				<view v-if="detail.tradeStatus===2" class="button" @tap="receive">
					立即收货</view>
				<view v-if="detail.tradeStatus===5&&(detail.refundStatus===1||detail.refundStatus===3)" class="button"
					@tap="cancelRefund">撤回退款
				</view>
			</view>
		</view>

		<view class="card order-wrapper">
			<view class="panel-item">
				<view>订单编号:</view>
				<view class="panel-value">{{detail.orderNo}}</view>
			</view>
			<view class="panel-item">
				<view>支付方式:</view>
				<view class="panel-value">{{detail.payment===1?"微信支付":"货到付款"}}</view>
			</view>
			<view class="panel-item">
				<view>下单时间:</view>
				<view class="panel-value">{{detail.createTime}}</view>
			</view>
			<view class="panel-item" v-if="detail.tradeStatus===1">
				<view>支付时间:</view>
				<view class="panel-value">{{detail.payTime}}</view>
			</view>
			<view class="panel-item" v-if="detail.tradeStatus===2">
				<view>发货时间:</view>
				<view class="panel-value">{{detail.sendTime}}</view>
			</view>
			<view class="panel-item" v-if="detail.tradeStatus===3">
				<view>收货时间:</view>
				<view class="panel-value">{{detail.receiveTime}}</view>
			</view>
			<view class="panel-item" v-if="detail.tradeStatus===6">
				<view>关闭时间:</view>
				<view class="panel-value">{{detail.closeTime}}</view>
			</view>
		</view>

		<view class="card order-wrapper">
			<view class="panel-item">
				<view>商品总额:</view>
				<view class="panel-value">{{detail.totalMoney}} 元</view>
			</view>
			<view class="panel-item">
				<view>商品总数:</view>
				<view class="panel-value">{{'x'+detail.totalNum}}</view>
			</view>
			<view class="panel-item">
				<view>运费:</view>
				<view class="panel-value">0</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				detail: {
					"orderNo": "856943920007872512",
					"userId": 10007,
					"totalMoney": 50,
					"totalNum": 1,
					"tradeStatus": 2,
					"createTime": "2021-06-22 17:09:12",
					"payTime": "2021-06-22 17:09:12",
					"sendTime": "2021-07-03 15:14:41",
					"receiveTime": null,
					"finishTime": null,
					"closeTime": null,
					"remark": "",
					"orderItems": [{
						"goodsId": 11657,
						"title": "花花公子男士外套春季2022新款春秋韩版潮流衣服秋冬休闲男装夹克",
						"coverPic": "../../static/temp/goods.jpg",
						"price": 50,
						"num": 1
					}],
					"refundRecords": [

					],
					"address": {
						"id": null,
						"username": "周三",
						"mobile": "15052875469",
						"detail": "四川省成都市凤凰西三路交汇处东北角",
						"isDefault": null,
						"lat": null,
						"lng": null
					}
				}
			}
		},
		onLoad() {

		}
	}
</script>
<style>
	.order-top {
		display: flex;
		padding: 30rpx 10rpx;
		box-sizing: border-box;
		align-items: center;
	}

	.top-icon {
		width: 40rpx;
		height: 40rpx;
		margin-left: 30rpx;
	}

	.top-title {
		margin-left: 20rpx;
		font-size: 32rpx;
		color: #FF0000;
		font-weight: bold;
	}

	.address-wrapper {
		margin-top: 20rpx;
	}

	.address-label {
		font-weight: bold;
		width: 140rpx;
	}

	.address-top {
		display: flex;
	}

	.address-value {
		color: #333333
	}

	.address-sub-value {
		color: #555555;
		margin-left: 15rpx;
	}

	.address-detail {
		flex: 1;
	}


	.goods-price {
		display: flex;
		align-items: center;
	}

	.goods-num {
		font-size: 24rpx;
		color: #888888;
		margin-left: 15rpx;
	}

	.goods-title {
		height: 80rpx;
		width: 500rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}


	.goods-wrapper {
		display: flex;
		margin-top: 20rpx;
	}

	.goods-pic {
		width: 120rpx;
		height: 120rpx;
	}

	.order-wrapper {
		margin-top: 20rpx;
	}

	.button-wrapper {
		width: 100%;
		display: flex;
		justify-content: flex-end;
		margin-top: 20rpx;
	}

	.button {
		display: inline;
		border: 2rpx solid #FF0000;
		color: #FF0000;
		font-weight: bold;
		border-radius: 30rpx;
		padding: 5rpx 20rpx;
		margin-left: 20rpx;
	}

	.panel-item {
		display: flex;
		padding: 15rpx 0;
		align-items: center;
	}

	.panel-value {
		color: #555555;
		font-size: 26rpx;
		margin-left: 20rpx;
	}

	.time-line-wrapper {
		padding: 15rpx 10px;
		box-sizing: border-box;
	}

	.time-line-info-wrapper {
		display: flex;
		align-items: center;
	}

	.time-line-dto,
	.time-line-dto-active {
		width: 15rpx;
		height: 15rpx;
		border-radius: 15rpx;
	}

	.time-line-dto {
		background-color: #e4e7ed;
	}

	.time-line-dto-active {
		background-color: #FF0000;
	}

	.time-line-conetnt {
		display: flex;
		margin-left: 30rpx;
	}

	.time-line-time {
		font-size: 24rpx;
		color: #555555;
		margin-left: 45rpx;
	}

	.time-line-sub {
		color: #888888;
		margin-left: 20rpx;
	}
</style>
