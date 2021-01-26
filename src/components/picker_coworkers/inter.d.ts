/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 16:26:46
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-24 17:09:37
 * @Description: interface for picker_leader
 */

// 选择工友组件接口
export default interface PickerCoworkersProps {
  // 隐藏图片
  hideImg?: boolean
  // 是否显示右侧关闭按钮
  rightClose?: boolean
  // 图标
  img?: string
  // 组件标题
  title?: string
  // 日期
  leader: string
  // 删除日期组件
  DeletePickerCoworkers?: () => void
}
