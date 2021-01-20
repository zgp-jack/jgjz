/*
 * @Author: jsxin
 * @Date: 2021-01-18 14:15:01
 * @LastEditors: jsxin
 * @LastEditTime: 2021-01-20 11:47:47
 * @Description: 存放所有的API请求接口
 ! @rules: 1. 导出的接口名 小驼峰  2.注释: 功能模块名 + 接口概述 3.功能模块相同的接口放在一起
 */

// ! 记工本
// 记工本-获取归档列表
export const userGetWorkNotes: string = `work-notes/get-file`
// 记工本-获取记工本（全部）
export const userGetAllWorkNotes: string = `work-notes/get`

// ! 记工
// 记工-获取首页流水数据
export const useGetIndexBusiness: string = `business/get-index-business`
// 记工-获取流水列表
export const userGetBusinessLists: string = `business/get-business`

// ! 登录注册
// 登录-获取验证码
export const userGetCode: string = ``

// ! 意见反馈
// 意见反馈-添加意见反馈
export const addFeedback: string = `feedback/add`

// ! 通讯录
// 获取全部工友
export const addressBookAll: string = `workers/get`
//获取某个账本中的工友
export const addressBookNote: string = `workers/get-note-workers`