import {post} from "../util/request";

/**
 * 登录
 * @param mobile
 * @param password
 */
export function login(mobile, password) {
    return post("token/manage-login", {mobile, password}, true)
}

/**
 * 用户信息
 */
export function user_info() {
    return post("admin/info", {}, true)
}


/**
 * 修改密码
 */
export function user_update_password(data) {
    return post("user/update-password", data, true)
}


export function user_update_info(data) {
    return post("user/update-info", data, true)
}

