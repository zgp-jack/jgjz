// 数据类型
export interface WorkTimeType {
  /** 后台提交数据 */ 
  value: string,
  /** 前台展示文本 */ 
  text: string
}

// 组件参数
export interface WorkDayComponentProps {
  /** 标题 */ 
  title?: string,
  /** 类型 work 上班 over 加班 */ 
  type?: 'work' | 'over' | '',
  /** 当前被选中的数据 */ 
  value?: WorkTimeType,
  /** 循序的数据源 */
  data?: WorkTimeType[],
  /** 数据被改变 */ 
  change: (data: WorkTimeType, type: string ) => void,
  /** 是否是选择按钮里面的值 */
  isSelect?: boolean,
  /** 是否有Close */
  isClose?: boolean
  /** 关闭加班组件 */
  close?: () => void
  /** 是否显示更多时间组件 */
  isMoreTime?:boolean
  /** 关闭更多时间组件 */
  closeMoreTime?: () => void
  /** 关闭备注 */
  setIsPickerMark?: (any) => void
}