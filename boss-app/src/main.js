import Vue from 'vue'
import App from './App.vue'
import router from './router'

//公共样式
import "./assets/css/common.css";

Vue.config.productionTip = false;

//注册过滤器
Vue.filter("toArray", (val) => {
  let arr = [];
  if (val) {
    arr.push(val)
  }
  return arr;
});

// 引入element
import 'element-ui/lib/theme-chalk/index.css';
import './theme/index.css';
import Element from 'element-ui';

Vue.use(Element);


new Vue({
  router,
  render: h => h(App),
}).$mount('#app');
