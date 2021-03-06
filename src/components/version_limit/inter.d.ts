/*
 * @Author: lcmxkg
 * @Date: 2021-01-19 21:08:06
 * @LastEditors: lcmxkg
 * @LastEditTime: 2021-01-28 4:58:38
 * @Description: interface for version-limit/*
 */

// 登录组件参数
export interface VersionLimitParams {
  /** 是否显示老用户限制组件 */
  show: boolean
}
// 是否老版本用户
export default interface VERSINLIMIT {
  /** 是否老版本用户 */
  versinLimitStatus: boolean
}
