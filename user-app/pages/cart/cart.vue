<template>
	<view class="page">
		<view class="page-head" :style="'height:'+(l+50)+'px'">
			<image src="../../static/image/home-bg.png" :style="'height:'+(l+50)+'px'" class="page-head-bg"></image>
			<view class="head-title-view" :style="'top:'+(l+10)+'px'">
				<view class="head-title-wrapper">
					<text class="head-title">购物车</text>
				</view>
			</view>
		</view>
		<view class="content-view">
			<scroll-view scroll-y style="height: 100%;">
				<view style="padding: 0 30rpx;box-sizing: border-box;">
					<view class="cart-item" v-for="(item,index) in tableData" :key="index">
						<view class="shop-info-view">
							<radio color="#ff5601" :checked="item.check" @tap="choiceShop(index)"></radio>
							<view class="shop-info-wrapper">
								<image :src="item.shop.logo" class="shop-label"></image>
								<text class="shop-title">{{item.shop.title}}</text>
								<image src="../../static/icon/right.png" class="right-icon"></image>
							</view>
						</view>
						<view class="goods-info-view" v-for="(goods,i2) in item.goodsList" :key="i2">
							<radio color="#ff5601" :checked="goods.check" @tap="choiceGoods(index,i2)"></radio>
							<view>
								<image class="goods-image" :src="goods.coverPic"></image>
							</view>
							<view class="goods-title-view">
								<text class="goods-title">{{goods.title}}</text>
								<view class="goods-price-view">
									<text>{{goods.price}}</text>
									<text>x{{goods.num}}</text>
								</view>
							</view>
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
		<view class="bottom-view">
			<view class="radio-wrapper" @tap="choiceAll">
				<radio :checked="all" color="#ff5601"></radio>
				<text>全选</text>
			</view>
			<view class="price-wrapper">
				<text>合计</text>
				<text>{{total}}</text>
			</view>
			<view class="cal-button" @tap="submit">结算</view>
		</view>
	</view>
</template>

<script>
	import {
		cart_list
	} from "../../api/cart.js"
	export default {
		data() {
			return {
				l: 0,
				all: false,
				total: '0',
				tableData: [{
					check: false,
					shop: {
						title: "官方旗舰店",
						logo: "../../static/icon/mall.png"
					},
					goodsList: [{
						check: false,
						coverPic: '../../static/temp/goods.jpg',
						title: '花花公子男士外套春季2022新款春秋韩版潮流衣服秋冬休闲男装夹克',
						price: 78,
						num: 4
					}, {
						check: false,
						coverPic: '../../static/temp/goods.jpg',
						title: '花花公子男士外套春季2022新款春秋韩版潮流衣服秋冬休闲男装夹克',
						price: 78,
						num: 8
					}],
				}]
			}
		},
		onShow() {
			let info = uni.getSystemInfoSync();
			this.l = info.statusBarHeight;
			// cart_list().then(res => {
			// 	this.tableData = res.list;
			// })
		},
		methods: {
			submit() {
				if (!this.isChoice()) {
					getApp().globalData.toast("请选择");
					return;
				}
				uni.navigateTo({
					url: "../order/settlement"
				})
			},
			choiceShop(i) {
				this.tableData[i].check = !this.tableData[i].check;
				this.tableData[i].goodsList.map(j => j.check = this.tableData[i].check);
				this.checkAll();
				this.calPrice();
			},
			choiceGoods(i1, i2) {
				this.tableData[i1].goodsList[i2].check = !this.tableData[i1].goodsList[i2].check;
				this.checkShop(this.tableData[i1]);
				this.checkAll();
				this.calPrice();
			},
			choiceAll() {
				this.all = !this.all;
				this.tableData.map(i => {
					i.check = this.all;
					i.goodsList.map(j => j.check = this.all)
				})
				this.calPrice();
			},
			checkShop(item) {
				let f = false;
				for (var i = 0; i < item.goodsList.length; i++) {
					if (item.goodsList[i].check) {
						f = true;
						break;
					}
				}
				item.check = f;
			},
			checkAll() {
				let f = true;
				for (var i = 0; i < this.tableData.length; i++) {
					if (this.tableData[i].check) {
						for (var j = 0; j < this.tableData[i].goodsList.length; j++) {
							if (!this.tableData[i].goodsList[j].check) {
								f = false;
								break;
							}
						}
					} else {
						f = false;
						break;
					}
				}
				this.all = f;
			},
			calPrice() {
				let sum = 0;
				for (var i = 0; i < this.tableData.length; i++) {
					if (this.tableData[i].check) {
						for (var j = 0; j < this.tableData[i].goodsList.length; j++) {
							if (this.tableData[i].goodsList[j].check) {
								sum += (this.tableData[i].goodsList[j].price * this.tableData[i].goodsList[j].num);
							}
						}
					}
				}
				this.total = sum;
			},
			isChoice() {
				for (var i = 0; i < this.tableData.length; i++) {
					if (this.tableData[i].check) {
						for (var j = 0; j < this.tableData[i].goodsList.length; j++) {
							if (this.tableData[i].goodsList[j].check) {
								return true;
							}
						}
					}
				}
				return false;
			}
		}
	}
