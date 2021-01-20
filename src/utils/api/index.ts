/*
 * @Author: jsxin
 * @Date: 2021-01-18 14:15:01
 * @LastEditors: jsxin
<<<<<<< HEAD
 * @LastEditTime: 2021-01-20 18:58:48
=======
 * @LastEditTime: 2021-01-20 19:32:42
>>>>>>> dev
 * @Description: 存放所有的API请求接口
 ! @rules: 1. 导出的接口名 小驼峰  2.注释: 功能模块名 + 接口概述 3.功能模块相同的接口放在一起
 */

import { REQUESTURL } from '@/config/index'

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


// ! 记账类别
// 记账类别-获取已有类别
export const userGetExpendType: string = `expend-type/get`

// ! 计量类别
// 记账类别-获取已有类别
export const userGetUnitWorkType: string = `UnitWorkType/get`

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
//初始化记工界面
export const initRemember: string = REQUESTURL + 'business/get-one/'

//获取记工本
export const workNote: string = REQUESTURL + 'work-notes/get?id=1&co=23'


// !流水列表
// 获取流水
export const flowList: string = 'business/get-business/'
