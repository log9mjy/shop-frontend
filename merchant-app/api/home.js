import {
	post
} from "../utils/request.js"


export function home() {
	return post("/home/index", {}, "加载中")
}


export function goods_list() {
	return post("/project/list", {}, "")
}
