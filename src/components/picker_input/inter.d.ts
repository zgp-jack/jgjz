/*
 * @Author: jsxin
 * @Date: 2021-01-20 14:54:28
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-23 14:35:20
 * @Description: interface for input
 */

export default interface PersonInputProps {
  /** input名字  */ 
  title: string
  /** value 金额  */
  value: string
  /** 父级组件的字段  */
  type: string
  /** 用户输入input改变方法  */
  change: (val: string, type: string) => void,
  /** 最多可输入多少位小数  */
  maxLength?: number
}