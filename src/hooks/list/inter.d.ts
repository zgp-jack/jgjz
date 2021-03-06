/*
 * @Author: jsxin
 * @Date: 2021-01-18 17:31:32
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-19 15:53:25
 * @Description: useInit 使用 的所有接口存放地址
 */
import {Result} from '@/utils/request/inter.d'

// 所有api接口请求的类型 api为请求方法()
type APIFunc<P, R> = (params: P) => Promise<Result<R[]>>

// 定义hooks 管理状态的所有字段
export interface FetchResult<P, R> {
  /** 监听loading 改变 负责请求 */
  loading: boolean,
  /** 请求错误信息 */
  errMsg: string,
  /** 是否继续加载 */
  increasing: boolean,
  /** 请求返回的列表数据 */
  list: R[],
  /** 列表请求参数 */
  params: P,
  /** 当前请求页码 */
  page: number,
  /** 是否还有数据 */
  hasmore: boolean,
}

export interface PageParams {
  page: number
}
