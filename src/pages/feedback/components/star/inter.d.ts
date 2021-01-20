/*
 * @Author: jsxin
 * @Date: 2021-01-20 10:06:17
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 10:26:08
 * @Description: interface for star/*
 */

// 星级配置项
export interface StarConfig {
  /** ✨id */ 
  id: number,
  /** ✨标题 */ 
  text: string
}

// Star组件默认接收参数
export default interface StarProps {
  /** 当前几颗星 */ 
  num: number
  /** 点击星星的数量方法  */ 
  onStar: (i: number) => void
}