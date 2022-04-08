<template>
	<view class="page">
		<view class="input-item" @tap="openPayType()">
			<view class="input-label">充值方式</view>
			<view class="input-wrapper">
				<input v-model="form.pay_type.name" placeholder="" disabled />
				<image class="input-image" src="../../static/image/down.png"></image>
			</view>
		</view>

		<view class="input-item" @tap="openBankType()" v-if="form.pay_type&&form.pay_type.code==='4'">
			<view class="input-label">支行</view>
			<view class="input-wrapper">
				<input v-model="form.bank_type.name" placeholder="" disabled />
				<image class="input-image" src="../../static/image/down.png"></image>
			</view>
		</view>
		<view class="input-item" v-if="form.pay_type&&form.pay_type.code==='4'">
			<view class="input-label">银行卡号</view>
			<view class="input-wrapper">
				<input v-model="form.relation_no" placeholder="" />
			</view>
		</view>
		<view class="input-item" v-if="form.pay_type&&form.pay_type.code==='2'">
			<view class="input-label">支付宝</view>
			<view class="input-wrapper">
				<input v-model="form.relation_no" placeholder="" />
			</view>
		</view>
		<view class="input-item">
			<view class="input-label">充值金额</view>
			<view class="input-wrapper">
				<input v-model="form.money" placeholder="" />
			</view>
		</view>
		<view class="input-upload-item">
			<view class="input-label">支付凭证</view>
			<view class="image-view">
				<view class="upload-wrapper" @tap="openImage" v-if="form.file.length<5"></view>
				<view v-for="(item,index) in form.file" :key="index" class="upload-image-wrapper"
					:style="form.file.length==5?index>2?'margin-top:30rpx;':'':index>1?'margin-top:30rpx;':''">
					<image :src="item.path"></image>
					<view class="uplaod-image-del" @tap="delImage(index)">
						<image src="../../static/icon/icon-del.png"></image>
					</view>
				</view>
			</view>
		</view>
		<view class="save-btn-view">
			<view class="back-color center save-btn" @tap="submit">保存</view>
		</view>
	</view>
</template>

<script>
	import {
		basic_data
	} from "../../api/common.js"
	export default {
		data() {
			return {
				form: {
					pay_type: {},
					file: [],
					relation_no: '',
					bank_type: {},
					money: ''
				},
				payType: [],
				bankType: []
			}
		},
		onLoad() {
			basic_data().then(res => {
				this.payType = res.payType;
				this.bankType = res.bankType
			})
		},
		methods: {
			openPayType() {
				let arr = this.payType.map(i => i.name);
				uni.showActionSheet({
					itemList: arr,
					success: (res) => {
						this.form.pay_type = this.payType[res.tapIndex]
					}
				})
			},
			openBankType() {
				let arr = this.bankType.map(i => i.name);
				uni.showActionSheet({
					itemList: arr,
					success: (res) => {
						this.form.bank_type = this.bankType[res.tapIndex]
					}
				})
			},
			openImage() {
				uni.chooseImage({
					count: 5,
					success: res => {
						this.form.file = res.tempFiles;
					}
				})
			},
			submit() {

			},
			delImage(index) {
				this.form.file.splice(index, 1);
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

	.input-upload-item {
		display: flex;
		padding: 20rpx 30rpx;
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
		display: flex;
		align-items: center;
	}

	.input-wrapper input {
		flex: 1;
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


	.input-image {
		width: 40rpx;
		height: 40rpx;
	}

	.upload-wrapper {
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;
		background-color: #F2F3F5;
		position: relative;
		margin-right: 30rpx;
	}

	.upload-image-wrapper {
		position: relative;
	}

	.upload-image-wrapper image {
		width: 150rpx;
		height: 150rpx;
		border-radius: 10rpx;

		margin-right: 30rpx;
	}

	.upload-wrapper::after {
		content: '';
		width: 50rpx;
		height: 4rpx;
		background-color: #CCCCCC;
		position: absolute;
		transform: translate(-50%, -50%);
		left: 50%;
		top: 50%
	}

	.upload-wrapper::before {
		content: '';
		width: 4rpx;
		height: 50rpx;
		background-color: #CCCCCC;
		position: absolute;
		transform: translate(-50%, -50%);
		left: 50%;
		top: 50%
	}

	.image-view {
		flex: 1;
		display: flex;
		flex-wrap: wrap;
	}

	.uplaod-image-del {
		top: -20rpx;
		right: 20rpx;
		width: 40rpx;
		height: 40rpx;
		position: absolute;
	}

	.uplaod-image-del image {
		width: 100%;
		height: 100%;
	}
</style>
