/*
 * @Author: jsxin
 * @Date: 2021-01-18 16:22:10
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 18:03:14
 * @Description: hooks for 通用获取验证码 
 * tips: 获取验证码 直接调用 userGetCode(tel)
 */

import { useState } from '@tarojs/taro'
import { isPhone } from '@/utils/v'
import msg, { showModal } from '@/utils/msg'
import userGetCodeAction from './api'

const title: string = '获取验证码'
export default function useCode() {
  // 获取验证码按钮是否被禁用
  const [disabled, setDisabled] = useState<boolean>(false)
  // 当前按钮显示的文本
  const [text, setText] = useState<string>(title)

  /**
   * @name: userGetCode for jsxin
   * @params tel: 发送验证码的手机号
   * @return void
   * @description 模态提示框
  */
  const userGetCode = (tel: string): void => {
    // 验证是否已发送 或者 手机号格式是否正确
    if (disabled) return
    if (!isPhone(tel)) {
      msg('请先输入正确的手机号码')
      return
    }
    setDisabled(true)
    userGetCodeAction(tel).then(res => {
      if (res.code === 0) {
        msg(res.message, 2500)
        let t: number = res.data.refresh || 60
        setText(t + 's后重新获取')
        let timer = setInterval(() => {
          t--
          if (t === 0) {
            setDisabled(false)
            clearInterval(timer)
            setText(title)
            return false
          }
          setText(t + 's后重新获取')
        }, 1000)
      } else {
        showModal(res.message)
      }
    })
  }

  return {
    disabled,
    text,
    userGetCode
  }

}