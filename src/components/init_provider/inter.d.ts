/*
 * @Author: jsxin
 * @Date: 2021-01-18 17:52:58
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 20:05:59
 * @Description: 初始化页面容器的父级container
 * @tips: 使用  useInit hooks 的页面外层必须用它包裹
 */

//  组件默认接收的 参数
export default interface InitProviderProps {
  /** 加载错误信息 */ 
  errMsg: string,
  /** 数据是否正在加载中 */
  loading?: boolean,
  /** 子元素 */
  children?: any,
  /** 容器classname */
  className?: string
}