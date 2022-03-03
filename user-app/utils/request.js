export function post(url, data) {
	return new Promise((resolve, reject) => {
		let token = uni.getStorageSync("token");
		let headers = {
			token: token
		};
		uni.showLoading({
			title: "加载中"
		})
		uni.request({
			header: headers,
			data: data,
			url: url,
			method: "POST",
			success: res => {
				resolve(res.data)
			},
			fail: () => {
				uni.showToast({
					icon: "none",
					title: "网络错误"
				})
			},
			complete: () => {
				uni.hideLoading()
			}
		})
	})
}