</script>

<style>
	.page-head-bg {
		width: 100%;
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

	.content-view {
		width: 100%;
		flex: 1;
		height: 0;
		background-color: #F7F7F7;
	}

	.bottom-view {
		height: 100rpx;
		display: flex;
		background-color: #FFFFFF;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.radio-wrapper {
		color: #555555;
		display: flex;
		align-items: center;
	}

	radio {
		transform: scale(0.8);
	}

	.radio-wrapper text {
		font-size: 28rpx;
	}

	.price-wrapper {
		flex: 1;
		text-align: right;
		color: #333333;
		margin-right: 20rpx;
	}

	.price-wrapper text:nth-child(1) {
		font-size: 28rpx;
	}

	.price-wrapper text:nth-child(2) {
		font-size: 35rpx;
		font-weight: 700;
		color: #ff5601;
		margin-left: 10rpx;
	}

	.price-wrapper text:nth-child(2)::before {
		content: '¥';
		font-size: 24rpx;

	}

	.cal-button {
		font-size: 30rpx;
		color: #FFFFFF;
		width: 180rpx;
		height: 70rpx;
		border-radius: 70rpx;
		text-align: center;
		line-height: 70rpx;
		background: linear-gradient(to right, #ff850c, #ff5500);
	}

	.cart-item {
		border-radius: 30rpx;
		background-color: #FFFFFF;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
		margin-top: 20rpx;
	}

	.shop-info-view {
		display: flex;
		align-items: center;
	}

	.shop-info-wrapper {
		display: flex;
		align-items: center;
	}

	.right-icon {
		width: 30rpx;
		height: 30rpx;
		margin-left: 10rpx;
	}

	.shop-label {
		width: 40rpx;
		height: 40rpx;
		margin-left: 20rpx;
	}

	.shop-title {
		font-size: 28rpx;
		color: #000000;
		margin-left: 10rpx;
		font-weight: 700;
	}

	.goods-info-view {
		display: flex;
		align-items: center;
		margin-top: 30rpx;
	}

	.goods-image {
		width: 200rpx;
		height: 200rpx;
		border-radius: 20rpx;
		margin-left: 20rpx;
	}

	.goods-title-view {
		display: flex;
		flex-direction: column;
		margin-left: 20rpx;
		justify-content: space-between;
		height: 200rpx;
	}

	.goods-title {
		color: #000000;
		font-size: 30rpx;
		font-weight: 800;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
	}

	.goods-price-view {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.goods-price-view text:nth-child(1) {
		color: #DD524D;
		font-weight: bold;
		font-size: 40rpx;
	}

	.goods-price-view text:nth-child(1)::before {
		content: '¥';
		color: #DD524D;
		font-size: 24rpx;
	}

	.goods-price-view text:nth-child(2) {
		color: #000;
		font-size: 28rpx;
		border: 1rpx solid #999;
		border-radius: 10rpx;
		padding: 3rpx 10rpx;
	}
</style>
