/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 16:26:46
 * @LastEditors: jack_zgp
 * @LastEditTime: 2021-01-20 16:47:42
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
     // 项目名称
     projectName?:string
     // 项目
     projectValue
 }