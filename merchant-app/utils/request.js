import md5 from 'js-md5'
const baseUrl = "http://ws.paomiao.cn/v1"

export function post(url, data, msg) {
	uni.hideLoading();
	let token = uni.getStorageSync("token");
	let str = `web|a|b|c|${token}|${Math.floor(new Date().getTime() / 1000)}|`;
	let sign = md5(str);
	return new Promise((resolve, reject) => {
		if (msg) {
			uni.showLoading({
				title: msg
			})
		}
		uni.request({
			data: data,
			url: baseUrl + url + "?_ua=" + str + sign,
			method: "POST",
			success: res => {
				uni.hideLoading()
				let data = res.data;
				if (data.state === 1) {
					resolve(data)
				} else {
					uni.showToast({
						icon: "none",
						title: data.msg
					})
					if (data.msg === '用户未登录') {
						uni.navigateTo({
							url: "/pages/login/login"
						})
					}
				}
			},
			fail: (err) => {
				uni.hideLoading();
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


export function upload(url, file) {
	let token = uni.getStorageSync("token");
	let str = `web|a|b|c|${token}|${Math.floor(new Date().getTime() / 1000)}|`;
	let sign = md5(str);
	uni.showLoading({
		title: "上传中..."
	})
	return new Promise((resolve) => {
		uni.uploadFile({
			url: baseUrl + url + "?_ua=" + str + sign,
			filePath: file,
			name: "file",
			success: (res) => {
				resolve(res.data);
			},
			complete: () => {
				uni.hideLoading();
			}
		})
	});
}
