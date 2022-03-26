<script>
	export default {
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
	
	
	
	/* 顶栏通栏样式 */
	/* .uni-top-window {
	    left: 0;
	    right: 0;
	} */
	
	uni-page-body {
		background-color: #F5F5F5 !important;
		min-height: 100% !important;
		height: auto !important;
	}
	
	.uni-top-window uni-tabbar .uni-tabbar {
		background-color: #fff !important;
	}
	
	.uni-app--showleftwindow .hideOnPc {
		display: none !important;
	}
	
	/* #endif */
	
	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #efeff4;
		height: 100%;
		font-size: 28rpx;
		/* line-height: 1.8; */
	}
	
	.fix-pc-padding {
		padding: 0 50px;
	}
	
	.uni-header-logo {
		padding: 30rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
	}
	
	.uni-header-image {
		width: 100px;
		height: 100px;
	}
	
	.uni-hello-text {
		color: #7A7E83;
	}
	
	.uni-hello-addfile {
		text-align: center;
		line-height: 300rpx;
		background: #FFF;
		padding: 50rpx;
		margin-top: 10px;
		font-size: 38rpx;
		color: #808080;
	}
		@import '../../../common/uni-nvue.css';
	/* #ifndef APP-PLUS-NVUE */
	/* uni.css - 通用组件、模板样式库，可以当作一套ui库应用 */
	@import './common/uni.css';
	@import '@/static/customicons.css';
	/* H5 兼容 pc 所需 */
	/* #ifdef H5 */
	@media screen and (min-width: 768px) {
		body {
			overflow-y: scroll;
		}
	}
	
	/* 顶栏通栏样式 */
	/* .uni-top-window {
	    left: 0;
	    right: 0;
	} */
	
	uni-page-body {
		background-color: #F5F5F5 !important;
		min-height: 100% !important;
		height: auto !important;
	}
	
	.uni-top-window uni-tabbar .uni-tabbar {
		background-color: #fff !important;
	}
	
	.uni-app--showleftwindow .hideOnPc {
		display: none !important;
	}
	
	/* #endif */
	
	/* 以下样式用于 hello uni-app 演示所需 */
	page {
		background-color: #efeff4;
		height: 100%;
		font-size: 28rpx;
		/* line-height: 1.8; */
	}
	
	.fix-pc-padding {
		padding: 0 50px;
	}
	
	.uni-header-logo {
		padding: 30rpx;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin-top: 10rpx;
	}
	
	.uni-header-image {
		width: 100px;
		height: 100px;
	}
	
	.uni-hello-text {
		color: #7A7E83;
	}
	
	.uni-hello-addfile {
		text-align: center;
		line-height: 300rpx;
		background: #FFF;
		padding: 50rpx;
		margin-top: 10px;
		font-size: 38rpx;
		color: #808080;
	}
</style>
