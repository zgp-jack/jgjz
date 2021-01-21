/*
 * @Author: jsxin
 * @Date: 2021-01-21 13:44:17
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-21 16:42:18
 * @Description: 常用助手函数
 */

import data from '@/pages/address_book/api/data';

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
 * @name: objDeepCopy for jsxin
 * @params type: y = 年 m = 年-月 d = 年-月-日
 * @default type = d
 * @return string for date
 * @description 获取今天日期
*/
export function getTodayDate(type: string = 'd'): string{
  let date  = new Date()
  let y: number = date.getFullYear()
  let m: number = date.getMonth() + 1
  let d: number = date.getDate()
  let _m: string = m < 10 ? `0${m}` : `${m}`
  let _d: string = d < 10 ? `0${d}` : `${d}`
  if (type === 'y') return `${y}`
  if(type === 'm') return `${y}-${_m}`
  return `${y}-${_m}-${_d}`
}