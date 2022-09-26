/**
 *
 * @authors liwb (you@example.org)
 * @date
 *  * @version $ https://github.com/mzabriskie/axios
/* name module */
import Qs from 'qs';
import axios from 'axios';
import autoMatchBaseUrl from './autoMatchBaseUrl';
import Authentication from './Authentication.js'
import Time from '../static/js/timeFormat'
import {
  Message
} from 'element-ui'

// 添加一个请求拦截器 （于transformRequest之前处理）
axios.interceptors.request.use(config => {
  let axiosConfig = new Authentication()
  return axiosConfig.initRequestHeaders(config)
}, function (error) {
  // 当出现请求错误是做一些处理
  return Promise.reject(error);
});

// 添加一个返回拦截器
axios.interceptors.response.use(function (response) {
  return response;
}, function (error) {
  // 对返回的错误进行一些处理
  const obj =
  {
    error_code: error.code,
    error_message: error.message,
    error_url: error.config.url,
    error_time: Time.timeFormat()
  }
  console.group('request.errorInfo')
  console.dir(obj)
  console.groupEnd()
  return error
})

function checkStatus (response) {
  // 如果http状态码正常，则直接返回数据
  if (response) {
    // -1000 自己定义，连接错误的status
    const status = response.status || -1000;
    if (status === 200) {
      // 如果不需要除了data之外的数据，可以直接 return response.data
      return response.data;
    } else {
      let errorInfo = '';
      switch (status) {
        case -1:
          errorInfo = '远程服务响应失败,请稍后重试';
          break;
        case 400:
          errorInfo = '400: 错误请求';
          break;
        case 401:
          errorInfo = '401: 访问令牌无效或已过期';
          break;
        case 403:
          errorInfo = '403: 拒绝访问';
          break;
        case 404:
          errorInfo = '404：资源不存在';
          break;
        case 405:
          errorInfo = '405: 请求方法未允许'
          break;
        case 408:
          errorInfo = '408: 请求超时'
          break;
        case 500:
          errorInfo = '500：访问服务失败';
          break;
        case 501:
          errorInfo = '501：未实现';
          break;
        case 502:
          errorInfo = '502：无效网关';
          break;
        case 503:
          errorInfo = '503: 服务不可用'
          break;
        default:
          errorInfo = `连接错误${status}`
      }
      return {
        status,
        msg: errorInfo
      }
    }
  }
  // 异常状态下，把错误信息返回去
  return {
    status: -404,
    msg: '网络异常'
  };
}

/**
 * 基于axios ajax请求
 * @param url
 * @param method
 * @param timeout
 * @param prefix 用来拼接url地址
 * @param data
 * @param headers
 * @param dataType
 * @returns {Promise.<T>}
 * @private
 */
export default function _Axios (url, {
  method = '',
  timeout = 60000,
  prefix = '',
  data = {},
  headers = {},
  dataType = 'json'
}) {
  const baseURL = autoMatchBaseUrl(prefix);



  headers = Object.assign({}, dataType === 'json' ? {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Content-Type': 'application/json; charset=UTF-8'
  } : {
    'X-Requested-With': 'XMLHttpRequest',
    Accept: 'application/json',
    'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }, headers);

  const defaultConfig = {
    baseURL,
    url,
    method,
    params: data,
    data,
    timeout,
    headers,
    responseType: dataType
  };
  if (method === 'get') {
    delete defaultConfig.data;
  } else {
    delete defaultConfig.params;
  }

  const contentType = headers['Content-Type'];
  if (typeof contentType !== 'undefined') {
    if (~contentType.indexOf('multipart')) {
      // 类型 `multipart/form-data;`
      defaultConfig.data = data;
    } else if (~contentType.indexOf('json')) {
      // 类型 `application/json`
      // 服务器收到的raw body(原始数据) "{name:"jhon",sex:"man"}"（普通字符串）
      // defaultConfig.data = JSON.stringify(data);
      // defaultConfig.data = Qs.stringify(data);
      if (defaultConfig.method === 'post') {
        defaultConfig.data = data;
      } else {
        delete defaultConfig.data;
      }
    } else {
      // 类型 `application/x-www-form-urlencoded`
      // 服务器收到的raw body(原始数据) name=homeway&key=nokey
      defaultConfig.data = Qs.stringify(data);
    }
  }
  var promise = axios(defaultConfig)
    .then((response) => {
      return checkStatus(response);
    })
    .then((res) => {
      return res;
    });
  promise.error = function (fn) {
    promise.then(null, (error) => {
      if (error == null) {
        error = {
          success: false,
          msg: '未知错误'
        }
      } else {
        Message.error(error.msg);
      }
      fn(error);
      return error;
    });
    return promise;
  };

  promise.success = function (fn) {
    promise.then((response) => {
      if (response) {
        if (response.code == 0) {
          Message.error(response.codemessage)
        }
        fn(response);
        return response
      }
    });
    return promise;
  };
  return promise;
}
