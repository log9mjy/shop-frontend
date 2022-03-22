import {post} from "../util/request";

/**
 * 角色列表
 */
export function role_options() {
    return post("role/options", {})
}

/**
 * 新增
 * @param params
 */
export function role_add(params) {
    return post("role/add", params, true)
}

/**
 * 修改
 * @param params
 * @param id
 */
export function role_update(id, params) {
    return post("role/update/" + id, params, true)
}

/**
 * 列表
 */
export function role_list() {
    return post("role/list", {}, true)
}

/**
 * 删除
 * @param id
 */
export function role_del(id) {
    return post("role/del/" + id, {}, true)
}
