<template>
	<view class="page">
		<view>
			<view class="input-item">
				<view class="input-label">收货人</view>
				<view class="input-wrapper">
					<input v-model="form.consignee" placeholder="名字" />
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">手机号码</view>
				<view class="input-wrapper">
					<input v-model="form.mobile" placeholder="手机号" />
				</view>
			</view>
			<view class="input-item">
				<view class="input-label">详细地址</view>
				<view class="input-wrapper">
					<input v-model="form.address" placeholder="省 市 区 小区楼栋" />
				</view>
			</view>
			<view class="input-item-radio">
				<view class="input-label-radio">设为默认地址</view>
				<view>
					<switch color="#ff5500" :checked="form.is_default===1" @change="changeDefault"></switch>
				</view>
			</view>
			<view class="save-btn-view">
				<view class="back-color center save-btn" @tap="submit">保存</view>
			</view>
		</view>
	</view>
</template>

<script>
	import {
		address_add
	} from "../../api/address.js"
	export default {
		data() {
			return {
				l: 0,
				form: {
					consignee: "",
					mobile: "",
					address: "",
					note: "",
					is_default: 0
				}
			}
		},
		methods: {
			changeDefault() {
				this.form.is_default = this.form.is_default === 1 ? 0 : 1
			},
			submit() {
				address_add(this.form).then(() => {
					getApp().globalData.toast("添加成功")
				})
			}
		}
	}
</script>

<style>
	.input-item,
	.input-item-radio {
		display: flex;
		padding: 20rpx 30rpx;
		align-items: center;
	}

	.input-item-radio {
		justify-content: space-between;
	}

	.input-label,
	.input-label-radio {
		color: #000000;
		font-size: 30rpx;
		font-weight: bold;
	}

	.input-label {
		width: 150rpx;
	}

	.input-wrapper {
		background-color: #F2F3F5;
		flex: 1;
		border-radius: 15rpx;
		font-size: 28rpx;
		height: 80rpx;
		align-items: center;
		display: flex;
		align-items: center;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.save-btn {
		height: 80rpx;
		border-radius: 80rpx;
	}

	.save-btn-view {
		margin-top: 30rpx;
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	switch {
		transform: scale(0.7);
	}
</style>
