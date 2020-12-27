/**
 * 封装axios库用于发送ajax请求
 * 返回promise对象
 * 1.统一处理异常信息
 */
import axios from 'axios';
import { message } from 'antd';

export default function ajax(url, data = {}, type = 'GET') {
  return new Promise((resolve, reject) => {
    let promise;
    if (type === "GET") {
      promise = axios.get(url, {
        params: data
      })
    } else {
      promise = axios.post(url, data)
    }
    promise.then(res => {
      resolve(res.data)
    }).catch(err => {
      message.error('请求出错了：' + err.message)
    })
  })

}