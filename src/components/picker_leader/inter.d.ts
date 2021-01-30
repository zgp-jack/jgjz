/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 16:26:46
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-24 17:09:37
 * @Description: interface for picker_leader
 */

// 班组长组件接口
export default interface PickerLeaderProps {
  // 隐藏图片
  hideImg?:boolean
  // 是否显示右侧关闭按钮
  rightClose?: boolean
  // 图标
  img?:string
  // 组件标题
  title?:string
  // 日期
  leader: leaderType
  // 删除日期组件
  DeletePickerLeader?: () => void
}
// 班组长信息
interface leaderType {
  id: string,
  name: string
}