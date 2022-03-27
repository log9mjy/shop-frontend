import {post} from "../util/request";

/**
 * 分类列表
 * @param params
 */
export function category_list(params) {
    return post("/category/manage-list", params, true)
}

/**
 * 品牌新增
 * @param params
 */
export function category_add(params) {
    return post("/category/add", params, true)
}

/**
 * 编辑
 * @param params
 */
export function category_edit(params) {
    return post("/category/update", params, true)
}

/**
 * 删除
 * @param params
 */
export function category_del(params) {
    return post("/category/del", params, true)
}