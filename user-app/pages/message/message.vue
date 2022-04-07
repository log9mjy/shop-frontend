<template>
	<view class="page">
		<view class="page-head" :style="'height:'+(l+50)+'px'">
			<image src="../../static/image/home-bg.png" :style="'height:'+(l+50)+'px'" class="page-head-bg"></image>
			<view class="head-title-view" :style="'top:'+(l+10)+'px'">
				<view class="head-title-wrapper">
					<text class="head-title">消息</text>
				</view>
			</view>
		</view>
		<scroll-view class="content-container" scroll-y>
			<view class="content-view">
				<view v-for="(item,index) in conversationList" :key="index" class="conversation-item"
					@tap="linkDetail()">
					<image class="conversation-avatar" :src="item.user.avatar"></image>
					<view class="conversation-info">
						<view class="conversation-nick">
							<text>{{item.user.nickname}}</text>
							<text>{{item.lastMessage.time}}</text>
						</view>
						<view class="conversation-content">
							<text>{{item.lastMessage.contetn}}</text>
							<text>{{item.unread}}</text>
						</view>
					</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				l: 0,
				conversationList: [{
					user: {
						avatar: '../../static/image/user-avatar.jpg',
						nickname: '情趣店铺'
					},
					lastMessage: {
						type: 1,
						contetn: '你好',
						time: '2022-3-08'
					},
					unread: 5
				}, {
					user: {
						avatar: '../../static/image/user-avatar.jpg',
						nickname: '水果批发'
					},
					lastMessage: {
						type: 1,
						contetn: '今年过年不收礼',
						time: '2022-3-07'
					},
					unread: 5
				}]
			}
		},
		onShow() {
			let info = uni.getSystemInfoSync();
			this.l = info.statusBarHeight;
			for (var i = 0; i < 20; i++) {
				this.conversationList.push({
					user: {
						avatar: '../../static/image/user-avatar.jpg',
						nickname: '水果批发'
					},
					lastMessage: {
						type: 1,
						contetn: '今年过年不收礼',
						time: '2022-3-07'
					},
					unread: 5
				})
			}
		},
		methods: {
			linkDetail() {
				uni.navigateTo({
					url: "../chat/chat?to=" + JSON.stringify({
						nickname: '旗舰店',
						avatar: '../../static/image/user-avatar.jpg'
					})
				})
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

	.content-container {
		background-color: #ff216a;
		flex: 1;
		height: 0;
	}

	.content-view {
		background-color: #FFFFFF;
		border-top-left-radius: 30rpx;
		border-top-right-radius: 30rpx;
		min-height: 100%;
	}

	.conversation-item {
		display: flex;
		padding: 20rpx 30rpx;
		box-sizing: border-box;
	}

	.conversation-avatar {
		width: 120rpx;
		height: 120rpx;
		border-radius: 120rpx;
	}

	.page {
		display: flex;
		height: 100vh;
		flex-direction: column;
	}

	.conversation-info {
		flex: 1;
		margin-left: 20rpx;
		border-bottom: 1rpx solid #f2f3f5;
	}

	.conversation-nick {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.conversation-nick text:nth-child(1) {
		color: #000;
		font-size: 30rpx;
		font-weight: 700;
	}

	.conversation-nick text:nth-child(2) {
		color: #888888;
		font-size: 24rpx;
	}

	.conversation-content {
		display: flex;
		justify-content: space-between;
		font-size: 28rpx;
		margin-top: 20rpx;
	}

	.conversation-content text:nth-child(1) {
		color: #444;
	}

	.conversation-content text:nth-child(2) {
		color: #FFFFFF;
		background-color: #FF850C;
		font-size: 24rpx;
		border-radius: 40rpx;
		min-width: 40rpx;
		height: 40rpx;
		text-align: center;
		line-height: 40rpx;
	}
</style>
