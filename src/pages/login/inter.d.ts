/*
 * @Author: jsxin
 * @Date: 2021-01-19 21:08:06
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-19 21:19:46
 * @Description: interface for login/*
 */


// 登录方式配置
export interface LoginConfig {
  /** 登录方式id */
  id: string,
  /** 登录 */
  title: string
}


// 登录-验证码  接口返回的数据类型
export interface UserGetCodeLoginParams {
  /** 验证码的手机号 */
  tel: string,
  code: string,
  pass: string
}