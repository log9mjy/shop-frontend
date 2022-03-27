import {post, post_json} from "../util/request";


/**
 * 规格列表
 */
export function specification_template() {
    return post("/project/manage-list", {})
}

/**
 * 新增商品
 * @param params
 */
export function goods_add(params) {
    return post_json("/spu/add", params, true)
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
    return post("spu/detail", params, true)
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