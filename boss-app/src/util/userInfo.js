/**
 * 保存个人信息
 * @param {*} info
 */
const set_info = info => {
    let storage = window.localStorage;
    storage.setItem("user", JSON.stringify(info))
};


/**
 * 获取个人信息
 */
const get_info = () => {
    let storage = window.localStorage;
    let user = storage.getItem("user");
    if (user) {
        return JSON.parse(user)
    }
};


/**
 * 移除个人信息
 */
const remove_info = () => {
    let storage = window.localStorage;
    storage.removeItem("user")
};

export {
    set_info,
    get_info,
    remove_info
}