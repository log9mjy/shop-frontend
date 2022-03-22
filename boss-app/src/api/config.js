import {post} from "../util/request";


/**
 * 系统配置
 */
export function system_config() {
    return post("system/config", {}, true)
}

/**
 * 编辑
 * @param params
 */
export function system_edit(params) {
    return post("system/edit", params, true)
}