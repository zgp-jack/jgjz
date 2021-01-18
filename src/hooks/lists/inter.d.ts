/*
 * @Author: jsxin
 * @Date: 2021-01-18 17:31:32
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 20:41:49
 * @Description: useInit 使用 的所有接口存放地址 
 */
import { Result } from '@/utils/request/inter.d'

// 所有api接口请求的类型 api为请求方法()
type APIFunc<T, P> = (params: P) => Promise<Result<T>>

// 定义hooks 管理状态的所有字段 
export interface FetchResult<T> {
  /** 监听loading 改变 负责请求 */
  loading: boolean,
  /** 请求错误信息 */
  errMsg: string,
  /** 是否继续加载 */
  increasing: boolean,
  /** 请求返回的列表数据 */
  lists: T[]
}
