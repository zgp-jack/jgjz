/*
 * @Author: jsxin
 * @Date: 2021-01-19 14:20:49
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-19 16:55:33
 * @Description: interface for lists_provider/*
 */

export default interface ListProviderProps {
  /** 加载错误信息 */
  errMsg: string,
  /** 数据是否正在加载中 */
  loading?: boolean,
  /** 子元素 */
  children?: any,
  /** 容器classname */
  className?: string,
  /** 是否还有更多数据 */
  hasmore: boolean,
  /** 列表数据长度 */
  length: number,
  /** 正在加载下一页 */
  increasing: boolean
}