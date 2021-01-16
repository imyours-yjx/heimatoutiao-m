// 封装本地存储模块
export const setItem = (key, value) => {
  if (typeof value === 'object') {
    value = JSON.stringify(value);
  }
  window.localStorage.setItem(key, value);
};
export const getItem = (key) => {
  const data = window.localStorage.getItem(key);
  try {
    return JSON.parse(data);
  } catch (err) {
    return data;
  }
  //   JSON.parse(window.localStorage.getItem(key));
};
export const removeItem = (value) => {
  window.localStorage.removeItem(value);
};
