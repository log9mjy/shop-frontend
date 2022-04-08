import {
	post
} from "../utils/request.js"

export function user_login(params) {
	return post("/token/login", params, "登录中")
}

export function user_register(params) {
	return post("/user/register", params, "请稍后")
}
