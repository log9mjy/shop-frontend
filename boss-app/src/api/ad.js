import {post} from "../util/request";


/**
 * 新增广告
 * @param params
 */
export function ad_add(params) {
    return post("wrapper/ad/add", params, true)
}

/**
 * 编辑广告
 * @param id
 * @param params
 */
export function ad_edit(id, params) {
    return post("wrapper/ad/edit/" + id, params, true)
}

/**
 * 广告列表
 * @param params
 */
export function ad_list(params) {
    return post("wrapper/ad/list", params, true)
}

/**
 * 广告删除
 * @param id
 */
export function ad_del(id) {
    return post("wrapper/ad/del/" + id, {}, true)
}