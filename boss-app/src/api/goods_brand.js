import {post} from "../util/request";

/**
 * 品牌列表
 * @param params
 */
export function brand_list(params) {
    return post("/brand/manage-list", params, true)
}

/**
 * 品牌新增
 * @param params
 */
export function brand_add(params) {
    return post("/brand/add", params, true)
}

/**
 * 编辑
 * @param params
 */
export function brand_edit(params) {
    return post("/brand/update", params, true)
}

/**
 * 删除
 * @param params
 */
export function brand_del(params) {
    return post("/brand/del", params, true)
}