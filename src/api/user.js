import request from '@/utils/request';
// import store from '@/store';
export const login = (data) => {
  return request({
    method: 'POST',
    url: '/v1_0/authorizations',
    data,
  });
};
export const yzm = (mobile) => {
  return request({
    method: 'GET',
    url: `/v1_0/sms/codes/${mobile}`,
  });
};
export const userInfo = () => {
  return request({
    method: 'GET',
    url: '/v1_0/user',
    // 该接口需要授权才能访问，Bearer后面有个空格，token的数据格式：Bearer token
    // headers: { Authorization: `Bearer ${store.state.user.data.token}` },
  });
};

// 获取用户频道列表数据
export const getChannel = () => {
  return request({
    methods: 'GET',
    url: '/v1_0/user/channels',
  });
};
// 获取文章列表
export const getArticle = (params) => {
  return request({
    methods: 'GET',
    url: '/v1_1/articles',
    params,
  });
};
// 获取所有频道列表数据
export const getAllChannels = () => {
  return request({
    methods: 'GET',
    url: '/v1_0/channels',
  });
};
