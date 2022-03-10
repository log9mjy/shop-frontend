<template>
	<view>
		<view class="page-head">
			<image src="../../static/image/home-bg.png" class="page-head-bg"></image>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				l: 0
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
		height: 500rpx;
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
</style>
