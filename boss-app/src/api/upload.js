import {post} from "../util/request";

/**
 * 上传文件token
 */
export function upload_token() {
    return post("/upload", {})
}
