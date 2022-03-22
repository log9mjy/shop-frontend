import {post} from "../util/request";

/**
 * 登录
 * @param account
 * @param password
 */
export function login(account, password) {
    return post("admin/login", {account, password}, true)
}

/**
 * 用户信息
 */
export function user_info() {
    return post("admin/info", {}, true)
}

/**
 * 退出登录
 */
export function user_logout() {
    return post("admin/logout", {}, true)
}

/**
 * 修改密码
 */
export function user_update_password(oldPassword, password) {
    return post("admin/updatePassword", {oldPassword, password}, true)
}

/**
 * 用户分页
 * @param params
 */
export function user_page(params) {
    return post("admin/page", params, true);
}

/**
 * 添加用户
 * @param params
 */
export function user_add(params) {
    return post("admin/add", params, true)
}

/**
 * 修改用户
 * @param id
 * @param params
 */
export function user_update(id, params) {
    return post("admin/update/" + id, params, true)
}

/**
 * 删除用户
 * @param id
 */
export function user_del(id) {
    return post("admin/del/" + id, {}, true)
}
