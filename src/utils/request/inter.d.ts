/*
 * @Author: jsxin
 * @Date: 2021-01-18 15:05:41
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-21 11:06:21
 * @Description: 请求方法的接口类文件
 */

// 请求头信息类型
export interface RequestHeader {
  /** content-type 提交数据类型 */
  'content-type'?: string
  /** 当前用户id */ 
  uid?: number,
  /** 当前用户token */
  token?: string,
  /** 用户token生成时间 */
  time?: number,
  /** 小程序的标识 */
  source: string,
  /** 小程序的版本号 */
  version: string
}

// 发起请求的数据参数
interface RequestBase {
  /** 请求的接口地址 */ 
  url: string,
  /** 请求方法 */
  method: 'GET' | 'POST' | 'DELETE' | 'PUT',
  /** 请求头信息 */
  header: RequestHeader,
  /** 提交的数据 */
  data: any,
  /** 请求是否是否直接toast提示 */
  failToast: boolean,
  /** 是否需要显示loading */
  loading: boolean,
  /** loading的title提示语 */
  title: string,
  /** 当前用户是否登录 */
  user: boolean
}

// 传入请求方法中的数据 将所有的参数设置为可选
export type Request = Partial<RequestBase>


// 常见的请求返回结果
export interface Result<T> {
  errmsg: string;
  errcode: string;
  code: number,
  message: string,
  refresh: number,
  data: T
}