import {
	post
} from "../utils/request.js"

export function address_add(params) {
	return post("/consignee/add", params, "请求中...")
}

export function address_list() {
	return post("/consignee/list", {}, "请求中...")
}
