/*
 * @Author: jsxin
 * @Date: 2021-01-21 13:44:17
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-21 20:19:43
 * @Description: 常用助手函数
 */

import { showModal } from '@/utils/msg';

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