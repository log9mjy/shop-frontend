export function set_info(info) {
	uni.setStorageSync("info", JSON.stringify(info))
}


export function get_info() {
	let info = uni.getStorageSync("info");
	if (info) {
		return JSON.parse(info)
	}
}


export function remove_info() {
	uni.removeStorageSync("info")
}
