import axios from 'axios';
import store from '@/store/index';

const request = axios.create({
  baseURL: 'http://toutiao-app.itheima.net', // 基础路径
});
// 请求拦截器
request.interceptors.request.use(
  function (config) {
    // 请求发起会经过这里
    // config：本次请求的请求配置对象👇
    const { user } = store.state;
    if (user && user.data.token) {
      config.headers.Authorization = `Bearer ${user.data.token}`;
    }
    // console.log(config);
    return config;
  },
  function (error) {
    return Promise.reject(error);
    // eslint-disable-next-line comma-dangle
  }
);
export default request;
