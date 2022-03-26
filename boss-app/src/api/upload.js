import {post_form} from "../util/request";

/**
 * 上传文件token
 */
export function upload(file) {
    return post_form("/file/upload-file", file)
}
