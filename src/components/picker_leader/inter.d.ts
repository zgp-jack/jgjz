/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 16:26:46
 * @LastEditors: jack_zgp
 * @LastEditTime: 2021-01-20 16:47:42
 * @Description: interface for picker_leader
 */

 // 班组长组件接口
 export default interface PickerLeaderProps {
     // 隐藏图片
     hideImg?:boolean
     // 图标
     img?:string
     // 组件标题
     title?:string
     // 日期
     leader:string
     // 删除日期组件
     DeletePickerLeader: () => void
 }