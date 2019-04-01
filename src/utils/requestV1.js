import axios from 'axios';
// import qs from 'qs'

import httpErrorHandler from './httpErrorHandler';

const isDev = process.env.NODE_ENV === 'development';

// 错误处理文件

const instance = axios.create({
  baseURL: isDev ? '/fakeapi' : '/api',
  timeout: 5000,
  headers: {
    // 定义post请求编码格式
    post: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    }
  }
});

// 请求队列
const queue = []

// axios内置的请求中断ajax的方法

const CancelToken = axios.CancelToken;
console.dir(axios)

// 拼接请求的url和方法，同样的url+方法可以视作相同的请求

const token = (config) => {
  return `${config.url}_${config.method}`
}

// 中断重复的请求并且从队列中删除
const removeQueue = (config) => {
  for (let i = 0, size = queue.length; i < size; i++) {
    const task = queue[i];
    if (task.token === token(config)) {
      task.cancel();
      queue.splice(i, 1)
    }
  }
}

// 添加请求拦截器
instance.interceptors.request.use(config => {

  // 可以在这里添加token
  removeQueue(config); // 中断之前的同名请求
  config.cancelToken = new CancelToken((c) => {
    queue.push({ token: token(config), cancel: c })
  })
  return config
}, error => {
  return Promise.reject(error)
})

// 添加响应拦截器
instance.interceptors.response.use(response => {
  // 请求完成之后，自动移出队列
  removeQueue(response.config);
  return response.data
}, httpErrorHandler)
/**
 * 封装后的ajax post方法
 *
 * @param {string} url 请求路径
 * @param {object} data 请求参数
 * @param {object} config 用户自定义设置
 * @returns
 */
function post (url, data, config = {} ) {
  return instance.post(url, data, config)
}

/**
 * 封装后的ajax get方法
 *
 * @param {string} url 请求路径
 * @param {object} params 请求参数
 * @param {object} config 用户自定义设置
 * @returns
 */
function get (url, params, config ={}) {
  return instance.get(url, {params}, config)
}

// 封装上传文件的请求
const uploadInstance = axios.create({
  baseURL: isDev ? '/fakeapi' : '/api',
  timeout: 15000,
  headers: {
    'Content-Type': 'multipart/form-data'
  }
})
/**
 * 封装后的axios upload方法
 *
 * @param {string} url 请求路径
 * @param {object} option 请求参数
 * @param {object} [config] 特殊配置项（选填）
 * @returns
 */
function upload(url, option, config = {}) {
  let formdata = new FormData();
  Object.keys(option).forEach(key => {
    formdata.append(key, option[key])
  })
  return uploadInstance.post(url, formdata, config)
}

export default {
  post,
  get,
  upload
}