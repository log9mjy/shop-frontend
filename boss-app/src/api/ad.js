import {post} from "../util/request";


/**
 * 新增广告
 * @param params
 */
export function ad_add(params) {
    return post("advert/add", params, true)
}

/**
 * 编辑广告
 * @param params
 */
export function ad_edit(params) {
    return post("advert/update", params, true)
}

/**
 * 广告列表
 * @param params
 */
export function ad_list(params) {
    return post("advert/list", params, true)
}

/**
 * 广告删除
 * @param params 参数
 */
export function ad_del(params) {
    return post("advert/del/", params, true)
}

export function type() {
    return post("basic-data/synchronize-basic", {})
}


export function ad_audit(params) {
    return post("advert/audit", params, true)
}