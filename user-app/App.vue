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
	
	.container{
		padding: 0 30rpx;
		box-sizing: border-box;
	}
</style>
