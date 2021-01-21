/*
 * @Author: jsxin
 * @Date: 2021-01-18 15:30:22
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 15:32:55
 * @Description: user状态机的接口 
 */

// 用户信息的接口
export default interface UserInfo {
  /** 用户id */
  userId: number,
  /** 用户token信息 */
  token: string,
  /** 当前用户是否登录 */
  login: boolean
}
