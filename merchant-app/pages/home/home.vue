<template>
	<view class="page">
		<view class="page-head" :style="'height:'+(l+50)+'px'">
			<image src="../../static/image/home-bg.png" :style="'height:'+(l+50)+'px'" class="page-head-bg"></image>
			<view class="head-title-view" :style="'top:'+(l+10)+'px'">
				<view class="head-title-wrapper">
					<text class="head-title">首页</text>
				</view>
			</view>
		</view>
		<scroll-view class="content-container" scroll-y>
			<view></view>
			<view></view>
			<view></view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				l: 0,
			}
		},
		onShow() {
			let info = uni.getSystemInfoSync();
			this.l = info.statusBarHeight;
		},
		methods: {

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

	.content-container {
		background-color: #F8F8F8;
		flex: 1;
		height: 0;
	}
</style>
