/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 16:26:46
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-26 11:15:35
 * @Description: interface for moreworktime
 */
import { WorkTimeType } from '@/components/work_day/inter.d'


 // 更多加班时间 选择组件
export default interface MoreWorkTimeProps {
  /** 是否有 无加班按钮 */
  hasOverBtn?: boolean
  /** 取消组件 */
  WorktimeCancle: () => void
  /** 获取值 */
  set: (data: WorkTimeType,type: string) => void,
  /** 标题 */
  title: string,
  /** 遍历的数据源 */ 
  data: WorkTimeType[]
  /** 当前被选中的值 */
  value: string,
  /** 高亮里面的值 */ 
  isSelect: boolean
}