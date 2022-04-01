<template>
	<view class="page">
		<view class="goods-albums-view">
			<swiper class="swiper" autoplay @change="changeAlbums">
				<swiper-item v-for="(item,index) in albums">
					<image class="goods-albums" :src="item"></image>
				</swiper-item>
			</swiper>
			<view class="swiper-dot">图片{{current}}/{{albums.length}}</view>
		</view>
		<view class="goods-container">
			<view class="card-view">
				<view class="goods-price">{{detail.price}}</view>
				<view class="goods-title">{{detail.name}}</view>
				<view class="goods-sub-title">{{detail.project_describe}}</view>
			</view>
			<view class="card-view">
				<view class="image-title" @tap="openSku">
					<view class="title-key">
						<text>选择: </text>
						<text>{{attr}}</text>
					</view>
					<image src="../../static/icon/icon-right-2.png"></image>
				</view>
				<view class="image-title">
					<view class="title-key">
						<text>品牌: </text>
						<text>{{detail.brand_name}}</text>
					</view>
				</view>
			</view>
			<view class="card-view">
				<view class="shop-info">
					<image :src="detail.shop_photo"></image>
					<view class="shop-name">
						<text>{{detail.shop_name}}</text>
					</view>
				</view>
				<view class="goods-list">
					<view v-for="(item,index) in goodsList" :key="index" class="goods-wrapper"
						@tap="linkDetail(item.id)">
						<view>
							<image class="goods-image" :src="item.thumbnail"></image>
						</view>
						<view class="goods-info">
							<text>{{item.name}}</text>
						</view>
						<view>
							<text class="goods-price2">{{item.price}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="bottom-view">
			<view class="cart-btn">加入购物车</view>
			<view class="buy-btn">立即购买</view>
		</view>
		<uni-popup ref="sku" type="bottom">
			<view class="popup-view">
				<view class="popup-del" @click="closePopup">
					<image src="../../static/icon/del-c.png"></image>
				</view>
				<view class="goods-sku-info">
					<image class="goods-sku-image" :src="albums[0]"></image>
					<view class="goods-sku-desc">
						<view class="goods-sku-title">已选择: 黑色 32G </view>
						<view class="goods-price">728</view>
					</view>
				</view>
				<view class="goods-spec-view">
					<view v-for="(item,index) in specifications" :key="index" class="goods-spec-item">
						<view class="goods-spec">{{item.title}}</view>
						<view class="goods-spec-value-view">
							<view bindtap="choiceSpec" v-for="(v,i) in item.values" :key="i" class="goods-spec-value">
								{{v.value}}
							</view>
						</view>
					</view>
				</view>
				<view class="goods-num">
					<view class="goods-num-title">购买数量</view>
					<view>
						<uni-number-box :min="1" :max="99"></uni-number-box>
					</view>
				</view>
				<view class="sure-btn">确 认</view>
			</view>
		</uni-popup>
	</view>
</template>

<script>
	import {
		goods_detail,
	} from "../../api/goods.js"
	import {
		goods_list
	} from "../../api/home.js"
	export default {
		data() {
			return {
				showSku: true,
				current: 1,
				specifications: [],
				albums: [],
				detail: {},
				goodsList: [],
				attr: ""
			}
		},
		onLoad(options) {
			let id = options.id;
			goods_detail({
				id: id
			}).then(res => {
				let data = res.data;
				goods_list({
					create_uid: data.shop_id
				}).then(r => {
					this.goodsList = r.list;
				});
				this.detail = data;
				uni.setNavigationBarTitle({
					title: data.name
				});
				this.albums = data.file_img;
				this.attr = data.attributeKey.map(i => i.attribute_name).join("/")

			})
		},
		methods: {
			changeAlbums(e) {
				this.current = e.detail.current + 1;
			},
			openSku() {
				this.$refs.sku.open()
			},
			closePopup() {
				this.$refs.sku.close()
			}
		},

	}
</script>

<style>
	.goods-albums-view {
		width: 100%;
		height: 750rpx;
		position: relative;
	}

	.goods-albums {
		width: 100%;
		height: 750rpx;
	}

	.swiper {
		width: 750rpx;
		height: 750rpx;
	}

	.swiper-dot {
		position: absolute;
		bottom: 30rpx;
		left: 50%;
		transform: translateX(-50%);
		color: #ffffff;
		font-size: 22rpx;
		background-color: rgba(0, 0, 0, 0.4);
		padding: 10rpx 30rpx;
		border-radius: 30rpx;
	}


	.goods-title {
		font-weight: bold;
		color: #333333;
		font-size: 34rpx;
	}

	.goods-sub-title {
		color: #555555;
		font-size: 26rpx;
		margin-top: 10rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}

	.goods-price {
		color: #E43D33;
		font-size: 45rpx;
	}

	.goods-price::before {
		content: '¥';
		font-weight: normal;
		font-size: 28rpx;
	}

	.image-title {
		background: #ffffff;
		padding: 20rpx 0;
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.image-title image {
		width: 30rpx;
		height: 30rpx;
	}

	.detail-image {
		width: 100%;
		display: flex;
	}

	.card-view {
		width: 100%;
		margin-top: 15rpx;
		border-radius: 30rpx;
		background-color: #FFFFFF;
		padding: 20rpx;
		box-sizing: border-box;
	}

	.goods-container {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.card-title {
		padding: 20rpx 0;
		color: #333333;
		font-size: 30rpx;
		text-align: center;
	}

	.card-content {
		background-color: #ffffff;
	}

	.popup-view {
		width: 100%;
		height: 1000rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
	}

	.goods-sku-info {
		padding: 30rpx 0;
		display: flex;
		border-bottom: 1rpx solid #f2f3f5;
	}

	.goods-sku-image {
		width: 180rpx;
		height: 180rpx;
	}

	.goods-sku-desc {
		margin-left: 30rpx;
		display: flex;
		flex-direction: column;
		justify-content: center;
	}

	.goods-sku-title {
		font-size: 30rpx;
		color: #333333;
		margin-bottom: 20rpx;
	}

	.goods-spec-view {
		border-bottom: 1rpx solid #f2f3f5;
		padding-bottom: 50rpx;
	}

	.goods-spec-item {
		display: flex;
		margin-top: 20rpx;
	}

	.goods-spec,
	.goods-num-title {
		font-size: 30rpx;
		font-weight: 600;
		color: #000000;
	}

	.goods-num {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 120rpx;
		border-bottom: 1rpx solid #f2f3f5;
	}

	.goods-spec {
		margin-top: 30rpx;
		width: 100rpx;
		padding: 10rpx 0;
	}

	.goods-spec-value-view {
		display: flex;
		flex-wrap: wrap;
		flex: 1;
	}

	.goods-spec-value,
	.goods-spec-value-choice,
	.goods-spec-value-disable {
		font-size: 30rpx;
		padding: 10rpx 30rpx;
		border-radius: 10rpx;
		margin-right: 30rpx;
		margin-top: 30rpx;
	}

	.goods-spec-value {
		color: #000;
		background-color: #F2F3F5;
		border: 1rpx solid #F2F3F5;
	}

	.goods-spec-value-choice {
		color: #00a0e9;
		border: 1rpx solid #00a0e9;
	}

	.goods-spec-value-disable {
		color: #555555;
		background-color: #999999;
		border: 1rpx solid #999999;
	}

	.popup-del {
		position: absolute;
		right: 30rpx;
		top: 30rpx;
	}

	.popup-del image {
		width: 35rpx;
		height: 35rpx;
	}

	.sure-btn {
		position: absolute;
		width: 690rpx;
		left: 50%;
		bottom: 20rpx;
		transform: translateX(-50%);
		height: 80rpx;
		border-radius: 80rpx;
		line-height: 80rpx;
		text-align: center;
		color: #FFFFFF;
		background: linear-gradient(to right, #ff850c, #ff5500);
	}

	.title-key text:nth-child(1) {
		color: #777777;
		font-size: 28rpx;
	}

	.title-key text:nth-child(2) {
		color: #000000;
		font-size: 28rpx;
		margin-left: 30rpx;

	}

	.shop-info {
		display: flex;
		align-items: center;
	}

	.shop-info image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
	}

	.shop-name {
		font-weight: bold;
		margin-left: 30rpx;
		font-size: 35rpx;
		text-align: start;
	}

	.goods-list {
		margin-top: 30rpx;
		width: 100%;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.goods-wrapper {
		width: 300rpx;
		border-radius: 15rpx;
		margin-top: 20rpx;
		padding-bottom: 20rpx;
		background-color: #FFFFFF;
		overflow: hidden;
	}

	.goods-image {
		width: 300rpx;
		height: 300rpx;
	}

	.goods-info {
		color: #000000;
		font-weight: bold;
		font-size: 30rpx;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 2;
		overflow: hidden;
		padding: 0 20rpx;
		box-sizing: border-box;
		word-break: break-all;
		word-wrap: break-word;
		margin-top: 15rpx;
	}

	.goods-price2 {
		color: #E43D33;
		font-size: 40rpx;
		font-weight: 900;
		padding: 0 20rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
	}

	.goods-price2::before {
		content: '¥';
		font-size: 24rpx;
		font-weight: normal;
	}

	.bottom-view {
		position: fixed;
		bottom: 0;
		width: 100%;
		background-color: #FFFFFF;
		height: 100rpx;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.cart-btn,
	.buy-btn {
		width: 300rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		margin-left: 30rpx;
		color: #FFFFFF;
		border-radius: 80rpx;
	}

	.cart-btn {
		background: linear-gradient(to right, #f3a038, #ff850c);
	}

	.buy-btn {
		background: linear-gradient(to right, #fa6318, #ff5500);
	}
</style>
