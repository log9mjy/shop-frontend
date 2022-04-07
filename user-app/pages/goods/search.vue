<template>
	<view class="page padding">
		<view class="search-view">
			<image src="../../static/icon/search.png"></image>
			<input focus confirm-type="search" @confirm="search" />
			<text @tap="search">搜索</text>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {

			}
		},
		methods: {
			search() {
				uni.navigateTo({
					url: "./list"
				})
			}
		}
	}
</script>

<style>
	.search-view {
		display: flex;
		height: 70rpx;
		border: 1rpx solid #FA6318;
		border-radius: 80rpx;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.search-view image {
		width: 50rpx;
		height: 50rpx;
	}

	.search-view input {
		flex: 1;
		padding-left: 30rpx;
		font-size: 32rpx;
	}

	.search-view text {
		color: #FA6318;
	}
</style>
