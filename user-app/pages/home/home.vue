<template>
	<view class="page">
		<view class="home-head" :style="'height:'+(l+60)+'px'">
			<image src="../../static/image/home-bg.png" :style="'height:'+(l+60)+'px'" class="home-head-bg"></image>
			<view class="search-view" :style="'top:'+(l+10)+'px'">
				<view class="search-wrapper" @tap="linkSearch">
					<view class="search-txt">春季上衣女</view>
					<view class="search-button">搜索</view>
				</view>
			</view>
		</view>
		<scroll-view scroll-y class="content-view">
			<view class="content-padding">
				<view class="card-view">
					<swiper class="wd-swiper" @change="changeWd">
						<swiper-item>
							<view class="wd-view">
								<view v-for="(item,index) in wd" :key="index" class="wd-wrapper" @tap="linkAd(item)">
									<image :src="item.logo"></image>
									<text>{{item.name}}</text>
								</view>
								<view v-if="wd.length<10" v-for="(item,index) in (10-wd.length)" :key="index"
									class="wd-wrapper"></view>
							</view>
						</swiper-item>
					</swiper>

				</view>
				<view class="card-view m-top">
					<view class="ad-view">
						<image mode="widthFix" :src="item.imgList" v-for="(item,index) in activityAd" :key="index"
							class="ad-image" @tap="linkAd(item)">
						</image>
					</view>
				</view>
				<view class="center-ad-view">
					<swiper class="center-ad-swiper" indicator-dots indicator-color="rgba(0, 0, 0, .1)"
						indicator-active-color="#ff5601" autoplay>
						<swiper-item v-for="(item,index) in bannerAd" :key="index">
							<image class="center-ad-image" :src="item.imgList" @tap="linkAd(item)"></image>
						</swiper-item>
					</swiper>
					<view class="center-ad-right">
						<view v-for="(item,index) in goodsAd" :key="index">
							<image class="center-ad-right-image" :src="item.imgList" @tap="linkAd(item)"></image>
						</view>
					</view>
				</view>
				<view class="center-bottom-view">
					<view v-for="(item,index) in goods2Ad" :key="index">
						<image class="center-bottom-image" :src="item.imgList" @tap="linkAd(item)"></image>
					</view>
				</view>
			</view>
			<view class="goods-list-view">
				<view v-for="(item,index) in goodsList" :key="index" class="goods-wrapper" @tap="linkDetail(item.id)">
					<view>
						<image class="goods-image" :src="item.thumbnail"></image>
					</view>
					<view class="goods-info">
						<text>{{item.name}}</text>
					</view>
					<view>
						<text class="goods-price">{{item.price}}</text>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import {
		home,
		goods_list
	} from "../../api/home.js"
	export default {
		data() {
			return {
				l: 0,
				activeWdWipper: 0,
				goodsList: [],
				activityAd: [],
				goods2Ad: [],
				wd: [],
				goodsAd: [],
				bannerAd: []
			}
		},
		onLoad() {
			let info = uni.getSystemInfoSync();
			this.l = info.statusBarHeight;
			home().then(res => {
				this.wd = res.data.category;
				let ad = res.data.advert;
				this.goodsAd = ad.filter(i => i.advert_type === 1);
				this.bannerAd = ad.filter(i => i.advert_type === 2);
				this.activityAd = ad.filter(i => i.advert_type === 3);
				this.goods2Ad = ad.filter(i => i.advert_type === 4);
			});
			goods_list().then(res => {
				this.goodsList = res.list
			})
		},
		methods: {
			changeWd(e) {
				this.activeWdWipper = e.detail.current;
			},
			linkAd(item) {
				uni.navigateTo({
					url: item.link
				})
			},
			linkDetail(id) {
				uni.navigateTo({
					url: "../goods/detail?id=" + id
				})
			},
			linkSearch() {
				uni.navigateTo({
					url: "../goods/search"
				})
			}

		}
	}
</script>

