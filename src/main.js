import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './styles/index.less';
// 加载vant 核心组件库
import Vant from 'vant';
// 加载Vant全局样式
import 'vant/lib/index.css';
import 'amfe-flexible';
import './utils/dayjs.js';
Vue.use(Vant);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
