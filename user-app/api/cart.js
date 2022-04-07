import {
	post
} from "../utils/request.js"


export function cart_add(params) {
	return post("/shopping-cart/add", params, "请求中...")
}

export function cart_list(params) {
	return post("/shopping-cart/list", params, "请求中...")
}

