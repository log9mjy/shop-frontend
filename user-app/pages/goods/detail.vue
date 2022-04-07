<template>
	<view class="page">
		<view class="goods-albums-view">
			<swiper class="swiper" autoplay @change="changeAlbums">
				<swiper-item v-for="(item,index) in albums" :key="index">
					<image class="goods-albums" :src="item"></image>
				</swiper-item>
			</swiper>
			<view class="swiper-dot">图片{{current}}/{{albums.length}}</view>
		</view>
		<view class="goods-container">
			<view class="card-view">
				<view class="goods-price">{{currentSku.project_price}}</view>
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
			<view class="tool-view">
				<image src="../../static/icon/icon-kefu.png"></image>
				<image src="../../static/icon/icon-collect.png"></image>
			</view>
			<view style="display: flex;margin-left: 30rpx;">
				<view class="cart-btn" @click="openCart">加入购物车</view>
				<view class="buy-btn" @click="openBuy">立即购买</view>
			</view>
		</view>
		<uni-popup ref="sku" type="bottom">
			<view class="popup-view">
				<view class="popup-del" @click="closePopup">
					<image src="../../static/icon/del-c.png"></image>
				</view>
				<view class="goods-sku-info">
					<image class="goods-sku-image" :src="albums[0]"></image>
					<view class="goods-sku-desc">
						<view class="goods-sku-title">已选择: {{skuName}} </view>
						<view class="goods-price">{{currentSku.project_price}}</view>
					</view>
				</view>
				<view class="goods-spec-view">
					<view v-for="(item,index) in specifications" :key="index" class="goods-spec-item">
						<view class="goods-spec">{{item.title}}</view>
						<view class="goods-spec-value-view">
							<view @tap="choiceSpec(index,i)" v-for="(v,i) in item.values" :key="i"
								:class="v.enable?(v.check?'goods-spec-value-choice':'goods-spec-value'):'goods-spec-value-disable'">
								{{v.value}}
							</view>
						</view>
					</view>
				</view>
				<view class="goods-num">
					<view class="goods-num-title">购买数量</view>
					<view>
						<uni-number-box :min="1" :max="99" v-model="num"></uni-number-box>
					</view>
				</view>
				<view class="sure-btn" @tap="submit">确 认</view>
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
	import {
		cart_add
	} from "../../api/cart.js"
	export default {
		data() {
			return {
				showSku: true,
				current: 1,
				specifications: [],
				albums: [],
				detail: {},
				goodsList: [],
				attr: "",
				skuName: "",
				skus: [],
				currentSku: {},
				type: '',
				id: '',
				num: 1
			}
		},
		onLoad(options) {
			let id = options.id;
			this.id = id;
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
				this.attr = data.attributeKey.map(i => i.attribute_name).join("/");
				this.specifications = data.attributeKey.map(i => {
					let arr = i.attributeValue.map(j => {
						return {
							value: j,
							check: false,
							enable: false
						}
					})
					return {
						title: i.attribute_name,
						values: arr
					}
				});
				this.skus = data.project_specs;
				this.currentSku = this.skus[0];
				this.buildSkuName();
				for (var i = 0; i < this.specifications.length; i++) {
					let attrs = this.currentSku[i + ''];
					let val = attrs[this.specifications[i].title];
					for (var j = 0; j < this.specifications[i].values.length; j++) {
						if (this.specifications[i].values[j].value === val) {
							this.specifications[i].values[j].check = true;
						}
					}
				}
				this.buildSku();
			})
		},
		methods: {
			submit() {
				if (this.type === 'cart') {
					cart_add({
						project_id: this.id,
						project_num: this.num,
						unit_price: this.currentSku.project_price.replace("元", ""),
						project_specs_id: this.currentSku.id,
					}).then(() => {
						uni.showToast({
							icon: "none",
							title: "添加成功"
						})
					})
				}
				if (this.type === 'buy') {
					uni.navigateTo({
						url: "../order/settlement"
					})
				}
			},
			changeAlbums(e) {
				this.current = e.detail.current + 1;
			},
			openSku() {
				this.$refs.sku.open()
			},
			closePopup() {
				this.$refs.sku.close()
			},
			openCart() {
				this.$refs.sku.open();
				this.type = 'cart';
			},
			openBuy() {
				this.$refs.sku.open();
				this.type = 'buy';
			},
			buildSkuName() {
				let s = '';
				for (var i = 0; i < this.specifications.length; i++) {
					s += this.currentSku[i + ''][this.specifications[i].title] + ' ';
				}
				this.skuName = s;
			},
			choiceSpec(i1, i2) {
				if (!this.specifications[i1].values[i2].enable) {
					return;
				}
				this.specifications[i1].values.map(i => {
					i.check = false;
				});
				this.specifications[i1].values[i2].check = true;
				let arr = this.getSkuAttr();
				this.currentSku = this.isExist(arr);
				this.buildSkuName();
				this.buildSku();
			},
			isExist(target) {
				for (var i = 0; i < this.skus.length; i++) {
					let sku = [];
					for (var j = 0; j < this.specifications.length; j++) {
						sku.push({
							key: this.specifications[j].title,
							value: this.skus[i][j + ''][this.specifications[j].title],
						})
					}
					if (JSON.stringify(target) === JSON.stringify(sku)) {
						return this.skus[i]
					}
				}
			},
			getSkuAttr() {
				let temp = [];
				for (var i = 0; i < this.specifications.length; i++) {
					for (var k = 0; k < this.specifications[i].values.length; k++) {
						if (this.specifications[i].values[k].check) {
							temp[i] = {
								key: this.specifications[i].title,
								value: this.specifications[i].values[k].value,
							};
							break;
						}
					}
				}
				return temp;
			},
			buildSku() {
				for (var j = 0; j < this.specifications.length; j++) {
					let temp = this.getSkuAttr();
					for (var k = 0; k < this.specifications[j].values.length; k++) {
						temp[j] = {
							key: this.specifications[j].title,
							value: this.specifications[j].values[k].value
						};
						// 查询是否存在
						let sku = this.isExist(temp);
						if (sku) {
							this.specifications[j].values[k].enable = true
						} else {
							this.specifications[j].values[k].enable = false
						}
					}
				}
			}
		},

	}
</script>

<style>
	.tool-view {
		display: flex;
		justify-content: space-between;
		flex: 1;
	}

	.tool-view image {
		width: 50rpx;
		height: 50rpx;
	}

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
		color: #FFFFFF;
		background-color: #ff5500;
		border: 1rpx solid #ff5500;
	}

	.goods-spec-value-disable {
		color: #999;
		background-color: #F1F1F1;
		border: 1rpx dashed #A8A8A8;
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
		height: 120rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.cart-btn,
	.buy-btn {
		width: 250rpx;
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		color: #FFFFFF;
	}

	.cart-btn {
		border-top-left-radius: 80rpx;
		border-bottom-left-radius: 80rpx;
		background: linear-gradient(to right, #f3a038, #ff850c);
	}

	.buy-btn {
		border-top-right-radius: 80rpx;
		border-bottom-right-radius: 80rpx;
		background: linear-gradient(to right, #fa6318, #ff5500);
	}
</style>
