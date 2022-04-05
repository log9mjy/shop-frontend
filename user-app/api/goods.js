import {
	post
} from "../utils/request.js"


export function goods_detail(params) {
	return post("/project/detail-page", params, "加载中")
}



export function goods_category() {
	return post("/category/list", {}, "加载中")
}
