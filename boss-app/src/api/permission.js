import {post} from "../util/request";


export function permission_tree() {
    return post("permission/tree", {})
}

export function permission_detail(id) {
    return post("permission/detail", {id}, true)
}

export function permission_add(params) {
    return post("permission/add", params, true)
}

export function permission_update(id, params) {
    return post("permission/update/" + id, params, true)
}

export function permission_del(id) {
    return post("permission/del/" + id, {}, true)
}
