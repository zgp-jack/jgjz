/*
 * @Author: lcmxkg
 * @Date: 2021年01月22日10:26:35
 * @LastEditors: lcmxkg
 * @LastEditTime: 2021年01月22日10:26:43
 * @Description: 记工-账本列表
 */
// 数据列表

export interface GET_WORKERS_NOTES {
  /** 监听loading 改变 负责请求 */ 
  loading: boolean,
  /** 请求错误信息 */ 
  errMsg: string,
  /** 请求返回的默认数据 */ 
  data: RECORD_WORK_DATA[]
}
// 记工返回data
interface RECORD_WORK_DATA {
  /** 记工id */ 
  id:number,
  /** 记工名称 */
  name:string,
  /** 记工-1是个人-2是班组 */
  identity:string,
  /**  是否归档状态 */
  status:number,
}
// 修改记工弹窗确定 的值
export interface ADD_RECORD_WORK {
  /** 记工名称 */
  name:string,
  /** 记工 */
  action:string
}

// 提交修改记工 的值
export interface ADD_RECORD_WORK_PARAMS {
  /** 记工名称 */
  name:string
  /** 记工 */
  action:string
}
