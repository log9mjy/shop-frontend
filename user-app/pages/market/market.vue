<template>
	<view class="page">
		<view class="page-head" :style="'height:'+(l+60)+'px'">
			<image src="../../static/image/home-bg.png" :style="'height:'+(l+60)+'px'" class="page-head-bg"></image>
			<view class="search-view" :style="'top:'+(l+10)+'px'">
				<image class="search-image" src="../../static/icon/search.png"></image>
				<view class="search-split"></view>
				<view class="search-text">春季卫衣</view>
				<view class="search-button">搜索</view>
			</view>
		</view>
		<view class="content-container">
			<scroll-view class="category-left" scroll-y>
				<view v-for="(item,index) in left" :key="index" :class="active===index?'cate-choice':''"
					@click="choice(index)">
					<text>{{item.name}}</text>
				</view>
			</scroll-view>
			<scroll-view class="category-right" scroll-y>
				<swiper class="cate-cover-pic">
					<swiper-item>
						<image class="cate-cover-pic" :src="right.logo"></image>
					</swiper-item>
				</swiper>
				<view v-for="(item,index) in right.children" :key="index">
					<view class="cate-title">{{item.name}}</view>
					<view class="cate-view" v-if="item.children">
						<view v-for="(child,i2) in item.children" :key="i2" class="cate-item">
							<image :src="child.logo"></image>
							<text>{{child.name}}</text>
						</view>
						<view v-for="i in (3-item.children.length%3)" class="cate-item">
						</view>
					</view>
				</view>
			</scroll-view>
		</view>
	</view>
</template>

<script>
	import {
		goods_category
	} from "../../api/goods.js"
	export default {

		data() {
			return {
				l: 0,
				left: [],
				right: [],
				active: 0
			}
		},
		onShow() {
			let info = uni.getSystemInfoSync();
			this.l = info.statusBarHeight;
		},
		onLoad() {
			goods_category().then(res => {
				this.left = res.list;
				if (this.left.length > 0) {
					this.right = res.list[0];
				}
			})
		},
		methods: {
			choice(i) {
				this.active = i;
				this.right = this.left[i];
			}
		}
	}
</script>
<style>
	.cate-view {
		display: flex;
		flex-wrap: wrap;
		justify-content: space-between;
	}

	.cate-item {
		margin-top: 40rpx;
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 120rpx;
	}

	.cate-item image {
		width: 120rpx;
		height: 120rpx;
		border-radius: 15rpx;
	}

	.cate-item text {
		margin-top: 15rpx;
		font-size: 28rpx;
	}

	.page-head-bg {
		width: 100%;
	}

	.page-head {
		position: relative;
	}

	.search-view {
		width: 690rpx;
		border-radius: 45px;
		height: 45px;
		border: 5rpx solid #ff5500;
		position: absolute;
		left: 50%;
		transform: translateX(-50%);
		background-color: #FFFFFF;
		display: flex;
		align-items: center;
		padding-left: 30rpx;
		box-sizing: border-box;
		overflow: hidden;
	}

	.search-image {
		width: 30px;
		height: 30px;
	}

	.search-split {
		background-color: #f5e1d6;
		width: 2rpx;
		height: 30rpx;
		margin: 0 15rpx;
	}

	.search-text {
		flex: 1;
		color: #444444;
		font-size: 28rpx;
	}

	.search-button {
		display: flex;
		width: 60px;
		font-size: 32rpx;
		font-weight: 700;
		text-align: center;
		align-items: center;
		justify-content: center;
		height: 100%;
		color: #FFFFFF;
		background: linear-gradient(to right, #ff850c, #ff5500);
	}

	.page {
		display: flex;
		height: 100vh;
		flex-direction: column;
	}

	.content-container {
		flex: 1;
		overflow-y: auto;
		display: flex;
		padding: 15rpx 0;
		box-sizing: border-box;
	}

	.category-left {
		height: 100%;
		width: 250rpx;
	}

	.category-left view {
		height: 100rpx;
		text-align: center;
		line-height: 100rpx;
		font-size: 32rpx;
	}

	.cate-choice {
		height: 80rpx;
		text-align: center;
		line-height: 80rpx;
		font-size: 40rpx;
		font-weight: bold;
		background-color: #FFFFFF;
	}

	.cate-cover-pic {
		width: 100%;
		height: 200rpx;
		border-radius: 20rpx;
	}


	.category-right {
		height: 100%;
		width: 500rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #FFFFFF;
	}

	.cate-title {
		font-size: 32rpx;
		font-weight: bold;
		margin-top: 40rpx;
	}
</style>
