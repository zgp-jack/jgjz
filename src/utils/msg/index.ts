/*
 * @Author: jsxin
 * @Date: 2021-01-18 15:51:47
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-19 19:21:37
 * @Description: 公共提示信息
 ! @rules 1.轻提示 msg  2.模态框提示 showActionModal 3.方法小驼峰 4.注释请参考以后方法
 */

import Taro from '@tarojs/taro'
import { ShowActionModel } from './inter.d'
import { INDEXPAGE } from '@/config/pages'

/**
 * @name: msg for jsxin
 * @params msg: string 提示信息 duration: number 提示时间
 * @description 轻提示
*/
export default function msg(msg: string, duration: number = 3000):void {
  Taro.showToast({
    title: msg,
    icon: 'none',
    duration: duration
  })
}

/**
 * @name: showActionModal for jsxin
 * @params data: ShowActionModel 请看接口声明
 * @return void
 * @description 模态提示框 
*/
export function showActionModal(data: ShowActionModel): void {
  let { title = '温馨提示', confirmText = '确定', msg, success, showCancel = false, confirmColor = '#108EEF' } = data
  Taro.showModal({
    title: title,
    content: msg,
    showCancel,
    confirmText,
    confirmColor,
    success: () => {
      success && success()
    }
  })
}

/**
 * @name: showModal for jsxin
 * @params msg: 模态框提示信息
 * @return void
 * @description 确定模态框 标题是 温馨提示 按钮只有确定 内容为传入的 msg
 * @tips 点击确定 弹窗直接消息
*/
export function showModal(msg: string = ''): void {
  showActionModal({
    msg
  })
}

/**
 * @name: showModal for jsxin
 * @params msg: 模态框提示信息
 * @return void
 * @description 返回模态框 标题是 温馨提示 按钮只有确定 内容为传入的 msg
 * @tips 点击确定直接返回上一页 如果没有上一页则返回首页
*/
export function showBackModal(msg: string = ''): void {
  let pages = Taro.getCurrentPages()
  showActionModal({
    msg,
    success: () => {
      if (pages.length >= 2) { Taro.navigateBack() }
      else Taro.reLaunch({ url: INDEXPAGE })
    }
  })
}

/**
 * @name: errMsg for jsxin
 * @params msg: string 提示信息 
 * @description Taro-ui 自带的错误提示信息
*/
export function errMsg(msg: string = ''): void {
  Taro.atMessage({
    'message': msg,
    'type': 'error',
  })
}

/**
 * @name: warnMsg for jsxin
 * @params msg: string 提示信息
 * @description Taro-ui 自带的警告提示信息
*/
export function warnMsg(msg: string = ''): void {
  Taro.atMessage({
    'message': msg,
    'type': 'warning',
  })
}

/**
 * @name: successMsg for jsxin
 * @params msg: string 提示信息
 * @description Taro-ui 自带的成功提示信息
*/
export function successMsg(msg: string = ''): void {
  Taro.atMessage({
    'message': msg,
    'type': 'success',
  })
}
