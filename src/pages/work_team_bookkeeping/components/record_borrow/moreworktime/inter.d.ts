/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 16:26:46
 * @LastEditors: jack_zgp
 * @LastEditTime: 2021-01-20 16:47:42
 * @Description: interface for moreworktime
 */

 // 更多加班时间 选择组件
 export default interface MoreWorkTimeProps {
  /** 更多加班组件/上班组件 */
  isMoreWork?: boolean
  /** 取消组件 */
  WorktimeCancle: () => void
  /** 获取值 */
  set: (number) => void
 }