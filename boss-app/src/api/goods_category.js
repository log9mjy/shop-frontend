import {post} from "../util/request";

/**
 * 新增分类
 * @param param
 */
export function category_add(param) {
    return post("spu/category/add", param, true)
}

/**
 * 获取分类列表
 */
export function category_list() {
    return post("spu/category/list", {}, true)
}

/**
 * 编辑分类
 * @param id
 * @param param
 */
export function category_edit(id, param) {
    return post("spu/category/edit/" + id, param,true)
}

/**
 * 删除分类
 * @param id
 */
export function category_del(id) {
    return post("spu/category/del/" + id, {},true);
}