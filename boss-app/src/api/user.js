import {post} from "../util/request";

/**
 * 用户列表
 */
export function user_list(params) {
    return post("/user/list", params, true)
}