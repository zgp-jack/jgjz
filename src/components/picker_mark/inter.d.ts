/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 16:26:46
 * @LastEditors: jack_zgp
 * @LastEditTime: 2021-01-20 16:47:42
 * @Description: interface for picker_mark
 */

 // 备注组件接口
 export default interface PickerMarkProps {
    // 隐藏图片
    hideImg?:boolean
    // 图标
    img?:string
    // 组件标题
    title?:string
    // 文本域内容
    text:string
}