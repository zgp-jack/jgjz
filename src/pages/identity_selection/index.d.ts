/*
 * @Author: lcxmxkg
 * @Date: 2021-01-22 21:08:06
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-23 09:42:53
 * @Description: interface for identity/*
 */


// 身份选择配置
export interface IDENTITY_CONFIG { 
  /** 记工本新名称 */
  name: string,
  /** 记工本-身份-1个人，2是班组 */ 
  identity: number
}

// 可创建列表配置项
export interface CreateConfigList {
  /** 创建id */
  id: number,
  /** 创建类型 **/
  type: string,
  /** 创建提示 **/
  tips: string,
  /** 创建图片 **/
  img: string
}