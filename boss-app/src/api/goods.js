import {post, post_json} from "../util/request";


/**
 * 规格列表
 */
export function specification_template() {
    return post("/spu/specification/template", {})
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
    return post("spu/page", params, true)
}

/**
 * 商品详情
 * @param params
 */
export function goods_detail(params) {
    return post("spu/detail", params, true)
}