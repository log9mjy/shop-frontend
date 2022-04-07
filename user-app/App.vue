<script>
	import gloabl from './utils/global.js'
	export default {
		globalData: gloabl,
		onLaunch: function() {
			console.log('App Launch')
		},
		onShow: function() {
			console.log('App Show')
		},
		onHide: function() {
			console.log('App Hide')
		}
	}
</script>

<style>
	.page {
		width: 100%;
		display: flex;
		height: 100vh;
		flex-direction: column;
		background-color: #F8F8F8
	}

	.card {
		background-color: #FFFFFF;
		border-radius: 30rpx;
		box-shadow: 0 1px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
		padding: 15rpx 20rpx;
		box-sizing: border-box;
	}

	.container {
		padding: 0 30rpx;
		box-sizing: border-box;
	}

	.nav-view {
		display: flex;
		background-color: #F8F8F8;
		padding: 0 30rpx;
		height: 80rpx;
		align-items: center;
		justify-content: space-between;
	}

	.nav-left {
		display: flex;
		align-items: center;
	}

	.nav-left image {
		width: 40rpx;
		height: 40rpx;
	}

	.nav-left text {
		margin-left: 15rpx;
		color: #3333333;
		font-size: 30rpx;
	}

	.nav-right {
		color: #F0AD4E;
		font-size: 30rpx;
	}

	.back-color {
		background: linear-gradient(to right, #ff850c, #ff5500);
		color: #FFFFFF;
	}

	.center {
		display: flex;
		justify-content: center;
		align-items: center;
	}
	
	
	.card {
	  border-radius: 16rpx;
	  background-color: #ffffff;
	  box-shadow: 0 2rpx 12rpx 0 rgba(0, 15, 66, 0.1);
	  padding: 20rpx;
	  box-sizing: border-box;
	}
	
	.p-container {
	  width: 100%;
	  min-height: 100vh;
	  background-color: #f7f7f7;
	}
	
	.popup {
	  padding: 30rpx 40rpx;
	  box-sizing: border-box;
	}
	
	
	
	.center-xy {
	  justify-content: center;
	  align-items: center;
	  display: flex;
	}
	
	.center-abs {
	  left: 50%;
	  right: 50%;
	  position: absolute;
	  transform: translate(-50%, -50%);
	}
	
	.card{
	  background-color: #ffffff;
	  box-shadow: 0 2rpx 12rpx 0 rgba(0, 15, 66, 0.1);
	}
	
	.card-margin{
	  margin-top: 20rpx;
	}
	
	radio,switch{
	  transform: scale(0.8);
	}
	
	.empty-page {
	  display: flex;
	  align-items: center;
	  justify-content: center;
	  height: 100vh;
	}
	
	.empty-container{
	  display: flex;
	  flex-direction: column;
	  align-items: center;
	  justify-content: center;
	}
	.empty-icon {
	  width: 400rpx;
	  height: 400rpx;
	}
	
	.padding{
		padding: 0 30rpx;
		box-sizing: border-box;
	}
</style>
