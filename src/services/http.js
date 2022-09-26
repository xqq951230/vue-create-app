/**
 * Created by JSON on 2018/1/23.
 */
import _Axios from './_axios';
export default function HTTP (url, param, prefix = window.LOCAL_CONFIG.DEFAULT_PREFIX, method = 'POST', headers = {
  'X-Requested-With': 'XMLHttpRequest',
  Accept: 'application/json',
  'Content-Type': 'application/json; charset=UTF-8'
}, dataType = 'json') {
  let params
  params = {
    method: method,
    prefix: prefix,
    data: param,
    headers: headers,
    dataType: dataType
  };

  return _Axios(url, params);
}
