/*
 * @Author: lcmxkg
 * @Date: 2021-01-18 15:30:22
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-23 15:35:23
 * @Description: user状态机的接口 
 */

// 用户信息的接口
export default interface AccountBookInfo {
  /** 记工id */
  id: number,
  /** 记工名字 */
  name: string,
  /** 记工种类 */
  identity: string
  /** 是否已经归档 */
  status: number
}
