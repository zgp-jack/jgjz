/*
 * @Author: jsxin
 * @Date: 2021-01-18 14:15:01
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-18 20:07:42
 * @Description: 存放所有的API请求接口
 ! @rules: 1. 导出的接口名 小驼峰  2.注释清楚的标在上方
 */

import { REQUESTURL } from '@/config/index'

// 获取流水数据
export const userGetBusinessLists: string = `${REQUESTURL}business/get-business`
// 获取验证码
export const userGetCode: string = `${REQUESTURL}`
// 新增意见反馈
export const addFeedback: string = `${REQUESTURL}feedback/add`