/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 15:05:10
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-26 16:20:13
 * @Description: interface for record_day
 */

 // 记工天接口
export default interface RecordDayPostData {
  /** 记工类型 */
  business_type: number,
  /** 日期 */
  business_time: string,
  /** 班组长id */
  group_leader: string,
  /** 备注 */
  note: string,
  /** 个人/班组 */
  identity: number
  /** 记工本ID */
  work_note?: number
  /** 上传图片url */
  img_url?: string
  /** 上班事件 */
  work_time: string
  /** ??? */
  work_time_hour: string
  /** 加班时间 */
  overtime: string
  /**班组工人id*/
  worker_id?: string 
}

export interface WorkTimeProps {
  // id
  id: number
  // text值
  text: string
}

export interface PropsData {
  workerId: string
  type: number
}

export interface WorkTimeType {
  /** 后台提交数据 */
  value: string,
  /** 前台展示文本 */
  text: string
}