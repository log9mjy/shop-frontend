import {
	post
} from "../utils/request.js"

export function basic_data() {
	return new Promise((resolve) => {
		let data = uni.getStorageSync('basic');
		if (!data) {
			post("/basic-data/synchronize-basic", {}, "").then(res => {
				uni.setStorageSync("basic", res.list)
				resolve(res.list)
			})
		} else {
			resolve(data);
		}
	})

}
