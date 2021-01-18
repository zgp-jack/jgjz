/*
 * @Author: jsxin
 * @Date: 2021-01-18 14:20:27
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 15:02:23
 * @Description: 全局验证类逻辑
 ! @rules: 1.function name 请使用小驼峰命名 2.返回值必须声明  3.注释请参照已有方法给出
 */

import Taro from '@tarojs/taro'

/**
 * @name: isPhone for jsxin
 * @params tel: string 当前需要验证的手机号
 * @return boolean 
 * @description 验证传入的手机号是否为真
*/
export function isPhone(tel: string): boolean {
  let reg = /^1[0-9]{10}$/
  return reg.test(tel)
}

/**
 * @name: isNumber for jsxin
 * @params num: any 当前需要验证的数据
 * @return boolean
 * @description 验证传入的数据是否是数字
*/
export function isNumber(num: any): boolean {
  let reg = /^[0-9]+$/
  return reg.test(num)
}

/**
 * @name: isVaildNumber for jsxin
 * @params num: any 当前需要验证的数据 min: number 最小区间 max: number 最大区间
 * @return boolean
 * @description 验证传入的数据是否在指定的区间内
*/
export function isVaildNumber({ num, min = 0, max = 10 }: {
  num: any,
  min: number,
  max: number
}): boolean {
  if (!isNumber(num)) return false
  return num >= min && num <= max
}

/**
 * @name: randIntNumber for jsxin
 * @params min: number 最小区间 max: number 最大区间
 * @return number
 * @description 生成一个在 min-max 该区间的整数
*/
export function randIntNumber(min: number = 0, max: number = 20): number {
  return Math.floor(Math.random() * (max - min)) + min
}

/**
 * @name: getRandNumber for jsxin
 * @params min: number 最小区间 max: number 最大区间
 * @return number
 * @description 生成一个在 min-max 之间的随机数
*/
export function getRandNumber(min: number = 0, max: number = 20): number {
  return min + (Math.random() * (max - min));
}

/**
 * @name: isUrl for jsxin
 * @params url: string 传入需要被验证的网址
 * @return boolean
 * @description 验证传入的网址是否有效
*/
export function isUrl(url: string): boolean {
  let reg = /^([hH][tT]{2}[pP]:\/\/|[hH][tT]{2}[pP][sS]:\/\/)(([A-Za-z0-9-~]+)\.)+([A-Za-z0-9-~\/])+$/
  return reg.test(url)
}

/**
 * @name: isRequire for jsxin
 * @params val: string 传入需要被验证字符串
 * @return boolean
 * @description 验证传入的数据是否必填
*/
export function isRequire(val: string): boolean {
  let str = val.replace(/\s+/g, '');
  return (str != '' && str != null && str != undefined && str != 'null' && str != undefined)
}

/**
 * @name: isRequire for jsxin
 * @params val: string 传入需要被验证字符串 min: 最小必须达到多少字 max:最多不超过多少字 0为不验证最大字数
 * @return boolean
 * @description 验证内容 是否必须有汉字 且不少于 min 字 不大于max字
*/
export function isVaildVal(val: string, min: number = 15, max: number = 0): boolean {
  let reg = new RegExp("[\\u4E00-\\u9FFF]+");
  return max ? reg.test(val) && val.length >= min && val.length <= max : reg.test(val) && val.length >= min
}

/**
 * @name: isIdcard for jsxin
 * @params val: string 传入的身份证号码
 * @return boolean
 * @description 验证传入的身份证号码是否正确
*/
export function isIdcard(val: string): boolean {
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/
  return reg.test(val)
}

/**
 * @name: isType for jsxin
 * @params data: any 需要被验证的数据 type?: string 是否为当前[type]类型
 * @return boolean | string
 * @description 传入type 则验证 data 是否是 type 类型 | 不传入type 则返回当前type类型
*/
export function isType(data: any, type: string): boolean|string {
  let reg = Object.prototype.toString.call(data).slice(8, -1).toLowerCase()
  if (!type) return reg
  if (reg == type) return true
  return false
}

/**
 * @name: isIos for jsxin
 * @return boolean
 * @description 验证当前设备是否是ios
*/
export function isIos(): boolean {
  let system = Taro.getSystemInfoSync()
  return system.platform === 'ios'
}

/**
 * @name: isRequireLen for jsxin
 * @params str: string 需要被验证的字符串  _len?: number 当前字符串的最小长度
 * @return boolean
 * @description 验证传入字符串长度是否 >= _len 
*/
export function isRequireLen(str: string, _len: number = 6): boolean {
  return (str != '' && str != null && str != undefined && str.length >= _len) ? true : false;
}

/**
 * @name: isChinese for jsxin
 * @params str: string 需要被验证的字符串
 * @return boolean
 * @description 验证当前字符串中是否包含了中文
*/
export function isChinese(str: string): boolean {
  const reg = new RegExp("[\\u4E00-\\u9FFF]+", "g");
  if (reg.test(str)) {
    return true
  }
  return false;
}

/**
 * @name: allChinese for jsxin
 * @params str: string 需要被验证的字符串
 * @return boolean
 * @description 当前字符串是否是2-5个全中文
*/
export function allChinese(str: string): boolean {
  const reg = new RegExp('^[\u4E00-\u9FA5]{2,5}$');
  if (reg.test(str)) {
    return true
  }
  return false;
}
