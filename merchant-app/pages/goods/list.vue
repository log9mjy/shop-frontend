<template>
	<view class="page">
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
	</view>
</template>

<script>
	import {
		goods_list
	} from "../../api/home.js"
	export default {
		data() {
			return {
				goodsList: []
			}
		},
		onLoad() {
			goods_list().then(res => {
				this.goodsList = res.list;
			})
		},
		methods: {
			linkDetail(id) {
				uni.navigateTo({
					url: "../goods/detail?id=" + id
				})
			}

		}
	}
</script>

<style>
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
