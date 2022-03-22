import Cookies from "js-cookie";

/**
 * 设置token
 */
const set_token = token => {
    Cookies.set("token", token)
};

/**
 * 获取token
 */
const get_token = () => {
    return Cookies.get("token");

};

/**
 * 移除token
 */
const remove_token = () => {
    Cookies.remove("token");
};

export {
    set_token,
    get_token,
    remove_token
}