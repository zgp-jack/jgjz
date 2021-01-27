/*
 * @Author: jsxin
 * @Date: 2021-01-21 13:44:17
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-27 09:24:26
 * @Description: 常用助手函数
 */
import Taro from '@tarojs/taro'
import {showModal} from '@/utils/msg';
import { RECORD_WORK_DATA } from '@/pages/account_book_list/index.d'
import { INDEXPAGE } from '@/config/pages'

/**
 * @name: objDeepCopy for jsxin
 * @params source: T 要被拷贝的对象
 * @return new source<T>
 * @description 对象深拷贝
 */
export function objDeepCopy(source: any): any {
  var sourceCopy = source instanceof Array ? [] : {};
  for (var item in source) {
    sourceCopy[item] = typeof source[item] === 'object' ? objDeepCopy(source[item]) : source[item];
  }
  return sourceCopy;
}

/**
 * @name: copyWechat for jsxin
 * @params wechat: string 需要复制的微信号码
 * @return void 无返回值
 * @description 复制微信号并提示
 */
export function copyWechat(wechat: string): void {
  Taro.setClipboardData({
    data: wechat,
    success: () => {
      showModal(`微信号${wechat}已经成功复制到您的粘贴板，快去打开微信-添加朋友吧~!`)
    }
  })
}

/**
 * @name: callPhone for jsxin
 * @params phone: string 需要拨号的号码
 * @return void 无返回值
 * @description 拨打电话
 */
export function callPhone(phone: string): void {
  Taro.makePhoneCall({
    phoneNumber: phone
  })
}

/**
 * @name: objDeepCopy for jsxin
 * @params type: y = 年 m = 年-月 d = 年-月-日
 * @default type = d
 * @return string for date
 * @description 获取今天日期
 */
export function getTodayDate(type: string = 'd'): string {
  let date = new Date()
  let y: number = date.getFullYear()
  let m: number = date.getMonth() + 1
  let d: number = date.getDate()
  let _m: string = m < 10 ? `0${m}` : `${m}`
  let _d: string = d < 10 ? `0${d}` : `${d}`
  if (type === 'y') return `${y}`
  if (type === 'm') return `${y}-${_m}`
  return `${y}-${_m}-${_d}`
}


/**
 * @name: enterTheRecordBook for jsxin
 * @params phone: string 需要拨号的号码
 * @return void 无返回值
 * @description 拨打电话
 */
export function enterTheRecordBook(data: RECORD_WORK_DATA, type?: "record" | "borrow" |  "account"){
  let url: string = ''
  // 判断是 record:记工 borrow:记账 还是 account:进入记工本
  if (type == 'record') {
    if (data.identity == 1) { // 班组记工
      url = '/pages/work_team/team_record/index?type=2'
    } else { // 个人记工
      url = '/pages/person_record/index'
    }
  } else if (type == 'borrow') {
    if (data.identity == 1) { // 班组记账
      url = '/pages/work_team/team_record/index?type=1 '
    } else { // 个人记账
      url = '/pages/person_borrowing/index'
    }
  } else { // 记工记工本
    url = INDEXPAGE
    Taro.reLaunch({ url })
    return
  }
  Taro.navigateTo({ url })
}