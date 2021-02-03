/*
 * @Author: jsxin
 * @Date: 2021-02-03 18:00:38
 * @LastEditors: jsxin
 * @LastEditTime: 2021-02-03 18:04:37
 * @Description: 助手函数常用接口
 */

// 分享信息接口
export interface UserShareInfo {
  /** 分享标题 */ 
  title: string
  /** 分享图片 */ 
  imageUrl: string,
  /** 分享路径 */ 
  path: string,
  
}