<template>
	<view class="chat-page" :style="'bottom:'+keybordHeight+'px'">
		<scroll-view class="chat-content-wrapper" scroll-y :scroll-into-view="'item'+(chatList.length-1)"
			:show-scrollbar="false">
			<view v-for="(item,index) in chatList" :key="index" :id="'item'+index">
				<view v-if="index===0||((item.time-chatList[index-1].time)/1000>60)" class="chat-time">
					{{item.showTime}}
				</view>
				<view class="chat-to-item" v-if="!item.isFollow">
					<image class="chat-user-avatar" :src="to.avatar"></image>
					<view class="chat-to-content">{{item.msgBody}}</view>
				</view>
				<view class="chat-from-item" v-if="item.isFollow">
					<view class="chat-from-content">{{item.msgBody}}</view>
					<image class="chat-user-avatar" :src="from.avatar"></image>
				</view>
			</view>
		</scroll-view>
		<view class="input-wrapper">
			<input :adjust-position='false' focus :cursor-spacing="30" v-model="content" confirm-type="send"
				class="input" @confirm="sendMessage" confirm-hold @keyboardheightchange="onKeyboardChange" />
			<text class="send-button" @tap="sendMessage()">发送</text>
		</view>
	</view>
</template>

<script>
	import {
		foramatTime2
	} from "../../utils/deta_format.js";
	export default {
		data() {
			return {
				content: "",
				from: {},
				to: {},
				keybordHeight: 0,
				chatList: [],
			}
		},
		onLoad(options) {
			let to = JSON.parse(options.to);
			this.to = to;
			uni.setNavigationBarTitle({
				title: to.nickname,
			})
			let user = uni.getStorageSync("info");
			this.from = JSON.parse(user);
		},
		methods: {
			sendMessage() {
				if (!this.content) {
					getApp().globalData.toast("发送的内容为空")
					return
				}
				this.chatList.push({
					time: new Date().getTime(),
					showTime: foramatTime2(new Date().getTime()),
					isFollow: true,
					msgBody: this.content,
					msgType: 1
				});
				this.content = ''
			},
			inputFocus(e) {
				this.keybordHeight = e.detail.height;
			},
			onKeyboardChange(e) {
				this.keybordHeight = e.detail.height
			},
		},
	}
</script>

<style>
	.send-button {
		color: #FFFFFF;
		background-color: #FA6318;
		border-radius: 10rpx;
		margin-left: 30rpx;
		padding: 10rpx 30rpx;
	}

	.chat-page {
		position: fixed;
		width: 100%;
		top: 0;
		right: 0;
		left: 0;
		bottom: 0;
		display: flex;
		flex-direction: column;

	}

	.chat-content-wrapper {
		flex: 1;
		width: 100%;
		overflow-y: auto;
		background-color: #f7f7f7;
		padding: 10rpx 30rpx;
		box-sizing: border-box;
	}

	.input-wrapper {
		height: 120rpx;
		border-top: 1rpx solid #f2f3f5;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
		background-color: #f7f7f7;
		box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1)
	}

	.input {
		flex: 1;
		height: 80rpx;
		border-radius: 5rpx;
		background-color: #ffffff;
		font-size: 32rpx;
		padding-left: 15rpx;
	}

	.icon {
		width: 50rpx;
		height: 50rpx;
		margin-left: 20rpx;
	}

	.icon-r {
		width: 50rpx;
		height: 50rpx;
		margin-right: 20rpx;
	}


	.fun-wrapper {
		width: 100%;
		height: 500rpx;
		background-color: #f7f7f7;
		display: flex;
		flex-wrap: wrap;
		overflow-y: auto;
	}

	.emoji-wrapper {
		width: 100%;
		height: 500rpx;
		background-color: #f7f7f7;
		display: flex;
		justify-content: center;
	}

	.emoji-view {
		display: flex;
		flex-wrap: wrap;
		padding: 0 30rpx;
		box-sizing: border-box;
		overflow-y: auto;
	}

	.fun-item {
		display: flex;
		flex-direction: column;
		align-items: center;
		width: 25%;
		margin-top: 30rpx;
	}

	.fun-icon-wrapper {
		width: 100rpx;
		height: 100rpx;
		border-radius: 20rpx;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #ffffff;
	}

	.fun-icon {
		width: 50rpx;
		height: 50rpx;
	}

	.fun-title {
		color: #333333;
		font-size: 26rpx;
		margin-top: 10rpx;
	}

	.emoji-item {
		width: 60rpx;
		height: 60rpx;
		margin: 5rpx;
		background-color: aqua;
	}


	.chat-user-avatar {
		width: 80rpx;
		height: 80rpx;
		border-radius: 5rpx;
	}

	.chat-to-item {
		display: flex;
		margin-top: 20rpx;
	}

	.chat-from-item {
		display: flex;
		margin-top: 20rpx;
		justify-content: flex-end;
	}

	.chat-to-content,
	.chat-from-content {
		font-size: 28rpx;
		min-height: 80rpx;
		padding: 0 20rpx;
		line-height: 80rpx;
		border-radius: 5rpx;
		position: relative;
	}

	.chat-to-content {
		background-color: #ffffff;
		margin-left: 30rpx;
		color: #333333;
	}

	.chat-from-content {
		margin-right: 30rpx;
		background-color: #FA6318;
		color: #ffffff;
	}

	.chat-from-content::before {
		content: '';
		background-color: #FA6318;
		width: 20rpx;
		height: 20rpx;
		position: absolute;
		right: -10rpx;
		top: 50%;
		transform: translateY(-50%) rotate(-45deg);
	}

	.chat-to-content::before {
		content: '';
		background-color: #ffffff;
		width: 20rpx;
		height: 20rpx;
		position: absolute;
		left: -10rpx;
		top: 50%;
		transform: translateY(-50%) rotate(-45deg);
	}

	.chat-time {
		text-align: center;
		font-size: 24rpx;
		color: #555555;
		margin: 5rpx 0;
	}
</style>
