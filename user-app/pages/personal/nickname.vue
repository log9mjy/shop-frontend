<template>
	<view class="page padding">
		<view class="input-wrapper">
			<input v-model="nick" focus />
			<view class="update-btn" @tap="updateNick">修改</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				nick: ''
			}
		},
		methods: {
			updateNick() {
				
			}

		}
	}
</script>

<style>
	.input-wrapper {
		border-bottom: 1rpx solid #D9D9D9;
		padding: 20rpx 0;
		display: flex;
		align-items: center;
	}

	.input-wrapper input {
		flex: 1;
	}

	.update-btn {
		background-color: #FA6318;
		color: #FFFFFF;
		font-size: 30rpx;
		border-radius: 10rpx;
		width: 100rpx;
		height: 60rpx;
		text-align: center;
		line-height: 60rpx;
	}
</style>
