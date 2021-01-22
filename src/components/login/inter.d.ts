/*
 * @Author: jsxin
 * @Date: 2021-01-19 21:08:06
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-21 19:49:33
 * @Description: interface for login/*
 */

// 登录组件参数
export interface LoginProps {
  /** 是否显示登陆组件 */
  show: boolean,
  /** 登录 */
  setShow?: (bool: boolean) => void
}

// 登录方式配置
export interface LoginConfig {
  /** 登录方式id */
  id: string,
  /** 登录 */
  title: string
}


// 登录-验证码  接口返回的数据类型
export interface UserGetCodeLoginParams {
  /** 手机号 */
  tel: string,
  /** 验证码 */
  code?: string,
  /** 密码 */
  pass?: string,
  /** 登录方式 */
  type: string
}


// 用户登录成功后台返回信息
export interface UserResult {
  /** 用户token  */
  token: string,
  /** 用户id  */
  yupao_id: number
}