<style>
	.home-head-bg {
		width: 100%;
	}

	.home-head {
		position: relative;
	}

	.search-view {
		position: absolute;
		width: 690rpx;
		box-sizing: border-box;
		top: 0;
		left: 50%;
		transform: translateX(-50%);
	}

	.search-wrapper {
		width: 100%;
		display: flex;
		border-radius: 45px;
		height: 45px;
		border: 5rpx solid #ff5500;
		padding-left: 30rpx;
		padding-right: 5rpx;
		box-sizing: border-box;
		align-items: center;
		background-color: #FFFFFF;
	}

	.search-txt {
		flex: 1;
		color: #333333;
		font-weight: 900;
		font-size: 30rpx;
	}

	.search-button {
		width: 70px;
		text-align: center;
		line-height: 35px;
		height: 35px;
		font-size: 28rpx;
		color: #FFFFFF;
		border-radius: 35px;
		font-weight: 900;
		background: linear-gradient(to right, #ff850c, #ff5500);
	}

	.content-view {
		width: 100%;
		flex: 1;
		height: 0;
		background-color: #ff216a;

	}

	.content-padding {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.page {
		display: flex;
		height: 100vh;
		flex-direction: column;
	}

	.card-view {
		background-color: #FFFFFF;
		border-radius: 30rpx;
		padding: 10rpx 10rpx;
		box-sizing: border-box;
		width: 100%;
		position: relative;
	}

	.wd-view {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;

	}

	.wd-wrapper {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 120rpx;
		margin-top: 20rpx;
	}

	.wd-wrapper image {
		width: 80rpx;
		height: 80rpx;
		border-radius: 80rpx;
	}

	.wd-wrapper text {
		font-size: 28rpx;
		color: #000;
		display: -webkit-box;
		-webkit-box-orient: vertical;
		-webkit-line-clamp: 1;
		overflow: hidden;
	}

	.wd-swiper {
		height: 270rpx;
	}

	.wd-swiper-dot-view {
		position: absolute;
		bottom: 10rpx;
		left: 50%;
		transform: translateX(-50%);
		display: flex;
	}

	.wd-swiper-dot,
	.wd-swiper-dot-active {
		height: 8rpx;
		width: 25rpx;
		margin-right: 10rpx;
	}

	.wd-swiper-dot {
		background-color: #f0f0f0;
	}

	.wd-swiper-dot-active {
		background-color: #ff5500;
	}

	.ad-view {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		padding: 5rpx;
		box-sizing: border-box;
	}

	.ad-image {
		width: 50%;
	}

	.m-top {
		margin-top: 20rpx;
	}


	.center-ad-view {
		display: flex;
		justify-content: space-between;
		margin-top: 20rpx;
	}

	.center-ad-swiper {
		width: 335rpx;
		height: 500rpx;
		border-radius: 15rpx;
		overflow: hidden;
	}

	.center-ad-image {
		width: 335rpx;
		height: 500rpx
	}

	.center-ad-right {
		height: 500rpx;
		display: flex;
		flex-direction: column;
		justify-content: space-between;
	}

	.center-ad-right-image {
		width: 335rpx;
		height: 240rpx;
		border-radius: 15rpx;
	}

	.center-bottom-view {
		display: flex;
		justify-content: space-between;
		flex-wrap: wrap;
	}

	.center-bottom-image {
		width: 335rpx;
		height: 200rpx;
		margin-top: 20rpx;
		border-radius: 10rpx;
	}

	.goods-list-view {
		margin-top: 30rpx;
		width: 100%;
		background-color: #FFFFFF;
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		background-color: #f7f7f7;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
	}

	.goods-wrapper {
		width: 335rpx;
		border-radius: 15rpx;
		margin-top: 20rpx;
		padding-bottom: 20rpx;
		background-color: #FFFFFF;
		overflow: hidden;
	}

	.goods-image {
		width: 335rpx;
		height: 335rpx;
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

	.goods-price {
		color: #E43D33;
		font-size: 40rpx;
		font-weight: 900;
		padding: 0 20rpx;
		margin-top: 30rpx;
		box-sizing: border-box;
	}

	.goods-price::before {
		content: '¥';
		font-size: 24rpx;
		font-weight: normal;
	}
</style>
