import {post} from "../util/request";

/**
 * 用户列表
 */
export function user_page() {
    return post("/user/list", {}, true)
}