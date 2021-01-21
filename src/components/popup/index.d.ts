/*
 * @Author: jsxin
 * @Date: 2021-01-20 08:59:21
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 21:03:41
 * @Description: 添加、修改、删除分类分项，添加、修改、删除工友
 */

//弹窗，输入框内容
interface InputItem {
  /**输入框标题 */
  title: string
  /**输入框提示placeholder*/
  placeholder: string
  /**输入框名称，方便通过name取对应输入框值*/ 
  name: string
  /**输入框默认value值*/
  value: string
}

//定义弹窗传递的props
export interface PromptBoxProps {
  /**是否显示弹窗左下角取消按钮*/
  showCancel?: boolean
  /**是否显示弹窗右下角确定按钮*/
  showConfirm?: boolean
  /**是否显示弹窗上方的标题*/
  showTitle?: boolean
  /**弹窗左下角按钮的文本内容*/
  cancelText?: string
  /**弹窗右下角按钮的文本内容*/
  confirmText?: string
  /**弹窗标题文本内容*/
  titleText?: string
  /**右上角按钮显示文本*/ 
  titleButtonText?: string
  /**弹窗左下角按钮显示颜色*/
  cancelColor?: string
  /**弹窗右下角按钮显示颜色*/
  confirmColor?: string
  /**是否显示弹窗右上方的按钮*/
  showTitleButton?: boolean
  /**弹窗中显示输入框*/
  inputGroup?: InputItem[]
  /**弹窗左下角按钮事件*/
  cancel?: () => void
  /**弹窗右下角按钮事件*/
  confirm?: (data: InputValue) => void
  /**弹窗右上角按钮事件*/
  delet?: () => void
}

// 定义输入框输入值数据
export interface InputValue {
  [key:string]: string
}