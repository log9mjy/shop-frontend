import {Loading} from 'element-ui'

let loading = null;
const showLoading = (params) => {
    if (loading) {
        loading.close()
    }
    const options = {
        fullscreen: false,
        target: document.querySelector('#main'),
        lock: true,
        text: '',
        spinner: 'el-icon-loading',
        customClass: 'refresh'
    };

    Object.assign(
        options,
        params
    );

    loading = Loading.service(options)
};
const hideLoading = () => {
    loading.close()
};
export {
    showLoading,
    hideLoading
}
