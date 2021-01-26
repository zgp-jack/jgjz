/*
 * @Author: jsxin
 * @Date: 2021-01-18 15:05:35
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-25 10:33:47
 * @Description: 全局请求公共方法
 ! get<T>(url,data):Promise<T>  post<T>(url,data):Promise<T> get post优先是否该方法
 */

import Taro from '@tarojs/taro'
import {MINITOKEN, VERSION, REQUESTURL} from '@/config/index'
import {UserInfo} from '@/config/store'
import User from '@/store/user/inter.d'
import {Request, RequestBase, RequestHeader, Result} from './inter.d'


/**
 * @name: requestShowToast for jsxin
 * @params show: boolean 是否需要轻提示
 * @description 网络请求失败是否的情况下 200ms之后 直接轻提示
 * @tips: 200ms 是因为在微信小程序中  loading与toast不可共存 需要做延时
 */
function requestShowToast(show: boolean): void {
  if (show) {
    setTimeout(() => {
      //Msg('网络错误，请求失败')
    }, 200)
  }
}

/**
 * @name: getRequestHeaderInfo for jsxin
 * @return RequestHeader
 * @description 使用函数获取请求时的头部信息
 * @tips 只有在用户信息存在的情况下我们才会传入用户信息
 */
function getRequestHeaderInfo(): RequestHeader {

  // return {
  //   'content-type': 'application/x-www-form-urlencoded',
  //   source: MINITOKEN,
  //   version: VERSION,
  //   uid: 20021014,
  //   token: 'f46cad96333edb484b8f14b5cfff5952787054ddaf8ab4ddaedc850daefe16d1',
  // }

  // 获取用户信息
  let userInfo: User = Taro.getStorageSync(UserInfo)
  const requestHeader: RequestHeader = userInfo.login ? {
    'content-type': 'application/x-www-form-urlencoded',
    uid: userInfo.userId,
    token: userInfo.token,
    source: MINITOKEN,
    version: VERSION
  } : {
    'content-type': 'application/x-www-form-urlencoded',
    source: MINITOKEN,
    version: VERSION
  }
  return requestHeader
}

/**
 * @name: getRequestHeaderInfoAction for jsxin
 * @return RequestBase
 * @description 将生成的请求默认参数以及header信息返回
 */
const getRequestHeaderInfoAction = (): RequestBase => {
  let headers: RequestHeader = getRequestHeaderInfo()
  return {
    url: '',
    method: 'GET',
    header: {...headers},
    data: {},
    loading: true,
    title: '数据加载中...',
    failToast: true,
    user: true
  }
}

/**
 * @name: doRequestAction for jsxin
 * @return Promise<T> 请求时将当前的返回值类型传入
 * @params Request 请看该接口详细声明注释
 * @description 发起请求方法
 */
export default function doRequestAction<T>(reqData: Request): Promise<Result<T>> {
  // 先将传入的参数与默认参数进行合并
  let req: RequestBase = {...getRequestHeaderInfoAction(), ...reqData}
  // 判断该请求是否需要显示loading
  if (req.loading) {
    Taro.showLoading({
      title: req.title
    })
  }
  // 发起请求
  return new Promise((resolve, reject) => {
    Taro.request({
      url: /^http(s?):\/\//.test(req.url) ? req.url : REQUESTURL + req.url,
      method: req.method,
      header: req.header,
      data: {...req.data},
      success: (res) => {
        if (res.statusCode === 200) {
          resolve(res.data)
        } else {
          requestShowToast(req.failToast)
          reject(res)
        }
      },
      fail: (e) => {
        // todo requestShowToast(req.failToast)
        requestShowToast(req.failToast)
        reject(e)
      },
      complete: function () {
        if (req.loading) {
          Taro.hideLoading()
        }
      }
    })
  })
}

/**
 * @name: get for jsxin
 * @return Promise<T> 返回get请求的数据结果
 * @params url: string 接口请求地址 data: T 请求的参数 loading: boolean是否显示loading
 * @description 发起get请求
 */
export const get = <T, R>(url: string, data: T, loading?: boolean): Promise<Result<R>> => {
  return doRequestAction<R>({
    url, data, loading: !!loading, method: 'GET'
  })
}

/**
 * @name: post for jsxin
 * @return Promise<T> 返回get请求的数据结果
 * @params url: string 接口请求地址 data: T 请求的参数 loading: boolean是否显示loading
 * @description 发起post请求
 */
export const post = <T, R>(url: string, data: T, loading?: boolean): Promise<Result<R>> => {
  return doRequestAction<R>({
    url, data, loading: !!loading, method: 'POST'
  })
}


/**
 * @name: post for jsxin
 * @return Promise<T> 返回get请求的数据结果
 * @params url: string 接口请求地址 data: T 请求的参数 loading: boolean是否显示loading
 * @description 发起delete请求
 */
export const del = <T, R>(url: string, data?: T, loading?: boolean): Promise<Result<R>> => {
  return doRequestAction<R>({
    url, data, loading: !!loading, method: 'DELETE'
  })
}


/**
 * @name: post for jsxin
 * @return Promise<T> 返回get请求的数据结果
 * @params url: string 接口请求地址 data: T 请求的参数 loading: boolean是否显示loading
 * @description 发起put请求
 */
export const put = <T, R>(url: string, data: T, loading?: boolean): Promise<Result<R>> => {
  return doRequestAction<R>({
    url, data, loading: !!loading, method: 'PUT'
  })
}
