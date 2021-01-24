/*
 * @Author: jack_zgp
 * @Date: 2021-01-20 15:05:10
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-24 18:12:25
 * @Description: interface for record_day
 */

 // 记工天接口
export default interface RecordDayPostData {
  /** 记工类型 */
  business_type: 1 | 2 | 3,
  /** 日期 */
  business_time: string,
  /** 班组长id */
  group_leader: string,
  /** 备注 */
  note: string,
  /** 个人/班组 */
  identity: 1 | 2
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
}

export interface WorkTimeProps {
  // id
  id: number
  // text值
  text: string
}