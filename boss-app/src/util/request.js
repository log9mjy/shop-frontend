import axios from "axios";
import qs from 'qs';
import {get_token, remove_token} from '../util/token'
import {Message} from "element-ui";
import router from "../router"
import {showLoading, hideLoading} from "../util/loading";

let baseURL = "http://127.0.0.1:9405";
//接口域名
axios.defaults.baseURL = baseURL;


//get方法：
const get = (url, params, loading) => {
    return new Promise((resolve, reject) => {
        if (loading) {
            showLoading();
        }
        axios.get(url, {params: params})
            .then((response) => {
                if (loading) {
                    hideLoading();
                }
                resolve(response.data);
            })
            .catch((error) => {
                hideLoading();
                reject(error);
            });
    })
};

//post方法：
const post = (url, data, loading) => {
    return new Promise((resolve, reject) => {
        if (loading) {
            showLoading();
        }
        axios.post(url, qs.stringify(data), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
            .then((response) => {
                if (loading) {
                    hideLoading();
                }
                resolve(response.data);
            })
            .catch((error) => {
                hideLoading();
                reject(error);
            });
    })
};

//post方法：
const post_json = (url, data, loading) => {
    return new Promise((resolve, reject) => {
        if (loading) {
            showLoading();
        }
        axios.post(url, data, {})
            .then((response) => {
                if (loading) {
                    hideLoading();
                }
                resolve(response.data);
            })
            .catch((error) => {
                hideLoading();
                reject(error);
            });
    })
};


// delete请求
const del = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.delete(url, {data})
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    })
};

const post_form = (url, file) => {
    let forms = new FormData();
    forms.append('file', file);
    return new Promise((resolve, reject) => {
        axios.post(url, forms, {
            headers: {'Content-Type': 'multipart/form-data'}
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);
            });
    })
};


// put请求
const put = (url, data) => {
    return new Promise((resolve, reject) => {
        axios.put(url, qs.stringify(data), {
            headers: {'Content-Type': 'application/x-www-form-urlencoded'},
        })
            .then((response) => {
                resolve(response.data);
            })
            .catch((error) => {
                reject(error);

            });
    })
};

const get_export = (url, params) => {
    let token = get_token();
    url = baseURL + url + "?";
    if (token) {
        url = url + "token=" + token;
    }
    return url + params;
};

// 请求拦截器
axios.interceptors.request.use(function (config) {
    let token = get_token();
    if (token) {
        config["headers"].token = token;
    }
    return config;
}, err => {
    return Promise.reject(err)
});


// 响应拦截器
axios.interceptors.response.use(function (res) {
    //返回401 去登录
    if (res.data.errCode === 401) {
        Message.error(res.data.errMsg);
        router.push({path: '/login'});
        remove_token();
        return
    }
    //其他类型异常
    if (res.data.errCode !== 200) {
        Message.error(res.data.errMsg);
        return
    }
    return res;
}, err => {
    //服务器出错
    return Promise.reject(err);
});

export {
    post,
    get,
    del,
    put,
    post_json,
    post_form,
    get_export
}
