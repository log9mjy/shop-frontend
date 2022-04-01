import {
	post
} from "../utils/request.js"


export function goods_detail(params) {
	return post("/project/detail-page", params, "加载中")
}

