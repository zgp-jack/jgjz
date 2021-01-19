/*
 * @Author: jsxin
 * @Date: 2021-01-18 14:15:01
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-19 14:25:16
 * @Description: 存放所有的API请求接口
 ! @rules: 1. 导出的接口名 小驼峰  2.注释: 功能模块名 + 接口概述 3.功能模块相同的接口放在一起
 */

import { REQUESTURL } from '@/config/index'

// ! 记工本
// 记工本-获取归档列表
export const userGetWorkNotes: string = `${REQUESTURL}work-notes/get-file`
// 记工本-获取记工本（全部）
export const userGetAllWorkNotes: string = `${REQUESTURL}work-notes/get`

// ! 记工
// 记工-获取首页流水数据
export const useGetIndexBusiness: string = `${REQUESTURL}business/get-index-business`
// 记工-获取流水列表
export const userGetBusinessLists: string = `${REQUESTURL}business/get-business`

// ! 登录注册
// 登录-获取验证码
export const userGetCode: string = `${REQUESTURL}`

// ! 意见反馈
// 意见反馈-添加意见反馈
export const addFeedback: string = `${REQUESTURL}feedback/add`