/*
 * @Author: lcxmxkg
 * @Date: 2021-01-22 21:08:06
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-23 10:29:05
 * @Description: interface for identity/*
 */


// 身份选择配置
export interface IDENTITY_CONFIG { 
  /** 记工本新名称 */
  name: string,
  /** 记工本-身份-2个人，1是班组 */ 
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

// 添加账本 接口返回数据类型
export interface CreateResultType {
  /** 新建的账本id */ 
  work_note_id: number
}

export interface Remember_Config {
  /** 记工本新名称 */
  name: string,
  /** 记工本-身份-2个人，1是班组 */
  identity: number
  /** id记工 */
  id: number,
  /** 是否归档 */
  status: number
}