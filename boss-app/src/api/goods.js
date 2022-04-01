import {post, post_json} from "../util/request";

/**
 * 新增商品
 * @param params
 */
export function goods_add(params) {
    return post_json("/project/add", params, true)
}

/**
 * 修改商品
 * @param params
 */
export function goods_update(params) {
    return post_json("/project/update", params, true)
}

/**
 * 删除商品
 * @param params
 */
export function goods_del(params) {
    return post_json("/project/del", params, true)
}


/**
 * 商品列表
 * @param params
 */
export function goods_page(params) {
    return post("project/manage-list", params, true)
}

/**
 * 商品详情
 * @param params
 */
export function goods_detail(params) {
    return post("project/detail-page", params, true)
}


/**
 * 品牌列表
 */
export function brand_options() {
    return post("brand/manage-list", {}, false)
}


/**
 * 分类列表
 */
export function category_options() {
    return post("category/manage-list", {}, false)
}