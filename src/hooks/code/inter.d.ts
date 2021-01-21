/*
 * @Author: jsxin
 * @Date: 2021-01-18 16:30:03
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 21:24:01
 * @Description: 获取验证码的返回数据类型
 */

// 获取验证码  接口返回的数据类型
export interface UserGetCodeResult{
  /** 多少秒后可以重新获取验证码 */
  refresh: number
}

// 获取验证码  接口返回的数据类型
export interface UserGetCodeParams {
  /** 需要获取验证码的手机号 */
  tel: string
}