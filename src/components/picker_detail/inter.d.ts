/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 16:26:46
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-25 16:23:48
 * @Description: interface for picker_detail
 */

// 修改/详情 组件
export default interface PickerDetailProps {
  // 日期title
  dateTitle?:string
  // 日期值
  dateValue:string
  // 提交时间title
  submitTitle?:string
  // 提交时间
  submitValue:string
  // 工人标题
  workerTitle?: string
  // 工人
  worker?: string
  // 是否显示工人栏
  showWorker?: boolean
  // 项目名称
  projectName?:string
  // 项目
  projectValue
}
